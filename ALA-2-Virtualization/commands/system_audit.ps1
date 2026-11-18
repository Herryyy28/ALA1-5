<#
.SYNOPSIS
    GMIU Cloud Computing Practical Suite - ALA 2 Host Hardware & Virtualization Audit
    Student: Herry Prajapati | Enrollment: 20230905090031
    Subject: Cloud Computing | Department of IT | GMIU
#>

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host " GMIU CLOUD COMPUTING SUITE - ALA 2 SYSTEM HARDWARE AUDIT" -ForegroundColor Cyan
Write-Host " Candidate: Herry Prajapati | Enrollment: 20230905090031" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

# 1. Host Operating System
$os = Get-CimInstance Win32_OperatingSystem
$osName = $os.Caption
$osVersion = $os.Version
$osArch = $os.OSArchitecture
$totalMemGb = [math]::Round($os.TotalVisibleMemorySize / 1MB, 2)
$freeMemGb = [math]::Round($os.FreePhysicalMemory / 1MB, 2)

# 2. Processor Architecture
$cpu = Get-CimInstance Win32_Processor
$cpuName = $cpu.Name
$physicalCores = $cpu.NumberOfCores
$logicalCores = $cpu.NumberOfLogicalProcessors
$vtxState = $cpu.VirtualizationFirmwareEnabled

# 3. Disk Storage
$disks = Get-PSDrive -PSProvider FileSystem | Select-Object Name, @{Name="FreeGB";Expression={[math]::Round($_.Free / 1GB, 2)}}, @{Name="UsedGB";Expression={[math]::Round($_.Used / 1GB, 2)}}

# 4. VirtualBox Hypervisor Check
$vboxInstalled = $false
$vboxPath = ""
if (Get-Command VBoxManage.exe -ErrorAction SilentlyContinue) {
    $vboxInstalled = $true
    $vboxPath = (Get-Command VBoxManage.exe).Source
} elseif (Test-Path "C:\Program Files\Oracle\VirtualBox\VBoxManage.exe") {
    $vboxInstalled = $true
    $vboxPath = "C:\Program Files\Oracle\VirtualBox\VBoxManage.exe"
}

Write-Host "`n[1] HOST OPERATING SYSTEM & WORKSTATION:" -ForegroundColor Yellow
Write-Host "    Operating System: $osName ($osArch)"
Write-Host "    Kernel Version:   $osVersion"
Write-Host "    Total Physical Memory: $totalMemGb GB"
Write-Host "    Free Physical Memory:  $freeMemGb GB"

Write-Host "`n[2] PROCESSOR & HARDWARE-ASSISTED VIRTUALIZATION:" -ForegroundColor Yellow
Write-Host "    Processor Model:  $cpuName"
Write-Host "    Physical Cores:   $physicalCores"
Write-Host "    Logical Threads:  $logicalCores"
Write-Host "    Firmware VT-x:    $vtxState"
if (-not $vtxState) {
    Write-Host "    [NOTICE] Hardware VT-x is disabled in motherboard UEFI firmware." -ForegroundColor DarkYellow
    Write-Host "             Safe alternative provisioning scripts & BIOS guide included." -ForegroundColor DarkYellow
}

Write-Host "`n[3] STORAGE VOLUMES & CAPACITY:" -ForegroundColor Yellow
foreach ($d in $disks) {
    Write-Host "    Drive $($d.Name): Free: $($d.FreeGB) GB | Used: $($d.UsedGB) GB"
}

Write-Host "`n[4] HYPERVISOR INSTALLATION STATUS:" -ForegroundColor Yellow
Write-Host "    Oracle VirtualBox Installed: $vboxInstalled"
if ($vboxInstalled) {
    Write-Host "    Binary Location: $vboxPath"
} else {
    Write-Host "    [ACTION] Oracle VirtualBox can be installed via: winget install Oracle.VirtualBox"
}

# Export empirical evidence JSON
$evidenceDir = "$PSScriptRoot\..\..\evidence\ALA-2"
if (-not (Test-Path $evidenceDir)) {
    New-Item -ItemType Directory -Force -Path $evidenceDir | Out-Null
}

$auditData = [PSCustomObject]@{
    StudentName = "Herry Prajapati"
    EnrollmentNumber = "20230905090031"
    AuditTimestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
    HostOS = "$osName ($osArch, Version: $osVersion)"
    TotalMemoryGB = $totalMemGb
    FreeMemoryGB = $freeMemGb
    Processor = $cpuName
    PhysicalCores = $physicalCores
    LogicalProcessors = $logicalCores
    VirtualizationFirmwareEnabled = $vtxState
    VirtualBoxInstalled = $vboxInstalled
    VirtualBoxPath = $vboxPath
    StorageDrives = $disks
}

$auditData | ConvertTo-Json -Depth 4 | Out-File -FilePath "$evidenceDir\hardware_audit_report.json" -Encoding utf8
Write-Host "`n[SUCCESS] Empirical audit evidence saved to: evidence\ALA-2\hardware_audit_report.json" -ForegroundColor Green
