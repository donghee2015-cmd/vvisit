import React, { useState } from 'react';
import { Heart, Copy, Check } from 'lucide-react';
import { GuestbookEntry } from '../types';
import { PASTEL_THEMES } from '../constants/gasScriptCode';

interface GuestbookCardProps {
  entry: GuestbookEntry;
  onCopySuccess: () => void;
}

export const GuestbookCard: React.FC<GuestbookCardProps> = ({ entry, onCopySuccess }) => {
  const [likes, setLikes] = useState(entry.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const theme = PASTEL_THEMES[entry.color] || PASTEL_THEMES.peach;

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => Math.max(0, prev - 1));
      setHasLiked(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${entry.message}" - ${entry.name}`);
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <article
      className={`group relative rounded-3xl border p-5 sm:p-6 transition-all duration-300 ${theme.bg} ${theme.border} ${theme.shadow} hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between`}
    >
      <div>
        {/* Header row: Author + Mood */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl select-none" role="img" aria-label="mood">
              {entry.mood || '✨'}
            </span>
            <div className="min-w-0">
              <h3 className={`font-bold text-sm sm:text-base leading-snug truncate ${theme.text}`}>
                {entry.name || '익명'}
              </h3>
              <div className={`flex items-center gap-1.5 text-[11px] ${theme.subtext}`}>
                <span>{entry.timestamp || '방금 전'}</span>
              </div>
            </div>
          </div>

          {/* Quick Copy button */}
          <button
            onClick={handleCopy}
            className={`opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-black/5 transition-opacity ${theme.subtext}`}
            title="응원글 복사하기"
            aria-label="응원글 복사하기"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Message body */}
        <p
          className={`text-sm sm:text-[14.5px] leading-relaxed break-words whitespace-pre-line font-normal ${theme.text}`}
        >
          {entry.message}
        </p>
      </div>

      {/* Footer row: Likes action */}
      <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
        <span className={`text-[11px] font-medium opacity-60 ${theme.subtext}`}>
          파스텔 카드
        </span>

        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
            hasLiked
              ? 'bg-rose-500/10 text-rose-600 scale-105'
              : 'hover:bg-black/5 opacity-75 hover:opacity-100'
          }`}
          style={{ color: hasLiked ? undefined : theme.accent }}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-transform ${
              hasLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''
            }`}
          />
          <span className="tabular-nums font-semibold">{likes}</span>
        </button>
      </div>
    </article>
  );
};
