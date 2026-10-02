import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, HelpCircle, Code, ListOrdered, CheckCircle2, AlertTriangle } from 'lucide-react';
import { GOOGLE_APPS_SCRIPT_CODE } from '../constants/gasScriptCode';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopySuccess: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  onCopySuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'code' | 'faq'>('steps');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#faf8f5] w-full max-w-3xl rounded-3xl border border-[#ede5db] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#f0ebe2] bg-white/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📖</span>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                구글 시트 연동 초보자 가이드
              </h2>
              <p className="text-xs text-slate-500">
                구글 스프레드시트를 나만의 무료 데이터베이스로 1분 만에 연결해보세요!
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-[#f0ebe2] bg-white/30 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('steps')}
            className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors ${
              activeTab === 'steps'
                ? 'border-rose-500 text-rose-600 bg-white/70 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>단계별 연동 가이드</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors ${
              activeTab === 'code'
                ? 'border-rose-500 text-rose-600 bg-white/70 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Apps Script 소스코드 복사</span>
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-colors ${
              activeTab === 'faq'
                ? 'border-rose-500 text-rose-600 bg-white/70 rounded-t-xl'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>자주 묻는 질문 & 팁</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'steps' && (
            <div className="space-y-4">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-slate-800">
                      새 구글 스프레드시트 만들기
                    </h3>
                  </div>
                  <a
                    href="https://sheets.new"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-1"
                  >
                    <span>sheets.new 열기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  구글 드라이브나 브라우저 주소창에 <strong>sheets.new</strong>를 입력해 새 스프레드시트를 만듭니다. 시트 이름은 원하는 이름(예: "파스텔 방명록 DB")으로 지정해주세요.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-slate-800">
                    Apps Script 편집기 열기
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  스프레드시트 상단 메뉴에서 <strong>[확장 프로그램] → [Apps Script]</strong>를 클릭합니다. 새로운 스크립트 편집기 탭이 열립니다.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-slate-800">
                      제공된 코드 붙여넣기 및 저장
                    </h3>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '복사 완료!' : '코드 복사'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  편집기에 있는 기존 <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-600">function myFunction() ...</code> 내용을 모두 지우고, 이 창의 <strong>[Apps Script 소스코드 복사]</strong> 탭에 있는 전체 코드를 붙여넣은 뒤 <strong>Ctrl + S (저장)</strong>를 누릅니다.
                </p>
              </div>

              {/* Step 4 & 5 */}
              <div className="bg-[#FFF8F3] rounded-2xl border border-[#FCDCC9] p-4.5 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#E07A5F] text-white font-bold text-xs flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-sm font-bold text-[#843E2B]">
                    웹 앱으로 배포하기 (⭐️ 가장 중요한 단계!)
                  </h3>
                </div>
                <div className="text-xs text-[#843E2B] space-y-2 pl-8 leading-relaxed">
                  <p>우측 상단 파란색 <strong>[배포]</strong> 버튼 클릭 후 <strong>[새 배포]</strong>를 선택합니다.</p>
                  <ul className="list-disc list-inside space-y-1 bg-white/70 p-3 rounded-xl border border-[#FFE3D6]">
                    <li>톱니바퀴 아이콘 클릭 → <strong>웹 앱(Web App)</strong> 선택</li>
                    <li>설명: <strong>방명록 API</strong> (자유롭게 입력)</li>
                    <li>다음 사용자로 실행: <strong>나(내 구글 계정)</strong></li>
                    <li>
                      액세스 권한이 있는 사용자: 반드시 <strong className="text-rose-600 font-extrabold underline">모든 사용자 (Anyone)</strong> 로 지정!
                    </li>
                  </ul>
                  <p className="text-[11px] opacity-80">
                    💡 '모든 사용자'로 설정해야 방문자가 로그인 없이 방명록을 읽고 쓸 수 있습니다.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">
                    5
                  </span>
                  <h3 className="text-sm font-bold text-slate-800">
                    생성된 웹 앱 URL 복사 및 연동
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  [배포]를 누르면 <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">https://script.google.com/macros/s/.../exec</code> 형태의 웹 앱 URL이 나타납니다. 이를 복사하여 이 앱의 <strong>[연동 설정]</strong> 창에 붙여넣으면 끝!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200/80">
                <div className="text-xs">
                  <p className="font-bold text-slate-800">Google Apps Script 전체 코드</p>
                  <p className="text-slate-500">doGet(글 읽기), doPost(글 쓰기), 시트 자동 초기화가 모두 포함되어 있습니다.</p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>복사 완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>코드 전체 복사하기</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 text-slate-200 shadow-inner">
                <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 text-[11px] font-mono flex items-center justify-between text-slate-400">
                  <span>Code.gs (Apps Script)</span>
                  <span>JavaScript</span>
                </div>
                <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed max-h-[380px] scrollbar-thin">
                  {GOOGLE_APPS_SCRIPT_CODE}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Q. 배포 후 연결 테스트 시 오류가 발생해요!</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  가장 흔한 원인은 배포 시 <strong>[액세스 권한이 있는 사용자]</strong>를 "나만"으로 둔 경우입니다. 반드시 <strong>"모든 사용자(Anyone)"</strong>로 설정해야 브라우저에서 데이터를 읽고 쓸 수 있습니다.
                  또한 첫 배포 시 구글 계정 권한 승인 팝업에서 [고급] → [안전하지 않은 페이지로 이동]을 눌러 권한을 허용해 주셔야 합니다.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Q. 시트의 데이터 열은 직접 만들어야 하나요?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  직접 만들 필요 없습니다! 제공된 스크립트의 <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-600">initSheetIfNeeded()</code> 함수가 시트가 비어있을 때 [등록일시, 작성자, 응원 한마디, 카드색상, 이모지] 5개 열을 예쁜 파스텔 피치색 헤더로 자동 생성합니다.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1.5">
                  <Code className="w-4 h-4 text-sky-500" />
                  <span>Q. 코드를 수정한 뒤에는 어떻게 하나요?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Apps Script 코드를 수정한 뒤에는 반드시 우측 상단 <strong>[배포] → [배포 관리]</strong>에서 연필 아이콘을 누르고 <strong>[버전: 새 버전]</strong>을 선택하여 재배포해야 수정된 코드가 즉시 적용됩니다.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#f0ebe2] bg-white/70 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            준비가 되셨다면 상단의 <strong>[연동 설정]</strong> 버튼을 눌러 URL을 입력하세요.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
