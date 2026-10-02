import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-[#F2FAF6] border-[#D1F2E2] text-[#205C3F]',
    error: 'bg-[#FFF4F4] border-[#FCD6D6] text-[#9A2D2D]',
    info: 'bg-[#F2F8FE] border-[#D6E9FD] text-[#23507B]',
  }[toast.type];

  const icon = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0" />,
  }[toast.type];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-subtle">
      <div
        className={`flex items-start gap-3 p-4 rounded-2xl border shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all ${bgStyles}`}
      >
        {icon}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight">{toast.title}</p>
          {toast.message && (
            <p className="text-xs mt-1 opacity-80 leading-relaxed break-words">{toast.message}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/5 transition-colors opacity-70 hover:opacity-100"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
