import React, { useState } from 'react';
import { Sparkles, Award, Key, Calendar, ChevronRight, X, ShieldCheck } from 'lucide-react';
import { ListingData } from '../types';

interface PropertyOverviewProps {
  listing: ListingData;
}

export const PropertyOverview: React.FC<PropertyOverviewProps> = ({ listing }) => {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isAirCoverModalOpen, setIsAirCoverModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Property Title & Host Summary */}
      <div className="flex items-start justify-between pb-6 border-b border-[#EBEBEB]">
        <div>
          <h2 className="text-[22px] font-bold text-[#222222]">
            {listing.propertyType} hosted by {listing.host.name}
          </h2>
          <ol className="flex items-center gap-1 text-sm text-[#222222] mt-1 list-none p-0">
            <li>{listing.guestsCount} guests</li>
            <li aria-hidden="true">·</li>
            <li>{listing.bedroomsCount} bedrooms</li>
            <li aria-hidden="true">·</li>
            <li>{listing.bedsCount} beds</li>
            <li aria-hidden="true">·</li>
            <li>{listing.bathsCount} baths</li>
          </ol>
        </div>

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
              <Award className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      {/* Guest Favorite / Superhost Banner if present */}
      {listing.isGuestFavorite && (
        <div className="border border-[#DDDDDD] rounded-2xl p-5 flex items-center justify-between bg-white shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F7F7F7] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#FF385C]" />
            </div>
            <div>
              <div className="font-bold text-[#222222] text-base">Guest favorite</div>
              <p className="text-sm text-[#717171]">
                One of the most loved homes on Airbnb, according to guests
              </p>
            </div>
          </div>
          <div className="text-right pl-4">
            <div className="text-2xl font-bold text-[#222222]">{listing.rating.toFixed(2)}</div>
            <div className="text-xs text-[#717171] underline cursor-pointer">{listing.reviewCount} reviews</div>
          </div>
        </div>
      )}

      {/* Key Highlights */}
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
              <h3 className="font-semibold text-base text-[#222222] leading-snug">{highlight.title}</h3>
              <p className="text-sm text-[#717171] mt-0.5">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AirCover Section */}
      <div className="py-6 border-b border-[#EBEBEB]">
        <div className="flex items-center gap-1 mb-3">
          <span className="text-[#FF385C] font-extrabold text-2xl tracking-tighter">air</span>
          <span className="text-[#222222] font-extrabold text-2xl tracking-tighter">cover</span>
        </div>
        <p className="text-sm text-[#222222] leading-relaxed mb-3">
          Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
        </p>
        <button
          onClick={() => setIsAirCoverModalOpen(true)}
          className="text-sm font-semibold text-[#222222] underline underline-offset-4 hover:text-black cursor-pointer"
        >
          Learn more
        </button>
      </div>

      {/* Description */}
      <div className="py-6 border-b border-[#EBEBEB]">
        <p className="text-base text-[#222222] leading-relaxed whitespace-pre-line line-clamp-4">
          {listing.description}
        </p>
        <button
          onClick={() => setIsDescriptionModalOpen(true)}
          className="mt-4 inline-flex items-center gap-1 font-semibold text-base text-[#222222] underline underline-offset-4 hover:text-black cursor-pointer"
        >
          <span>Show more</span>
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Description Modal */}
      {isDescriptionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
              <h2 className="text-xl font-bold text-[#222222]">About this space</h2>
              <button
                onClick={() => setIsDescriptionModalOpen(false)}
                className="p-2 text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6 text-[#222222] leading-relaxed text-base">
              <div>
                <p className="whitespace-pre-line">{listing.description}</p>
              </div>
              <div className="border-t border-[#EBEBEB] pt-4">
                <h3 className="font-bold text-lg mb-2">The space</h3>
                <p className="whitespace-pre-line">{listing.spaceDescription}</p>
              </div>
              <div className="border-t border-[#EBEBEB] pt-4">
                <h3 className="font-bold text-lg mb-2">Guest access</h3>
                <p>{listing.guestAccess}</p>
              </div>
              <div className="border-t border-[#EBEBEB] pt-4">
                <h3 className="font-bold text-lg mb-2">Other things to note</h3>
                <p>{listing.otherNotes}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AirCover Modal */}
      {isAirCoverModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
              <div className="flex items-center gap-1">
                <span className="text-[#FF385C] font-extrabold text-2xl tracking-tighter">air</span>
                <span className="text-[#222222] font-extrabold text-2xl tracking-tighter">cover</span>
              </div>
              <button
                onClick={() => setIsAirCoverModalOpen(false)}
                className="p-2 text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6 text-[#222222]">
              <p className="text-base text-[#717171]">
                AirCover is comprehensive protection included for free with every booking.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#F7F7F7]">
                  <h4 className="font-bold text-base mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Booking Protection Guarantee
                  </h4>
                  <p className="text-sm text-[#717171]">
                    In the unlikely event a Host needs to cancel within 30 days of check-in, we'll find you a similar or better home, or we'll refund you.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F7F7F7]">
                  <h4 className="font-bold text-base mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Check-In Guarantee
                  </h4>
                  <p className="text-sm text-[#717171]">
                    If you can't check into your home and the Host cannot resolve the issue, we'll find you a comparable or better stay or refund you.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F7F7F7]">
                  <h4 className="font-bold text-base mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Get-What-You-Booked Guarantee
                  </h4>
                  <p className="text-sm text-[#717171]">
                    If at any time during your stay you find your listing isn't as advertised, you'll have 72 hours to report it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
