#!/usr/bin/env python3
"""
GMIU Cloud Computing Practical Suite - SVG Architecture Diagram Generator
Candidate: Herry Prajapati | Enrollment: 20230905090031
Department of IT | Gyanmanjari Institute of Technology (GMIU)
"""

import os

PRIMARY = "#263B80"
SECONDARY = "#5269C9"
BG = "#F7F8FC"
DARK = "#172033"

def create_svg_ala1():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="100%" height="100%">
  <rect width="800" height="400" fill="{BG}" rx="16"/>
  <rect x="0" y="0" width="800" height="40" fill="{PRIMARY}" rx="16"/>
  <text x="400" y="26" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">ALA 1: Cloud Application Deployment Architecture</text>
  
  <!-- Client Tier -->
  <rect x="40" y="160" width="160" height="90" fill="#FFFFFF" stroke="#E8EAF2" stroke-width="2" rx="10"/>
  <text x="120" y="195" fill="{DARK}" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">Client Tier</text>
  <text x="120" y="215" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">React 18 / TypeScript SPA</text>
  <text x="120" y="230" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Herry Prajapati (20230905090031)</text>

  <!-- Arrow 1 -->
  <path d="M 200 205 L 280 205" stroke="{SECONDARY}" stroke-width="3" fill="none" marker-end="url(#arrow)"/>

  <!-- Netlify Edge CDN -->
  <rect x="290" y="140" width="180" height="130" fill="#FFFFFF" stroke="{PRIMARY}" stroke-width="2" rx="10"/>
  <text x="380" y="175" fill="{PRIMARY}" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">Netlify Edge CDN</text>
  <text x="380" y="195" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Global Anycast Routing</text>
  <text x="380" y="210" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">TLS 1.3 Termination</text>
  <text x="380" y="225" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Brotli / Gzip Cache</text>
  <text x="380" y="240" fill="#16865B" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle">cosmic-gingersnap-82f0a9</text>

  <!-- Arrow 2 -->
  <path d="M 470 205 L 550 205" stroke="{SECONDARY}" stroke-width="3" fill="none"/>

  <!-- Supabase PostgreSQL -->
  <rect x="560" y="140" width="200" height="130" fill="#FFFFFF" stroke="#16865B" stroke-width="2" rx="10"/>
  <text x="660" y="175" fill="#16865B" font-family="sans-serif" font-weight="bold" font-size="13" text-anchor="middle">Supabase PostgreSQL 15</text>
  <text x="660" y="195" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Row Level Security (RLS)</text>
  <text x="660" y="210" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Student Isolation</text>
  <text x="660" y="225" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">96 IT Student Registry</text>
  <text x="660" y="240" fill="{DARK}" font-family="sans-serif" font-size="10" text-anchor="middle">PostgREST API / Webhooks</text>

  <!-- Footer label -->
  <text x="400" y="360" fill="#778198" font-family="sans-serif" font-size="11" text-anchor="middle">Gyanmanjari Institute of Technology &bull; Cloud Computing 2026-2027</text>
</svg>"""

def create_svg_ala2():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="100%" height="100%">
  <rect width="800" height="400" fill="{BG}" rx="16"/>
  <rect x="0" y="0" width="800" height="40" fill="{PRIMARY}" rx="16"/>
  <text x="400" y="26" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">ALA 2: Oracle VirtualBox Multi-VM Architecture</text>
  
  <!-- Host Layer -->
  <rect x="50" y="290" width="700" height="60" fill="{DARK}" rx="8"/>
  <text x="400" y="325" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Host Hardware: 12th Gen Intel Core i5-12450HX (8C/12T) &bull; 12.0 GB RAM &bull; Windows 11 Home 64-bit</text>

  <!-- Hypervisor Layer -->
  <rect x="50" y="210" width="700" height="50" fill="{PRIMARY}" rx="8"/>
  <text x="400" y="240" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Type-2 Hypervisor: Oracle VirtualBox 7.x (Virtual Machine Monitor / VMM)</text>

  <!-- Guest VM 1 -->
  <rect x="80" y="70" width="300" height="110" fill="#FFFFFF" stroke="{SECONDARY}" stroke-width="2" rx="10"/>
  <text x="230" y="100" fill="{PRIMARY}" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">GMIU-Ubuntu-VM-01</text>
  <text x="230" y="120" fill="#56627A" font-family="sans-serif" font-size="10" text-anchor="middle">vCPU: 2 Cores | RAM: 2048 MB (2 GB)</text>
  <text x="230" y="135" fill="#56627A" font-family="sans-serif" font-size="10" text-anchor="middle">Storage: 25.0 GB Dynamic VDI</text>
  <text x="230" y="150" fill="#16865B" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle">NAT IP: 10.0.2.15/24</text>

  <!-- Guest VM 2 -->
  <rect x="420" y="70" width="300" height="110" fill="#FFFFFF" stroke="{SECONDARY}" stroke-width="2" rx="10"/>
  <text x="570" y="100" fill="{PRIMARY}" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">GMIU-Ubuntu-VM-02</text>
  <text x="570" y="120" fill="#56627A" font-family="sans-serif" font-size="10" text-anchor="middle">vCPU: 1 Core | RAM: 2048 MB (2 GB)</text>
  <text x="570" y="135" fill="#56627A" font-family="sans-serif" font-size="10" text-anchor="middle">Storage: 20.0 GB Dynamic VDI</text>
  <text x="570" y="150" fill="#16865B" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle">NAT IP: 10.0.2.16/24</text>
</svg>"""

def create_svg_ala3():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="100%" height="100%">
  <rect width="800" height="400" fill="{BG}" rx="16"/>
  <rect x="0" y="0" width="800" height="40" fill="{PRIMARY}" rx="16"/>
  <text x="400" y="26" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">ALA 3: Zero-Trust IAM & KMS Envelope Encryption</text>
  
  <!-- Identity -->
  <rect x="40" y="140" width="150" height="110" fill="#FFFFFF" stroke="{SECONDARY}" stroke-width="2" rx="8"/>
  <text x="115" y="175" fill="{PRIMARY}" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">IAM Identity</text>
  <text x="115" y="195" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Least Privilege Role</text>
  <text x="115" y="210" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">FIDO2 MFA Required</text>

  <!-- KMS HSM -->
  <rect x="250" y="100" width="220" height="190" fill="#FFFFFF" stroke="{PRIMARY}" stroke-width="2" rx="8"/>
  <text x="360" y="130" fill="{PRIMARY}" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Cloud KMS (FIPS 140-2 L3)</text>
  <text x="360" y="150" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Master Key (KEK)</text>
  <rect x="270" y="170" width="180" height="50" fill="#F7F8FC" stroke="#E8EAF2" rx="6"/>
  <text x="360" y="190" fill="{DARK}" font-family="sans-serif" font-size="9" text-anchor="middle">GenerateDataKey API</text>
  <text x="360" y="205" fill="#16865B" font-family="sans-serif" font-size="9" text-anchor="middle">Plaintext DEK + Ciphertext DEK</text>
  <text x="360" y="250" fill="#D94D59" font-family="sans-serif" font-size="9" text-anchor="middle">Plaintext DEK Purged from RAM</text>

  <!-- Storage -->
  <rect x="530" y="140" width="220" height="110" fill="#FFFFFF" stroke="#16865B" stroke-width="2" rx="8"/>
  <text x="640" y="175" fill="#16865B" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Encrypted Storage at Rest</text>
  <text x="640" y="195" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">AES-256-GCM Ciphertext</text>
  <text x="640" y="210" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">+ Wrapped Data Encryption Key</text>
</svg>"""

def create_svg_ala4():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="100%" height="100%">
  <rect width="800" height="400" fill="{BG}" rx="16"/>
  <rect x="0" y="0" width="800" height="40" fill="{PRIMARY}" rx="16"/>
  <text x="400" y="26" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">ALA 4: Multi-Region High-Availability & SLA Architecture</text>
  
  <!-- Global DNS -->
  <rect x="250" y="60" width="300" height="60" fill="{PRIMARY}" rx="8"/>
  <text x="400" y="88" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Global Anycast DNS (Route 53 / Traffic Manager)</text>
  <text x="400" y="105" fill="#CBD2E1" font-family="sans-serif" font-size="9" text-anchor="middle">Health Checking & Automatic Failover</text>

  <!-- Region 1 -->
  <rect x="60" y="170" width="310" height="150" fill="#FFFFFF" stroke="{SECONDARY}" stroke-width="2" rx="10"/>
  <text x="215" y="198" fill="{PRIMARY}" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Primary Region: Mumbai (Active)</text>
  <text x="215" y="218" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Multi-AZ EC2 Auto-Scaled (99.99%)</text>
  <text x="215" y="235" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Amazon RDS Multi-AZ Primary (99.95%)</text>
  <text x="215" y="260" fill="#16865B" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle">SLA: 99.99% Availability</text>

  <!-- Region 2 -->
  <rect x="430" y="170" width="310" height="150" fill="#FFFFFF" stroke="#8065D9" stroke-width="2" rx="10"/>
  <text x="585" y="198" fill="#8065D9" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Standby Region: Singapore (Warm DR)</text>
  <text x="585" y="218" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Cross-Region Storage Replication</text>
  <text x="585" y="235" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Read Replica DB (RPO &lt; 1 min)</text>
  <text x="585" y="260" fill="{PRIMARY}" font-family="sans-serif" font-weight="bold" font-size="10" text-anchor="middle">Composite SLA: 99.9999% Five-Nines</text>
</svg>"""

def create_svg_ala5():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="100%" height="100%">
  <rect width="800" height="400" fill="{BG}" rx="16"/>
  <rect x="0" y="0" width="800" height="40" fill="{PRIMARY}" rx="16"/>
  <text x="400" y="26" fill="#FFFFFF" font-family="sans-serif" font-weight="bold" font-size="14" text-anchor="middle">ALA 5: Layer 7 Load Balancing & Auto-Scaling Topology</text>
  
  <!-- Locust -->
  <rect x="40" y="140" width="150" height="120" fill="#FFFFFF" stroke="{SECONDARY}" stroke-width="2" rx="8"/>
  <text x="115" y="175" fill="{PRIMARY}" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Locust Load Tester</text>
  <text x="115" y="195" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">10 Users (Low Load)</text>
  <text x="115" y="210" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">50 Users (Med Load)</text>
  <text x="115" y="225" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">100 Users (High Load)</text>

  <!-- Load Balancer -->
  <rect x="250" y="130" width="180" height="140" fill="#FFFFFF" stroke="{PRIMARY}" stroke-width="2" rx="8"/>
  <text x="340" y="165" fill="{PRIMARY}" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Layer 7 Load Balancer</text>
  <text x="340" y="185" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Round Robin</text>
  <text x="340" y="200" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Least Connections</text>
  <text x="340" y="215" fill="#778198" font-family="sans-serif" font-size="10" text-anchor="middle">Health Probing (200 OK)</text>

  <!-- Worker Fleet -->
  <rect x="490" y="100" width="260" height="200" fill="#FFFFFF" stroke="#16865B" stroke-width="2" rx="8"/>
  <text x="620" y="130" fill="#16865B" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Auto-Scaling Fleet (ASG)</text>
  <rect x="510" y="145" width="220" height="30" fill="#F7F8FC" stroke="#E8EAF2" rx="4"/>
  <text x="620" y="165" fill="{DARK}" font-family="sans-serif" font-size="9" text-anchor="middle">Node 01: 30.7 RPS (CPU: 14.8%)</text>
  <rect x="510" y="185" width="220" height="30" fill="#F7F8FC" stroke="#E8EAF2" rx="4"/>
  <text x="620" y="205" fill="{DARK}" font-family="sans-serif" font-size="9" text-anchor="middle">Node 02: 144.8 RPS (CPU: 41.5%)</text>
  <rect x="510" y="225" width="220" height="30" fill="#F7F8FC" stroke="#E8EAF2" rx="4"/>
  <text x="620" y="245" fill="{DARK}" font-family="sans-serif" font-size="9" text-anchor="middle">Node 03: 273.6 RPS (CPU: 78.4%) [Auto-Scaled]</text>
</svg>"""

if __name__ == '__main__':
    os.makedirs('diagrams', exist_ok=True)
    with open('diagrams/ALA1_deployment_architecture.svg', 'w') as f:
        f.write(create_svg_ala1())
    with open('diagrams/ALA2_hypervisor_topology.svg', 'w') as f:
        f.write(create_svg_ala2())
    with open('diagrams/ALA3_kms_envelope_flow.svg', 'w') as f:
        f.write(create_svg_ala3())
    with open('diagrams/ALA4_multi_cloud_sla.svg', 'w') as f:
        f.write(create_svg_ala4())
    with open('diagrams/ALA5_load_balancing_autoscale.svg', 'w') as f:
        f.write(create_svg_ala5())
    print("Generated 5 SVG diagrams in diagrams/")
