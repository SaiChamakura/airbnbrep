import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Share2, Heart } from 'lucide-react';
import { Photo } from '../types';

interface PhotoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Photo[];
  onOpenLightboxAt: (index: number) => void;
  onShareClick: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

interface RoomTourSection {
  id: string;
  name: string;
  amenities: string;
  thumbnail: string;
  photos: {
    id: number;
    url: string;
    caption: string;
    aspect?: string;
  }[];
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  isOpen,
  onClose,
  photos,
  onOpenLightboxAt,
  onShareClick,
  isSaved,
  onToggleSave,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('living-room-1');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Grouped room sections matching the original Airbnb listing format
  const roomSections: RoomTourSection[] = [
    {
      id: 'living-room-1',
      name: 'Living room 1',
      amenities: 'Sofa · Air conditioning · Ceiling fan · TV',
      thumbnail: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80',
          caption: 'Living room with comfortable sofa seating, entertainment unit, and warm ambient lighting',
          aspect: '16/9',
        },
        {
          id: 101,
          url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
          caption: 'Living room dining and lounge area with Smart LED TV',
          aspect: '4/3',
        },
        {
          id: 102,
          url: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80',
          caption: 'Spacious sofa seating and wooden coffee table',
          aspect: '4/3',
        },
      ],
    },
    {
      id: 'living-room-2',
      name: 'Living room 2',
      amenities: 'Ceiling fan · Hot tub',
      thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
      photos: [
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
          caption: 'Private jacuzzi deck inside the apartment with ambient wall sconces',
          aspect: '16/9',
        },
        {
          id: 201,
          url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
          caption: 'Balcony lounge and relaxation space adjoining the hot tub',
          aspect: '4/3',
        },
        {
          id: 202,
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          caption: 'Architectural stone wall with mood lighting in the jacuzzi suite',
          aspect: '4/3',
        },
      ],
    },
    {
      id: 'full-kitchen',
      name: 'Full kitchen',
      amenities: 'Refrigerator · Microwave · Cooking basics',
      thumbnail: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
      photos: [
        {
          id: 7,
          url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80',
          caption: 'Fully equipped modular kitchenette with induction cooktop, kettle, and microwave',
          aspect: '16/9',
        },
        {
          id: 301,
          url: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=80',
          caption: 'Countertop with dining utensils, coffee maker, and cookware',
          aspect: '4/3',
        },
      ],
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      amenities: '1 double bed · Air conditioning · Wardrobe',
      thumbnail: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=400&q=80',
      photos: [
        {
          id: 4,
          url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80',
          caption: 'Master bedroom with plush double bed, bedside lamps, and air conditioning',
          aspect: '16/9',
        },
        {
          id: 401,
          url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
          caption: 'Bedroom wardrobe closet and cozy reading corner',
          aspect: '4/3',
        },
      ],
    },
    {
      id: 'full-bathroom',
      name: 'Full bathroom',
      amenities: 'Hot water · Shower · Hair dryer',
      thumbnail: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=400&q=80',
      photos: [
        {
          id: 9,
          url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80',
          caption: 'Modern bathroom with glass-partitioned shower stall and lighted vanity mirror',
          aspect: '16/9',
        },
        {
          id: 501,
          url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=80',
          caption: 'Clean bathroom sink, toiletries, and fresh cotton towels',
          aspect: '4/3',
        },
      ],
    },
    {
      id: 'gym',
      name: 'Gym',
      amenities: 'Shared gym in building · Cardio & weights',
      thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
      photos: [
        {
          id: 601,
          url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
          caption: 'Residential fitness center with treadmills, elliptical, and dumbbell rack',
          aspect: '16/9',
        },
      ],
    },
    {
      id: 'exterior',
      name: 'Exterior',
      amenities: 'Building facade · Lush surroundings',
      thumbnail: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=80',
      photos: [
        {
          id: 5,
          url: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80',
          caption: 'Amor de Goa complex exterior architecture with landscaped gardens',
          aspect: '16/9',
        },
      ],
    },
    {
      id: 'pool',
      name: 'Pool',
      amenities: 'Shared outdoor swimming pool',
      thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
      photos: [
        {
          id: 6,
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
          caption: 'Resort-style outdoor swimming pool with sunbeds and palm trees',
          aspect: '16/9',
        },
      ],
    },
    {
      id: 'additional-photos',
      name: 'Additional photos',
      amenities: 'Property details and ambience',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
      photos: [
        {
          id: 701,
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
          caption: 'Warm ambient lighting and serene evening mood in the apartment',
          aspect: '16/9',
        },
      ],
    },
  ];

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

  const handleScrollToRoom = (roomId: string) => {
    setActiveSectionId(roomId);
    const target = document.getElementById(`tour-room-${roomId}`);
    if (target && scrollContainerRef.current) {
      const topOffset = target.offsetTop - 190;
      scrollContainerRef.current.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-tour-title"
    >
      {/* 1. Sticky Header Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#EBEBEB] px-6 h-16 flex items-center justify-between shrink-0">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-[#F7F7F7] text-[#222222] transition-colors cursor-pointer"
          aria-label="Back to listing"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        <h2 id="photo-tour-title" className="text-base font-semibold text-[#222222]">
          Photo tour
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={onShareClick}
            className="p-2 rounded-full hover:bg-[#F7F7F7] text-[#222222] transition-colors cursor-pointer"
            aria-label="Share listing"
          >
            <Share2 className="w-5 h-5 stroke-[2]" />
          </button>

          <button
            onClick={onToggleSave}
            className="p-2 rounded-full hover:bg-[#F7F7F7] text-[#222222] transition-colors cursor-pointer"
            aria-label={isSaved ? 'Saved' : 'Save'}
          >
            <Heart
              className={`w-5 h-5 stroke-[2] ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-[#222222]'
              }`}
            />
          </button>
        </div>
      </header>

      {/* 2. Horizontal Room Thumbnail Navigation Strip (as seen on Airbnb PDF) */}
      <div className="bg-white border-b border-[#EBEBEB] px-6 py-4 overflow-x-auto shrink-0 scrollbar-none">
        <div className="flex items-start gap-4 min-w-max">
          {roomSections.map((room) => {
            const isActive = activeSectionId === room.id;
            return (
              <button
                key={room.id}
                onClick={() => handleScrollToRoom(room.id)}
                className="flex flex-col items-start text-left group cursor-pointer transition-all"
              >
                <div
                  className={`w-24 h-16 rounded-xl overflow-hidden bg-neutral-100 border-2 transition-all ${
                    isActive ? 'border-[#222222] shadow-sm' : 'border-transparent group-hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={room.thumbnail}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium max-w-[96px] truncate ${
                    isActive ? 'text-[#222222] font-bold' : 'text-[#717171] group-hover:text-[#222222]'
                  }`}
                >
                  {room.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Scrollable 2-Column Photo Feed */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-6 sm:px-12 py-10"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          {roomSections.map((room) => (
            <div
              key={room.id}
              id={`tour-room-${room.id}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 pt-6 first:pt-0"
            >
              {/* Left Column: Room Name & Amenities Subtitle */}
              <div className="md:col-span-4 lg:col-span-4 space-y-1.5 md:sticky md:top-6 self-start">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#222222] tracking-tight">
                  {room.name}
                </h3>
                <p className="text-sm text-[#717171] leading-relaxed">
                  {room.amenities}
                </p>
              </div>

              {/* Right Column: Room Photos Gallery */}
              <div className="md:col-span-8 lg:col-span-8 space-y-4">
                {room.photos.length === 1 && (
                  <div
                    onClick={() => {
                      const idx = photos.findIndex((p) => p.url === room.photos[0].url);
                      onOpenLightboxAt(idx >= 0 ? idx : 0);
                    }}
                    className="group cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 border border-[#EBEBEB] aspect-16/10"
                  >
                    <img
                      src={room.photos[0].url}
                      alt={room.photos[0].caption}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

                {room.photos.length === 2 && (
                  <div className="space-y-4">
                    <div
                      onClick={() => {
                        const idx = photos.findIndex((p) => p.url === room.photos[0].url);
                        onOpenLightboxAt(idx >= 0 ? idx : 0);
                      }}
                      className="group cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 border border-[#EBEBEB] aspect-16/10"
                    >
                      <img
                        src={room.photos[0].url}
                        alt={room.photos[0].caption}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div
                      onClick={() => {
                        const idx = photos.findIndex((p) => p.url === room.photos[1].url);
                        onOpenLightboxAt(idx >= 0 ? idx : 0);
                      }}
                      className="group cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 border border-[#EBEBEB] aspect-16/10"
                    >
                      <img
                        src={room.photos[1].url}
                        alt={room.photos[1].caption}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                {room.photos.length >= 3 && (
                  <div className="space-y-4">
                    {/* First main big photo */}
                    <div
                      onClick={() => {
                        const idx = photos.findIndex((p) => p.url === room.photos[0].url);
                        onOpenLightboxAt(idx >= 0 ? idx : 0);
                      }}
                      className="group cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 border border-[#EBEBEB] aspect-16/10"
                    >
                      <img
                        src={room.photos[0].url}
                        alt={room.photos[0].caption}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Next 2 photos side by side */}
                    <div className="grid grid-cols-2 gap-4">
                      {room.photos.slice(1, 3).map((subPhoto, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => {
                            const idx = photos.findIndex((p) => p.url === subPhoto.url);
                            onOpenLightboxAt(idx >= 0 ? idx : 0);
                          }}
                          className="group cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 border border-[#EBEBEB] aspect-4/3"
                        >
                          <img
                            src={subPhoto.url}
                            alt={subPhoto.caption}
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
