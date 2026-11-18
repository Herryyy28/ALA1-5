import React from 'react';
import { SubmissionStatus } from '../../types';
import { Clock, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface Props {
  status: SubmissionStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<Props> = ({ status, size = 'md' }) => {
  const configs = {
    pending: {
      label: 'Pending',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      icon: Clock,
    },
    in_progress: {
      label: 'In Progress',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: AlertCircle,
    },
    submitted: {
      label: 'Submitted',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: CheckCircle2,
    },
    verified: {
      label: 'Verified & Graded',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      icon: ShieldCheck,
    },
  };

  const c = configs[status] || configs.pending;
  const Icon = c.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${c.bg} ${c.text} ${c.border} ${sizeClasses[size]}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{c.label}</span>
    </span>
  );
};
