import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronDown, ChevronUp, Plus, Minus, Flag } from 'lucide-react';
import { GuestCounts, ListingData } from '../types';
import { ReserveModal } from './ReserveModal';

interface BookingCardProps {
  listing: ListingData;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onOpenCalendar: () => void;
  guests: GuestCounts;
  onUpdateGuests: (guests: GuestCounts) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  listing,
  checkInDate,
  checkOutDate,
  onOpenCalendar,
  guests,
  onUpdateGuests,
}) => {
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsGuestDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalAdultsAndChildren = guests.adults + guests.children;

  const updateCount = (type: keyof GuestCounts, delta: number) => {
    const newGuests = { ...guests };
    const current = newGuests[type];
    const updated = Math.max(type === 'adults' ? 1 : 0, current + delta);

    if (type === 'adults' || type === 'children') {
      const prospectiveTotal =
        (type === 'adults' ? updated : newGuests.adults) +
        (type === 'children' ? updated : newGuests.children);
      if (prospectiveTotal > listing.guestsCount) return;
    }

    newGuests[type] = updated;
    onUpdateGuests(newGuests);
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 5; // Default 5 nights
    const diff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();
  const stayCost = listing.pricePerNight * nights;
  const total = stayCost + listing.cleaningFee + listing.serviceFee + listing.taxes;

  const formatDate = (d: Date | null) => {
    if (!d) return 'Select date';
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  return (
    <div className="sticky top-28 w-full max-w-[370px] ml-auto">
      <div className="bg-white border border-[#DDDDDD] rounded-2xl p-6 shadow-xl space-y-6">
        {/* Header: Price & Rating */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[#222222]">
              ₹{listing.pricePerNight.toLocaleString('en-IN')}
            </span>
            <span className="text-base text-[#717171] font-normal">night</span>
          </div>

          <div className="flex items-center gap-1 text-sm font-semibold text-[#222222]">
            <Star className="w-3.5 h-3.5 fill-current text-[#222222]" />
            <span>{listing.rating.toFixed(2)}</span>
            <span className="text-[#717171] font-normal">·</span>
            <span className="text-[#717171] underline cursor-pointer">{listing.reviewCount} reviews</span>
          </div>
        </div>

        {/* Date & Guest Selector Box */}
        <div className="border border-[#B0B0B0] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#222222] transition-shadow">
          {/* Dates split row */}
          <div className="grid grid-cols-2 divide-x divide-[#B0B0B0] border-b border-[#B0B0B0]">
            <button
              onClick={onOpenCalendar}
              className="p-3 text-left hover:bg-[#F7F7F7] transition-colors cursor-pointer"
              aria-label="Select check-in date"
            >
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#222222]">
                Check-in
              </span>
              <span className="block text-sm text-[#222222] font-medium truncate">
                {formatDate(checkInDate)}
              </span>
            </button>

            <button
              onClick={onOpenCalendar}
              className="p-3 text-left hover:bg-[#F7F7F7] transition-colors cursor-pointer"
              aria-label="Select checkout date"
            >
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#222222]">
                Checkout
              </span>
              <span className="block text-sm text-[#222222] font-medium truncate">
                {formatDate(checkOutDate)}
              </span>
            </button>
          </div>

          {/* Guests dropdown trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
              className="w-full p-3 text-left flex items-center justify-between hover:bg-[#F7F7F7] transition-colors cursor-pointer"
              aria-expanded={isGuestDropdownOpen}
              aria-label="Select number of guests"
            >
              <div>
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#222222]">
                  Guests
                </span>
                <span className="block text-sm text-[#222222] font-medium">
                  {totalAdultsAndChildren} guest{totalAdultsAndChildren > 1 ? 's' : ''}
                  {guests.infants > 0 && `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}`}
                  {guests.pets > 0 && `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}`}
                </span>
              </div>
              {isGuestDropdownOpen ? (
                <ChevronUp className="w-4 h-4 text-[#222222]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#222222]" />
              )}
            </button>

            {/* Guests Popover */}
            {isGuestDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#DDDDDD] rounded-xl shadow-2xl p-4 z-30 space-y-4 animate-in fade-in zoom-in-95 duration-100">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#222222]">Adults</div>
                    <div className="text-xs text-[#717171]">Age 13+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateCount('adults', -1)}
                      disabled={guests.adults <= 1}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{guests.adults}</span>
                    <button
                      onClick={() => updateCount('adults', 1)}
                      disabled={totalAdultsAndChildren >= listing.guestsCount}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#222222]">Children</div>
                    <div className="text-xs text-[#717171]">Ages 2–12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateCount('children', -1)}
                      disabled={guests.children <= 0}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{guests.children}</span>
                    <button
                      onClick={() => updateCount('children', 1)}
                      disabled={totalAdultsAndChildren >= listing.guestsCount}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#222222]">Infants</div>
                    <div className="text-xs text-[#717171]">Under 2</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateCount('infants', -1)}
                      disabled={guests.infants <= 0}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{guests.infants}</span>
                    <button
                      onClick={() => updateCount('infants', 1)}
                      disabled={guests.infants >= 5}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Pets */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#222222]">Pets</div>
                    <div className="text-xs text-[#717171]">Bringing a service animal?</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateCount('pets', -1)}
                      disabled={guests.pets <= 0}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{guests.pets}</span>
                    <button
                      onClick={() => updateCount('pets', 1)}
                      disabled={guests.pets >= 2}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center text-[#717171] hover:border-[#222222] hover:text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setIsGuestDropdownOpen(false)}
                    className="text-xs font-bold text-[#222222] underline p-1 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reserve CTA Button */}
        <button
          onClick={() => setIsReserveModalOpen(true)}
          className="w-full bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:opacity-95 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer text-base"
        >
          Reserve
        </button>

        <p className="text-center text-xs text-[#717171]">You won't be charged yet</p>

        {/* Price Breakdown */}
        <div className="space-y-3 pt-2 text-sm text-[#222222]">
          <div className="flex items-center justify-between">
            <span className="underline">₹{listing.pricePerNight.toLocaleString('en-IN')} x {nights} nights</span>
            <span>₹{stayCost.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="underline">Cleaning fee</span>
            <span>₹{listing.cleaningFee.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="underline">Airbnb service fee</span>
            <span>₹{listing.serviceFee.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="underline">Taxes</span>
            <span>₹{listing.taxes.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Total */}
        <div className="pt-4 border-t border-[#EBEBEB] flex items-center justify-between font-bold text-base text-[#222222]">
          <span>Total before taxes</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Report this listing */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => alert('Report listing dialog: Thank you for helping keep the Airbnb community safe.')}
          className="flex items-center gap-2 text-xs font-semibold text-[#717171] hover:text-[#222222] underline cursor-pointer"
        >
          <Flag className="w-3.5 h-3.5" />
          <span>Report this listing</span>
        </button>
      </div>

      {/* Reservation confirmation modal */}
      <ReserveModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        listing={listing}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guests={guests}
        totalPrice={total}
        nightsCount={nights}
      />
    </div>
  );
};
