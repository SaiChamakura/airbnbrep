import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import { NearbyStay } from '../types';

interface MoreStaysSectionProps {
  stays: NearbyStay[];
}

export const MoreStaysSection: React.FC<MoreStaysSectionProps> = ({ stays }) => {
  const [savedStayIds, setSavedStayIds] = useState<Record<string, boolean>>({});

  const toggleSaveStay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedStayIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-12 border-b border-[#EBEBEB]">
      <div className="mb-6">
        <h2 className="text-[22px] font-bold text-[#222222]">
          More places to stay nearby
        </h2>
        <p className="text-sm text-[#717171] mt-1">
          Explore similar coastal villas in and around Malibu
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stays.map((stay) => {
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

                <div className="pt-1 text-sm">
                  <span className="font-extrabold text-[#222222]">
                    ${stay.pricePerNight}
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
