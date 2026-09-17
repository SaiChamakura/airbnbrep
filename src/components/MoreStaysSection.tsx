import React, { useState } from 'react';
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { NearbyStay } from '../types';

interface MoreStaysSectionProps {
  stays: NearbyStay[];
}

export const MoreStaysSection: React.FC<MoreStaysSectionProps> = ({ stays }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [savedStayIds, setSavedStayIds] = useState<Record<string, boolean>>({});

  const totalPages = 2;

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const toggleSaveStay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedStayIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-12 border-b border-[#EBEBEB]">
      {/* Header with Title and Pagination Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-bold text-[#222222]">
            More stays nearby
          </h2>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#222222] mr-1">
            {currentPage}/{totalPages}
          </span>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            aria-label="Previous stays"
            className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#222222] hover:border-black disabled:opacity-30 disabled:hover:border-[#DDDDDD] disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95 bg-white"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            aria-label="Next stays"
            className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#222222] hover:border-black disabled:opacity-30 disabled:hover:border-[#DDDDDD] disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95 bg-white"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 5 Stays Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stays.map((stay) => {
          const isSaved = !!savedStayIds[stay.id];

          return (
            <div
              key={stay.id}
              className="group cursor-pointer flex flex-col space-y-2.5"
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
                  className="absolute top-2.5 right-2.5 p-1.5 text-white hover:scale-110 active:scale-95 transition-transform cursor-pointer drop-shadow-md"
                >
                  <Heart
                    className={`w-5 h-5 stroke-[2] ${
                      isSaved
                        ? 'fill-[#FF385C] text-[#FF385C] stroke-[#FF385C]'
                        : 'text-white fill-black/30'
                    }`}
                  />
                </button>
              </div>

              {/* Listing Details */}
              <div className="space-y-0.5 text-xs">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="font-bold text-[#222222] line-clamp-1 group-hover:underline">
                    {stay.title}
                  </h3>
                  <div className="flex items-center gap-0.5 shrink-0 font-semibold text-[#222222]">
                    <Star className="w-3 h-3 fill-current text-[#222222]" />
                    <span>{stay.rating.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-[#717171] line-clamp-1">{stay.subtitle}</p>

                {/* Pricing in Indian Rupees ₹ */}
                <div className="pt-1">
                  <span className="font-bold text-sm text-[#222222]">
                    ₹{stay.pricePerNight.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
