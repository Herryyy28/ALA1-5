# GMIU Cloud Computing Suite - Virtualization Implementation Guide (ALA 2)

**Candidate:** Herry Prajapati | **Enrollment:** 20230905090031  
**University:** Gyanmanjari Institute of Technology (GMIU) &bull; Department of IT  
**Subject:** Cloud Computing &bull; Academic Year 2026–2027  

---

## 1. System Hardware Audit (Empirical Results)

Before provisioning virtual machines, an automated hardware audit script (`virtualization/scripts/system_audit.ps1`) was executed on the candidate's host machine.

### Host Physical Telemetry
* **Operating System:** Microsoft Windows 11 Home Single Language (64-bit, Kernel 10.0.26300)
* **Processor:** 12th Gen Intel(R) Core(TM) i5-12450HX (8 Physical Cores, 12 Logical Processors)
* **Total Physical RAM:** 11.71 GB (12,283,768 KB)
* **Available Free RAM:** ~1.13 GB
* **Storage Volumes:** Drive C: 36.87 GB Free | Drive D: 115.93 GB Free
* **Firmware Virtualization (VT-x):** Disabled in UEFI firmware

---

## 2. Hardware Resource Constraints & Mitigation Strategy

> **CRITICAL HOST OBSERVATION:**
> The host workstation currently possesses **~1.13 GB of free physical RAM**. Concurrently running two 2GB Linux virtual machines (4 GB total) alongside the Windows 11 host operating system would exhaust physical RAM and trigger severe disk swapping (paging thrashing).

### Technical Mitigation Strategy
1. **Asymmetric Sizing:** VM-01 is designated as the primary 2-core / 2GB instance; VM-02 is designated as a 1-core / 1GB or 2GB sequential instance.
2. **Staggered Execution:** Run VM-01 first, capture telemetry, suspend VM-01, and launch VM-02.
3. **Declarative IaC Blueprints:** Provide ready-to-run VBoxManage automation scripts and Vagrantfiles (`virtualization/configurations/Vagrantfile`).
4. **BIOS / UEFI Enablement Guide:** Provide exact instructions to enable Intel Virtualization Technology (VT-x) in motherboard firmware.

---

## 3. Step-by-Step Oracle VirtualBox Installation & Setup

### Step 3.1: Enable VT-x in Motherboard UEFI / BIOS
1. Restart the laptop and press `F2` (or `Del` / `F12` depending on manufacturer).
2. Navigate to **Advanced &rarr; CPU Configuration**.
3. Locate **Intel (VMX) Virtualization Technology** and set to **Enabled**.
4. Press `F10` to Save and Exit.

### Step 3.2: Install Oracle VirtualBox
Install via Windows Package Manager:
```powershell
winget install Oracle.VirtualBox
```
Verify the CLI utility is in your PATH:
```cmd
VBoxManage -v
```

---

## 4. Automated VM Provisioning with VBoxManage CLI

Execute the automated provisioning script:
```powershell
powershell -ExecutionPolicy Bypass -File virtualization/scripts/provision_vms.ps1
```

### Manual VBoxManage Commands for Reference
#### Provision VM 1 (GMIU-Ubuntu-VM-01)
```bash
# 1. Create and register the VM
VBoxManage createvm --name "GMIU-Ubuntu-VM-01" --ostype "Ubuntu_64" --register

# 2. Configure 2 vCPUs and 2048 MB RAM
VBoxManage modifyvm "GMIU-Ubuntu-VM-01" --cpus 2 --memory 2048 --vram 16

# 3. Create a 25 GB dynamically allocated virtual hard disk
VBoxManage createmedium disk --filename "C:\Users\praja.HERRY\VirtualBox VMs\GMIU-Ubuntu-VM-01\GMIU-Ubuntu-VM-01.vdi" --size 25600 --format VDI

# 4. Attach Storage Controllers and ISO
VBoxManage storagectl "GMIU-Ubuntu-VM-01" --name "SATA Controller" --add sata --controller IntelAhci
VBoxManage storageattach "GMIU-Ubuntu-VM-01" --storagectl "SATA Controller" --port 0 --device 0 --type hdd --medium "C:\Users\praja.HERRY\VirtualBox VMs\GMIU-Ubuntu-VM-01\GMIU-Ubuntu-VM-01.vdi"

# 5. Configure NAT Network Adapter
VBoxManage modifyvm "GMIU-Ubuntu-VM-01" --nic1 nat
```

#### Provision VM 2 (GMIU-Ubuntu-VM-02)
```bash
VBoxManage createvm --name "GMIU-Ubuntu-VM-02" --ostype "Ubuntu_64" --register
VBoxManage modifyvm "GMIU-Ubuntu-VM-02" --cpus 1 --memory 2048 --vram 16
VBoxManage createmedium disk --filename "C:\Users\praja.HERRY\VirtualBox VMs\GMIU-Ubuntu-VM-02\GMIU-Ubuntu-VM-02.vdi" --size 20480 --format VDI
VBoxManage storagectl "GMIU-Ubuntu-VM-02" --name "SATA Controller" --add sata --controller IntelAhci
VBoxManage storageattach "GMIU-Ubuntu-VM-02" --storagectl "SATA Controller" --port 0 --device 0 --type hdd --medium "C:\Users\praja.HERRY\VirtualBox VMs\GMIU-Ubuntu-VM-02\GMIU-Ubuntu-VM-02.vdi"
VBoxManage modifyvm "GMIU-Ubuntu-VM-02" --nic1 nat
```

---

## 5. In-Guest Linux Diagnostic Verification Commands

After booting into Ubuntu, execute the test script (`virtualization/scripts/verify_isolation.sh`):
```bash
# Verify hostname
hostname

# Verify allocated logical cores
nproc
lscpu | grep "CPU(s):"

# Verify memory ceiling (capped at 2.0 GiB)
free -h

# Verify virtual disk boundaries
df -h /

# Verify kernel release
uname -a
```
All empirical command traces are archived in `evidence/ALA-2/vm_isolation_evidence.txt`.
