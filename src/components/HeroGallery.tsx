import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { Photo } from '../types';

interface HeroGalleryProps {
  photos: Photo[];
  onOpenPhotoTour: () => void;
  onOpenLightbox: (index: number) => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  photos,
  onOpenPhotoTour,
  onOpenLightbox,
}) => {
  const displayPhotos = photos.slice(0, 5);

  return (
    <section id="hero-gallery" className="relative mb-8" aria-label="Photo gallery">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[380px] md:h-[460px] rounded-xl overflow-hidden relative">
        {/* Main large photo (Left half, 2 cols, 2 rows) */}
        {displayPhotos[0] && (
          <div
            className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer"
            onClick={() => onOpenLightbox(0)}
            role="button"
            tabIndex={0}
            aria-label={`View photo 1: ${displayPhotos[0].caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(0);
              }
            }}
          >
            <img
              src={displayPhotos[0].url}
              alt={displayPhotos[0].caption}
              className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}

        {/* Secondary photo 1 (Top Middle) */}
        {displayPhotos[1] && (
          <div
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer"
            onClick={() => onOpenLightbox(1)}
            role="button"
            tabIndex={0}
            aria-label={`View photo 2: ${displayPhotos[1].caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(1);
              }
            }}
          >
            <img
              src={displayPhotos[1].url}
              alt={displayPhotos[1].caption}
              className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}

        {/* Secondary photo 2 (Top Right) */}
        {displayPhotos[2] && (
          <div
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer"
            onClick={() => onOpenLightbox(2)}
            role="button"
            tabIndex={0}
            aria-label={`View photo 3: ${displayPhotos[2].caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(2);
              }
            }}
          >
            <img
              src={displayPhotos[2].url}
              alt={displayPhotos[2].caption}
              className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}

        {/* Secondary photo 3 (Bottom Middle) */}
        {displayPhotos[3] && (
          <div
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer"
            onClick={() => onOpenLightbox(3)}
            role="button"
            tabIndex={0}
            aria-label={`View photo 4: ${displayPhotos[3].caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(3);
              }
            }}
          >
            <img
              src={displayPhotos[3].url}
              alt={displayPhotos[3].caption}
              className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}

        {/* Secondary photo 4 (Bottom Right) */}
        {displayPhotos[4] && (
          <div
            className="col-span-1 row-span-1 relative overflow-hidden group cursor-pointer"
            onClick={() => onOpenLightbox(4)}
            role="button"
            tabIndex={0}
            aria-label={`View photo 5: ${displayPhotos[4].caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(4);
              }
            }}
          >
            <img
              src={displayPhotos[4].url}
              alt={displayPhotos[4].caption}
              className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
          </div>
        )}
      </div>

      {/* "Show all photos" floating button */}
      <button
        onClick={onOpenPhotoTour}
        className="absolute bottom-5 right-5 z-10 flex items-center gap-2 bg-white/95 hover:bg-white text-[#222222] text-sm font-semibold px-4 py-1.5 rounded-lg border border-[#222222] shadow-md hover:scale-[1.02] active:scale-98 transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#222222]"
        aria-label={`Show all ${photos.length} photos`}
      >
        <LayoutGrid className="w-4 h-4" />
        <span>Show all {photos.length} photos</span>
      </button>
    </section>
  );
};
