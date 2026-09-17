import React, { useState, useEffect } from 'react';
import { listingData, nearbyStays } from './data/listingData';
import { GuestCounts } from './types';
import { Header } from './components/Header';
import { PropertyHeader } from './components/PropertyHeader';
import { HeroGallery } from './components/HeroGallery';
import { PropertyOverview } from './components/PropertyOverview';
import { SleepingArrangements } from './components/SleepingArrangements';
import { AmenitiesSection } from './components/AmenitiesSection';
import { CalendarSection } from './components/CalendarSection';
import { ReserveModal } from './components/ReserveModal';
import { GuestFavoriteSection } from './components/GuestFavoriteSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { HostSection } from './components/HostSection';
import { ThingsToKnowSection } from './components/ThingsToKnowSection';
import { MoreStaysSection } from './components/MoreStaysSection';
import { PhotoTourModal } from './components/PhotoTourModal';
import { LightboxModal } from './components/LightboxModal';
import { ShareModal } from './components/ShareModal';
import { Heart } from 'lucide-react';

export const App: React.FC = () => {
  // Booking dates (Oct 18, 2026 – Oct 23, 2026: 5 nights)
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date(2026, 9, 18));
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(new Date(2026, 9, 23));

  // Guests count
  const [guests, setGuests] = useState<GuestCounts>({
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0,
  });

  // Saved / Wishlist toggle
  const [isSaved, setIsSaved] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('airbnb_goa_saved') === 'true';
    }
    return false;
  });

  // Wishlist Toast state (Change #3)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll detection for upper bar transformation
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('photos');

  // Modals state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 550);

      // Section spy
      const sections = ['location-section', 'reviews-section', 'amenities-section'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      setActiveSection('photos');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleToggleSave = () => {
    setIsSaved((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('airbnb_goa_saved', String(next));
      }
      setToastMessage(next ? 'Saved to wishlist' : 'Removed from wishlist');
      return next;
    });
  };

  const handleOpenPhotoTour = () => {
    setIsPhotoTourOpen(true);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleDateSelection = (date: Date) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
    } else if (checkInDate && !checkOutDate) {
      if (date < checkInDate) {
        setCheckInDate(date);
      } else if (date.getTime() === checkInDate.getTime()) {
        setCheckOutDate(null);
      } else {
        setCheckOutDate(date);
      }
    }
  };

  const handleClearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'photos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
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
    }
  };

  // Calculate nights and price for reserve modal
  const nightsCount =
    checkInDate && checkOutDate
      ? Math.max(
          1,
          Math.round(
            (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
          )
        )
      : 5;
  const basePrice = listingData.pricePerNight * nightsCount;
  const cleaningFee = listingData.cleaningFee || 3500;
  const serviceFee = listingData.serviceFee || 4200;
  const totalPrice = basePrice + cleaningFee + serviceFee;

  return (
    <div className="min-h-screen bg-white text-[#222222] flex flex-col selection:bg-[#FF385C]/20 selection:text-[#FF385C]">
      {/* Primary Header with Scrolled Upper Bar Transformation (Change #9) */}
      <Header
        savedCount={isSaved ? 1 : 0}
        isScrolled={isScrolled}
        activeSection={activeSection}
        onNavigate={handleNavigateSection}
        pricePerNight={listingData.pricePerNight}
        rating={listingData.rating}
        reviewCount={listingData.reviewCount}
        onReserveClick={() => setIsReserveModalOpen(true)}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 xl:px-12">
        {/* Listing Title, Share & Save Buttons */}
        <PropertyHeader
          title={listingData.title}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onShareClick={() => setIsShareModalOpen(true)}
        />

        {/* 5-Photo Hero Grid Gallery */}
        <HeroGallery
          photos={listingData.photos}
          onOpenPhotoTour={handleOpenPhotoTour}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* Main Details Section without redundant reserve & prices after dates (Change #3) */}
        <div className="max-w-[850px] space-y-2 pb-8">
          {/* Property Overview, Host, Highlights, Description */}
          <PropertyOverview listing={listingData} />

          {/* Sleeping arrangements with photos for each bedroom */}
          <SleepingArrangements bedrooms={listingData.bedrooms} />

          {/* Amenities Section */}
          <AmenitiesSection amenities={listingData.amenities} />

          {/* 2-Month Calendar & Date Picker with Connected Range Bands */}
          <CalendarSection
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            onSelectDate={handleDateSelection}
            onClearDates={handleClearDates}
            city={listingData.city}
          />
        </div>

        {/* Huge Guest Favorite Section after check-in date section (Change #10) */}
        <GuestFavoriteSection
          rating={listingData.rating}
          reviewCount={listingData.reviewCount}
          ratingsBreakdown={listingData.ratingsBreakdown}
        />

        {/* Single-Column Reviews Section (Change #11) */}
        <ReviewsSection
          overallRating={listingData.rating}
          totalReviews={listingData.reviewCount}
          ratingsBreakdown={listingData.ratingsBreakdown}
          reviews={listingData.reviews}
        />

        {/* Location & Map Section */}
        <LocationSection
          neighborhood={listingData.neighborhood}
          city={listingData.city}
          state={listingData.state}
          country={listingData.country}
        />

        {/* Detailed Host Section */}
        <HostSection host={listingData.host} />

        {/* Single-Column Things to Know Section (Change #12) */}
        <ThingsToKnowSection listing={listingData} />

        {/* More Stays Nearby Section (Change #13) */}
        <MoreStaysSection stays={nearbyStays} />
      </main>

      {/* Floating Wishlist Toast Notification (Change #3) */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#222222] text-white px-5 py-3 rounded-full shadow-2xl text-sm font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <Heart
            className={`w-4 h-4 ${
              toastMessage.includes('Saved') ? 'fill-[#FF385C] text-[#FF385C]' : 'text-white'
            }`}
          />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Reservation Flow Modal */}
      <ReserveModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        listing={listingData}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guests={guests}
        totalPrice={totalPrice}
        nightsCount={nightsCount}
      />

      {/* View 2: Full-screen Photo Tour Modal */}
      <PhotoTourModal
        isOpen={isPhotoTourOpen}
        onClose={() => setIsPhotoTourOpen(false)}
        photos={listingData.photos}
        onOpenLightboxAt={handleOpenLightbox}
        onShareClick={() => setIsShareModalOpen(true)}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
      />

      {/* View 3: Single-image Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        photos={listingData.photos}
        currentIndex={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onShareClick={() => setIsShareModalOpen(true)}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
      />

      {/* Share Listing Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        listing={listingData}
      />
    </div>
  );
};

export default App;
