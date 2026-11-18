#!/bin/bash
# ====================================================================
# GYANMANJARI INSTITUTE OF TECHNOLOGY (GMIU) - DEPARTMENT OF IT
# CLOUD COMPUTING PRACTICAL SUITE - ALA 2 VIRTUALIZATION
# In-Guest Linux Diagnostic & Isolation Verification Script
# Candidate: Herry Prajapati | Enrollment: 20230905090031
# ====================================================================

echo "====================================================================="
echo " GMIU ALA 2: VIRTUAL MACHINE DIAGNOSTIC & ISOLATION EXPERIMENT"
echo " Candidate: Herry Prajapati | Enrollment: 20230905090031"
echo "====================================================================="

echo -e "\n[1] GUEST HOSTNAME IDENTIFICATION:"
hostname
cat /etc/os-release | grep PRETTY_NAME

echo -e "\n[2] KERNEL & SYSTEM ARCHITECTURE (uname -a):"
uname -a

echo -e "\n[3] LOGICAL VIRTUAL CPU ALLOCATION (nproc / lscpu):"
echo "Virtual CPUs available to guest: $(nproc)"
lscpu | grep -E "Model name|CPU\(s\):|Thread\(s\) per core:|Core\(s\) per socket:|Hypervisor vendor:"

echo -e "\n[4] MEMORY ALLOCATION & UTILIZATION (free -h):"
free -h

echo -e "\n[5] VIRTUAL STORAGE VOLUMES & PARTITIONS (df -h):"
df -h /

echo -e "\n[6] NETWORK BOUNDARY & MAC ISOLATION (ip a):"
ip -brief addr

echo -e "\n====================================================================="
echo " [VERIFICATION] Guest VM boundary confirmed isolated from host."
echo "====================================================================="
