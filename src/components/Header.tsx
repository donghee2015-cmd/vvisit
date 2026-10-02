import React from 'react';
import { BookOpen, Settings, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';
import { ConnectionStatus } from '../types';

interface HeaderProps {
  status: ConnectionStatus;
  gasUrl: string;
  sheetUrl: string;
  isLoading: boolean;
  onRefresh: () => void;
  onOpenSettings: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  status,
  gasUrl,
  sheetUrl,
  isLoading,
  onRefresh,
  onOpenSettings,
  onOpenGuide,
}) => {
  const isConnected = Boolean(gasUrl && status === 'connected');

  return (
    <header className="sticky top-0 z-30 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#f0ebe3] px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FFE5D8] to-[#FFEBE5] border border-[#FFD9C6] flex items-center justify-center shadow-sm text-lg">
            🌸
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
              파스텔 방명록
              <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border border-slate-200/80 bg-white/70 text-slate-600">
                Google Sheets DB
              </span>
            </h1>
          </div>
        </div>

        {/* Center / Status Zone */}
        <div className="hidden md:flex items-center gap-2 text-xs">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${
              isConnected
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            {isConnected ? '구글 시트 실시간 연동됨' : '체험 모드 (로컬 저장)'}
          </div>

          {sheetUrl && (
            <a
              href={sheetUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors px-2 py-1 rounded-md hover:bg-slate-100"
            >
              <span>시트 열기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Actions Zone */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 transition-all flex items-center gap-1.5 text-xs font-medium shadow-xs disabled:opacity-60"
            title="새로고침"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-rose-500' : ''}`} />
            <span className="hidden sm:inline">새로고침</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/80 hover:bg-rose-100 text-rose-700 transition-all flex items-center gap-1.5 text-xs font-medium shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">연동 가이드 & 코드</span>
            <span className="sm:hidden">가이드</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white transition-all flex items-center gap-1.5 text-xs font-medium shadow-xs"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">연동 설정</span>
            <span className="sm:hidden">설정</span>
          </button>
        </div>
      </div>
    </header>
  );
};
