# Hardware Virtualization (Intel VT-x / AMD-V) BIOS Configuration Guide

**Student:** Herry Prajapati  
**Enrollment:** 20230905090031  
**Institute:** Gyanmanjari Institute of Technology (GMIU)  
**Host Processor:** 12th Gen Intel(R) Core(TM) i5-12450HX (8 Cores, 12 Threads)  
**Host Operating System:** Microsoft Windows 11 Home Single Language  

---

## 1. Hardware Audit Diagnostic Findings
During Phase 1 automated system diagnostics (`virtualization/scripts/system_audit.ps1`), WMI queried the host processor capabilities:
- **Processor:** `12th Gen Intel(R) Core(TM) i5-12450HX`
- **Supported Architecture:** 64-bit x86-64 with Intel Virtualization Technology (VT-x) and Intel Directed I/O (VT-d).
- **Current UEFI Firmware State:** `VirtualizationFirmwareEnabled: False` (Disabled by OEM motherboard firmware default).
- **Physical RAM Availability:** `11.71 GB Total`, with `~1.13 GB Free Memory` active during host operation.

---

## 2. Step-by-Step Instructions to Enable Intel VT-x in UEFI/BIOS

To enable hardware-assisted Type-2 virtualization for Oracle VM VirtualBox or Windows Hyper-V:

1. **Reboot into UEFI Firmware:**
   - Save all open project work.
   - Click **Windows Start** -> **Power**.
   - Hold down the **Shift** key and click **Restart**.
   - Navigate to: **Troubleshoot** -> **Advanced Options** -> **UEFI Firmware Settings** -> **Restart**.
   - Alternatively, press `F2`, `F10`, or `Del` repeatedly during initial boot splash.

2. **Locate Virtualization Setting:**
   - In UEFI BIOS, switch to the **Advanced**, **CPU Configuration**, or **Security** tab (varies by OEM vendor: Lenovo, HP, ASUS, Dell, Acer).
   - Find the parameter:
     - **Intel (VMX) Virtualization Technology** OR
     - **Intel VT-x** OR
     - **Intel Vanderpool Technology**
   - Toggle the setting from **Disabled** to **Enabled**.

3. **Enable Intel VT-d (Directed I/O Virtualization):**
   - Enable **Intel VT-d** for optimal direct device assignment and memory management.

4. **Save and Exit:**
   - Press `F10` (Save & Exit Setup).
   - Confirm reboot into Windows 11.

---

## 3. Post-Boot Verification Command
Open PowerShell as Administrator and run:
```powershell
Get-CimInstance -ClassName Win32_Processor | Select-Object Name, VirtualizationFirmwareEnabled
```
Expected output:
```
Name                                        VirtualizationFirmwareEnabled
----                                        -----------------------------
12th Gen Intel(R) Core(TM) i5-12450HX       True
```

---

## 4. Host Resource Safety Recommendation
Given that host visible RAM is ~11.71 GB and current free memory fluctuates near ~1.13 GB, allocating 4 GB (2 VMs x 2 GB) simultaneously without closing background browser/IDE applications would trigger severe page-swapping or OOM freeze. 
The dual-VM blueprint provides optimized 1024 MB - 2048 MB memory allocations with dynamic ballooning drivers, allowing isolated sequential testing or headless Vagrant execution.
