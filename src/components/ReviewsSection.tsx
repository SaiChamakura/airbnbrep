import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';
import { AllReviewsModal } from './AllReviewsModal';

interface ReviewsSectionProps {
  overallRating: number;
  totalReviews: number;
  ratingsBreakdown: {
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    checkIn: number;
    value: number;
  };
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  overallRating,
  totalReviews,
  ratingsBreakdown,
  reviews,
}) => {
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  return (
    <section id="reviews-section" className="py-8 border-b border-[#EBEBEB]">
      {/* Title / Overall Score */}
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-6 h-6 fill-current text-[#222222]" />
        <h2 className="text-[22px] font-bold text-[#222222]">
          {overallRating.toFixed(2)} · {totalReviews} reviews
        </h2>
      </div>

      {/* 6 Category Rating Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-3 mb-8">
        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Cleanliness</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.cleanliness / 5) * 100}%` }} />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">{ratingsBreakdown.cleanliness.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Accuracy</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.accuracy / 5) * 100}%` }} />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">{ratingsBreakdown.accuracy.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Communication</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.communication / 5) * 100}%` }} />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">{ratingsBreakdown.communication.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Location</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.location / 5) * 100}%` }} />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">{ratingsBreakdown.location.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Check-in</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.checkIn / 5) * 100}%` }} />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">{ratingsBreakdown.checkIn.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Value</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div className="bg-[#222222] h-full" style={{ width: `${(ratingsBreakdown.value / 5) * 100}%` }} />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">{ratingsBreakdown.value.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mb-8">
        {reviews.slice(0, 6).map((review) => (
          <div key={review.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={review.authorAvatar}
                alt={review.authorName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-base text-[#222222] leading-snug">{review.authorName}</h3>
                <p className="text-sm text-[#717171]">
                  {review.authorLocation ? `${review.authorLocation} · ` : ''}{review.date}
                </p>
              </div>
            </div>
            <p className="text-base text-[#222222] leading-relaxed line-clamp-3">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsReviewsModalOpen(true)}
        className="border border-[#222222] hover:bg-[#F7F7F7] text-[#222222] font-semibold text-base px-6 py-3 rounded-lg transition-colors cursor-pointer active:scale-98"
      >
        Show all {totalReviews} reviews
      </button>

      <AllReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        reviews={reviews}
        overallRating={overallRating}
        totalReviews={totalReviews}
        ratingsBreakdown={ratingsBreakdown}
      />
    </section>
  );
};
