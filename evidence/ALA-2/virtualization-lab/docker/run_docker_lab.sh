#!/bin/bash
# Run on YOUR machine (Docker installed). Output is saved to docker_run.log -> screenshot each step.
cd "$(dirname "$0")"
{
echo "### 1. Versions";           docker --version; docker compose version
echo "### 2. Build and start";    docker compose up -d --build; docker ps
echo "### 3. Allocation";         docker stats --no-stream
for v in vm1 vm2 vm3; do docker inspect $v --format '{{.Name}}  CPUs={{div .HostConfig.NanoCpus 1000000000.0}}  Mem={{div .HostConfig.Memory 1048576}}MB'; done
echo "### 4. CPU test (vm1 asks for 2 cores, limited to 0.5)"
docker exec -d vm1 stress-ng --cpu 2 --timeout 15s; sleep 5; docker stats --no-stream vm1
echo "### 5. Memory test (vm1 limit 256 MB, asks 600 MB)"
docker exec vm1 stress-ng --vm 1 --vm-bytes 600M --timeout 15s; docker inspect vm1 --format 'OOMKilled={{.State.OOMKilled}}'; docker stats --no-stream vm1
echo "### 6. Storage test (vm3 /data = 50 MB)"
docker exec vm3 df -h /data; docker exec vm3 sh -c "dd if=/dev/zero of=/data/big bs=1M count=100"
echo "### 7. Process isolation"; docker exec vm1 ps aux; docker exec vm2 ps aux
echo "### 8. Filesystem isolation"
docker exec vm1 sh -c "echo 'secret from vm1' > /data/test.txt; cat /data/test.txt"; docker exec vm2 cat /data/test.txt
echo "### 9. Network isolation"
docker exec vm1 ping -c 2 vm2; docker exec vm1 ping -c 2 -W 2 vm3
echo "### 10. Cleanup"; docker compose down
} 2>&1 | tee docker_run.log
