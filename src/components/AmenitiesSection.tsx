import React, { useState } from 'react';
import { Amenity } from '../types';
import { AllAmenitiesModal, renderAmenityIcon } from './AllAmenitiesModal';

interface AmenitiesSectionProps {
  amenities: Amenity[];
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ amenities }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuredAmenities = amenities.slice(0, 10);

  return (
    <section id="amenities-section" className="py-8 border-b border-[#EBEBEB]">
      <h2 className="text-[22px] font-bold text-[#222222] mb-6">What this place offers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
        {featuredAmenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center gap-4 text-[#222222]">
            <div className="text-[#222222] shrink-0">
              {renderAmenityIcon(amenity.iconName)}
            </div>
            <span className="text-base leading-snug">{amenity.name}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="border border-[#222222] hover:bg-[#F7F7F7] text-[#222222] font-semibold text-base px-6 py-3 rounded-lg transition-colors cursor-pointer active:scale-98"
      >
        Show all {amenities.length} amenities
      </button>

      <AllAmenitiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amenities={amenities}
      />
    </section>
  );
};
