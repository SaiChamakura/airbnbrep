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
      {/* Title & Review Count */}
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-6 h-6 fill-current text-[#222222]" />
        <h2 className="text-[22px] font-bold text-[#222222]">
          {overallRating.toFixed(2)} · {totalReviews} reviews
        </h2>
      </div>

      {/* 6 Category Rating Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-3 mb-10 max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Cleanliness</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#222222] h-full"
                style={{ width: `${(ratingsBreakdown.cleanliness / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">
              {ratingsBreakdown.cleanliness.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Accuracy</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#222222] h-full"
                style={{ width: `${(ratingsBreakdown.accuracy / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">
              {ratingsBreakdown.accuracy.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Communication</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#222222] h-full"
                style={{ width: `${(ratingsBreakdown.communication / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">
              {ratingsBreakdown.communication.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Location</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#222222] h-full"
                style={{ width: `${(ratingsBreakdown.location / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">
              {ratingsBreakdown.location.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Check-in</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#222222] h-full"
                style={{ width: `${(ratingsBreakdown.checkIn / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">
              {ratingsBreakdown.checkIn.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-[#222222]">Value</span>
          <div className="flex items-center gap-3">
            <div className="w-28 bg-[#EBEBEB] h-1 rounded-full overflow-hidden">
              <div
                className="bg-[#222222] h-full"
                style={{ width: `${(ratingsBreakdown.value / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#222222] w-6">
              {ratingsBreakdown.value.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* REVIEWS LIST: SINGLE COLUMN AS REQUESTED IN ITEM #11 */}
      <div className="flex flex-col space-y-8 divide-y divide-[#EBEBEB] max-w-3xl mb-8">
        {reviews.slice(0, 6).map((review, index) => (
          <div key={review.id} className={`${index > 0 ? 'pt-8' : ''} space-y-3`}>
            {/* Author Profile Header */}
            <div className="flex items-center gap-3.5">
              <img
                src={review.authorAvatar}
                alt={review.authorName}
                className="w-12 h-12 rounded-full object-cover border border-[#EBEBEB]"
              />
              <div>
                <h3 className="font-bold text-base text-[#222222] leading-tight">
                  {review.authorName}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-[#717171]">
                  <span>{review.authorLocation || 'Guest'}</span>
                  <span>·</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 text-[#222222]">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current text-[#222222]" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-base text-[#222222] leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Show All Reviews Button */}
      <button
        onClick={() => setIsReviewsModalOpen(true)}
        className="px-6 py-3 border border-[#222222] rounded-lg font-bold text-sm text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
      >
        Show all {totalReviews} reviews
      </button>

      {/* All Reviews Modal Dialog */}
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
