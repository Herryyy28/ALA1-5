import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { AlaDetail } from './pages/AlaDetail';
import { PracticalLab } from './pages/PracticalLab';
import { Architectures } from './pages/Architectures';
import { Analytics } from './pages/Analytics';
import { Submissions } from './pages/Submissions';
import { Reports } from './pages/Reports';
import { StudentSearch } from './pages/StudentSearch';
import { Profile } from './pages/Profile';
import { ResearchPapers } from './pages/ResearchPapers';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ala/:id" element={<AlaDetail />} />
          <Route path="practical-lab" element={<PracticalLab />} />
          <Route path="architectures" element={<Architectures />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="students" element={<StudentSearch />} />
          <Route path="profile" element={<Profile />} />
          <Route path="research" element={<ResearchPapers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
