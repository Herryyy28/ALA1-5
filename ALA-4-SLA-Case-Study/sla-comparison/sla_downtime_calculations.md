# ALA 4: Multi-Cloud SLA Availability & Downtime Mathematical Analysis

**Author:** Herry Prajapati (Enrollment: 20230905090031)  
**Institution:** Gyanmanjari Institute of Technology (GMIU)  
**Subject:** Cloud Computing (ALA 4)  

---

## 1. SLA Availability Percentage vs Allowed Downtime Equations

The contractual Monthly Uptime Percentage is defined as:
$$\text{Uptime \%} = \frac{\text{Total Minutes in Month} - \text{Downtime Minutes}}{\text{Total Minutes in Month}} \times 100$$

Conversely, maximum permissible downtime $T_{\text{down}}$ for a given availability percentage $A$ over period $T_{\text{total}}$ is:
$$T_{\text{down}} = T_{\text{total}} \times (1 - A)$$

---

## 2. Quantitative Permissible Downtime Schedule

| Availability ("Nines") | Percentage | Downtime / Year | Downtime / Quarter | Downtime / Month (30d) | Downtime / Week | Downtime / Day |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **One Nine** | 90.0% | 36.52 days | 9.13 days | 3.00 days | 16.80 hours | 2.40 hours |
| **Two Nines** | 99.0% | 3.65 days | 21.91 hours | 7.20 hours | 1.68 hours | 14.40 mins |
| **Two Nines Five** | 99.5% | 1.83 days | 10.96 hours | 3.60 hours | 50.40 mins | 7.20 mins |
| **Three Nines** | 99.9% | 8.77 hours | 2.19 hours | 43.83 mins | 10.08 mins | 1.44 mins |
| **Three Nines Five** | 99.95% | 4.38 hours | 1.10 hours | 21.91 mins | 5.04 mins | 43.20 secs |
| **Four Nines** | 99.99% | 52.60 mins | 13.15 mins | 4.38 mins | 1.01 mins | 8.64 secs |
| **Four Nines Five** | 99.995% | 26.30 mins | 6.57 mins | 2.19 mins | 30.24 secs | 4.32 secs |
| **Five Nines** | 99.999% | 5.26 mins | 1.31 mins | 26.30 secs | 6.05 secs | 0.86 secs |

---

## 3. Provider Contractual Service Credit Tier Comparison

### A. AWS EC2 (Multi-AZ Deployment)
- Monthly Uptime `< 99.99%` but `>= 99.0%`: **10% Service Credit**
- Monthly Uptime `< 99.0%` but `>= 95.0%`: **25% Service Credit**
- Monthly Uptime `< 95.0%`: **100% Service Credit**

### B. Microsoft Azure Virtual Machines (Multi-AZ Deployment)
- Monthly Uptime `< 99.99%` but `>= 99.0%`: **10% Service Credit**
- Monthly Uptime `< 99.0%` but `>= 95.0%`: **25% Service Credit**
- Monthly Uptime `< 95.0%`: **100% Service Credit**

### C. Google Cloud Compute Engine (Multi-Zone Instances)
- Monthly Uptime `< 99.99%` but `>= 99.0%`: **10% Financial Credit**
- Monthly Uptime `< 99.0%` but `>= 95.0%`: **25% Financial Credit**
- Monthly Uptime `< 95.0%`: **50% Financial Credit** (AWS & Azure offer 100% at this tier)

---

## 4. Financial Impact Analysis on Enterprise Workloads
For an enterprise cloud deployment spending \$50,000/month:
- At 99.9% uptime (43.8 minutes downtime), SLA breach threshold for a 99.99% commitment triggers a 10% credit (\$5,000 credit).
- However, if business transactional throughput generates \$12,000/minute, a 43-minute outage incurs **\$516,000 in gross revenue loss**.
- **Crucial Architectural Conclusion:** Cloud provider service credits only subsidize infrastructure hosting fees, NOT collateral commercial losses. Multi-region redundancy, active-active failover, and automated circuit breaking remain the sole engineering guarantees against catastrophic business interruption.
