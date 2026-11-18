# GMIU Cloud Computing Suite - Performance Optimization Guide (ALA 5)

**Candidate:** Herry Prajapati | **Enrollment:** 20230905090031  
**University:** Gyanmanjari Institute of Technology (GMIU) &bull; Department of IT  
**Subject:** Cloud Computing &bull; Academic Year 2026–2027  

---

## 1. Overview & Objective
ALA-5 demonstrates performance tuning and scalability benchmarking across cloud infrastructure. Using **Locust**, synthetic HTTP workloads are generated against the application cluster to evaluate throughput (RPS), response latency curves (Average, p90, p95, p99), and server resource consumption under Low (10 users), Medium (50 users), and High (100 users) concurrency scenarios.

---

## 2. Load Testing Execution

Execute the automated benchmark suite:
```bash
python performance/scripts/run_benchmarks.py
```

### Empirical Results Summary Table

| Concurrency Scenario | Virtual Users | Spawn Rate | RPS (Throughput) | Average Latency | 95th Percentile (p95) | Error Rate (%) | Server CPU Saturation | Server Memory |
|---|---|---|---|---|---|---|---|---|
| **Scenario 1 (Low)** | 10 Users | 2 u/s | 16.0 - 30.7 req/s | 18.4 - 24.6 ms | 31.2 - 50.4 ms | 0.00% | 14.8 - 20.2% | 182 - 191 MB |
| **Scenario 2 (Medium)**| 50 Users | 5 u/s | 76.3 - 144.8 req/s| 46.2 - 60.3 ms | 94.6 - 123.6 ms | 0.09% | 41.5 - 46.3% | 264 - 295 MB |
| **Scenario 3 (High)** | 100 Users | 10 u/s | 150.5 - 273.6 req/s| 103.4 - 112.8 ms| 212.0 - 248.0 ms| 0.40% | 78.4 - 80.8% | 418 - 423 MB |

All telemetry records are exported to:
* `performance/results/benchmark_summary.json`
* `performance/results/benchmark_comparison.csv`
* `evidence/ALA-5/benchmark_execution_log.txt`

---

## 3. Layer 7 Load Balancing Algorithms Comparison

### 1. Round Robin
* **Mechanism:** Routes incoming HTTP sessions sequentially: Server 1 &rarr; Server 2 &rarr; Server 3 &rarr; Server 1.
* **Advantage:** Minimal CPU overhead on the load balancer; ideal for uniform, stateless web requests.
* **Disadvantage:** Fails to account for heterogeneous compute capacities or long-running database transactions.

### 2. Least Connections
* **Mechanism:** Evaluates active concurrent connections across all backend nodes and routes incoming requests to the server with the lowest connection count.
* **Advantage:** Prevents slow queries from overwhelming an individual node; ensures balanced latency.
* **Disadvantage:** Requires real-time state tracking on the load balancer.

### 3. Weighted Load Balancing
* **Mechanism:** Assigns proportional multipliers (e.g., Node 1 = 3x, Node 2 = 2x, Node 3 = 5x) reflecting distinct hardware specs (e.g. `c6i.large` vs `c6i.xlarge`).

---

## 4. Elastic Auto-Scaling Group (ASG) Architecture
```
[CloudWatch / Prometheus Telemetry Alarms]
                │
                ├─► Average CPU > 70% (3 consecutive mins) ──► SCALE-OUT (+2 Instances)
                │
                └─► Average CPU < 30% (5 consecutive mins) ──► SCALE-IN (-1 Instance)
```
* **Cooldown Period:** 300 seconds enforced between scaling events to prevent rapid thrashing.
* **Minimum Fleet:** 2 instances across distinct Availability Zones.
* **Maximum Fleet:** 8 instances to cap emergency cloud expenditure.
