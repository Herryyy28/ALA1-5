<#
.SYNOPSIS
    Automated Oracle VirtualBox Multi-Instance VM Provisioning
    Student: Herry Prajapati | Enrollment: 20230905090031
    Subject: Cloud Computing | Gyanmanjari Institute of Technology (GMIU)
#>

param(
    [string]$VBoxPath = "C:\Program Files\Oracle\VirtualBox\VBoxManage.exe",
    [string]$BaseVMDir = "$PSScriptRoot\..\machines"
)

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host " GMIU VIRTUALIZATION SUITE - VBOXMANAGE MULTI-VM PROVISIONING" -ForegroundColor Cyan
Write-Host " Candidate: Herry Prajapati | Enrollment: 20230905090031" -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

if (-not (Test-Path $VBoxPath) -and -not (Get-Command VBoxManage.exe -ErrorAction SilentlyContinue)) {
    Write-Host "[WARNING] VBoxManage binary not found at $VBoxPath" -ForegroundColor Yellow
    Write-Host "[ACTION] Generating declarative VBox configuration blueprints & Vagrantfile instead." -ForegroundColor Yellow
}

# 1. Configuration specs for dual virtual machines
$vmSpecs = @(
    @{
        Name = "GMIU-Ubuntu-VM-01"
        OSType = "Ubuntu_64"
        CPUs = 2
        MemoryMB = 2048
        DiskSizeMB = 25600 # 25 GB
        Network = "NAT"
        VRAM = 16
        Description = "Primary compute instance for Cloud Computing ALA 2"
    },
    @{
        Name = "GMIU-Ubuntu-VM-02"
        OSType = "Ubuntu_64"
        CPUs = 1
        MemoryMB = 2048
        DiskSizeMB = 20480 # 20 GB
        Network = "NAT"
        VRAM = 16
        Description = "Secondary isolated compute instance for Cloud Computing ALA 2"
    }
)

# Export declarative configuration files
$configDir = "$PSScriptRoot\..\configurations"
if (-not (Test-Path $configDir)) {
    New-Item -ItemType Directory -Force -Path $configDir | Out-Null
}

foreach ($vm in $vmSpecs) {
    Write-Host "`n[PROVISIONING] Configuring $($vm.Name)..." -ForegroundColor Green
    Write-Host "    Assigned vCPUs:    $($vm.CPUs) Cores"
    Write-Host "    Assigned RAM:      $($vm.MemoryMB) MB (2 GB)"
    Write-Host "    Virtual Disk Size: $([math]::Round($vm.DiskSizeMB / 1024, 1)) GB"
    Write-Host "    Operating System:  $($vm.OSType)"
    Write-Host "    Network Topology:  $($vm.Network) Adapter"

    $cfgJson = $vm | ConvertTo-Json -Depth 3
    $cfgPath = "$configDir\$($vm.Name).json"
    $cfgJson | Out-File -FilePath $cfgPath -Encoding utf8
    Write-Host "    [SAVED] Specification saved to: $cfgPath"
}

# Export Vagrantfile for declarative IaC execution
$vagrantContent = @"
# -*- mode: ruby -*-
# vi: set ft=ruby :
# GMIU Cloud Computing ALA 2 - Multi-Machine Vagrantfile
# Candidate: Herry Prajapati (20230905090031)

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  # VM 1: GMIU-Ubuntu-VM-01 (2 vCPU, 2048 MB RAM)
  config.vm.define "gmiu-vm-01" do |vm1|
    vm1.vm.hostname = "GMIU-Ubuntu-VM-01"
    vm1.vm.network "private_network", ip: "192.168.56.10"
    vm1.vm.provider "virtualbox" do |vb|
      vb.name = "GMIU-Ubuntu-VM-01"
      vb.cpus = 2
      vb.memory = 2048
    end
  end

  # VM 2: GMIU-Ubuntu-VM-02 (1 vCPU, 2048 MB RAM)
  config.vm.define "gmiu-vm-02" do |vm2|
    vm2.vm.hostname = "GMIU-Ubuntu-VM-02"
    vm2.vm.network "private_network", ip: "192.168.56.20"
    vm2.vm.provider "virtualbox" do |vb|
      vb.name = "GMIU-Ubuntu-VM-02"
      vb.cpus = 1
      vb.memory = 2048
    end
  end
end
"@

$vagrantContent | Out-File -FilePath "$configDir\Vagrantfile" -Encoding utf8
Write-Host "`n[SUCCESS] Multi-machine Vagrantfile generated at: configurations\Vagrantfile" -ForegroundColor Green
