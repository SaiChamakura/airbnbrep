import React, { useState } from 'react';
import { listingData } from './data/listingData';
import { GuestCounts } from './types';
import { Header } from './components/Header';
import { StickySubNav } from './components/StickySubNav';
import { PropertyHeader } from './components/PropertyHeader';
import { HeroGallery } from './components/HeroGallery';
import { PropertyOverview } from './components/PropertyOverview';
import { SleepingArrangements } from './components/SleepingArrangements';
import { AmenitiesSection } from './components/AmenitiesSection';
import { CalendarSection } from './components/CalendarSection';
import { BookingCard } from './components/BookingCard';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { HostSection } from './components/HostSection';
import { ThingsToKnowSection } from './components/ThingsToKnowSection';
import { Footer } from './components/Footer';
import { PhotoTourModal } from './components/PhotoTourModal';
import { LightboxModal } from './components/LightboxModal';
import { ShareModal } from './components/ShareModal';

export const App: React.FC = () => {
  // Booking dates (default: Oct 12, 2026 – Oct 17, 2026)
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date(2026, 9, 12));
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(new Date(2026, 9, 17));

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

  // Modals state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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
        // Same day click
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

  return (
    <div className="min-h-screen bg-white text-[#222222] flex flex-col selection:bg-[#FF385C]/20 selection:text-[#FF385C]">
      {/* Primary Header */}
      <Header savedCount={isSaved ? 1 : 0} />

      {/* Sticky Secondary Navigation Bar */}
      <StickySubNav
        onReserveClick={scrollToBookingCard}
        pricePerNight={listingData.pricePerNight}
        rating={listingData.rating}
        reviewCount={listingData.reviewCount}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative pb-12">
          {/* Left Column (7 cols on lg screens) */}
          <div className="lg:col-span-7 space-y-2">
            {/* Property Overview, Host, Highlights, AirCover, Description */}
            <PropertyOverview listing={listingData} />

            {/* Sleeping arrangements / bedrooms cards */}
            <SleepingArrangements bedrooms={listingData.bedrooms} />

            {/* Amenities Section */}
            <AmenitiesSection amenities={listingData.amenities} />

            {/* 2-Month Calendar & Date Picker */}
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
                const el = document.getElementById('amenities-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              guests={guests}
              onUpdateGuests={setGuests}
            />
          </div>
        </div>

        {/* Full-width Reviews Section */}
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

        {/* Things to Know Section (Rules, Safety, Cancellation) */}
        <ThingsToKnowSection listing={listingData} />
      </main>

      {/* Global Footer with Breadcrumb and 4-Column Navigation */}
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
