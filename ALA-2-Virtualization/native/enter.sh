#!/bin/bash
# enter.sh NAME CPU_QUOTA_US MEM_BYTES DATA_SIZE NET(shared|isolated) -- command...
# Runs a command inside an isolated "instance": its own PID/UTS/IPC/mount (and optionally
# network) namespaces, placed in its own cgroup with CPU + memory limits.
NAME=$1; CPUQ=$2; MEM=$3; DATA=$4; NET=$5; shift 6
CG=/sys/fs/cgroup; BIG=9223372036854771712
mkdir -p $CG/cpu/lab_$NAME $CG/memory/lab_$NAME
echo 100000 > $CG/cpu/lab_$NAME/cpu.cfs_period_us
echo $CPUQ  > $CG/cpu/lab_$NAME/cpu.cfs_quota_us
echo $BIG > $CG/memory/lab_$NAME/memory.memsw.limit_in_bytes 2>/dev/null
echo $MEM > $CG/memory/lab_$NAME/memory.limit_in_bytes
echo $MEM > $CG/memory/lab_$NAME/memory.memsw.limit_in_bytes 2>/dev/null
echo $$ > $CG/cpu/lab_$NAME/cgroup.procs
echo $$ > $CG/memory/lab_$NAME/cgroup.procs
FLAGS="--pid --fork --mount-proc --uts --ipc --mount"
[ "$NET" = "isolated" ] && FLAGS="$FLAGS --net"
exec unshare $FLAGS bash -c '
  mount --make-rprivate /
  hostname '"$NAME"'
  mkdir -p /data && mount -t tmpfs -o size='"$DATA"' tmpfs /data
  exec "$@"' _ "$@"
