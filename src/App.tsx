import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  RefreshCw,
  BookOpen,
  Settings,
  Heart,
  ExternalLink,
  MessageSquareHeart,
  SlidersHorizontal,
  ChevronDown,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { GuestbookEntry, PastelColorId, ConnectionStatus } from './types';
import {
  INITIAL_DEMO_ENTRIES,
  PASTEL_THEMES,
} from './constants/gasScriptCode';
import { Header } from './components/Header';
import { GuestbookForm } from './components/GuestbookForm';
import { GuestbookCard } from './components/GuestbookCard';
import { GuideModal } from './components/GuideModal';
import { SettingsModal } from './components/SettingsModal';
import { Toast, ToastMessage } from './components/Toast';

const STORAGE_KEY_GAS_URL = 'pastel_guestbook_gas_url';
const STORAGE_KEY_SHEET_URL = 'pastel_guestbook_sheet_url';
const STORAGE_KEY_DEMO_ENTRIES = 'pastel_guestbook_demo_entries';

export default function App() {
  // Config & URLs
  const [gasUrl, setGasUrl] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_GAS_URL) || '';
  });
  const [sheetUrl, setSheetUrl] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_SHEET_URL) || '';
  });

  // Data & State
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    if (!gasUrl) {
      const saved = localStorage.getItem(STORAGE_KEY_DEMO_ENTRIES);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return INITIAL_DEMO_ENTRIES;
        }
      }
      return INITIAL_DEMO_ENTRIES;
    }
    return [];
  });

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    gasUrl ? 'testing' : 'disconnected'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Modals
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColorFilter, setSelectedColorFilter] = useState<PastelColorId | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');

  const showToast = useCallback(
    (type: 'success' | 'error' | 'info', title: string, message?: string) => {
      setToast({
        id: Date.now().toString(),
        type,
        title,
        message,
      });
    },
    []
  );

  // Fetch entries from Google Apps Script
  const fetchSheetEntries = useCallback(
    async (urlToFetch = gasUrl) => {
      if (!urlToFetch) {
        setConnectionStatus('disconnected');
        return;
      }

      setIsLoading(true);
      setConnectionStatus('testing');

      try {
        const response = await fetch(urlToFetch, {
          method: 'GET',
          redirect: 'follow',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (data.status === 'success' && Array.isArray(data.data)) {
          setEntries(data.data);
          setConnectionStatus('connected');
        } else {
          throw new Error(data.message || '데이터 형식 오류');
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setConnectionStatus('error');
        showToast(
          'error',
          '시트 데이터를 불러오지 못했습니다.',
          '배포 설정에서 [액세스 권한: 모든 사용자]로 배포되었는지 확인해주세요.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [gasUrl, showToast]
  );

  // Initialize on mount
  useEffect(() => {
    if (gasUrl) {
      fetchSheetEntries(gasUrl);
    }
  }, [gasUrl, fetchSheetEntries]);

  // Handle new post submit
  const handleSubmitPost = async (data: {
    name: string;
    message: string;
    color: PastelColorId;
    mood: string;
  }): Promise<boolean> => {
    setIsSubmitting(true);

    try {
      if (gasUrl) {
        // Real Google Apps Script POST request
        const response = await fetch(gasUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(data),
          redirect: 'follow',
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        showToast('success', '구글 시트에 등록 완료! ✨', '작성하신 응원 글이 실시간으로 시트에 추가되었습니다.');
        // Re-fetch to get newest synchronized list
        await fetchSheetEntries(gasUrl);
        return true;
      } else {
        // Demo Mode (LocalStorage)
        await new Promise((resolve) => setTimeout(resolve, 500)); // subtle network feel
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
          now.getDate()
        ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
          now.getMinutes()
        ).padStart(2, '0')}`;

        const newEntry: GuestbookEntry = {
          id: 'demo-' + Date.now(),
          timestamp: dateStr,
          name: data.name,
          message: data.message,
          color: data.color,
          mood: data.mood,
          likes: 1,
        };

        const updated = [newEntry, ...entries];
        setEntries(updated);
        localStorage.setItem(STORAGE_KEY_DEMO_ENTRIES, JSON.stringify(updated));

        showToast(
          'success',
          '응원 글이 등록되었습니다! 🌸',
          '체험 모드에 저장되었습니다. 구글 시트에 직접 저장하려면 [연동 설정]을 등록해보세요.'
        );
        return true;
      }
    } catch (err: any) {
      console.error('Submit error:', err);
      showToast(
        'error',
        '등록에 실패했습니다.',
        '구글 시트 연동 설정이나 네트워크 연결을 확인해주세요.'
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save Settings
  const handleSaveSettings = async (newGasUrl: string, newSheetUrl: string) => {
    setGasUrl(newGasUrl);
    setSheetUrl(newSheetUrl);
    localStorage.setItem(STORAGE_KEY_GAS_URL, newGasUrl);
    localStorage.setItem(STORAGE_KEY_SHEET_URL, newSheetUrl);

    if (newGasUrl) {
      await fetchSheetEntries(newGasUrl);
      showToast('success', '연동 설정이 저장되었습니다!');
    } else {
      setConnectionStatus('disconnected');
      showToast('info', '체험 모드로 전환되었습니다.');
    }
    return true;
  };

  // Reset to Demo
  const handleResetToDemo = () => {
    localStorage.removeItem(STORAGE_KEY_GAS_URL);
    localStorage.removeItem(STORAGE_KEY_SHEET_URL);
    localStorage.removeItem(STORAGE_KEY_DEMO_ENTRIES);
    setGasUrl('');
    setSheetUrl('');
    setEntries(INITIAL_DEMO_ENTRIES);
    setConnectionStatus('disconnected');
    showToast('info', '체험 모드로 초기화되었습니다.');
  };

  // Filtered and Sorted entries
  const filteredEntries = useMemo(() => {
    return entries
      .filter((item) => {
        const matchesColor =
          selectedColorFilter === 'all' || item.color === selectedColorFilter;
        const matchesQuery =
          !searchQuery.trim() ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.message.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesColor && matchesQuery;
      })
      .sort((a, b) => {
        if (sortOrder === 'latest') {
          return String(b.timestamp).localeCompare(String(a.timestamp));
        } else {
          return String(a.timestamp).localeCompare(String(b.timestamp));
        }
      });
  }, [entries, searchQuery, selectedColorFilter, sortOrder]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-slate-800 selection:bg-rose-200">
      {/* Top Bar Contract */}
      <Header
        status={connectionStatus}
        gasUrl={gasUrl}
        sheetUrl={sheetUrl}
        isLoading={isLoading}
        onRefresh={() => {
          if (gasUrl) {
            fetchSheetEntries(gasUrl);
            showToast('info', '구글 시트 데이터를 새로고침했습니다.');
          } else {
            showToast('info', '체험 모드 데이터입니다.');
          }
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-8">
        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50/80 border border-rose-200/80 text-rose-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>구글 스프레드시트 실시간 연동 방명록</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            따뜻한 온기를 나누는 <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-rose-400">
              파스텔 방명록
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            작성된 응원과 소중한 메시지는 별도의 복잡한 서버 없이도{' '}
            <strong className="text-slate-800 font-semibold">구글 스프레드시트</strong>에 즉시 영구 저장됩니다.
          </p>
        </section>

        {/* Demo Mode Notice Banner (Dismissible) */}
        {!gasUrl && !isBannerDismissed && (
          <aside className="relative bg-gradient-to-r from-[#FFF5EE] via-[#FFF9F2] to-[#F7F4FD] rounded-2xl border border-[#FFE2D1] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0 mt-0.5">💡</span>
              <div className="text-xs text-[#843E2B]">
                <p className="font-bold text-sm text-[#843E2B] mb-0.5">
                  현재는 체험 모드로 동작하고 있습니다
                </p>
                <p className="opacity-90 leading-relaxed">
                  지금 바로 글을 남기실 수도 있고, 나만의 구글 스프레드시트 URL을 연동하면 실제 시트에 실시간으로 차곡차곡 데이터가 저장됩니다!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => setIsGuideOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>1분 가이드 보기</span>
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>URL 등록하기</span>
              </button>
              <button
                onClick={() => setIsBannerDismissed(true)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-black/5"
                title="배너 닫기"
              >
                ✕
              </button>
            </div>
          </aside>
        )}

        {/* Form Container */}
        <GuestbookForm
          onSubmit={handleSubmitPost}
          isSubmitting={isSubmitting}
          isConnected={Boolean(gasUrl && connectionStatus === 'connected')}
        />

        {/* Board Section: Search, Filters, and Grid */}
        <section className="space-y-5 pt-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/70 backdrop-blur-xs p-3.5 sm:p-4 rounded-2xl border border-[#ede5db] shadow-xs">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="작성자나 응원 메시지 검색..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200/80 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Tabs & Sort */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {/* Color filter dropdown or segmented buttons */}
              <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedColorFilter('all')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                    selectedColorFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  전체 ({entries.length})
                </button>
                {(Object.keys(PASTEL_THEMES) as PastelColorId[]).map((cId) => {
                  const theme = PASTEL_THEMES[cId];
                  const count = entries.filter((e) => e.color === cId).length;
                  if (count === 0 && selectedColorFilter !== cId) return null;
                  return (
                    <button
                      key={cId}
                      onClick={() => setSelectedColorFilter(cId)}
                      className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                        selectedColorFilter === cId
                          ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.accent }}
                      />
                      <span className="hidden md:inline">{theme.name}</span>
                      <span className="tabular-nums text-[10px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Sort selector */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'latest' | 'oldest')}
                className="px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-200"
              >
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
              </select>
            </div>
          </div>

          {/* Cards Grid or Empty State */}
          {isLoading && entries.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-rose-400 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-slate-700">
                구글 시트에서 방명록 글을 불러오는 중입니다...
              </p>
            </div>
          ) : filteredEntries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEntries.map((entry) => (
                <GuestbookCard
                  key={entry.id}
                  entry={entry}
                  onCopySuccess={() =>
                    showToast('success', '응원 메시지가 복사되었습니다!')
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white/50 rounded-3xl border border-[#efe9e0] space-y-3">
              <span className="text-4xl">🍃</span>
              <h3 className="text-base font-bold text-slate-700">
                {searchQuery || selectedColorFilter !== 'all'
                  ? '조건에 맞는 방명록 글이 없습니다.'
                  : '아직 등록된 방명록이 없습니다.'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {searchQuery || selectedColorFilter !== 'all'
                  ? '검색어나 필터를 초기화해 보세요.'
                  : '상단의 입력창에서 첫 번째 따뜻한 응원 한마디를 남겨보세요!'}
              </p>
              {(searchQuery || selectedColorFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedColorFilter('all');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                >
                  필터 초기화
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#f0ebe2] bg-white/40 py-6 px-4 sm:px-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="flex items-center gap-1.5">
            <span>🌸 파스텔 방명록</span>
            <span aria-hidden="true">·</span>
            <span>Google Apps Script & Spreadsheet Database</span>
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-rose-600 transition-colors"
            >
              초보자 가이드 & 코드
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-rose-600 transition-colors"
            >
              연동 설정
            </button>
            {sheetUrl && (
              <a
                href={sheetUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-rose-600 transition-colors flex items-center gap-0.5"
              >
                <span>내 구글 시트</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </footer>

      {/* Modals & Toast */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onCopySuccess={() =>
          showToast('success', 'Apps Script 코드가 복사되었습니다! 📋')
        }
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        gasUrl={gasUrl}
        sheetUrl={sheetUrl}
        onSave={handleSaveSettings}
        onResetToDemo={handleResetToDemo}
        onOpenGuide={() => {
          setIsSettingsOpen(false);
          setIsGuideOpen(true);
        }}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
