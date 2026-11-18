# GMIU Cloud Computing - ALA 1: Cloud Application Deployment

**Title:** GMIU Cloud-Based Student ALA Management Application  
**Candidate:** Herry Prajapati | **Enrollment:** 20230905090031  
**Department:** Information Technology &bull; Gyanmanjari Institute of Technology (GMIU)  
**Academic Year:** 2026–2027 &bull; **Deadline:** 30 November 2026  

---

## 1. Practical Aim & Objectives
* Design and deploy a responsive, cloud-hosted Single Page Application (SPA).
* Integrate a managed serverless PostgreSQL database using Supabase with Row Level Security (RLS).
* Implement student enrollment search across official university registry records (96 students).
* Deploy the production build to Netlify Edge CDN with automatic HTTPS.
* Verify public accessibility, low latency, and zero-downtime deployments.

## 2. Technical Stack
* **Frontend:** React 18, TypeScript, Vite 5, Tailwind CSS
* **Database:** Supabase PostgreSQL 15, PostgREST API
* **Edge CDN:** Netlify Global Anycast CDN
* **Version Control:** Git & GitHub

## 3. Step-by-Step Execution
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` with Supabase project URL and anon public key.
3. Apply SQL migrations:
   ```bash
   psql -h db.supabase.co -U postgres -d postgres -f database/schema.sql
   ```
4. Build production static bundle:
   ```bash
   npm run build
   ```
5. Deploy to Netlify:
   ```bash
   netlify deploy --prod --dir=frontend/dist
   ```

## 4. Verification & Artifacts
* Reference URL: https://cosmic-gingersnap-82f0a9.netlify.app/
* Deployment manifest: `evidence/ALA-1/deployment_manifest.json`
* API verification trace: `evidence/ALA-1/api_verification_log.txt`
* Full PDF report: `reports/GMIU_ALA1_Report_20230905090031.pdf`
