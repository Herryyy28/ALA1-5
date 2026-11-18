# Script to update AlaDetail.tsx with rich, authentic views for ALA-1, ALA-2, ALA-3, ALA-4, and ALA-5
import re

with open('frontend/src/pages/AlaDetail.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update imports
old_mock_imports = '''import {
  BENCHMARK_SCENARIOS,
  SLA_COMPARISON_DATA,
  SECURITY_COMPARISON_DATA,
  ALA2_LAB_INSTANCES,
  ALA2_LAB_SCREENSHOTS
} from '../data/mockData';'''

new_mock_imports = '''import {
  BENCHMARK_SCENARIOS,
  SLA_COMPARISON_DATA,
  SECURITY_COMPARISON_DATA,
  ALA2_LAB_INSTANCES,
  ALA2_LAB_SCREENSHOTS,
  ALA1_APP_DETAILS,
  ALA2_VBOX_STEPS,
  ALA3_AZURE_REVIEW,
  ALA4_AWS_CASE_STUDY,
  ALA5_PERF_OPTIMIZATION
} from '../data/mockData';'''

if old_mock_imports in content:
    content = content.replace(old_mock_imports, new_mock_imports)
    print("Updated mockData imports")

# Update lucide-react imports if needed
old_lucide_imports = '''import {
  Cloud,
  Server,
  ShieldCheck,
  FileCheck2,
  FileText,
  Gauge,
  FileDown,
  CheckCircle2,
  Clock,
  Play,
  Terminal,
  Upload,
  AlertCircle,
  Copy,
  Check,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  Maximize2,
  X,
  Download,
  HardDrive
} from 'lucide-react';'''

new_lucide_imports = '''import {
  Cloud,
  Server,
  ShieldCheck,
  FileCheck2,
  FileText,
  Gauge,
  FileDown,
  CheckCircle2,
  Clock,
  Play,
  Terminal,
  Upload,
  AlertCircle,
  Copy,
  Check,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  Maximize2,
  X,
  Download,
  HardDrive,
  ExternalLink,
  Lock,
  Globe,
  Radio,
  TrendingDown,
  TrendingUp,
  Sliders,
  Sparkles,
  Zap
} from 'lucide-react';'''

if old_lucide_imports in content:
    content = content.replace(old_lucide_imports, new_lucide_imports)
    print("Updated lucide imports")

# 2. Add state variables
state_target = '''  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; description: string } | null>(null);
  const [showLogViewer, setShowLogViewer] = useState(false);'''

state_replacement = '''  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; description: string } | null>(null);
  const [showLogViewer, setShowLogViewer] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string>('A');
  const [ala2SubTab, setAla2SubTab] = useState<'vbox' | 'cgroups'>('vbox');
  const [ala5StrategyIdx, setAla5StrategyIdx] = useState<number>(3);'''

if state_target in content:
    content = content.replace(state_target, state_replacement)
    print("Added state variables")

with open('frontend/src/pages/AlaDetail.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Saved preliminary updates to AlaDetail.tsx")
