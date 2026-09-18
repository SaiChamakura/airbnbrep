import React, { useState } from 'react';
import { Sparkles, Award, Key, Calendar, ChevronRight, X, Star, Sun, Fan, DoorClosed, Umbrella } from 'lucide-react';
import { ListingData } from '../types';
import { LaurelBranchLeft, LaurelBranchRight } from './LaurelIcon';

interface PropertyOverviewProps {
  listing: ListingData;
}

export const PropertyOverview: React.FC<PropertyOverviewProps> = ({ listing }) => {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isShowingOriginal, setIsShowingOriginal] = useState(false);

  const originalDescription = `🌴 Planeje suas férias relaxantes no Amor De Goa por Mirashya Homes! ✨
Fique neste aconchegante 1BHK no coração de Candolim, com jacuzzi privativa para o descanso perfeito. Desfrute de WiFi de alta velocidade 📶, Smart TV 📺, conforto para animais de estimação 🐾 e interiores elegantes. A apenas alguns minutos de Candolim`;

  return (
    <div className="space-y-6">
      {/* Property Title & Room counts */}
      <div className="pb-6 border-b border-[#EBEBEB]">
        <h2 className="text-[22px] font-bold text-[#222222]">
          {listing.propertyType} in {listing.city}, {listing.country}
        </h2>
        <ol className="flex items-center gap-1.5 text-sm text-[#222222] mt-1 list-none p-0 font-normal">
          <li>{listing.guestsCount} guests</li>
          <li aria-hidden="true">·</li>
          <li>{listing.bedroomsCount} bedroom</li>
          <li aria-hidden="true">·</li>
          <li>{listing.bedsCount} bed</li>
          <li aria-hidden="true">·</li>
          <li>{listing.bathsCount} bathroom</li>
        </ol>
      </div>

      {/* Official Airbnb Guest Favorite Banner */}
      {listing.isGuestFavorite && (
        <div className="border border-[#DDDDDD] rounded-3xl p-5 sm:px-7 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 bg-white shadow-xs">
          {/* Left: Laurel Wreath flanking "Guest favourite" badge */}
          <div className="flex items-center gap-1.5 shrink-0">
            <LaurelBranchLeft className="w-7 h-12 text-[#222222] shrink-0" />
            <div className="font-bold text-[#222222] text-base leading-tight text-center select-none px-1">
              <div>Guest</div>
              <div>favourite</div>
            </div>
            <LaurelBranchRight className="w-7 h-12 text-[#222222] shrink-0" />
          </div>

          {/* Middle: Subtitle text */}
          <div className="text-[15px] text-[#222222] font-normal leading-snug sm:max-w-[280px] md:max-w-xs lg:max-w-sm">
            One of the most loved homes on Airbnb, according to guests
          </div>

          {/* Right: Rating & Review stats */}
          <div className="flex items-center gap-6 shrink-0 self-end sm:self-center">
            <div className="text-center">
              <div className="text-xl font-bold text-[#222222] leading-none">
                {listing.rating.toFixed(2)}
              </div>
              <div className="flex items-center justify-center gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-current text-[#222222]" />
                ))}
              </div>
            </div>

            <div className="h-9 w-px bg-[#DDDDDD]" />

            <div className="text-center">
              <div className="text-xl font-bold text-[#222222] leading-none">
                {listing.reviewCount}
              </div>
              <div className="text-xs text-[#222222] font-medium mt-1">
                Reviews
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Host row with green Mirashya logo avatar */}
      <div className="flex items-center gap-4 py-5 border-b border-[#EBEBEB]">
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-full bg-[#18392b] text-[#f4e4c1] flex flex-col items-center justify-center p-1.5 border border-[#122b20] shadow-xs select-none">
            <span className="text-[9px] font-black uppercase tracking-tighter text-center leading-tight">
              MIRASHYA
            </span>
            <span className="text-[6.5px] uppercase tracking-widest text-[#d8c397]">
              HOMES
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-base text-[#222222]">
            Hosted by {listing.host.name}
          </h3>
          <p className="text-sm text-[#717171]">
            {listing.host.yearsHosting} years hosting
          </p>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="space-y-6 py-6 border-b border-[#EBEBEB]">
        {listing.highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="text-[#222222] shrink-0 mt-0.5">
              {highlight.icon === 'sun' && <Umbrella className="w-6 h-6 stroke-[1.8]" />}
              {highlight.icon === 'fan' && <Fan className="w-6 h-6 stroke-[1.8]" />}
              {highlight.icon === 'door' && <DoorClosed className="w-6 h-6 stroke-[1.8]" />}
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

      {/* Automatic Translation Info Box */}
      <div className="text-sm text-[#717171]">
        <span>Some info has been automatically translated. </span>
        <button
          type="button"
          onClick={() => setIsShowingOriginal((prev) => !prev)}
          className="font-bold underline text-[#222222] hover:text-black cursor-pointer inline transition-opacity"
        >
          {isShowingOriginal ? 'Show translated' : 'Show original'}
        </button>
      </div>

      {/* Description Section with Show More */}
      <div className="py-4 border-b border-[#EBEBEB]">
        <div className="relative">
          <div className="text-base text-[#222222] leading-relaxed whitespace-pre-line">
            {isShowingOriginal ? originalDescription : listing.description}
          </div>
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
