# ALA 1: Cloud Application Deployment & Architecture Manual

**Student:** Herry Prajapati  
**Enrollment:** 20230905090031  
**Institute:** Gyanmanjari Institute of Technology (GMIU), Department of Information Technology  
**Subject:** Cloud Computing (ALA 1)  
**Academic Year:** 2026–2027  
**Official Reference Portal:** [https://cosmic-gingersnap-82f0a9.netlify.app/](https://cosmic-gingersnap-82f0a9.netlify.app/)  

---

## 1. Cloud Architecture Overview

The GMIU Cloud Computing ALA Management Suite is designed using a modern decoupled cloud architecture:
1. **Frontend Presentation Tier (Static Web Hosting & CDN):**
   - Built with React 18, Vite 5, TypeScript, Tailwind CSS, Lucide Icons, and Recharts.
   - Hosted globally on Netlify Edge CDN with automatic HTTPS, Brotli compression, and cache invalidation.
   - SPA client-side routing managed via Netlify redirects (`netlify.toml`).

2. **Compute Tier (Cloud Application API & Microservices):**
   - Designed for AWS EC2 (`t3.micro` free-tier eligible) or Azure App Service (`F1` free-tier).
   - Powered by Python 3.13 / FastAPI / Flask microservice (`backend/server.py`) servicing:
     - Health checks (`/api/health`)
     - Compute node metrics (`/api/compute/status`)
     - Dynamic student directory querying (`/api/students`)
     - Real-time submission state tracking (`/api/submissions`)

3. **Database & Storage Tier (Managed PostgreSQL on Supabase):**
   - Cloud PostgreSQL 15 engine hosted on Supabase (AWS us-east-1 infrastructure).
   - Automated Row Level Security (RLS) policies protecting candidate profiles and submission records.
   - Pre-populated with 96 official GMIU Information Technology students (`database/students_dataset.json`).

---

## 2. Local Execution & Build Verification

### Frontend Build
```powershell
cd frontend
npm install
npm run build
```
Build verification outputs clean production bundles into `frontend/dist/`.

### Run Development Server
```powershell
cd frontend
npm run dev
```
Accessible at: `http://localhost:5173/`

### Run Compute Service API
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python server.py
```
Accessible at: `http://localhost:8080/`

---

## 3. Production Deployment Configuration (`netlify.toml`)
```toml
[build]
  base = "frontend"
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
    [headers.values]
      X-Frame-Options = "DENY"
      X-XSS-Protection = "1; mode=block"
      X-Content-Type-Options = "nosniff"
      Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 4. Compute Resource Allocation & Health Telemetry
- **Instance Type:** AWS EC2 `t3.micro` / Azure App Service `F1 Free`
- **vCPU:** 2 vCPU (burst capable)
- **Memory:** 1024 MB RAM
- **Network Performance:** Low to Moderate (Up to 5 Gbps burst)
- **Monitoring:** CloudWatch metric triggers configured for auto-restart on failed health checks.
