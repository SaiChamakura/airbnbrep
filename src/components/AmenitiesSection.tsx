import React, { useState } from 'react';
import {
  Utensils,
  Wifi,
  Briefcase,
  Car,
  Waves,
  Flame,
  PawPrint,
  Camera,
  BellOff,
  Sparkles,
  Wind,
  Tv,
  Coffee,
  Bath,
  Shirt,
  Sun,
  Building,
  UserCheck,
  Zap,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';
import { Amenity } from '../types';
import { AllAmenitiesModal } from './AllAmenitiesModal';

interface AmenitiesSectionProps {
  amenities: Amenity[];
}

export const renderAmenityIcon = (iconName: string, className = 'w-6 h-6 stroke-[1.8]') => {
  switch (iconName) {
    case 'Utensils':
      return <Utensils className={className} />;
    case 'Wifi':
      return <Wifi className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Waves':
      return <Waves className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'PawPrint':
      return <PawPrint className={className} />;
    case 'Camera':
      return <Camera className={className} />;
    case 'BellOff':
      return <BellOff className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'Tv':
      return <Tv className={className} />;
    case 'Coffee':
      return <Coffee className={className} />;
    case 'Bath':
      return <Bath className={className} />;
    case 'Shirt':
      return <Shirt className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    case 'Building':
      return <Building className={className} />;
    case 'UserCheck':
      return <UserCheck className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

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
            <span
              className={`text-base leading-snug ${
                amenity.notReported ? 'line-through text-[#717171]' : 'text-[#222222]'
              }`}
            >
              {amenity.name}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="border border-[#222222] hover:bg-[#F7F7F7] text-[#222222] font-semibold text-base px-6 py-3 rounded-lg transition-colors cursor-pointer active:scale-98"
      >
        Show all 50 amenities
      </button>

      <AllAmenitiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amenities={amenities}
      />
    </section>
  );
};
