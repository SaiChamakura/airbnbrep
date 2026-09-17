import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface StickySubNavProps {
  onReserveClick: () => void;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
}

export const StickySubNav: React.FC<StickySubNavProps> = ({
  onReserveClick,
  pricePerNight,
  rating,
  reviewCount,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'photos' | 'amenities' | 'reviews' | 'location'>('photos');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show after scrolling past gallery (~550px)
      if (scrollY > 550) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Highlight active section based on scroll offset
      const amenitiesEl = document.getElementById('amenities-section');
      const reviewsEl = document.getElementById('reviews-section');
      const locationEl = document.getElementById('location-section');

      if (locationEl && scrollY >= locationEl.offsetTop - 140) {
        setActiveTab('location');
      } else if (reviewsEl && scrollY >= reviewsEl.offsetTop - 140) {
        setActiveTab('reviews');
      } else if (amenitiesEl && scrollY >= amenitiesEl.offsetTop - 140) {
        setActiveTab('amenities');
      } else {
        setActiveTab('photos');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const scrollToSection = (id: string, tab: 'photos' | 'amenities' | 'reviews' | 'location') => {
    setActiveTab(tab);
    if (tab === 'photos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-35 bg-white border-b border-[#DDDDDD] shadow-xs transition-transform duration-200">
      <div className="max-w-[1280px] mx-auto px-6 xl:px-12 h-20 flex items-center justify-between">
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-6 text-sm font-semibold h-full" aria-label="Listing navigation tabs">
          <button
            onClick={() => scrollToSection('hero-gallery', 'photos')}
            className={`h-full border-b-2 flex items-center transition-colors cursor-pointer ${
              activeTab === 'photos'
                ? 'border-[#222222] text-[#222222]'
                : 'border-transparent text-[#717171] hover:text-[#222222]'
            }`}
          >
            Photos
          </button>
          <button
            onClick={() => scrollToSection('amenities-section', 'amenities')}
            className={`h-full border-b-2 flex items-center transition-colors cursor-pointer ${
              activeTab === 'amenities'
                ? 'border-[#222222] text-[#222222]'
                : 'border-transparent text-[#717171] hover:text-[#222222]'
            }`}
          >
            Amenities
          </button>
          <button
            onClick={() => scrollToSection('reviews-section', 'reviews')}
            className={`h-full border-b-2 flex items-center transition-colors cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-[#222222] text-[#222222]'
                : 'border-transparent text-[#717171] hover:text-[#222222]'
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => scrollToSection('location-section', 'location')}
            className={`h-full border-b-2 flex items-center transition-colors cursor-pointer ${
              activeTab === 'location'
                ? 'border-[#222222] text-[#222222]'
                : 'border-transparent text-[#717171] hover:text-[#222222]'
            }`}
          >
            Location
          </button>
        </nav>

        {/* Mini Reserve Panel */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-lg font-bold text-[#222222]">
                ₹{pricePerNight.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#717171] font-normal">night</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#222222] font-semibold">
              <Star className="w-3 h-3 fill-current text-[#222222]" />
              <span>{rating.toFixed(2)}</span>
              <span className="text-[#717171]">({reviewCount})</span>
            </div>
          </div>

          <button
            onClick={onReserveClick}
            className="bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:opacity-95 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all shadow-md active:scale-98 cursor-pointer"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};
