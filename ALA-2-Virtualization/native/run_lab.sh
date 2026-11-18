#!/bin/bash
# Full demonstration. Run as root on Linux:  sudo ./run_lab.sh
cd "$(dirname "$0")"; CG=/sys/fs/cgroup
# name: CPU quota (us per 100000), RAM bytes, /data size, network mode
vm1(){ ./enter.sh vm1 50000  268435456 100m shared   -- "$@"; }   # 0.5 CPU, 256 MB, 100 MB
vm2(){ ./enter.sh vm2 100000 536870912 200m shared   -- "$@"; }   # 1.0 CPU, 512 MB, 200 MB
vm3(){ ./enter.sh vm3 25000  134217728 50m  isolated -- "$@"; }   # 0.25 CPU, 128 MB, 50 MB, own network
hr(){ echo; echo "=================== $* ==================="; }

hr "STEP 1: HOST ENVIRONMENT"
echo '$ uname -a';  uname -a
echo '$ nproc ; free -m'; nproc; free -m | head -2

hr "STEP 2: CREATE 3 INSTANCES (cgroup limits)"
vm1 sleep 600 & vm2 sleep 600 & vm3 sleep 600 &
disown -a
sleep 2
printf "%-5s %-9s %-10s %-9s %-12s %s\n" NAME HOST_PID CPU_LIMIT RAM_LIMIT NETWORK STATE
for v in vm1 vm2 vm3; do
  q=$(cat $CG/cpu/lab_$v/cpu.cfs_quota_us); m=$(cat $CG/memory/lab_$v/memory.limit_in_bytes)
  p=$(tail -1 $CG/memory/lab_$v/cgroup.procs); net=shared; [ $v = vm3 ] && net=isolated
  st=$(ps -o stat= -p $p)
  printf "%-5s %-9s %-10s %-9s %-12s %s\n" $v $p "$((q/1000))% core" "$((m/1024/1024)) MB" $net "running($st)"
done
echo; echo "Host view of the 3 running instance processes:"; ps -o pid,stat,etime,cmd -p $(for v in vm1 vm2 vm3; do tail -1 $CG/memory/lab_$v/cgroup.procs; done | paste -sd,)

hr "STEP 3: CPU ALLOCATION (same 6s busy-loop in each instance)"
echo '--- vm1 (quota 50%)';  vm1 python3 burn.py 6
echo '--- vm2 (quota 100%)'; vm2 python3 burn.py 6
echo '--- vm3 (quota 25%)';  vm3 python3 burn.py 6

hr "STEP 4: MEMORY ALLOCATION (vm1 limit 256 MB, process tries to use 600 MB)"
vm1 bash -c 'python3 memhog.py 600; echo "python exit code: $?   (137 = SIGKILL from OOM killer)"'
echo "memory.limit_in_bytes     : $(( $(cat $CG/memory/lab_vm1/memory.limit_in_bytes)/1024/1024 )) MB"
echo "memory.max_usage_in_bytes : $(( $(cat $CG/memory/lab_vm1/memory.max_usage_in_bytes)/1024/1024 )) MB (peak)"
grep oom_kill $CG/memory/lab_vm1/memory.oom_control
echo "--- host memory still healthy:"; free -m | head -2

hr "STEP 5: STORAGE ALLOCATION (vm3 has a 50 MB /data volume)"
vm3 bash -c 'df -h /data; echo "--- writing 100 MB into the 50 MB volume:"; dd if=/dev/zero of=/data/big bs=1M count=100 2>&1; echo "--- after:"; df -h /data'
echo; echo "--- vm2 has a 200 MB /data volume:"; vm2 df -h /data

hr "STEP 6: ISOLATION - PROCESSES"
echo "--- HOST process count: $(ps -e --no-headers | wc -l)"
echo "--- vm1: ps aux"; vm1 ps aux
echo "--- vm2: ps aux"; vm2 ps aux
echo "--- hostnames:"
vm1 bash -c 'echo "vm1 -> hostname=$(hostname), shell PID=$$"'
vm2 bash -c 'echo "vm2 -> hostname=$(hostname), shell PID=$$"'
vm3 bash -c 'echo "vm3 -> hostname=$(hostname), shell PID=$$"'
echo "host -> hostname=$(hostname)  (unchanged)"

hr "STEP 7: ISOLATION - FILESYSTEM"
vm1 bash -c 'echo "secret from vm1" > /data/test.txt; echo "[vm1] ls -l /data:"; ls -l /data; echo "[vm1] cat /data/test.txt:"; cat /data/test.txt'
vm2 bash -c 'echo "[vm2] ls -l /data:"; ls -l /data; echo "[vm2] cat /data/test.txt:"; cat /data/test.txt 2>&1'
echo "[host] cat /data/test.txt: $(cat /data/test.txt 2>&1)"

hr "STEP 8: ISOLATION - NETWORK"
echo "HOST interfaces : $(awk 'NR>2{gsub(":","",$1);printf "%s ",$1}' /proc/net/dev)"
echo "vm1  interfaces : $(vm1 awk 'NR>2{gsub(":","",$1);printf "%s ",$1}' /proc/net/dev)   (shares host network)"
echo "vm3  interfaces : $(vm3 awk 'NR>2{gsub(":","",$1);printf "%s ",$1}' /proc/net/dev)   (own isolated network)"
echo "--- can vm3 reach the outside? (ping 127.0.0.1 ok, anything else unreachable):"
vm3 bash -c 'python3 - <<PY
import socket
s=socket.socket(); s.settimeout(2)
try: s.connect(("8.8.8.8",53)); print("connected")
except Exception as e: print("vm3 -> 8.8.8.8 : FAILED (", e, ")")
PY'
echo "--- namespace IDs of the 3 RUNNING instances, read from the host (different number = different namespace):"
printf "%-6s %-18s %-18s %-18s %-18s\n" "" net pid mnt uts
ids(){ for n in net pid mnt uts; do printf "%-18s " "$(readlink $1/ns/$n | sed 's/.*\[//;s/\]//')"; done; echo; }
printf "%-6s " host; ids /proc/self
for v in vm1 vm2 vm3; do p=$(tail -1 $CG/memory/lab_$v/cgroup.procs); printf "%-6s " $v; ids /proc/$p; done

hr "STEP 9: CLEANUP"
{ for v in vm1 vm2 vm3; do kill -9 $(cat $CG/memory/lab_$v/cgroup.procs); done; sleep 1; } 2>/dev/null
for v in vm1 vm2 vm3; do rmdir $CG/cpu/lab_$v $CG/memory/lab_$v; done; echo "instances removed"
