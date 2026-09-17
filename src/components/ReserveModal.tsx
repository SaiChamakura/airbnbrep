import React, { useEffect } from 'react';
import { X, CheckCircle2, Calendar, Users, Star, ShieldCheck } from 'lucide-react';
import { GuestCounts, ListingData } from '../types';

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: ListingData;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  guests: GuestCounts;
  totalPrice: number;
  nightsCount: number;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({
  isOpen,
  onClose,
  listing,
  checkInDate,
  checkOutDate,
  guests,
  totalPrice,
  nightsCount,
}) => {
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalGuests = guests.adults + guests.children;
  const formatDate = (date: Date | null) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reserve-modal-title"
    >
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
          <h2 id="reserve-modal-title" className="text-xl font-bold text-[#222222]">
            {isConfirmed ? 'Reservation Confirmed!' : 'Confirm and book'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isConfirmed ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#222222]">You're all set for Malibu!</h3>
              <p className="text-[#717171] max-w-md mx-auto">
                A confirmation email with check-in instructions and keyless entry code has been sent. Host Elena has been notified.
              </p>
              <div className="bg-[#F7F7F7] p-5 rounded-2xl text-left max-w-md mx-auto space-y-2 text-sm">
                <div className="flex justify-between font-semibold text-[#222222]">
                  <span>Dates:</span>
                  <span>{formatDate(checkInDate)} – {formatDate(checkOutDate)}</span>
                </div>
                <div className="flex justify-between text-[#717171]">
                  <span>Guests:</span>
                  <span>{totalGuests} guest{totalGuests > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-[#222222] pt-2 border-t border-[#EBEBEB]">
                  <span>Total charged:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="bg-[#222222] hover:bg-black text-white font-semibold px-8 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Mini Listing Card */}
              <div className="flex gap-4 p-4 rounded-2xl bg-[#F7F7F7] border border-[#EBEBEB]">
                <img
                  src={listing.photos[0]?.url}
                  alt={listing.title}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#717171] uppercase font-semibold">{listing.propertyType}</div>
                  <h3 className="font-bold text-sm text-[#222222] truncate">{listing.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#222222] mt-1">
                    <Star className="w-3.5 h-3.5 fill-current text-[#222222]" />
                    <span className="font-semibold">{listing.rating.toFixed(2)}</span>
                    <span className="text-[#717171]">({listing.reviewCount} reviews) · Superhost</span>
                  </div>
                </div>
              </div>

              {/* Trip details */}
              <div className="space-y-4">
                <h4 className="font-bold text-base text-[#222222]">Your trip</h4>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#222222] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm text-[#222222]">Dates</div>
                    <div className="text-sm text-[#717171]">
                      {formatDate(checkInDate)} – {formatDate(checkOutDate)} ({nightsCount} nights)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#222222] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-sm text-[#222222]">Guests</div>
                    <div className="text-sm text-[#717171]">
                      {totalGuests} guest{totalGuests > 1 ? 's' : ''}
                      {guests.infants > 0 && `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}`}
                      {guests.pets > 0 && `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price details */}
              <div className="border-t border-[#EBEBEB] pt-4 space-y-2 text-sm text-[#222222]">
                <h4 className="font-bold text-base mb-2">Price details</h4>
                <div className="flex justify-between">
                  <span className="underline">${listing.pricePerNight} x {nightsCount} nights</span>
                  <span>${listing.pricePerNight * nightsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span>${listing.cleaningFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Airbnb service fee</span>
                  <span>${listing.serviceFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Taxes</span>
                  <span>${listing.taxes}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-3 border-t border-[#EBEBEB]">
                  <span>Total (USD)</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Your reservation is protected by AirCover guarantee.</span>
              </div>

              <button
                onClick={() => setIsConfirmed(true)}
                className="w-full bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:opacity-95 text-white font-semibold py-3.5 rounded-xl transition-opacity text-base shadow-md cursor-pointer"
              >
                Confirm reservation · ${totalPrice}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
