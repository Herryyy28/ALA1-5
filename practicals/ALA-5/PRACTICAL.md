# GMIU Cloud Computing - ALA 5: Performance Optimization

**Title:** Cloud Application Performance Optimization Using Load Balancing, Auto-Scaling and Monitoring  
**Candidate:** Herry Prajapati | **Enrollment:** 20230905090031  
**Department:** Information Technology &bull; Gyanmanjari Institute of Technology (GMIU)  
**Academic Year:** 2026–2027 &bull; **Deadline:** 30 November 2026  

---

## 1. Practical Aim & Objectives
* Configure and demonstrate Layer-7 load balancing algorithms (Round Robin, Least Connections).
* Implement threshold-based horizontal auto-scaling rules (Scale-Out > 70% CPU, Scale-In < 30% CPU).
* Execute synthetic concurrency load testing using Locust across 10, 50, and 100 virtual users.
* Measure and log real throughput (RPS), response latency curves (p50, p90, p95, p99), and server CPU/memory profiles.
* Evaluate modern cloud trends: Edge computing, serverless architectures, and AI predictive auto-scaling.

## 2. Benchmark Concurrency Results Summary
* **Low Load (10 Users):** 30.7 req/s, 18.4 ms avg latency, 31.2 ms p95, 14.8% CPU, 0.00% errors.
* **Medium Load (50 Users):** 144.8 req/s, 46.2 ms avg latency, 94.6 ms p95, 41.5% CPU, 0.02% errors.
* **High Load (100 Users):** 273.6 req/s, 112.8 ms avg latency, 248.0 ms p95, 78.4% CPU, 0.12% errors.

## 3. Automation Commands
* Locust Load Test Script: `performance/locust/locustfile.py`
* Run Benchmark Suite: `python performance/scripts/run_benchmarks.py`

## 4. Artifacts & Deliverables
* Benchmark Summary JSON: `performance/results/benchmark_summary.json`
* Comparison CSV: `performance/results/benchmark_comparison.csv`
* Benchmark Execution Log: `evidence/ALA-5/benchmark_execution_log.txt`
* Full PDF report: `reports/GMIU_ALA5_Report_20230905090031.pdf`
