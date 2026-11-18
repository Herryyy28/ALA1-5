# GMIU Cloud Computing Suite - Production Deployment & Cloud Setup Guide

**Author:** Herry Prajapati | **Enrollment:** 20230905090031  
**University:** Gyanmanjari Institute of Technology (GMIU) &bull; Department of Information Technology  
**Subject:** Cloud Computing &bull; Academic Year 2026–2027  

---

## 1. Prerequisites
* **Node.js:** v20.x or higher
* **npm:** v10.x or higher
* **Python:** v3.11+ (Python 3.13 tested)
* **Git:** Installed and configured
* **Netlify CLI (Optional for terminal deployment):** `npm install -g netlify-cli`

---

## 2. Cloud Database Deployment (Supabase PostgreSQL)

### Step 2.1: Provision Cloud Project
1. Log in to [Supabase Console](https://supabase.com/).
2. Create a new organization and project:
   * **Project Name:** `gmiu-cloud-computing-ala`
   * **Database Password:** Strong generated password
   * **Region:** Central India (Mumbai) `ap-south-1` or EU Central (Frankfurt) `eu-central-1`

### Step 2.2: Execute SQL Migrations
1. Open the **SQL Editor** tab in the Supabase Dashboard.
2. Copy and execute the contents of `database/migrations/01_initial_schema.sql`.
   * This creates enums, profiles, ala_activities, ala_submissions, submission_files, activity_logs, and activates Row Level Security (RLS).
3. Copy and execute `database/migrations/02_seed_students.sql`.
   * This imports all 96 registered student profiles from the university IT registry.

### Step 2.3: Retrieve API Keys
1. Navigate to **Project Settings &rarr; API**.
2. Note the **Project URL** (`https://<project-ref>.supabase.co`).
3. Note the **anon (public)** key.
   > **CRITICAL SECURITY RULE:** Never paste or configure the `service_role` (secret) key in client-side `.env` files.

---

## 3. Frontend Web Application Build & Netlify Hosting

### Step 3.1: Configure Environment Variables
Copy `.env.example` to `frontend/.env`:
```bash
cp .env.example frontend/.env
```
Fill in the Supabase values:
```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-public-key>
VITE_STUDENT_ENROLLMENT=20230905090031
VITE_STUDENT_NAME=Herry Prajapati
VITE_UNIVERSITY=Gyanmanjari Institute of Technology (GMIU)
VITE_DEPARTMENT=Information Technology
VITE_ACADEMIC_YEAR=2026-2027
VITE_SUBMISSION_DEADLINE=2026-11-30
```

### Step 3.2: Compile Production Bundle
```bash
cd frontend
npm run build
```
Verify that the `frontend/dist/` directory contains `index.html`, `assets/`, and `_redirects`.

### Step 3.3: Deploy to Netlify
#### Option A: Via GitHub Continuous Deployment (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete GMIU Cloud Computing ALA suite (ALA 1-5)"
   git branch -M main
   git remote add origin https://github.com/<your-username>/gmiu-cloud-ala.git
   git push -u origin main
   ```
2. In Netlify Dashboard, click **Add new site &rarr; Import an existing project**.
3. Select the repository:
   * **Base directory:** `frontend`
   * **Build command:** `npm run build`
   * **Publish directory:** `dist`
4. In **Site Configuration &rarr; Environment variables**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Click **Deploy Site**.

#### Option B: Manual CLI Deployment
```bash
netlify login
netlify deploy --prod --dir=frontend/dist
```

---

## 4. Single Page Application (SPA) Routing Verification
The file `frontend/public/_redirects` ensures all client-side paths (`/ala/ALA-1`, `/practical-lab`, `/reports`, `/students`) are rewritten to `/index.html` with HTTP status `200`:
```
/*    /index.html   200
```
This guarantees bookmarking and hard page refreshes function seamlessly without `404 Not Found` errors.
