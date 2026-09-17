import React from 'react';
import { Sparkles, CheckCircle2, Key, MessageSquare, MapPin, Tag } from 'lucide-react';
import { LaurelBranchLeft, LaurelBranchRight } from './LaurelIcon';

interface GuestFavoriteSectionProps {
  rating: number;
  reviewCount: number;
  ratingsBreakdown: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
}

export const GuestFavoriteSection: React.FC<GuestFavoriteSectionProps> = ({
  rating,
  reviewCount,
  ratingsBreakdown,
}) => {
  return (
    <section className="pt-12 pb-6 border-b border-[#EBEBEB]">
      {/* Huge Guest Favorite Centerpiece with Authentic Laurel Wreath */}
      <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-3 md:gap-5 text-[#222222] mb-3">
          <LaurelBranchLeft className="w-10 h-16 md:w-14 md:h-24 text-[#222222]" />
          <div className="text-6xl md:text-7xl font-extrabold tracking-tight text-[#222222] px-2 font-serif select-none">
            {rating.toFixed(2)}
          </div>
          <LaurelBranchRight className="w-10 h-16 md:w-14 md:h-24 text-[#222222]" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#222222] mb-2">
          Guest favourite
        </h2>

        <p className="text-base text-[#717171] max-w-md mx-auto leading-relaxed">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>

        <button
          onClick={() => alert('Airbnb guest favorite badge criteria: top 5% of listings on Airbnb based on ratings, reviews, and reliability.')}
          className="mt-3 text-sm font-semibold text-[#222222] underline hover:text-black cursor-pointer"
        >
          How reviews work
        </button>
      </div>

      {/* 6 Category Rating Cards + Overall Rating Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 divide-y sm:divide-y-0 sm:divide-x divide-[#EBEBEB] border-t border-[#EBEBEB] pt-6 pb-2">
        {/* Overall rating bar */}
        <div className="p-3 flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#222222] mb-1">Overall rating</div>
          <div className="space-y-1 my-2 text-[11px] text-[#717171]">
            {[
              { num: 5, w: '95%' },
              { num: 4, w: '5%' },
              { num: 3, w: '0%' },
              { num: 2, w: '0%' },
              { num: 1, w: '0%' },
            ].map((row) => (
              <div key={row.num} className="flex items-center gap-1.5">
                <span className="w-2">{row.num}</span>
                <div className="flex-1 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
                  <div className="bg-[#222222] h-full" style={{ width: row.w }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cleanliness */}
        <div className="p-3 text-left flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#222222]">Cleanliness</div>
          <div className="text-lg font-bold text-[#222222] my-1">
            {ratingsBreakdown.cleanliness.toFixed(1)}
          </div>
          <Sparkles className="w-6 h-6 text-[#222222] stroke-[1.8]" />
        </div>

        {/* Accuracy */}
        <div className="p-3 text-left flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#222222]">Accuracy</div>
          <div className="text-lg font-bold text-[#222222] my-1">
            {ratingsBreakdown.accuracy.toFixed(1)}
          </div>
          <CheckCircle2 className="w-6 h-6 text-[#222222] stroke-[1.8]" />
        </div>

        {/* Check-in */}
        <div className="p-3 text-left flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#222222]">Check-in</div>
          <div className="text-lg font-bold text-[#222222] my-1">
            {ratingsBreakdown.checkIn.toFixed(1)}
          </div>
          <Key className="w-6 h-6 text-[#222222] stroke-[1.8]" />
        </div>

        {/* Communication */}
        <div className="p-3 text-left flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#222222]">Communication</div>
          <div className="text-lg font-bold text-[#222222] my-1">
            {ratingsBreakdown.communication.toFixed(1)}
          </div>
          <MessageSquare className="w-6 h-6 text-[#222222] stroke-[1.8]" />
        </div>

        {/* Location */}
        <div className="p-3 text-left flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#222222]">Location</div>
          <div className="text-lg font-bold text-[#222222] my-1">
            {ratingsBreakdown.location.toFixed(1)}
          </div>
          <MapPin className="w-6 h-6 text-[#222222] stroke-[1.8]" />
        </div>

        {/* Value */}
        <div className="p-3 text-left flex flex-col justify-between">
          <div className="text-xs font-semibold text-[#222222]">Value</div>
          <div className="text-lg font-bold text-[#222222] my-1">
            {ratingsBreakdown.value.toFixed(1)}
          </div>
          <Tag className="w-6 h-6 text-[#222222] stroke-[1.8]" />
        </div>
      </div>
    </section>
  );
};
