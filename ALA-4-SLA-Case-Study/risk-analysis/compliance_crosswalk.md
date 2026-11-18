# Cloud Regulatory Compliance & Standards Crosswalk

**Author:** Herry Prajapati (Enrollment: 20230905090031)  
**Institution:** Gyanmanjari Institute of Technology (GMIU)  
**Subject:** Cloud Computing (ALA 4)  

---

## 1. Compliance Framework Objectives & Cloud Applicability

| Standard / Framework | Regulatory Scope | Cloud Customer Responsibility | Cloud Provider Attestation | Key AWS / Azure / GCP Tooling |
| :--- | :--- | :--- | :--- | :--- |
| **ISO/IEC 27001:2022** | Information Security Management System (ISMS) | Data classification, access control policies, encryption key management | Data center physical security, hypervisor patching, infrastructure audit | AWS Artifact, Azure Compliance Manager, GCP Compliance Reports |
| **SOC 2 Type II** | Trust Services Criteria (Security, Availability, Confidentiality, Processing Integrity, Privacy) | Configuration hardening, monitoring alerts, incident response SLAs | Multi-tenant hypervisor isolation, employee background checks | AWS Security Hub, Microsoft Defender for Cloud, Google Security Command Center |
| **HIPAA (HITECH)** | Protected Health Information (PHI) in healthcare systems | BAA signing, encryption at rest/in transit, audit logging retention | Physical data custody, secure hardware disposal | CloudTrail, Azure Activity Log, Cloud Audit Logs |
| **GDPR (EU 2016/679)** | General Data Protection Regulation (EU citizen privacy) | Right to erasure, explicit consent capture, residency enforcement | Standard Contractual Clauses (SCCs), regional data boundary enforcement | AWS EU Data Boundary, Azure Sovereignty, Google Data Residency controls |

---

## 2. Risk Mitigation Matrix

1. **Vendor Lock-In (Risk Score: 16 - High):**
   - *Mitigation:* Decouple compute logic using containerization (Docker, OCI standards, Kubernetes) and multi-cloud database drivers (PostgreSQL on Supabase or AWS Aurora compatible).
2. **Data Residency / Sovereignty Breach (Risk Score: 15 - High):**
   - *Mitigation:* Apply strict IAM region policies (`aws:RequestedRegion` condition keys or GCP resource location constraints) preventing data ingestion outside designated territories.
3. **Cascading Microservice Outage (Risk Score: 20 - Critical):**
   - *Mitigation:* Implement Resilience4j / Envoy circuit breakers, exponential backoff retries, and cross-AZ redundant read replicas.
