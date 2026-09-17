import React, { useState } from 'react';
import { Star, ChevronRight, Leaf, Check, Bath, MapPin, Wine, Sparkles, Armchair } from 'lucide-react';
import { Review } from '../types';
import { AllReviewsModal } from './AllReviewsModal';

interface ReviewsSectionProps {
  reviews: Review[];
  overallRating: number;
  totalReviewsCount: number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  overallRating,
  totalReviewsCount,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedReviewIds, setExpandedReviewIds] = useState<Record<string, boolean>>({});

  const filterTags = [
    { label: 'Comfort', count: 6, icon: Leaf },
    { label: 'Accuracy', count: 5, icon: Check },
    { label: 'Hot tub', count: 5, icon: Bath },
    { label: 'Condition', count: 4, icon: MapPin },
    { label: 'Hospitality', count: 8, icon: Wine },
    { label: 'Cleanliness', count: 4, icon: Sparkles },
    { label: 'Amenities', icon: Armchair },
  ];

  const toggleExpand = (id: string) => {
    setExpandedReviewIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="reviews-section" className="py-8 border-b border-[#EBEBEB]">
      {/* Review Filter Tags Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-6 no-scrollbar pt-2">
        {filterTags.map((tag) => {
          const Icon = tag.icon;
          const isSelected = selectedTag === tag.label;
          return (
            <button
              key={tag.label}
              onClick={() => setSelectedTag(isSelected ? null : tag.label)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                isSelected
                  ? 'border-[#222222] bg-[#F7F7F7] text-[#222222]'
                  : 'border-[#DDDDDD] bg-white text-[#222222] hover:border-[#222222]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 stroke-[2]" />
              <span>{tag.label}</span>
              {tag.count !== undefined && (
                <span className="text-[#717171] ml-0.5">{tag.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* 2-Column Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-8">
        {reviews.slice(0, 6).map((review) => {
          const isLong = review.comment.length > 150;
          const isExpanded = !!expandedReviewIds[review.id];

          return (
            <div key={review.id} className="space-y-3">
              {/* Reviewer Meta */}
              <div className="flex items-center gap-3">
                {review.authorAvatar ? (
                  <img
                    src={review.authorAvatar}
                    alt={review.authorName}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#EBEBEB] text-[#222222] font-bold flex items-center justify-center text-sm shrink-0">
                    {review.authorInitial || review.authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-bold text-sm text-[#222222] leading-tight">
                    {review.authorName}
                  </div>
                  <div className="text-xs text-[#717171]">
                    {review.yearsOnAirbnb}
                  </div>
                </div>
              </div>

              {/* Rating stars & Date */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#222222]">
                <div className="flex items-center gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current text-[#222222]" />
                  ))}
                </div>
                <span>·</span>
                <span className="font-normal text-[#222222]">{review.date}</span>
              </div>

              {/* Comment text */}
              <div className="text-sm text-[#222222] leading-relaxed">
                <p>
                  {isLong && !isExpanded
                    ? `${review.comment.slice(0, 140)}...`
                    : review.comment}
                </p>
                {isLong && (
                  <button
                    onClick={() => toggleExpand(review.id)}
                    className="font-bold text-xs underline text-[#222222] mt-1 hover:text-black cursor-pointer inline-flex items-center"
                  >
                    <span>{isExpanded ? 'Show less' : 'Show more'}</span>
                    {!isExpanded && <ChevronRight className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show All Reviews Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="border border-[#222222] hover:bg-[#F7F7F7] text-[#222222] font-semibold text-base px-6 py-3 rounded-lg transition-colors cursor-pointer active:scale-98"
      >
        Show all {totalReviewsCount} reviews
      </button>

      {/* Full Reviews Modal */}
      <AllReviewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviews={reviews}
        overallRating={overallRating}
        totalReviews={totalReviewsCount}
      />
    </section>
  );
};
