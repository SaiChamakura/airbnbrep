import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share, Heart, Sparkles } from 'lucide-react';
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

type PhotoCategory = 'all' | 'living' | 'bedroom' | 'kitchen' | 'outdoor' | 'bath';

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  isOpen,
  onClose,
  photos,
  onOpenLightboxAt,
  onShareClick,
  isSaved,
  onToggleSave,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>('all');

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

  const categories: { key: PhotoCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All photos', count: photos.length },
    { key: 'outdoor', label: 'Pool & Outdoor', count: photos.filter((p) => p.category === 'outdoor').length },
    { key: 'living', label: 'Living room', count: photos.filter((p) => p.category === 'living').length },
    { key: 'bedroom', label: 'Bedrooms', count: photos.filter((p) => p.category === 'bedroom').length },
    { key: 'kitchen', label: 'Kitchen & dining', count: photos.filter((p) => p.category === 'kitchen').length },
    { key: 'bath', label: 'Bathrooms', count: photos.filter((p) => p.category === 'bath').length },
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-tour-title"
    >
      {/* Sticky Header Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#EBEBEB] px-6 h-18 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 p-2.5 rounded-full hover:bg-[#F7F7F7] text-[#222222] transition-colors cursor-pointer"
          aria-label="Back to listing"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          <span className="text-sm font-semibold hidden sm:inline">Back to listing</span>
        </button>

        <h2 id="photo-tour-title" className="text-base font-bold text-[#222222]">
          Photo tour
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={onShareClick}
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] rounded-lg transition-colors cursor-pointer"
            aria-label="Share listing"
          >
            <Share className="w-4 h-4 stroke-[2.2]" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={onToggleSave}
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] rounded-lg transition-colors cursor-pointer"
            aria-label={isSaved ? 'Saved' : 'Save'}
          >
            <Heart
              className={`w-4 h-4 stroke-[2.2] ${
                isSaved ? 'fill-[#FF385C] text-[#FF385C]' : 'text-[#222222]'
              }`}
            />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-[#EBEBEB] bg-white px-6 py-3 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-[#222222] text-white shadow-xs'
                : 'bg-[#F7F7F7] hover:bg-[#EBEBEB] text-[#222222]'
            }`}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* Main Scrollable Photo Feed */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {filteredPhotos.map((photo) => {
            const originalIndex = photos.findIndex((p) => p.id === photo.id);
            return (
              <div
                key={photo.id}
                className="group cursor-pointer space-y-3"
                onClick={() => onOpenLightboxAt(originalIndex)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-neutral-100 border border-[#EBEBEB]">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full max-h-[700px] object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {photo.category}
                  </div>
                </div>
                <div className="flex items-baseline justify-between px-1">
                  <p className="text-sm font-medium text-[#222222]">{photo.caption}</p>
                  <span className="text-xs text-[#717171] font-semibold shrink-0 ml-4">
                    Photo {originalIndex + 1} of {photos.length}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
