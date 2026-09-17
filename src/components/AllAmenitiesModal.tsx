import React, { useEffect } from 'react';
import {
  X,
  Waves,
  Palmtree,
  Wifi,
  Briefcase,
  Car,
  Sparkles,
  Flame,
  Utensils,
  Wind,
  ShieldCheck,
  Zap,
  Music,
  Tv,
  Shirt,
  Coffee,
  Wine,
  UtensilsCrossed,
  Bell,
  HeartPulse,
  Bath,
  Sun,
} from 'lucide-react';
import { Amenity } from '../types';

interface AllAmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  amenities: Amenity[];
}

export const renderAmenityIcon = (iconName: string, className = 'w-6 h-6 stroke-[1.8]') => {
  switch (iconName) {
    case 'Waves':
      return <Waves className={className} />;
    case 'Palmtree':
      return <Palmtree className={className} />;
    case 'Wifi':
      return <Wifi className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'Tv':
      return <Tv className={className} />;
    case 'Shirt':
      return <Shirt className={className} />;
    case 'Coffee':
      return <Coffee className={className} />;
    case 'Wine':
      return <Wine className={className} />;
    case 'UtensilsCrossed':
      return <UtensilsCrossed className={className} />;
    case 'Bell':
      return <Bell className={className} />;
    case 'HeartPulse':
      return <HeartPulse className={className} />;
    case 'Bath':
      return <Bath className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const AllAmenitiesModal: React.FC<AllAmenitiesModalProps> = ({
  isOpen,
  onClose,
  amenities,
}) => {
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

  // Group amenities by category
  const categories = Array.from(new Set(amenities.map((a) => a.category)));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="amenities-modal-title"
    >
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
          <h2 id="amenities-modal-title" className="text-xl font-bold text-[#222222]">
            What this place offers
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto divide-y divide-[#EBEBEB] space-y-6">
          {categories.map((category) => {
            const items = amenities.filter((a) => a.category === category);
            return (
              <div key={category} className="pt-6 first:pt-0">
                <h3 className="font-bold text-lg text-[#222222] mb-4">{category}</h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 text-[#222222]">
                      <div className="text-[#222222] shrink-0">
                        {renderAmenityIcon(item.iconName)}
                      </div>
                      <span className="text-base">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
