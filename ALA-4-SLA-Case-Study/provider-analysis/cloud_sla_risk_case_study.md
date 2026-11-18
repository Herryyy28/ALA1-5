# Comparative Case Study of AWS, Microsoft Azure and Google Cloud: SLA, Risk Management and Compliance

**Author:** Herry Prajapati  
**Enrollment Number:** 20230905090031  
**Department:** Information Technology  
**University:** Gyanmanjari Institute of Technology (GMIU)  
**Subject:** Cloud Computing (Academic Year 2026–2027)  
**Submission Deadline:** 30 November 2026  

---

## 1. Executive Summary
A Service Level Agreement (SLA) is a legally binding contractual document between a Cloud Service Provider (CSP) and an enterprise tenant defining availability standards, uptime measurement methodologies, service exclusion boundaries, and financial remediation schedules. This case study delivers a rigorous comparative analysis of contractual SLAs, operational risk profiles, and international compliance frameworks across Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). The analysis highlights critical discrepancies between marketed availability percentages and contractual financial credit limits, demonstrating why high-availability multi-region architectures are necessary to guarantee business resilience.

---

## 2. Global Infrastructure & Cloud Service Provider Profiles

### Amazon Web Services (AWS)
* **Global Footprint:** Over 105 Availability Zones across 33 geographic regions.
* **Architecture:** Multi-AZ design where each AZ consists of one or more physically discrete data centers equipped with independent power, cooling, and physical security.

### Microsoft Azure
* **Global Footprint:** Over 60 regions worldwide connected by 175,000+ miles of enterprise fiber.
* **Architecture:** Regional pairs separated by at least 300 miles to prevent concurrent natural disaster impact, with Availability Zones within selected primary regions.

### Google Cloud Platform (GCP)
* **Global Footprint:** 40 regions, 121 zones, and 187 network edge locations.
* **Architecture:** High-speed private software-defined global network (Jupiter fabric) separating internal inter-region traffic from the public internet.

---

## 3. SLA Availability Commitments & Uptime Analysis

| Service Category | AWS SLA Commitment | Azure SLA Commitment | Google Cloud SLA Commitment |
|---|---|---|---|
| **Multi-AZ Virtual Compute** | 99.99% (Amazon EC2 Multi-AZ) | 99.99% (Azure VMs Multi-AZ) | 99.99% (Compute Engine Multi-Zone) |
| **Single-Instance VM** | 99.50% (EC2 Single Instance) | 99.90% (Azure VM with Premium SSD) | 99.50% (Compute Engine Single Instance) |
| **Object Storage** | 99.90% Availability (S3 Standard) | 99.90% Availability (Azure Blob Hot/GRS) | 99.95% Availability (Cloud Storage Multi-Region) |
| **Managed Relational DB** | 99.95% (Amazon RDS Multi-AZ) | 99.995% (Azure SQL DB Business Critical) | 99.95% (Cloud SQL High Availability) |

---

## 4. Downtime Calculations Across Availability Tiers (30-Day Month = 43,200 Minutes)

| Availability Percentage | Maximum Permitted Monthly Outage | Maximum Permitted Annual Outage | Industry Classification |
|---|---|---|---|
| **99.0% ("Two Nines")** | 432.0 minutes (7.2 hours) | 87.6 hours (3.65 days) | Batch / Non-critical dev environments |
| **99.9% ("Three Nines")** | 43.2 minutes | 8.76 hours | Standard web applications |
| **99.95%** | 21.6 minutes | 4.38 hours | Standard database / storage tiers |
| **99.99% ("Four Nines")** | 4.32 minutes | 52.56 minutes | Enterprise mission-critical production |
| **99.999% ("Five Nines")** | 25.9 seconds | 5.26 minutes | Carrier-grade telecom / financial cores |

---

## 5. Service Credit Compensation Schedules & Claim Procedures

### Financial Compensation Reality
Cloud SLAs exclusively compensate tenants via **Service Credits** applied toward future monthly invoices. Cloud providers explicitly disclaim liability for lost revenue, data corruption, reputation damage, or consequential commercial losses.

### Provider Credit Tier Schedules
* **AWS:**
  * Monthly Uptime < 99.99% but ≥ 99.0%: **10% Service Credit**
  * Monthly Uptime < 99.0% but ≥ 95.0%: **30% Service Credit**
  * Monthly Uptime < 95.0%: **100% Service Credit**
* **Microsoft Azure:**
  * Monthly Uptime < 99.99% but ≥ 99.0%: **10% Service Credit**
  * Monthly Uptime < 99.0%: **25% Service Credit**
* **Google Cloud Platform:**
  * Monthly Uptime < 99.99% but ≥ 99.0%: **10% Financial Credit**
  * Monthly Uptime < 99.0% but ≥ 95.0%: **25% Financial Credit**
  * Monthly Uptime < 95.0%: **50% Financial Credit**

### SLA Exclusions
SLAs explicitly exclude downtime caused by:
1. Scheduled maintenance announced in advance.
2. Customer network or DNS misconfigurations.
3. Unthrottled traffic exceeding provisioned quotas.
4. Acts of Force Majeure (war, natural disasters, national fiber severance).

---

## 6. Multi-Cloud 5x5 Operational Risk Assessment Matrix

| Risk ID | Hazard Description | Likelihood (1-5) | Consequence (1-5) | Risk Score (LxC) | Mitigation Strategy |
|---|---|---|---|---|---|
| **R-01** | Regional Cloud Outage | 2 | 5 | **10 (High)** | Multi-Region Active-Active deployment with Route 53 DNS Failover |
| **R-02** | S3 / Blob Storage Data Loss | 1 | 5 | **5 (Medium)** | Cross-Region Replication (CRR) + S3 Versioning + Object Lock |
| **R-03** | Credential Exposure / Account Compromise | 3 | 5 | **15 (Critical)** | Mandatory FIDO2 MFA, IAM Identity Center, zero permanent access keys |
| **R-04** | Distributed Denial of Service (DDoS) | 4 | 3 | **12 (High)** | Cloud Armor / AWS Shield Advanced + Anycast CloudFront Edge CDN |
| **R-05** | Vendor Lock-in & Egress Penalty | 4 | 3 | **12 (High)** | Containerized microservices (Docker/Kubernetes), Terraform IaC |
| **R-06** | Regulatory Non-Compliance (GDPR) | 2 | 5 | **10 (High)** | Data residency guardrails via AWS Control Tower SCPs |

---

## 7. Global Compliance Framework Harmonization

* **ISO/IEC 27001:2022:** Standard for Information Security Management Systems (ISMS). All three providers undergo annual third-party surveillance audits.
* **SOC 2 Type II:** Independent audit reports verifying Security, Availability, and Confidentiality trust service criteria over a minimum 6-month observation window.
* **GDPR (General Data Protection Regulation):** Mandates sovereign data residency within the European Economic Area (EEA), cryptographic erasure, and 72-hour breach notification protocols.

---

## 8. Strategic Recommendations for Enterprise SLA Governance
1. **Never Rely on a Single Availability Zone:** Single-instance workloads carry permitted downtime exceeding 43 minutes each month.
2. **Implement Composite SLA Calculations:** Combining two independent 99.9% services in series yields an overall availability of 99.8% (0.999 * 0.999). To achieve five nines, services must be arranged in redundant parallel architectures ($1 - (1-0.999)^2 = 99.9999\%$).
3. **Automate SLA Telemetry Auditing:** Deploy independent external monitoring probes (e.g., Datadog, Prometheus Synthetics) to log outage durations independently from provider status dashboards.

---

## 9. Conclusion
While AWS, Azure, and Google Cloud offer world-class infrastructure backed by formal SLAs, contractual service credits provide minimal commercial restitution in the event of major outages. Enterprises must proactively architect fault-tolerant, multi-AZ systems, enforce automated backup strategies, and conduct periodic disaster recovery simulations to achieve true operational resilience.

---

## 10. References
1. Amazon Web Services. (2026). *Amazon EC2 Service Level Agreement*. AWS Documentation.
2. Microsoft Corporation. (2026). *Service Level Agreements (SLA) for Microsoft Online Services*.
3. Google Cloud. (2026). *Google Cloud Platform Service Level Agreements (Compute & Storage)*.
4. International Organization for Standardization. (2022). *ISO/IEC 27001:2022 Information Security Management*.
5. American Institute of CPAs (AICPA). (2026). *SOC 2 - Trust Services Criteria*.
