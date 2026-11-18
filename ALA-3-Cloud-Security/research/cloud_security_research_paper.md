# Comprehensive Review of Security Features in Cloud Computing Platforms
## A Comparative Architectural Study of AWS, Microsoft Azure, and Google Cloud Platform

**Author:** Herry Prajapati  
**Enrollment Number:** 20230905090031  
**Department:** Information Technology  
**Institution:** Gyanmanjari Institute of Technology (GMIU), Bhavnagar, Gujarat  
**Subject:** Cloud Computing (Academic Year 2026–2027)  
**Submission Deadline:** 30 November 2026  

---

## 1. Abstract
Cloud computing has fundamentally re-engineered enterprise information systems by delivering on-demand computing capacity, elastic resource virtualization, and multi-tenant consolidation. However, migrating sensitive proprietary data and compliance-bounded workloads to public cloud architectures introduces profound cybersecurity hazards. This academic review delivers an exhaustive comparative evaluation of security architectures across the three predominant cloud service providers: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). Focusing on AWS as the primary reference baseline, this paper examines the Shared Responsibility Model, Identity and Access Management (IAM), Role-Based Access Control (RBAC), the Principle of Least Privilege, cryptographic key lifecycle governance via Key Management Services (KMS), Envelope Encryption mechanics, network perimeter defenses, and threat intelligence. Furthermore, real-world case analyses of catastrophic cloud breaches (such as the Capital One SSRF metadata breach and exposed storage repositories) illustrate the critical necessity of proactive posture hardening and automated compliance auditing.

**Keywords:** Cloud Security, Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), Identity and Access Management (IAM), Envelope Encryption, Key Management Service (KMS), Zero-Trust Architecture, Principle of Least Privilege, Threat Detection.

---

## 2. Introduction
Modern enterprise infrastructure has shifted from static, on-premises perimeter computing toward distributed, multi-tenant cloud architectures. The National Institute of Standards and Technology (NIST SP 800-145) defines cloud computing through five essential characteristics: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service. 

While these characteristics offer unprecedented agile scalability, they simultaneously dissolve traditional network perimeters. Workloads are no longer protected by physical perimeter firewalls; rather, *Identity* has become the new perimeter. The Cloud Security Alliance (CSA) reports that over 80% of security incidents in cloud environments stem not from zero-day vulnerabilities in provider hypervisors, but from tenant misconfigurations, overly permissive IAM entitlements, and inadequate encryption key isolation.

---

## 3. Cloud Computing Security Fundamentals
Cloud security rests upon the foundational CIA Triad:
1. **Confidentiality:** Preventing unauthorized data disclosure through cryptographic encryption and fine-grained access policies.
2. **Integrity:** Ensuring data and configurations remain immutable against unauthorized alteration via digital signatures and cryptographic hashing.
3. **Availability:** Maintaining operational continuity against distributed denial-of-service (DDoS) events, physical hardware degradation, and regional outages.

---

## 4. The Shared Responsibility Model
Security in cloud environments is governed by the *Shared Responsibility Model*:
* **Security "OF" the Cloud (Provider Accountability):** Physical facility security, biometric access to server halls, hypervisor isolation, host firmware, and core global fiber networks.
* **Security "IN" the Cloud (Customer Accountability):** Customer IAM user lifecycles, role delegations, Multi-Factor Authentication (MFA), firewall rules (Security Groups / Network ACLs), operating system patches on IaaS instances, and client-side data encryption.

---

## 5. Cloud Security Architecture & Zero-Trust
Zero-Trust Architecture (ZTA), codified under NIST SP 800-207, dictates: **"Never Trust, Always Verify."** In a zero-trust cloud architecture:
* Every API invocation is treated as originating from an untrusted network.
* Authentication and authorization are calculated dynamically per-request.
* Ephemeral, session-bounded credentials supersede long-lived static API access keys.

---

## 6. Identity and Access Management (IAM)
IAM represents the primary control plane in AWS, Azure, and GCP. AWS IAM evaluates permissions deterministically using JSON policy documents:
* **Explicit Deny:** Overrides any allow statement.
* **Explicit Allow:** Permits the targeted action if no deny exists.
* **Implicit Deny:** The default state when no allow rule matches.

---

## 7. Role-Based Access Control (RBAC) & ABAC
* **RBAC:** Grants entitlements based on assigned business roles (e.g., `BillingAdministrator`, `DevOpsEngineer`).
* **Attribute-Based Access Control (ABAC):** Grants access dynamically based on tags (e.g., allow `s3:GetObject` only if `aws:PrincipalTag/Department == resource.Tag/Department`).

---

## 8. Multi-Factor Authentication (MFA)
MFA introduces defense-in-depth by requiring two or more distinct credential categories:
1. *Knowledge Factor:* Master password.
2. *Possession Factor:* FIDO2 hardware security keys (YubiKey) or Time-Based One-Time Password (TOTP) authenticators.
Enforcing MFA on root and administrative identities neutralizes over 99.2% of automated credential stuffing attacks.

---

## 9. Principle of Least Privilege (PoLP)
PoLP dictates that an identity must be provisioned with strictly the minimum set of permissions necessary to execute its designated task, and for no longer than required. Over-privileged IAM identities represent the most pervasive attack vector in cloud environments.

---

## 10. Data Protection: Encryption at Rest
Data at rest encompasses database volumes, block storage snapshots (AWS EBS), and object stores (AWS S3). Providers leverage the Advanced Encryption Standard with 256-bit symmetric keys (AES-256) operating in Galois/Counter Mode (GCM), providing both confidentiality and cryptographic integrity verification.

---

## 11. Data Protection: Encryption in Transit
Data traversing public networks and inter-data center fiber backbones is encrypted via Transport Layer Security (TLS 1.3), utilizing ephemeral Diffie-Hellman key exchanges (ECDHE) to deliver Perfect Forward Secrecy (PFS).

---

## 12. Key Management Services (KMS) & Envelope Encryption
Directly sending multiterabyte datasets to Key Management Services introduces severe network latency. Cloud platforms solve this through **Envelope Encryption**:
1. A Key Encryption Key (KEK) is securely generated and retained within FIPS 140-2 Level 3 Hardware Security Modules (HSMs).
2. The application requests a Data Encryption Key (DEK).
3. KMS issues a plaintext DEK and a ciphertext DEK (wrapped under the KEK).
4. The local application encrypts data with the plaintext DEK using AES-256.
5. The plaintext DEK is securely purged from host memory, while the encrypted DEK is attached to the ciphertext.

---

## 13. Comparative Platform Analysis: AWS vs Azure vs Google Cloud

| Dimension | Amazon Web Services (AWS) | Microsoft Azure | Google Cloud Platform (GCP) |
|---|---|---|---|
| **Identity Management** | AWS IAM (JSON Policies, SCPs, Permission Boundaries) | Microsoft Entra ID (RBAC, Conditional Access, PIM) | Cloud IAM (Predefined/Custom Roles, IAM Conditions) |
| **Key Management** | AWS KMS (Multi-region keys, CloudHSM Level 3) | Azure Key Vault (Managed HSM, Key Vault Access Policies) | Cloud KMS (Cloud EKM, Customer-Managed Keys CMEK) |
| **Audit Logging** | AWS CloudTrail & CloudWatch Logs | Azure Monitor & Log Analytics | Cloud Audit Logs (Admin, Data, Access) |
| **Threat Detection** | Amazon GuardDuty & AWS Security Hub | Microsoft Defender for Cloud & Microsoft Sentinel | Security Command Center (SCC) |
| **DDoS Protection** | AWS Shield Standard / Advanced & AWS WAF | Azure DDoS Protection & Azure Front Door WAF | Google Cloud Armor (ML Adaptive Protection) |
| **Network Security** | VPC, Security Groups (Stateful), NACLs (Stateless) | VNet, Network Security Groups, Azure Firewall | VPC, Firewall Rules (Stateful), Cloud NAT |

---

## 14. Real-World Security Incidents & Root-Cause Analyses

### Case Study A: Capital One SSRF Metadata Breach (2019)
* **Vector:** Misconfigured ModSecurity open-source WAF on an AWS EC2 instance.
* **Mechanism:** Server-Side Request Forgery (SSRF) allowed the attacker to reach the EC2 instance metadata service IP (`169.254.169.254`) and exfiltrate temporary IAM role session tokens with broad read access across 700+ S3 buckets.
* **Mitigation:** Mandating Instance Metadata Service Version 2 (IMDSv2), which requires session-oriented PUT tokens, and applying IAM permission boundaries.

### Case Study B: Exposed Cloud Storage Buckets (Uber & Accenture Leaks)
* **Vector:** Public read permissions configured on Amazon S3 buckets containing database backups and access credentials.
* **Mitigation:** Enforcing AWS S3 *Block Public Access* at the AWS Organizations root level and deploying automated Config rules to remediate exposed buckets.

---

## 15. Cloud Security Best Practices & Hardening Recommendations
1. Eliminate permanent access keys; mandate AWS IAM Identity Center and temporary STS credentials.
2. Implement Envelope Encryption using Customer Managed Keys (CMKs) with annual key rotation.
3. Enforce SCPs prohibiting public S3 buckets across all member accounts.
4. Enable multi-region CloudTrail trails with log file validation and immutable S3 Object Lock.
5. Conduct continuous posture scans using CIS Cloud Benchmarks.

---

## 16. Conclusion
Security in cloud computing is an active, continuous discipline requiring the tight synthesis of cryptographic controls, identity governance, and automated telemetry. As multi-cloud architectures become standard, organizations must adopt uniform zero-trust standards to ensure verifiable confidentiality, system resilience, and regulatory compliance.

---

## 17. References
1. National Institute of Standards and Technology (NIST). (2011). *The NIST Definition of Cloud Computing*. NIST Special Publication 800-145.
2. Amazon Web Services. (2026). *AWS Security Best Practices & Well-Architected Framework*.
3. Center for Internet Security (CIS). (2026). *CIS Amazon Web Services Foundations Benchmark v3.0*.
4. Microsoft Corporation. (2026). *Microsoft Azure Security Benchmark (ASB) v3*.
5. Google Cloud. (2026). *Google Cloud Security Foundations Blueprint*.
