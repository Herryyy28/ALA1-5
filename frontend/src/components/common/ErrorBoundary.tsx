import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      console.warn('Storage clear error:', e);
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-white rounded-2xl border border-[#E8EAF2] shadow-xl p-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[#172033]">Application Recovery</h2>
              <p className="text-xs text-[#778198]">
                A client-side initialization anomaly was prevented. Click below to safely reset cache and reload.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-left overflow-x-auto text-[11px] font-mono text-red-700 max-h-32">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-[#263B80] hover:bg-[#1E2E65] text-white text-xs font-bold transition-all shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Cache & Reload Suite</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
