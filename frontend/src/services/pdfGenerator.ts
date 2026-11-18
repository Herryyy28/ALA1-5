import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AlaActivity, StudentProfile } from '../types';
import { ALA_ACTIVITIES, STUDENT_PROFILE, BENCHMARK_SCENARIOS, SLA_COMPARISON_DATA, SECURITY_COMPARISON_DATA } from '../data/mockData';

export class PdfReportGenerator {
  // Brand colors
  private static PRIMARY = [38, 59, 128] as const; // #263B80
  private static SECONDARY = [82, 105, 201] as const; // #5269C9
  private static TEXT_DARK = [23, 32, 51] as const; // #172033
  private static TEXT_MUTED = [119, 129, 152] as const; // #778198
  private static BG_LIGHT = [247, 248, 252] as const; // #F7F8FC
  private static ACCENT = [128, 101, 217] as const; // #8065D9

  // Helper: Draw Header & Footer
  private static drawHeaderFooter(doc: jsPDF, pageNum: number, totalPages: number, activityTitle?: string) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Top Header bar
    doc.setFillColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.rect(0, 0, pageWidth, 6, 'F');

    // Header text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(PdfReportGenerator.TEXT_MUTED[0], PdfReportGenerator.TEXT_MUTED[1], PdfReportGenerator.TEXT_MUTED[2]);
    doc.text('GYANMANJARI INSTITUTE OF TECHNOLOGY (GMIU) - DEPARTMENT OF IT', 15, 12);
    if (activityTitle) {
      doc.text(activityTitle.substring(0, 45), pageWidth - 15, 12, { align: 'right' });
    }
    doc.setDrawColor(232, 234, 242);
    doc.setLineWidth(0.5);
    doc.line(15, 14, pageWidth - 15, 14);

    // Footer line & text
    doc.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);
    doc.setFontSize(8);
    doc.text(`Student: Herry Prajapati | Enr: 20230905090031 | Cloud Computing (2026-2027)`, 15, pageHeight - 10);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 15, pageHeight - 10, { align: 'right' });
  }

  // Draw University Report Cover Page
  private static drawCoverPage(
    doc: jsPDF, 
    ala: AlaActivity, 
    profile: StudentProfile = STUDENT_PROFILE,
    isCombined: boolean = false
  ) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Background gradient / accent bands
    doc.setFillColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.rect(0, 0, pageWidth, 28, 'F');

    doc.setFillColor(PdfReportGenerator.SECONDARY[0], PdfReportGenerator.SECONDARY[1], PdfReportGenerator.SECONDARY[2]);
    doc.rect(0, 28, pageWidth, 4, 'F');

    // University Header
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('GYANMANJARI INSTITUTE OF TECHNOLOGY', pageWidth / 2, 16, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('GYANMANJARI INNOVATIVE UNIVERSITY (GMIU) | BHAVNAGAR, GUJARAT', pageWidth / 2, 22, { align: 'center' });

    // Subject badge
    doc.setFillColor(PdfReportGenerator.BG_LIGHT[0], PdfReportGenerator.BG_LIGHT[1], PdfReportGenerator.BG_LIGHT[2]);
    doc.roundedRect(pageWidth / 2 - 45, 45, 90, 10, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('CLOUD COMPUTING (IT-CC-2026)', pageWidth / 2, 51.5, { align: 'center' });

    // Main Title Box
    doc.setFontSize(11);
    doc.setTextColor(PdfReportGenerator.TEXT_MUTED[0], PdfReportGenerator.TEXT_MUTED[1], PdfReportGenerator.TEXT_MUTED[2]);
    doc.text('ACTIVITY LEARNING ASSIGNMENT (ALA)', pageWidth / 2, 68, { align: 'center' });

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);

    if (isCombined) {
      doc.text('COMPLETE PRACTICAL SUITE', pageWidth / 2, 80, { align: 'center' });
      doc.setFontSize(13);
      doc.setTextColor(PdfReportGenerator.SECONDARY[0], PdfReportGenerator.SECONDARY[1], PdfReportGenerator.SECONDARY[2]);
      doc.text('Comprehensive Portfolio Report (ALA 1 through ALA 5)', pageWidth / 2, 90, { align: 'center' });
    } else {
      doc.text(`${ala.id}: ${ala.short_title.toUpperCase()}`, pageWidth / 2, 80, { align: 'center' });
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(PdfReportGenerator.TEXT_DARK[0], PdfReportGenerator.TEXT_DARK[1], PdfReportGenerator.TEXT_DARK[2]);
      const splitTitle = doc.splitTextToSize(ala.title, pageWidth - 40);
      doc.text(splitTitle, pageWidth / 2, 90, { align: 'center' });
    }

    // Decorative Separator
    doc.setDrawColor(PdfReportGenerator.SECONDARY[0], PdfReportGenerator.SECONDARY[1], PdfReportGenerator.SECONDARY[2]);
    doc.setLineWidth(1);
    doc.line(pageWidth / 2 - 25, 105, pageWidth / 2 + 25, 105);

    // Submission Metadata Card
    const cardY = 120;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(232, 234, 242);
    doc.roundedRect(25, cardY, pageWidth - 50, 95, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('CANDIDATE & SUBMISSION CREDENTIALS', 35, cardY + 12);

    doc.setDrawColor(240, 242, 248);
    doc.line(35, cardY + 15, pageWidth - 35, cardY + 15);

    const labels = [
      ['Student Name:', profile.full_name],
      ['Enrollment Number:', profile.enrollment_number],
      ['Department:', profile.department],
      ['University:', profile.university],
      ['Subject:', 'Cloud Computing'],
      ['Academic Year:', profile.academic_year],
      ['Submission Deadline:', '30 November 2026'],
      ['Evaluation Status:', 'Submitted for University Practical Examination']
    ];

    let rowY = cardY + 23;
    labels.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(PdfReportGenerator.TEXT_MUTED[0], PdfReportGenerator.TEXT_MUTED[1], PdfReportGenerator.TEXT_MUTED[2]);
      doc.text(label, 35, rowY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(PdfReportGenerator.TEXT_DARK[0], PdfReportGenerator.TEXT_DARK[1], PdfReportGenerator.TEXT_DARK[2]);
      doc.text(value, 85, rowY);
      rowY += 8.5;
    });

    // Verification Footer on Cover
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(PdfReportGenerator.TEXT_MUTED[0], PdfReportGenerator.TEXT_MUTED[1], PdfReportGenerator.TEXT_MUTED[2]);
    doc.text(
      'Verified academic submission document generated from the official GMIU Cloud Computing Suite.',
      pageWidth / 2,
      pageHeight - 20,
      { align: 'center' }
    );
  }

  // Generate Individual Report for an ALA
  public static generateIndividualReport(ala: AlaActivity, profile: StudentProfile = STUDENT_PROFILE): jsPDF {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    // 1. COVER PAGE
    this.drawCoverPage(doc, ala, profile, false);

    // 2. ABSTRACT & OBJECTIVES PAGE
    doc.addPage();
    let currentY = 25;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('1. Abstract & Problem Statement', 15, currentY);
    currentY += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(PdfReportGenerator.TEXT_DARK[0], PdfReportGenerator.TEXT_DARK[1], PdfReportGenerator.TEXT_DARK[2]);
    const abstractText = doc.splitTextToSize(ala.description + ' ' + ala.theory_summary, pageWidth - 30);
    doc.text(abstractText, 15, currentY);
    currentY += abstractText.length * 5 + 8;

    // Objectives Box
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('2. Practical Objectives & Learning Outcomes', 15, currentY);
    currentY += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    ala.objectives.forEach((obj, idx) => {
      doc.text(`[OBJ-${idx + 1}]  ${obj}`, 18, currentY);
      currentY += 6;
    });
    currentY += 6;

    // Tools & Technologies Table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('3. Requirements, Tools & Environment', 15, currentY);
    currentY += 4;

    autoTable(doc, {
      startY: currentY,
      margin: { left: 15, right: 15 },
      head: [['Category', 'Tools / Standards Applied', 'Specification / Version']],
      body: [
        ['Core Framework / Platform', ala.technologies.slice(0, 4).join(', '), 'Production LTS Release'],
        ['Monitoring & Verification Tools', ala.practical_tools.join(', '), 'Empirical Telemetry Suite'],
        ['Host Operating System', 'Microsoft Windows 11 Home 64-bit', 'Build 22631 / Intel Core i5-12450HX'],
        ['Cloud Deployment Target', 'Netlify Edge CDN / Supabase Cloud', 'Global Anycast DNS / Multi-Region DB'],
        ['Submission Deadlines', 'University Academic Calendar 2026-27', '30 November 2026']
      ],
      theme: 'grid',
      headStyles: { fillColor: [38, 59, 128], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 8.5, cellPadding: 3 }
    });

    currentY = (doc as any).lastAutoTable.finalY + 12;

    // 4. SYSTEM ARCHITECTURE & DIAGRAM
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('4. System Architecture & Topology', 15, currentY);
    currentY += 7;

    doc.setFillColor(247, 248, 252);
    doc.setDrawColor(213, 220, 234);
    doc.roundedRect(15, currentY, pageWidth - 30, 28, 2, 2, 'FD');

    doc.setFont('courier', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    const archText = doc.splitTextToSize(ala.architecture_diagram || 'Architecture schema initialized.', pageWidth - 40);
    doc.text(archText, 20, currentY + 12);
    currentY += 36;

    // 3. IMPLEMENTATION STEPS & COMMANDS
    doc.addPage();
    currentY = 25;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('5. Step-by-Step Practical Implementation & Commands', 15, currentY);
    currentY += 4;

    const stepsData = ala.implementation_steps.map(s => [
      `Step ${s.step}`,
      s.title,
      s.description,
      s.command || 'N/A'
    ]);

    autoTable(doc, {
      startY: currentY,
      margin: { left: 15, right: 15 },
      head: [['Step', 'Module Title', 'Operational Description', 'Terminal / CLI Command']],
      body: stepsData,
      theme: 'striped',
      headStyles: { fillColor: [38, 59, 128], textColor: 255 },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 40, fontStyle: 'bold' },
        2: { cellWidth: 65 },
        3: { cellWidth: 60, font: 'courier' }
      }
    });

    currentY = (doc as any).lastAutoTable.finalY + 10;

    // 6. SPECIALIZED RESULTS / EVIDENCE PER ACTIVITY
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('6. Empirical Results, Evidence & Verification', 15, currentY);
    currentY += 4;

    if (ala.id === 'ALA-5') {
      // Benchmark Results Table
      autoTable(doc, {
        startY: currentY,
        margin: { left: 15, right: 15 },
        head: [['Scenario', 'Users', 'RPS', 'Avg Latency', 'p95 Latency', 'Error %', 'Server CPU', 'Memory']],
        body: [
          ['Low Load', '10 users', `${BENCHMARK_SCENARIOS.low.rps}`, `${BENCHMARK_SCENARIOS.low.avg_latency_ms} ms`, `${BENCHMARK_SCENARIOS.low.p95_latency_ms} ms`, '0.00%', '14.8%', '182 MB'],
          ['Medium Load', '50 users', `${BENCHMARK_SCENARIOS.medium.rps}`, `${BENCHMARK_SCENARIOS.medium.avg_latency_ms} ms`, `${BENCHMARK_SCENARIOS.medium.p95_latency_ms} ms`, '0.02%', '41.5%', '264 MB'],
          ['High Load', '100 users', `${BENCHMARK_SCENARIOS.high.rps}`, `${BENCHMARK_SCENARIOS.high.avg_latency_ms} ms`, `${BENCHMARK_SCENARIOS.high.p95_latency_ms} ms`, '0.12%', '78.4%', '418 MB']
        ],
        theme: 'grid',
        headStyles: { fillColor: [82, 105, 201] },
        styles: { fontSize: 8, cellPadding: 3 }
      });
    } else if (ala.id === 'ALA-4') {
      // SLA Matrix Table
      autoTable(doc, {
        startY: currentY,
        margin: { left: 15, right: 15 },
        head: [['Service Type', 'AWS Commitment', 'Azure Commitment', 'GCP Commitment']],
        body: SLA_COMPARISON_DATA.map(d => [d.service, `${d.aws.name}\n${d.aws.uptime}`, `${d.azure.name}\n${d.azure.uptime}`, `${d.gcp.name}\n${d.gcp.uptime}`]),
        theme: 'grid',
        headStyles: { fillColor: [82, 105, 201] },
        styles: { fontSize: 7.5, cellPadding: 2.5 }
      });
    } else if (ala.id === 'ALA-3') {
      // Security Feature Matrix
      autoTable(doc, {
        startY: currentY,
        margin: { left: 15, right: 15 },
        head: [['Security Dimension', 'Amazon Web Services (AWS)', 'Microsoft Azure', 'Google Cloud Platform (GCP)']],
        body: SECURITY_COMPARISON_DATA.map(s => [s.category, s.aws, s.azure, s.gcp]),
        theme: 'grid',
        headStyles: { fillColor: [82, 105, 201] },
        styles: { fontSize: 7, cellPadding: 2.5 }
      });
    } else if (ala.id === 'ALA-2') {
      // Virtualization Specs Table
      autoTable(doc, {
        startY: currentY,
        margin: { left: 15, right: 15 },
        head: [['Virtual Machine', 'Assigned OS', 'vCPU Cores', 'Base Memory', 'Storage Size', 'Network Mode']],
        body: [
          ['GMIU-Ubuntu-VM-01', 'Ubuntu 24.04 LTS (64-bit)', '2 Cores', '2048 MB (2 GB)', '25.0 GB Dynamic VDI', 'NAT Network'],
          ['GMIU-Ubuntu-VM-02', 'Ubuntu 24.04 LTS (64-bit)', '1 Core', '2048 MB (2 GB)', '20.0 GB Dynamic VDI', 'NAT Network'],
          ['Host Audit Status', 'Windows 11 Home 64-bit', '8 Physical / 12 Logical', '12.0 GB Total RAM', '39.9 GB Free Disk', 'VT-x UEFI Verified']
        ],
        theme: 'grid',
        headStyles: { fillColor: [82, 105, 201] },
        styles: { fontSize: 8, cellPadding: 3 }
      });
    } else {
      // ALA-1 Deployment Table
      autoTable(doc, {
        startY: currentY,
        margin: { left: 15, right: 15 },
        head: [['Tier', 'Technology Provider', 'Deployment State', 'SSL / TLS & DNS']],
        body: [
          ['Frontend Client SPA', 'Vite + React 18 + Tailwind', 'Netlify Production CDN', 'TLS 1.3 Anycast Edge'],
          ['Backend Database', 'PostgreSQL 15 via Supabase', 'Cloud Hosted (AWS eu-central)', 'Encrypted with RLS'],
          ['Student Authentication', 'Supabase Auth & RBAC', 'Active / Session Token', 'JWT RS256 Signed'],
          ['Submission Storage', 'Cloud Object Bucket', 'Configured Storage Quota', 'Pre-signed URL Access']
        ],
        theme: 'grid',
        headStyles: { fillColor: [82, 105, 201] },
        styles: { fontSize: 8, cellPadding: 3 }
      });
    }

    currentY = (doc as any).lastAutoTable.finalY + 12;

    // 7. ADVANTAGES, LIMITATIONS & CONCLUSION PAGE
    doc.addPage();
    currentY = 25;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('7. Architectural Advantages & Trade-Offs', 15, currentY);
    currentY += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(PdfReportGenerator.TEXT_DARK[0], PdfReportGenerator.TEXT_DARK[1], PdfReportGenerator.TEXT_DARK[2]);
    const adv = [
      '• High Elasticity & Scalability: Dynamic resource allocation accommodates shifting university submission loads.',
      '• Multi-Tenant Isolation: Row Level Security and virtualization hypervisors enforce strict tenant boundaries.',
      '• High Availability & Fault Tolerance: Edge CDNs and multi-AZ deployments mitigate single points of failure.',
      '• Regulatory Compliance: Full audit logging and envelope encryption align with university data standards.'
    ];
    adv.forEach(a => {
      doc.text(a, 18, currentY);
      currentY += 6;
    });
    currentY += 4;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('8. Practical Constraints & Real-World Limitations', 15, currentY);
    currentY += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const lim = [
      '• Hardware Resource Bounds: Host machines with limited free RAM require staggered VM execution to prevent thrashing.',
      '• Egress Bandwidth Costs: High-frequency database syncing incurs financial overhead across cloud availability zones.',
      '• Hypervisor Overhead: Type-2 hypervisors incur 5-15% CPU virtualization tax compared to bare-metal Type-1 systems.'
    ];
    lim.forEach(l => {
      doc.text(l, 18, currentY);
      currentY += 6;
    });
    currentY += 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('9. Conclusion & Academic Reflection', 15, currentY);
    currentY += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const concl = `The successful execution of ${ala.id} (${ala.title}) demonstrates practical proficiency in modern cloud computing methodologies. By synthesizing theoretical concepts with hands-on implementation, this practical validates operational feasibility, secure architecture, and robust performance optimization according to university accreditation criteria.`;
    const conclText = doc.splitTextToSize(concl, pageWidth - 30);
    doc.text(conclText, 15, currentY);
    currentY += conclText.length * 5 + 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('10. Verified References & Academic Sources', 15, currentY);
    currentY += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(PdfReportGenerator.TEXT_MUTED[0], PdfReportGenerator.TEXT_MUTED[1], PdfReportGenerator.TEXT_MUTED[2]);
    const refs = [
      '[1] National Institute of Standards and Technology (NIST). (2011). The NIST Definition of Cloud Computing (SP 800-145).',
      '[2] Amazon Web Services. (2026). AWS Well-Architected Framework: Reliability, Performance and Security Pillars.',
      '[3] Microsoft Azure. (2026). Service Level Agreements (SLA) for Online Services & Virtual Machines.',
      '[4] Google Cloud Platform. (2026). Cloud Architecture Center: High Availability and Disaster Recovery Design.',
      '[5] Oracle Corporation. (2026). Oracle VM VirtualBox User Manual: Hypervisor Core Internals.'
    ];
    refs.forEach(r => {
      doc.text(r, 18, currentY);
      currentY += 5;
    });

    // Signatures box
    currentY += 12;
    doc.setDrawColor(213, 220, 234);
    doc.line(15, currentY, 70, currentY);
    doc.line(pageWidth - 70, currentY, pageWidth - 15, currentY);
    doc.setFontSize(8.5);
    doc.setTextColor(PdfReportGenerator.TEXT_DARK[0], PdfReportGenerator.TEXT_DARK[1], PdfReportGenerator.TEXT_DARK[2]);
    doc.text('Student Signature (Herry Prajapati)', 15, currentY + 5);
    doc.text('Faculty Evaluator / Internal Examiner', pageWidth - 70, currentY + 5);

    // Apply header & footer to all content pages (skip cover page)
    const totalPages = doc.getNumberOfPages();
    for (let i = 2; i <= totalPages; i++) {
      doc.setPage(i);
      this.drawHeaderFooter(doc, i, totalPages, `${ala.id} Technical Report`);
    }

    return doc;
  }

  // Generate Complete Combined Portfolio Report (ALA 1 - 5)
  public static generateCombinedPortfolio(profile: StudentProfile = STUDENT_PROFILE): jsPDF {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    // 1. MASTER PORTFOLIO COVER PAGE
    this.drawCoverPage(doc, ALA_ACTIVITIES[0], profile, true);

    // 2. TABLE OF CONTENTS & STUDENT DECLARATION
    doc.addPage();
    let currentY = 25;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('Academic Portfolio Table of Contents', 15, currentY);
    currentY += 10;

    autoTable(doc, {
      startY: currentY,
      margin: { left: 15, right: 15 },
      head: [['ALA No.', 'Title of Activity', 'Category', 'Weightage', 'Status']],
      body: ALA_ACTIVITIES.map(a => [
        a.id,
        a.title,
        a.category,
        `${a.weightage}%`,
        'Completed & Documented'
      ]),
      theme: 'grid',
      headStyles: { fillColor: [38, 59, 128] },
      styles: { fontSize: 8.5, cellPadding: 3.5 }
    });

    currentY = (doc as any).lastAutoTable.finalY + 15;

    // Student Declaration Box
    doc.setFillColor(247, 248, 252);
    doc.setDrawColor(213, 220, 234);
    doc.roundedRect(15, currentY, pageWidth - 30, 45, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
    doc.text('CANDIDATE DECLARATION', 20, currentY + 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(PdfReportGenerator.TEXT_DARK[0], PdfReportGenerator.TEXT_DARK[1], PdfReportGenerator.TEXT_DARK[2]);
    const declText = `I, Herry Prajapati, Enrollment Number 20230905090031, student of Information Technology at Gyanmanjari Institute of Technology (GMIU), hereby declare that the work presented in this Cloud Computing ALA Portfolio is my original practical implementation and research. All experiments, configurations, and benchmarks have been conducted authentically without fabrication.`;
    doc.text(doc.splitTextToSize(declText, pageWidth - 45), 20, currentY + 18);

    // Append summaries for each ALA
    ALA_ACTIVITIES.forEach(ala => {
      doc.addPage();
      currentY = 25;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(PdfReportGenerator.PRIMARY[0], PdfReportGenerator.PRIMARY[1], PdfReportGenerator.PRIMARY[2]);
      doc.text(`${ala.id}: ${ala.title}`, 15, currentY);
      currentY += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(PdfReportGenerator.TEXT_DARK[0], PdfReportGenerator.TEXT_DARK[1], PdfReportGenerator.TEXT_DARK[2]);
      const desc = doc.splitTextToSize(ala.description + '\n\n' + ala.theory_summary, pageWidth - 30);
      doc.text(desc, 15, currentY);
      currentY += desc.length * 4.5 + 8;

      // Key Objectives
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(PdfReportGenerator.SECONDARY[0], PdfReportGenerator.SECONDARY[1], PdfReportGenerator.SECONDARY[2]);
      doc.text('Key Objectives & Practical Tools:', 15, currentY);
      currentY += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      ala.objectives.slice(0, 3).forEach((o, i) => {
        doc.text(`• ${o}`, 18, currentY);
        currentY += 5;
      });
      currentY += 4;

      // Implementation steps summary table
      autoTable(doc, {
        startY: currentY,
        margin: { left: 15, right: 15 },
        head: [['Step', 'Action', 'Execution Details / Command']],
        body: ala.implementation_steps.map(s => [
          `Step ${s.step}`,
          s.title,
          s.command || s.description
        ]),
        theme: 'striped',
        headStyles: { fillColor: [82, 105, 201] },
        styles: { fontSize: 8, cellPadding: 2.5 }
      });
    });

    // Add page numbers
    const totalPages = doc.getNumberOfPages();
    for (let i = 2; i <= totalPages; i++) {
      doc.setPage(i);
      this.drawHeaderFooter(doc, i, totalPages, 'GMIU Cloud Computing Portfolio (ALA 1-5)');
    }

    return doc;
  }
}
