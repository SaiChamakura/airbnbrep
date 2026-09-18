import React from 'react';
import { Share, Heart } from 'lucide-react';

interface PropertyHeaderProps {
  title: string;
  isSaved: boolean;
  onToggleSave: () => void;
  onShareClick: () => void;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  title,
  isSaved,
  onToggleSave,
  onShareClick,
}) => {
  return (
    <section className="pt-6 pb-4">
      {/* Title and Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-[26px] md:text-[28px] font-medium text-[#222222] tracking-tight leading-snug flex-1">
          {title}
        </h1>

        <div className="flex items-center gap-4 shrink-0 self-start md:self-center">
          <button
            onClick={onShareClick}
            className="flex items-center gap-2 text-sm font-medium text-[#222222] hover:bg-[#F7F7F7] px-2 py-1.5 rounded-lg transition-colors underline underline-offset-4 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#222222]"
            aria-label="Share this listing"
          >
            <Share className="w-4 h-4 stroke-[1.8]" />
            <span>Share</span>
          </button>

          <button
            onClick={onToggleSave}
            className="flex items-center gap-2 text-sm font-medium text-[#222222] hover:bg-[#F7F7F7] px-2 py-1.5 rounded-lg transition-colors underline underline-offset-4 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#222222]"
            aria-label={isSaved ? 'Remove from saved' : 'Save this listing'}
          >
            <Heart
              className={`w-4 h-4 stroke-[1.8] transition-transform active:scale-125 ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-[#222222]'
              }`}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
