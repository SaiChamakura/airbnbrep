import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Share, Heart } from 'lucide-react';
import { Photo } from '../types';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Photo[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onShareClick: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onIndexChange,
  onShareClick,
  isSaved = false,
  onToggleSave,
}) => {
  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onIndexChange]);

  const handleNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-60 bg-black/95 text-white flex flex-col justify-between select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Top Navigation Bar */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-white/10 shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white/80 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
          <span className="text-sm font-semibold">Close</span>
        </button>

        {/* Counter */}
        <div className="text-sm font-semibold tracking-wide text-white/90">
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onShareClick}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Share photo"
          >
            <Share className="w-5 h-5" />
          </button>
          {onToggleSave && (
            <button
              onClick={onToggleSave}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Save listing"
            >
              <Heart
                className={`w-5 h-5 ${
                  isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-white'
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Main Center Stage with Prev / Next Navigation */}
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 min-h-0">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-6 z-10 w-12 h-12 rounded-full border border-white/30 bg-black/40 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Centered Image with smooth transition */}
        <div className="relative max-w-full max-h-full flex items-center justify-center">
          <img
            key={currentPhoto.id}
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            className="max-h-[72vh] max-w-[85vw] object-contain rounded-lg shadow-2xl transition-all duration-300"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-6 z-10 w-12 h-12 rounded-full border border-white/30 bg-black/40 hover:bg-black/80 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption & Thumbnail Strip */}
      <div className="border-t border-white/10 bg-black/80 p-4 shrink-0 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Caption */}
        <div className="text-center md:text-left text-sm text-white/90 max-w-xl truncate">
          <span className="font-semibold capitalize text-white/60 mr-2">[{currentPhoto.category}]</span>
          {currentPhoto.caption}
        </div>

        {/* Thumbnail reel */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-md py-1 px-2 scrollbar-none">
          {photos.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => onIndexChange(idx)}
              className={`shrink-0 w-12 h-8 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                idx === currentIndex ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img src={p.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
