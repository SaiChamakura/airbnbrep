import React, { useState } from 'react';
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { NearbyStay } from '../types';

interface MoreStaysSectionProps {
  stays: NearbyStay[];
}

export const MoreStaysSection: React.FC<MoreStaysSectionProps> = ({ stays }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [savedStayIds, setSavedStayIds] = useState<Record<string, boolean>>({});

  const itemsPerPage = 3;
  const totalPages = Math.ceil(stays.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const toggleSaveStay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedStayIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Slice stays for the current minipage
  const displayedStays = stays.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section className="py-12 border-b border-[#EBEBEB]">
      {/* Header with Title and Arrow-only Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-[#222222]">
            More stays nearby
          </h2>
          <p className="text-sm text-[#717171] mt-1">
            Explore similar coastal villas in and around North Goa
          </p>
        </div>

        {/* Arrow-only Navigation Controls (Change #6) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#717171] mr-1 hidden sm:inline">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            aria-label="Previous stays"
            className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#222222] hover:border-black disabled:opacity-30 disabled:hover:border-[#DDDDDD] disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95 bg-white"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            aria-label="Next stays"
            className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#222222] hover:border-black disabled:opacity-30 disabled:hover:border-[#DDDDDD] disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95 bg-white"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 3 Stays Grid for current minipage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300">
        {displayedStays.map((stay) => {
          const isSaved = !!savedStayIds[stay.id];

          return (
            <div
              key={stay.id}
              className="group cursor-pointer flex flex-col space-y-3"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {/* Photo Container */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 border border-[#EBEBEB]">
                <img
                  src={stay.image}
                  alt={stay.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Heart Save Button */}
                <button
                  onClick={(e) => toggleSaveStay(stay.id, e)}
                  aria-label={isSaved ? 'Remove from saved' : 'Save this listing'}
                  className="absolute top-3 right-3 p-2 text-white hover:scale-110 active:scale-95 transition-transform cursor-pointer drop-shadow-md"
                >
                  <Heart
                    className={`w-6 h-6 stroke-[2] ${
                      isSaved
                        ? 'fill-[#FF385C] text-[#FF385C] stroke-[#FF385C]'
                        : 'text-white fill-black/30'
                    }`}
                  />
                </button>

                {/* Guest Favorite Badge */}
                {stay.isGuestFavorite && (
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#222222] text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                    Guest favorite
                  </div>
                )}
              </div>

              {/* Listing Details */}
              <div className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-[#222222] line-clamp-1 group-hover:underline">
                    {stay.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs shrink-0 font-semibold text-[#222222]">
                    <Star className="w-3.5 h-3.5 fill-current text-[#222222]" />
                    <span>{stay.rating.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-xs text-[#717171] leading-tight">{stay.subtitle}</p>
                <p className="text-xs text-[#717171]">{stay.dates}</p>

                {/* Pricing in Indian Rupees ₹ */}
                <div className="pt-1 text-sm">
                  <span className="font-extrabold text-[#222222]">
                    ₹{stay.pricePerNight.toLocaleString('en-IN')}
                  </span>{' '}
                  <span className="text-[#222222] text-xs font-normal">night</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
