import React from 'react';
import { Sparkles, ShieldCheck, Key, MessageSquare, MapPin, Tag, Star } from 'lucide-react';

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

// Official Airbnb Laurel Wreath SVGs
export const LaurelLeftSVG: React.FC<{ className?: string }> = ({ className = 'w-10 h-16' }) => (
  <svg
    viewBox="0 0 40 70"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M36 68c-1.8-6-4.5-12.2-8.5-17.5-4-5.3-9-9.8-13.8-14.8-4.7-4.9-8.5-11-9.5-17.7-.6-4.3.2-8.8 2.2-12.6C8.4 1.5 12 0 16 0c.5 3-1 6-2.5 8.5-2.2 3.8-5 7.2-7.5 11-3.2 5-5.2 10.7-5.5 16.5-.4 6 1.3 12 4.2 17.2 3.2 5.6 7.8 10.2 12.8 14.5 2.7 2.3 5.5 4.5 8.5 6.3z" />
    <path d="M28 20c-3-3-7-4.5-11-4 1.5 3 4 5.5 7 6.5 2 .7 4.2.2 4-2.5z" />
    <path d="M34 32c-3.5-2-7.5-2.5-11-1 1.2 3 3.5 5.5 6.5 6.5 2.2.8 4.7 0 4.5-5.5z" />
    <path d="M37 46c-3.8-1.5-8-1-11.5 1 1 3 3 5.5 6 6.5 2.5.8 5.5-.2 5.5-7.5z" />
  </svg>
);

export const LaurelRightSVG: React.FC<{ className?: string }> = ({ className = 'w-10 h-16' }) => (
  <svg
    viewBox="0 0 40 70"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 68c1.8-6 4.5-12.2 8.5-17.5 4-5.3 9-9.8 13.8-14.8 4.7-4.9 8.5-11 9.5-17.7.6-4.3-.2-8.8-2.2-12.6C31.6 1.5 28 0 24 0c-.5 3 1 6 2.5 8.5 2.2 3.8 5 7.2 7.5 11 3.2 5 5.2 10.7 5.5 16.5.4 6-1.3 12-4.2 17.2-3.2 5.6-7.8 10.2-12.8 14.5-2.7 2.3-5.5 4.5-8.5 6.3z" />
    <path d="M12 20c3-3 7-4.5 11-4-1.5 3-4 5.5-7 6.5-2 .7-4.2.2-4-2.5z" />
    <path d="M6 32c3.5-2 7.5-2.5 11-1-1.2 3-3.5 5.5-6.5 6.5-2.2.8-4.7 0-4.5-5.5z" />
    <path d="M3 46c3.8-1.5 8-1 11.5 1-1 3-3 5.5-6 6.5-2.5.8-5.5-.2-5.5-7.5z" />
  </svg>
);

export const GuestFavoriteSection: React.FC<GuestFavoriteSectionProps> = ({
  rating,
  reviewCount,
  ratingsBreakdown,
}) => {
  return (
    <section className="py-10 border-b border-[#EBEBEB]">
      {/* Huge Guest Favorite Centerpiece */}
      <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-10">
        <div className="flex items-center gap-3 text-[#222222] mb-3">
          <LaurelLeftSVG className="w-10 h-16 text-[#222222]" />
          <div className="text-center px-2">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#222222]">
              Guest favorite
            </h2>
          </div>
          <LaurelRightSVG className="w-10 h-16 text-[#222222]" />
        </div>

        <p className="text-lg md:text-xl text-[#717171] font-medium max-w-lg mx-auto">
          One of the most loved homes on Airbnb, according to guests
        </p>

        {/* Overall Rating & Reviews Display */}
        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-[#222222] flex items-center justify-center gap-2">
              <span>{rating.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-center gap-1 mt-1 text-[#222222]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-[#222222]" />
              ))}
            </div>
          </div>

          <div className="h-12 w-px bg-[#DDDDDD]" />

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-[#222222]">
              {reviewCount}
            </div>
            <div className="text-sm font-semibold text-[#717171] underline mt-1 cursor-pointer">
              Reviews
            </div>
          </div>
        </div>
      </div>

      {/* 6 Category Rating Cards in a Horizontal Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-[#EBEBEB] border-y border-[#EBEBEB] py-6">
        {/* Cleanliness */}
        <div className="p-4 text-center flex flex-col items-center justify-between">
          <div className="text-sm font-semibold text-[#222222] mb-2">Overall rating</div>
          <div className="text-xl font-bold text-[#222222] mb-2">
            {ratingsBreakdown.cleanliness.toFixed(1)}
          </div>
          <Sparkles className="w-7 h-7 text-[#222222] stroke-[1.8]" />
          <div className="text-xs text-[#717171] mt-2 font-medium">Cleanliness</div>
        </div>

        {/* Accuracy */}
        <div className="p-4 text-center flex flex-col items-center justify-between">
          <div className="text-sm font-semibold text-[#222222] mb-2">Accuracy</div>
          <div className="text-xl font-bold text-[#222222] mb-2">
            {ratingsBreakdown.accuracy.toFixed(1)}
          </div>
          <ShieldCheck className="w-7 h-7 text-[#222222] stroke-[1.8]" />
          <div className="text-xs text-[#717171] mt-2 font-medium">Accuracy</div>
        </div>

        {/* Check-in */}
        <div className="p-4 text-center flex flex-col items-center justify-between">
          <div className="text-sm font-semibold text-[#222222] mb-2">Check-in</div>
          <div className="text-xl font-bold text-[#222222] mb-2">
            {ratingsBreakdown.checkIn.toFixed(1)}
          </div>
          <Key className="w-7 h-7 text-[#222222] stroke-[1.8]" />
          <div className="text-xs text-[#717171] mt-2 font-medium">Check-in</div>
        </div>

        {/* Communication */}
        <div className="p-4 text-center flex flex-col items-center justify-between">
          <div className="text-sm font-semibold text-[#222222] mb-2">Communication</div>
          <div className="text-xl font-bold text-[#222222] mb-2">
            {ratingsBreakdown.communication.toFixed(1)}
          </div>
          <MessageSquare className="w-7 h-7 text-[#222222] stroke-[1.8]" />
          <div className="text-xs text-[#717171] mt-2 font-medium">Communication</div>
        </div>

        {/* Location */}
        <div className="p-4 text-center flex flex-col items-center justify-between">
          <div className="text-sm font-semibold text-[#222222] mb-2">Location</div>
          <div className="text-xl font-bold text-[#222222] mb-2">
            {ratingsBreakdown.location.toFixed(1)}
          </div>
          <MapPin className="w-7 h-7 text-[#222222] stroke-[1.8]" />
          <div className="text-xs text-[#717171] mt-2 font-medium">Location</div>
        </div>

        {/* Value */}
        <div className="p-4 text-center flex flex-col items-center justify-between">
          <div className="text-sm font-semibold text-[#222222] mb-2">Value</div>
          <div className="text-xl font-bold text-[#222222] mb-2">
            {ratingsBreakdown.value.toFixed(1)}
          </div>
          <Tag className="w-7 h-7 text-[#222222] stroke-[1.8]" />
          <div className="text-xs text-[#717171] mt-2 font-medium">Value</div>
        </div>
      </div>
    </section>
  );
};
