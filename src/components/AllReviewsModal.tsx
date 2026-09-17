import React, { useState, useEffect } from 'react';
import { X, Star, Search } from 'lucide-react';
import { Review } from '../types';

interface AllReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
  overallRating: number;
  totalReviews: number;
  ratingsBreakdown?: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
}

export const AllReviewsModal: React.FC<AllReviewsModalProps> = ({
  isOpen,
  onClose,
  reviews,
  overallRating,
  totalReviews,
  ratingsBreakdown = {
    cleanliness: 5.0,
    accuracy: 5.0,
    communication: 5.0,
    location: 4.8,
    checkIn: 5.0,
    value: 4.8,
  },
}) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredReviews = reviews.filter(
    (r) =>
      r.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-reviews-title"
    >
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
          <button
            onClick={onClose}
            className="p-2 text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors cursor-pointer"
            aria-label="Close reviews"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns on Desktop */}
        <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Stats & Breakdown */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <Star className="w-7 h-7 fill-current text-[#222222]" />
              <h2 id="all-reviews-title" className="text-3xl font-extrabold text-[#222222]">
                {overallRating.toFixed(2)}
              </h2>
            </div>
            <div className="text-base text-[#717171] font-medium -mt-4">
              {totalReviews} reviews
            </div>

            {/* 5-star distribution scale */}
            <div className="flex flex-col gap-1 w-full text-xs text-[#717171] pt-1 pb-3 border-b border-[#EBEBEB]">
              {[
                { star: 5, pct: 96 },
                { star: 4, pct: 4 },
                { star: 3, pct: 0 },
                { star: 2, pct: 0 },
                { star: 1, pct: 0 },
              ].map((item) => (
                <div key={item.star} className="flex items-center gap-2">
                  <span className="w-3 text-right font-semibold text-[#222222]">{item.star}</span>
                  <div className="flex-1 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-[#222222] h-full rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Rating breakdown bars */}
            <div className="space-y-3 pt-2 text-sm text-[#222222]">
              <div className="flex justify-between items-center">
                <span>Cleanliness</span>
                <span className="font-semibold">{ratingsBreakdown.cleanliness.toFixed(1)}</span>
              </div>
              <div className="w-full bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
                <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.cleanliness / 5) * 100}%` }} />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Accuracy</span>
                <span className="font-semibold">{ratingsBreakdown.accuracy.toFixed(1)}</span>
              </div>
              <div className="w-full bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
                <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.accuracy / 5) * 100}%` }} />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Communication</span>
                <span className="font-semibold">{ratingsBreakdown.communication.toFixed(1)}</span>
              </div>
              <div className="w-full bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
                <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.communication / 5) * 100}%` }} />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Location</span>
                <span className="font-semibold">{ratingsBreakdown.location.toFixed(1)}</span>
              </div>
              <div className="w-full bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
                <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.location / 5) * 100}%` }} />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Check-in</span>
                <span className="font-semibold">{ratingsBreakdown.checkIn.toFixed(1)}</span>
              </div>
              <div className="w-full bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
                <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.checkIn / 5) * 100}%` }} />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Value</span>
                <span className="font-semibold">{ratingsBreakdown.value.toFixed(1)}</span>
              </div>
              <div className="w-full bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
                <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.value / 5) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Right Column: Search + Review cards */}
          <div className="md:col-span-8 space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#717171] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reviews"
                className="w-full bg-[#F7F7F7] border border-[#DDDDDD] rounded-full pl-11 pr-4 py-2.5 text-sm text-[#222222] focus:outline-hidden focus:border-[#222222] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* List */}
            <div className="space-y-6 divide-y divide-[#EBEBEB]">
              {filteredReviews.length === 0 ? (
                <p className="text-[#717171] py-8 text-center">No reviews found matching "{searchQuery}".</p>
              ) : (
                filteredReviews.map((review) => (
                  <div key={review.id} className="pt-6 first:pt-0 space-y-3">
                    <div className="flex items-center gap-3">
                      {review.authorAvatar ? (
                        <img
                          src={review.authorAvatar}
                          alt={review.authorName}
                          className="w-11 h-11 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[#EBEBEB] text-[#222222] font-bold text-sm flex items-center justify-center shrink-0">
                          {review.authorInitial || review.authorName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-sm text-[#222222]">{review.authorName}</h4>
                        <p className="text-xs text-[#717171]">
                          {review.yearsOnAirbnb && `${review.yearsOnAirbnb} · `}
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-[#222222] leading-relaxed">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
