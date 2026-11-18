# GMIU Cloud Computing - ALA 2: Virtualization Practical

**Title:** Practical Implementation of Virtualization Using Oracle VirtualBox  
**Candidate:** Herry Prajapati | **Enrollment:** 20230905090031  
**Department:** Information Technology &bull; Gyanmanjari Institute of Technology (GMIU)  
**Academic Year:** 2026–2027 &bull; **Deadline:** 30 November 2026  

---

## 1. Practical Aim & Objectives
* Perform an empirical hardware capability audit on the host machine.
* Configure the Oracle VirtualBox Type-2 hypervisor.
* Provision dual Linux virtual machines (`GMIU-Ubuntu-VM-01` and `GMIU-Ubuntu-VM-02`) with asymmetric CPU, RAM, and virtual storage allocations.
* Execute in-guest diagnostic commands (`hostname`, `free -h`, `nproc`, `df -h`, `lscpu`, `uname -a`).
* Demonstrate virtual hardware isolation, independent hostnames, and process segregation.

## 2. Host Diagnostics (Audited)
* **OS:** Windows 11 Home 64-bit
* **CPU:** 12th Gen Intel Core i5-12450HX (8 cores, 12 logical threads)
* **RAM:** 11.71 GB Total, ~1.13 GB Free
* **Storage:** C: 36.87 GB Free | D: 115.93 GB Free
* **Firmware VT-x:** Disabled in UEFI (Enablement instructions provided)

## 3. Provisioned VM Configurations
* **VM 1 (GMIU-Ubuntu-VM-01):** Ubuntu 64-bit, 2 vCPUs, 2048 MB RAM, 25 GB dynamic VDI.
* **VM 2 (GMIU-Ubuntu-VM-02):** Ubuntu 64-bit, 1 vCPU, 2048 MB RAM, 20 GB dynamic VDI.

## 4. Automation Commands
* Hardware Audit: `powershell -ExecutionPolicy Bypass -File virtualization/scripts/system_audit.ps1`
* Provisioning: `powershell -ExecutionPolicy Bypass -File virtualization/scripts/provision_vms.ps1`
* In-Guest Verification: `bash virtualization/scripts/verify_isolation.sh`

## 5. Artifacts & Deliverables
* Hardware Audit JSON: `evidence/ALA-2/hardware_audit_report.json`
* Isolation Evidence: `evidence/ALA-2/vm_isolation_evidence.txt`
* Full PDF report: `reports/GMIU_ALA2_Report_20230905090031.pdf`
