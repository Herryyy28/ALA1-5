# GMIU Cloud Computing Suite - Comprehensive System Architecture

**Candidate:** Herry Prajapati | **Enrollment:** 20230905090031  
**Department:** Information Technology &bull; Gyanmanjari Institute of Technology (GMIU)  
**Subject:** Cloud Computing &bull; Academic Year 2026–2027  

---

## 1. Multi-Tier Cloud Architecture

```
[Student / Faculty Browser Client]
          │
          │ HTTPS (TLS 1.3 Anycast)
          ▼
┌───────────────────────────────────────────────┐
│              Netlify Edge CDN                 │
│  - Anycast Global Routing                     │
│  - SSL/TLS Termination                       │
│  - Static Asset Caching (Brotli/Gzip)         │
│  - SPA URL Rewriting (/* -> /index.html 200)  │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│          React 18 Single Page App             │
│  - TypeScript & Vite 5 Engine                 │
│  - Tailwind CSS Premium Academic Palette      │
│  - Recharts Telemetry Visualizers             │
│  - jsPDF / Autotable Report Compiler          │
│  - LocalState Reactive Store (Offline Sync)   │
└──────────────────────┬────────────────────────┘
                       │
                       │ REST / PostgREST (JWT Encapsulated)
                       ▼
┌───────────────────────────────────────────────┐
│        Supabase Managed Cloud Backend         │
│  - API Gateway / PostgREST Engine             │
│  - JSON Web Token (JWT) Role Claims           │
│  - S3-Compatible Cloud Storage                │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│          PostgreSQL 15 Database               │
│  - Row Level Security (RLS) Policies          │
│  - Multi-Tenant Student Data Segregation      │
│  - Relational Schemas & Foreign Keys          │
└───────────────────────────────────────────────┘
```

---

## 2. Database Schema & Row Level Security (RLS)

The database schema (`database/schema.sql`) enforces strict tenant boundaries:

1. **`profiles` Table:**
   * Stores enrollment numbers, student names, roles (`student`, `faculty`, `admin`), departments, and universities.
   * `RLS Policy:` Public read for directory lookup; users can update only their own profile.

2. **`ala_activities` Table:**
   * Stores metadata for activities `ALA-1` through `ALA-5` (title, weightage, objectives, tools).
   * `RLS Policy:` Public read for all authenticated and guest visitors.

3. **`ala_submissions` Table:**
   * Primary transactional entity tracking status (`pending`, `in_progress`, `submitted`, `verified`), submission dates, faculty feedback, and awarded marks.
   * `RLS Policy:` Students can read and insert only their own enrollment submissions; faculty and admins have evaluation access.

4. **`activity_logs` Table:**
   * Immutable audit trail recording user actions, IP addresses, and timestamps.

---

## 3. High-Availability & Disaster Recovery Modeling (ALA 4)

To satisfy enterprise 99.999% ("five nines") availability requirements:
* Dual-region architecture: Primary in Mumbai (`ap-south-1`) and secondary warm standby in Singapore (`ap-southeast-1`).
* Route 53 latency-based DNS routing with health-check failover.
* Calculation:
  $$\text{Composite SLA} = 1 - (1 - 0.9999) \times (1 - 0.9999) = 99.999999\%$$

---

## 4. Layer 7 Load Balancing & Elastic Auto-Scaling (ALA 5)

* **Round Robin:** Sequential request routing suited for homogeneous, stateless compute instances.
* **Least Connections:** Routes incoming requests to the server with the lowest active session count, preventing long-running database requests from choking individual nodes.
* **Auto-Scaling Group (ASG):**
  * *Scale-Out Alarm:* Average CPU saturation $\ge 70\%$ over 3 consecutive 60s measurement windows &rarr; spawn $+2$ instances.
  * *Scale-In Alarm:* Average CPU saturation $\le 30\%$ over 5 consecutive 60s measurement windows &rarr; terminate $-1$ instance down to minimum fleet size of 2.
