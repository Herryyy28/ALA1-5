# ALA 1 Frontend Application Source & Component Structure

**Student:** Herry Prajapati (Enrollment: 20230905090031)  
**Institute:** Gyanmanjari Institute of Technology (GMIU)  

The primary frontend application is located in the root `frontend/` directory.

### Key Pages Implemented:
- `Dashboard.tsx`: Academic metrics, completion percentages, quick access links.
- `AlaDetail.tsx`: Comprehensive detail views for all 5 ALA practicals.
- `PracticalLab.tsx`: Interactive virtualization terminal, diagnostic outputs, and benchmark consoles.
- `Architectures.tsx`: Cloud deployment topologies and multi-cloud architectural diagrams.
- `Analytics.tsx`: Interactive visual charts (Recharts) showing latency distributions, SLA comparisons, and performance graphs.
- `Submissions.tsx`: Submission management with file upload simulator and status checklist.
- `Reports.tsx`: One-click PDF download interface for all 5 individual reports and master portfolio.
- `StudentSearch.tsx`: Real-time searchable directory of all 96 GMIU students with 15-second polling synchronization.
- `Profile.tsx`: Candidate student profile displaying enrollment `20230905090031` and academic credentials.
- `Settings.tsx`: Theme, API endpoint, and network telemetry preferences.

### Build Verification:
```powershell
cd frontend
npm run build
```
Builds cleanly with zero errors to `frontend/dist/`.
