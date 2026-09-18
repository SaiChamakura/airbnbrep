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
import { BookingCard } from './components/BookingCard';
import { GuestFavoriteSection } from './components/GuestFavoriteSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { HostSection } from './components/HostSection';
import { ThingsToKnowSection } from './components/ThingsToKnowSection';
import { MoreStaysSection } from './components/MoreStaysSection';
import { Footer } from './components/Footer';
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

  // Wishlist Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll detection for upper bar transformation
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('photos');

  // Modals state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  return (
    <div className="min-h-screen bg-white text-[#222222] flex flex-col selection:bg-[#FF385C]/20 selection:text-[#FF385C]">
      {/* Primary Header with Scrolled Floating Bar */}
      <Header
        savedCount={isSaved ? 1 : 0}
        isScrolled={isScrolled}
        activeSection={activeSection}
        onNavigate={handleNavigateSection}
        pricePerNight={listingData.pricePerNight}
        rating={listingData.rating}
        reviewCount={listingData.reviewCount}
        onReserveClick={() => handleNavigateSection('calendar-section')}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-[1120px] w-full mx-auto px-6 sm:px-10 lg:px-12">
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

        {/* 2-Column Split: Left Details + Right Sticky Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 relative pb-8">
          {/* Left Column: Property Overview, Sleeping, Amenities, Calendar */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-2">
            <PropertyOverview listing={listingData} />
            <SleepingArrangements bedrooms={listingData.bedrooms} />
            <AmenitiesSection amenities={listingData.amenities} />
            <CalendarSection
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onSelectDate={handleDateSelection}
              onClearDates={handleClearDates}
              city={listingData.city}
            />
          </div>

          {/* Right Column: Sticky Booking Card & Promo Banner */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 relative pt-6">
            <BookingCard
              listing={listingData}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onOpenCalendar={() => handleNavigateSection('calendar-section')}
              guests={guests}
              onUpdateGuests={setGuests}
            />
          </div>
        </div>

        {/* Guest Favorite Centerpiece */}
        <GuestFavoriteSection
          rating={listingData.rating}
          reviewCount={listingData.reviewCount}
          ratingsBreakdown={listingData.ratingsBreakdown}
        />

        {/* Reviews Section */}
        <ReviewsSection
          reviews={listingData.reviews}
          overallRating={listingData.rating}
          totalReviewsCount={listingData.reviewCount}
        />

        {/* Location & Map Section */}
        <LocationSection listing={listingData} />

        {/* Detailed Host Section */}
        <HostSection host={listingData.host} />

        {/* Things to Know Section */}
        <ThingsToKnowSection
          cancellationPolicy={listingData.cancellationPolicy}
          houseRules={listingData.houseRules}
          safetyProperty={listingData.safetyProperty}
        />

        {/* More Stays Nearby Section */}
        <MoreStaysSection stays={nearbyStays} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Wishlist Toast Notification */}
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
