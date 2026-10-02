import React, { useState } from 'react';
import { X, Check, Loader2, AlertCircle, Link2, ExternalLink, RotateCcw, HelpCircle } from 'lucide-react';
import { ConnectionStatus } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gasUrl: string;
  sheetUrl: string;
  onSave: (gasUrl: string, sheetUrl: string) => Promise<boolean>;
  onResetToDemo: () => void;
  onOpenGuide: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  gasUrl: initialGasUrl,
  sheetUrl: initialSheetUrl,
  onSave,
  onResetToDemo,
  onOpenGuide,
}) => {
  const [gasUrl, setGasUrl] = useState(initialGasUrl);
  const [sheetUrl, setSheetUrl] = useState(initialSheetUrl);
  const [testStatus, setTestStatus] = useState<ConnectionStatus>('disconnected');
  const [testMessage, setTestMessage] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    const trimmed = gasUrl.trim();
    if (!trimmed) {
      setTestStatus('error');
      setTestMessage('구글 앱스 스크립트 웹 앱 URL을 먼저 입력해 주세요.');
      return;
    }

    if (!trimmed.startsWith('https://script.google.com/macros/s/')) {
      setTestStatus('error');
      setTestMessage(
        '올바른 구글 앱스 스크립트 웹 앱 URL 형식이 아닙니다. (https://script.google.com/macros/s/.../exec)'
      );
      return;
    }

    setIsTesting(true);
    setTestStatus('testing');
    setTestMessage('구글 시트와 통신을 시도하는 중...');

    try {
      const response = await fetch(trimmed, {
        method: 'GET',
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
      }

      const json = await response.json();
      if (json.status === 'success') {
        setTestStatus('connected');
        setTestMessage(`연결 성공! 현재 시트에 저장된 글: ${json.count ?? json.data?.length ?? 0}개`);
      } else {
        setTestStatus('error');
        setTestMessage(`스크립트 오류: ${json.message || '알 수 없는 응답'}`);
      }
    } catch (err: any) {
      setTestStatus('error');
      setTestMessage(
        '연결 실패! 배포 설정에서 [액세스 권한: 모든 사용자(Anyone)]로 지정했는지 확인해 주세요.'
      );
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await onSave(gasUrl.trim(), sheetUrl.trim());
    setIsSaving(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#faf8f5] w-full max-w-lg rounded-3xl border border-[#ede5db] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#f0ebe2] bg-white/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">⚙️</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                구글 시트 연동 설정
              </h2>
              <p className="text-xs text-slate-500">
                배포한 Apps Script 웹 앱 URL을 등록하여 실시간 연동합니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Apps Script 웹 앱 URL <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={onOpenGuide}
                className="text-xs text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>URL 생성 방법</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="url"
                value={gasUrl}
                onChange={(e) => {
                  setGasUrl(e.target.value);
                  setTestStatus('disconnected');
                  setTestMessage(null);
                }}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Google Apps Script 편집기에서 [배포] → [새 배포] 후 생성된 웹 앱 URL
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              구글 스프레드시트 웹 링크 (선택사항)
            </label>
            <input
              type="url"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/.../edit"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              입력하면 헤더에서 언제든 내 스프레드시트로 바로 이동할 수 있습니다.
            </p>
          </div>

          {/* Test Connection Button & Status */}
          <div className="pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting || !gasUrl.trim()}
                className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-500" />
                    <span>연결 확인 중...</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>연결 테스트</span>
                  </>
                )}
              </button>
              {sheetUrl && (
                <a
                  href={sheetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>시트 열기</span>
                </a>
              )}
            </div>

            {testMessage && (
              <div
                className={`mt-3 p-3 rounded-xl text-xs flex items-start gap-2 border ${
                  testStatus === 'connected'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : testStatus === 'testing'
                    ? 'bg-sky-50 border-sky-200 text-sky-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {testStatus === 'connected' && <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                {testStatus === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                {testStatus === 'testing' && <Loader2 className="w-4 h-4 animate-spin text-sky-600 shrink-0 mt-0.5" />}
                <p className="flex-1 leading-relaxed">{testMessage}</p>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#f0ebe2] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                onResetToDemo();
                setGasUrl('');
                setSheetUrl('');
                setTestStatus('disconnected');
                setTestMessage(null);
                onClose();
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 py-2 px-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>체험 모드로 초기화</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors disabled:opacity-60"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>설정 저장하기</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
