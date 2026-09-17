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
      return localStorage.getItem('airbnb_malibu_saved') === 'true';
    }
    return false;
  });

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

  const handleToggleSave = () => {
    setIsSaved((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('airbnb_malibu_saved', String(next));
      }
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

  const scrollToBookingCard = () => {
    const el = document.getElementById('booking-card-wrapper');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      {/* Primary Header with Scrolled Upper Bar Transformation (Change #9) */}
      <Header
        savedCount={isSaved ? 1 : 0}
        isScrolled={isScrolled}
        activeSection={activeSection}
        onNavigate={handleNavigateSection}
        pricePerNight={listingData.pricePerNight}
        rating={listingData.rating}
        reviewCount={listingData.reviewCount}
        onReserveClick={scrollToBookingCard}
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

        {/* 2-Column Content Layout: Left Details vs Right Sticky Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative pb-8">
          {/* Left Column (7 cols on lg screens) */}
          <div className="lg:col-span-7 space-y-2">
            {/* Property Overview, Host, Highlights, Description (AirCover removed) */}
            <PropertyOverview listing={listingData} />

            {/* Sleeping arrangements with photos for each bedroom (Change #7) */}
            <SleepingArrangements bedrooms={listingData.bedrooms} />

            {/* Amenities Section */}
            <AmenitiesSection amenities={listingData.amenities} />

            {/* 2-Month Calendar & Date Picker with Connected Range Bands (Change #8) */}
            <CalendarSection
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onSelectDate={handleDateSelection}
              onClearDates={handleClearDates}
              city={listingData.city}
            />
          </div>

          {/* Right Column: Sticky Booking Widget (5 cols on lg screens) */}
          <div id="booking-card-wrapper" className="lg:col-span-5 relative">
            <BookingCard
              listing={listingData}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onOpenCalendar={() => {
                const el = document.getElementById('calendar-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              guests={guests}
              onUpdateGuests={setGuests}
            />
          </div>
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

      {/* Global Footer */}
      <Footer />

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
