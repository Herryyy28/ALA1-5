import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { PdfReportGenerator } from '../services/pdfGenerator';
import { 
  FileDown, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Layers, 
  Sparkles,
  Download
} from 'lucide-react';

export const Reports: React.FC = () => {
  const [profile] = useState(dataService.getProfile());
  const [activities] = useState(dataService.getActivities());
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadAll = () => {
    setIsGeneratingAll(true);
    setTimeout(() => {
      try {
        const doc = PdfReportGenerator.generateCombinedPortfolio(profile);
        doc.save(`GMIU_Cloud_Computing_Complete_Portfolio_${profile.enrollment_number}.pdf`);
      } catch (err) {
        console.error('Failed to generate combined PDF:', err);
      } finally {
        setIsGeneratingAll(false);
      }
    }, 100);
  };

  const handleDownloadSingle = (alaId: string) => {
    setDownloadingId(alaId);
    setTimeout(() => {
      try {
        const act = activities.find(a => a.id === alaId);
        if (act) {
          const doc = PdfReportGenerator.generateIndividualReport(act, profile);
          doc.save(`GMIU_${act.id}_Report_${profile.enrollment_number}.pdf`);
        }
      } catch (err) {
        console.error('Failed to generate report:', err);
      } finally {
        setDownloadingId(null);
      }
    }, 100);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-[#5269C9] uppercase tracking-wider mb-1">
              Documentation & University Reports
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
              PDF Report Generation & Downloads
            </h1>
            <p className="text-xs sm:text-sm text-[#778198] mt-1.5 leading-relaxed">
              Generate officially formatted university practical reports and academic papers with cover pages, tables of contents, configuration matrices, genuine evidence, and candidate declarations.
            </p>
          </div>

          <button
            onClick={handleDownloadAll}
            disabled={isGeneratingAll}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#263B80] to-[#5269C9] text-white text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isGeneratingAll ? 'Compiling Portfolio...' : 'Download Combined Portfolio PDF'}</span>
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((act) => {
          const isDownloading = downloadingId === act.id;

          return (
            <div key={act.id} className="bg-white rounded-2xl border border-[#E8EAF2] shadow-card p-6 flex flex-col justify-between space-y-4 group hover:shadow-card-hover transition-all">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#263B80] bg-[#F7F8FC] px-2.5 py-1 rounded-lg border border-[#E8EAF2]">
                    {act.id}
                  </span>
                  <span className="text-[11px] text-[#778198] font-semibold">{act.category}</span>
                </div>

                <h3 className="font-bold text-sm text-[#172033] line-clamp-1 group-hover:text-[#263B80] transition-colors">
                  {act.title}
                </h3>
                <p className="text-xs text-[#778198] line-clamp-2">
                  {act.description}
                </p>

                <div className="pt-2 text-[11px] text-[#56627A] space-y-1">
                  <div>Pages: <strong>4 Pages (Full Academic Layout)</strong></div>
                  <div>Format: <strong>A4 Portrait &bull; KaTeX / Tables</strong></div>
                  <div>Candidate: <strong>{profile.full_name} ({profile.enrollment_number})</strong></div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8EAF2]">
                <button
                  onClick={() => handleDownloadSingle(act.id)}
                  disabled={isDownloading}
                  className="w-full inline-flex items-center justify-center space-x-2 py-2 px-3 rounded-xl border border-[#E8EAF2] hover:border-[#263B80] text-xs font-bold text-[#263B80] hover:bg-[#263B80] hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isDownloading ? 'Generating PDF...' : `Download ${act.id} Report`}</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Master Portfolio Card */}
        <div className="bg-gradient-to-br from-[#263B80] to-[#5269C9] text-white rounded-2xl p-6 shadow-card flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">Complete Submission</span>
            </div>

            <h3 className="text-base font-extrabold">Complete Practical Portfolio (ALA 1–5)</h3>
            <p className="text-xs text-indigo-100 leading-relaxed">
              Single unified submission document featuring master university cover page, candidate declaration, table of contents, all five technical practicals, and faculty grading rubric.
            </p>

            <div className="pt-2 text-[11px] text-indigo-200 space-y-1">
              <div>Total Activities: <strong>5 Comprehensive Practicals</strong></div>
              <div>Subject: <strong>Cloud Computing (2026-2027)</strong></div>
              <div>University: <strong>Gyanmanjari Institute of Technology (GMIU)</strong></div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleDownloadAll}
              disabled={isGeneratingAll}
              className="w-full py-2.5 px-4 rounded-xl bg-white text-[#263B80] hover:bg-indigo-50 font-extrabold text-xs transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <FileDown className="w-4 h-4" />
              <span>{isGeneratingAll ? 'Compiling All ALAs...' : 'Download Full Portfolio PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* University Formatting Standard Box */}
      <div className="bg-white rounded-2xl border border-[#E8EAF2] p-6 shadow-card space-y-3">
        <h4 className="font-bold text-xs text-[#263B80] uppercase tracking-wider">
          University Report Structure (15 Mandatory Sections)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs text-[#56627A]">
          <div className="p-2 bg-[#F7F8FC] rounded-lg">1. Cover Page</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">2. Abstract</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">3. Objectives</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">4. Requirements</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">5. Tools & Tech</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">6. Theory</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">7. Architecture</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">8. Implementation</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">9. Screenshots</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">10. Config Tables</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">11. Observations</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">12. Advantages</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">13. Limitations</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">14. Conclusion</div>
          <div className="p-2 bg-[#F7F8FC] rounded-lg">15. References</div>
        </div>
      </div>
    </div>
  );
};
