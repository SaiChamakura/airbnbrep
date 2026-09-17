import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Mail, MessageCircle, Share2, Facebook, Twitter } from 'lucide-react';
import { ListingData } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: ListingData;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, listing }) => {
  const [copied, setCopied] = useState(false);

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

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://airbnb.com/rooms/malibu-villa';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
          <h3 id="share-modal-title" className="text-xl font-bold text-[#222222]">
            Share this place
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Listing preview item */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F7F7F7] border border-[#EBEBEB]">
            <img
              src={listing.photos[0]?.url}
              alt={listing.title}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <h4 className="font-bold text-sm text-[#222222] truncate">{listing.title}</h4>
              <p className="text-xs text-[#717171] mt-0.5">
                ★ {listing.rating.toFixed(2)} · {listing.reviewCount} reviews · {listing.city}, {listing.state}
              </p>
            </div>
          </div>

          {/* Share Channels Grid */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[#DDDDDD] hover:bg-[#F7F7F7] text-left transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <Copy className="w-5 h-5 text-[#222222] shrink-0" />
              )}
              <span className="text-sm font-semibold text-[#222222]">
                {copied ? 'Link copied!' : 'Copy Link'}
              </span>
            </button>

            <a
              href={`mailto:?subject=${encodeURIComponent(listing.title)}&body=${encodeURIComponent(currentUrl)}`}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[#DDDDDD] hover:bg-[#F7F7F7] text-left transition-colors cursor-pointer"
            >
              <Mail className="w-5 h-5 text-[#222222] shrink-0" />
              <span className="text-sm font-semibold text-[#222222]">Email</span>
            </a>

            <button
              onClick={() => {
                alert('Opening Messages sharing...');
              }}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[#DDDDDD] hover:bg-[#F7F7F7] text-left transition-colors cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-[#222222] shrink-0" />
              <span className="text-sm font-semibold text-[#222222]">Messages</span>
            </button>

            <button
              onClick={() => {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(listing.title)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
              }}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[#DDDDDD] hover:bg-[#F7F7F7] text-left transition-colors cursor-pointer"
            >
              <Twitter className="w-5 h-5 text-[#222222] shrink-0" />
              <span className="text-sm font-semibold text-[#222222]">Twitter / X</span>
            </button>

            <button
              onClick={() => {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
              }}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[#DDDDDD] hover:bg-[#F7F7F7] text-left transition-colors cursor-pointer"
            >
              <Facebook className="w-5 h-5 text-[#222222] shrink-0" />
              <span className="text-sm font-semibold text-[#222222]">Facebook</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: listing.title, url: currentUrl }).catch(() => {});
                } else {
                  handleCopy();
                }
              }}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[#DDDDDD] hover:bg-[#F7F7F7] text-left transition-colors cursor-pointer"
            >
              <Share2 className="w-5 h-5 text-[#222222] shrink-0" />
              <span className="text-sm font-semibold text-[#222222]">More options</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
