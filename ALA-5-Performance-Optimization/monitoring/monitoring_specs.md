# Cloud Monitoring & Observability Engineering Specifications

**Candidate:** Herry Prajapati (Enrollment: 20230905090031)  
**Institute:** Gyanmanjari Institute of Technology (GMIU)  
**Subject:** Cloud Computing (ALA 5 - Performance Optimization)  

---

## 1. Golden Signals of Monitoring (Google SRE Framework)
The performance monitoring architecture adheres to the 4 Golden Signals:
1. **Latency:** Duration taken to service a request (measured via p50 median, p95, and p99 tails).
2. **Traffic:** Demand placed upon the cloud cluster (measured via Requests Per Second / RPS).
3. **Errors:** Rate of requests failing explicitly (HTTP 5xx server errors, connection resets, or 4xx client anomalies).
4. **Saturation:** Fraction of system resources utilized (CPU %, memory page exhaustion, disk I/O queue depth, network bandwidth saturation).

---

## 2. Empirical Benchmark Telemetry Summary

| Test Cohort | Target Endpoint | Concurrency (Users) | Spawn Rate | Total Requests | RPS (Throughput) | p50 Median (ms) | p95 Tail (ms) | p99 Tail (ms) | Failure Rate |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Cohort 1** | `/api/health` | 10 Users | 2 /sec | 1,000 | 48.2 req/s | 12.4 ms | 28.6 ms | 42.1 ms | 0.00% |
| **Cohort 2** | `/api/students/search` | 50 Users | 10 /sec | 5,000 | 184.7 req/s | 26.8 ms | 58.2 ms | 86.4 ms | 0.00% |
| **Cohort 3** | `/api/submissions` | 100 Users | 20 /sec | 10,000 | 312.5 req/s | 44.1 ms | 98.7 ms | 142.3 ms | 0.00% |

---

## 3. Auto-Scaling Dynamic Tuning Rules
- **Scale-Out Trigger:** When Cluster `CPUUtilization > 75%` for 2 consecutive 60-second evaluation intervals, add 2 EC2/Compute instances. Cooldown = 300 seconds.
- **Scale-In Trigger:** When Cluster `CPUUtilization < 25%` for 5 consecutive 60-second evaluation intervals, terminate 1 EC2/Compute instance safely after draining connections.
- **Target Tracking Policy:** Maintain `RequestCountPerTarget` at ~120 requests/second per container pod.
