import React, { useState } from 'react';
import { Sparkles, Award, Key, Calendar, ChevronRight, X, Star } from 'lucide-react';
import { ListingData } from '../types';
import { LaurelLeftSVG, LaurelRightSVG } from './GuestFavoriteSection';

interface PropertyOverviewProps {
  listing: ListingData;
}

export const PropertyOverview: React.FC<PropertyOverviewProps> = ({ listing }) => {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Property Title & Room counts (Change #5: 'bathrooms' in natural number) */}
      <div className="pb-6 border-b border-[#EBEBEB]">
        <h2 className="text-[22px] font-bold text-[#222222]">
          {listing.propertyType} in {listing.city}, {listing.country}
        </h2>
        <ol className="flex items-center gap-1.5 text-sm text-[#222222] mt-1 list-none p-0 font-normal">
          <li>{listing.guestsCount} guests</li>
          <li aria-hidden="true">·</li>
          <li>{listing.bedroomsCount} bedrooms</li>
          <li aria-hidden="true">·</li>
          <li>{listing.bedsCount} beds</li>
          <li aria-hidden="true">·</li>
          <li>{listing.bathsCount} bathrooms</li>
        </ol>
      </div>

      {/* Official Airbnb Guest Favorite Banner with Laurel Leaves */}
      {listing.isGuestFavorite && (
        <div className="border border-[#DDDDDD] rounded-2xl p-5 flex items-center justify-between bg-white shadow-xs hover:border-[#B0B0B0] transition-colors">
          <div className="flex items-center gap-3">
            <LaurelLeftSVG className="w-7 h-11 text-[#222222] shrink-0" />
            <div>
              <div className="font-extrabold text-[#222222] text-lg leading-tight">
                Guest favorite
              </div>
              <p className="text-sm text-[#717171] leading-snug mt-0.5">
                One of the most loved homes on Airbnb, according to guests
              </p>
            </div>
            <LaurelRightSVG className="w-7 h-11 text-[#222222] shrink-0" />
          </div>

          <div className="flex items-center gap-4 pl-4 shrink-0 text-right">
            <div>
              <div className="text-2xl font-black text-[#222222]">
                {listing.rating.toFixed(2)}
              </div>
              <div className="flex items-center justify-end gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current text-[#222222]" />
                ))}
              </div>
            </div>
            <div className="h-8 w-px bg-[#DDDDDD]" />
            <div>
              <div className="text-xl font-bold text-[#222222]">{listing.reviewCount}</div>
              <div className="text-xs text-[#717171] underline cursor-pointer">Reviews</div>
            </div>
          </div>
        </div>
      )}

      {/* Hosted by part is placed AFTER the Guest favorite card (Change #4) */}
      <div className="flex items-center gap-4 py-5 border-b border-[#EBEBEB]">
        <div className="relative shrink-0">
          <img
            src={listing.host.avatar}
            alt={listing.host.name}
            className="w-14 h-14 rounded-full object-cover border border-[#EBEBEB]"
          />
          {listing.host.isSuperhost && (
            <div
              className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1 rounded-full shadow-xs"
              title="Superhost"
            >
              <Award className="w-3 h-3" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-base text-[#222222]">
            Hosted by {listing.host.name}
          </h3>
          <p className="text-sm text-[#717171]">
            {listing.host.isSuperhost ? 'Superhost' : 'Host'} · {listing.host.yearsHosting} years hosting
          </p>
        </div>
      </div>

      {/* Key Highlights (Duplicate Guest Favorite highlight removed as requested in #4) */}
      <div className="space-y-6 py-6 border-b border-[#EBEBEB]">
        {listing.highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="text-[#222222] shrink-0 mt-0.5">
              {highlight.icon === 'sparkles' && <Sparkles className="w-6 h-6 stroke-[1.8]" />}
              {highlight.icon === 'award' && <Award className="w-6 h-6 stroke-[1.8]" />}
              {highlight.icon === 'key' && <Key className="w-6 h-6 stroke-[1.8]" />}
              {highlight.icon === 'calendar' && <Calendar className="w-6 h-6 stroke-[1.8]" />}
            </div>
            <div>
              <h3 className="font-semibold text-base text-[#222222] leading-snug">
                {highlight.title}
              </h3>
              <p className="text-sm text-[#717171] mt-0.5">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Description Section without Title / Section Name (Change #6) and with smooth fading effect */}
      <div className="py-6 border-b border-[#EBEBEB]">
        <div className="relative">
          <div className="text-base text-[#222222] leading-relaxed whitespace-pre-line max-h-[140px] overflow-hidden">
            {listing.description}
          </div>
          {/* Smooth fading gradient over the last line without ellipsis '...' */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </div>

        <button
          onClick={() => setIsDescriptionModalOpen(true)}
          className="flex items-center gap-1 text-base font-bold text-[#222222] underline underline-offset-4 hover:opacity-80 pt-3 cursor-pointer"
        >
          <span>Show more</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Full Description Modal Dialog */}
      {isDescriptionModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-space-title"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-[#EBEBEB] flex items-center justify-between">
              <h2 id="about-space-title" className="text-xl font-bold text-[#222222]">
                About this space
              </h2>
              <button
                onClick={() => setIsDescriptionModalOpen(false)}
                className="p-2 rounded-full hover:bg-[#F7F7F7] text-[#222222] transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6 text-[#222222] text-base leading-relaxed whitespace-pre-line">
              <div>{listing.description}</div>
              <div className="h-px bg-[#EBEBEB]" />
              <div>
                <h3 className="font-bold text-lg mb-2">The space</h3>
                <p>{listing.spaceDescription}</p>
              </div>
              <div className="h-px bg-[#EBEBEB]" />
              <div>
                <h3 className="font-bold text-lg mb-2">Guest access</h3>
                <p>{listing.guestAccess}</p>
              </div>
              <div className="h-px bg-[#EBEBEB]" />
              <div>
                <h3 className="font-bold text-lg mb-2">Other things to note</h3>
                <p>{listing.otherNotes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
