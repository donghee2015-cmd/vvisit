import React, { useState } from 'react';
import { Send, Dices, Sparkles, Check, Loader2 } from 'lucide-react';
import { PastelColorId } from '../types';
import { PASTEL_THEMES, MOOD_EMOJIS, CUTE_NICKNAMES } from '../constants/gasScriptCode';

interface GuestbookFormProps {
  onSubmit: (data: { name: string; message: string; color: PastelColorId; mood: string }) => Promise<boolean>;
  isSubmitting: boolean;
  isConnected: boolean;
}

export const GuestbookForm: React.FC<GuestbookFormProps> = ({
  onSubmit,
  isSubmitting,
  isConnected,
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState<PastelColorId>('peach');
  const [selectedMood, setSelectedMood] = useState<string>('✨');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeTheme = PASTEL_THEMES[selectedColor];

  const handleRandomNickname = () => {
    const randomIndex = Math.floor(Math.random() * CUTE_NICKNAMES.length);
    setName(CUTE_NICKNAMES[randomIndex]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMsg('응원 한마디를 작성해 주세요!');
      return;
    }
    setErrorMsg(null);

    const success = await onSubmit({
      name: name.trim() || '익명의 친구',
      message: message.trim(),
      color: selectedColor,
      mood: selectedMood,
    });

    if (success) {
      setMessage('');
    }
  };

  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#efe9e0] p-6 sm:p-7 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.06)] transition-all"
      >
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">💌</span>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              따뜻한 응원 한마디 남기기
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {isConnected ? '구글 시트 즉시 저장' : '체험 모드 저장'}
          </span>
        </div>

        <div className="space-y-4">
          {/* Name & Random Generator */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">작성자 이름</label>
              <button
                type="button"
                onClick={handleRandomNickname}
                className="text-xs text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded hover:bg-rose-50"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>랜덤 닉네임</span>
              </button>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름이나 닉네임을 적어주세요 (비워두면 익명)"
              maxLength={20}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200/90 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">응원 메시지</label>
              <span className={`text-[11px] tabular-nums font-medium ${message.length > 180 ? 'text-rose-500' : 'text-slate-400'}`}>
                {message.length} / 200자
              </span>
            </div>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
              placeholder="오늘 하루를 위로하고 응원하는 따뜻한 말을 남겨보세요... (Ctrl + Enter로 바로 등록 가능)"
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 rounded-xl border border-slate-200/90 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all resize-none placeholder:text-slate-400"
            />
            {errorMsg && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errorMsg}</p>
            )}
          </div>

          {/* Customization: Color Theme & Mood Emoji */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Color Palette */}
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                카드 파스텔 색상
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {(Object.keys(PASTEL_THEMES) as PastelColorId[]).map((cId) => {
                  const theme = PASTEL_THEMES[cId];
                  const isSelected = selectedColor === cId;
                  return (
                    <button
                      key={cId}
                      type="button"
                      onClick={() => setSelectedColor(cId)}
                      className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? `${theme.bg} ${theme.border} ${theme.text} ring-2 ring-offset-1 ${theme.chipActiveBorder} shadow-xs font-semibold`
                          : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: theme.accent }}
                      />
                      <span>{theme.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mood Emoji */}
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                기분 & 무드 스티커
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {MOOD_EMOJIS.map((item) => {
                  const isSelected = selectedMood === item.emoji;
                  return (
                    <button
                      key={item.emoji}
                      type="button"
                      onClick={() => setSelectedMood(item.emoji)}
                      title={item.label}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all ${
                        isSelected
                          ? 'bg-rose-100/80 border border-rose-300 scale-105 shadow-xs'
                          : 'bg-white border border-slate-200/80 hover:bg-slate-50 opacity-80 hover:opacity-100'
                      }`}
                    >
                      {item.emoji}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Preview Strip */}
          <div className="pt-2">
            <span className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              실시간 카드 미리보기
            </span>
            <div
              className={`p-3.5 rounded-2xl border transition-all ${activeTheme.bg} ${activeTheme.border} ${activeTheme.text} flex items-center justify-between gap-3`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xl shrink-0">{selectedMood}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-tight truncate">
                    {name.trim() || '익명의 친구'}
                  </p>
                  <p className="text-xs mt-0.5 opacity-90 truncate">
                    {message.trim() || '작성 중인 응원 메시지가 여기에 표시됩니다.'}
                  </p>
                </div>
              </div>
              <span className="text-[10px] opacity-60 shrink-0 font-medium">방금 전</span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold text-sm shadow-[0_8px_20px_-4px_rgba(244,63,94,0.35)] hover:shadow-[0_12px_24px_-4px_rgba(244,63,94,0.45)] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>구글 시트에 저장하는 중...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>응원 메시지 등록하기</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
