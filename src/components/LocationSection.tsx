import React, { useState } from 'react';
import { Plus, Minus, Locate, ChevronRight, Home } from 'lucide-react';
import { ListingData } from '../types';

interface LocationSectionProps {
  listing: ListingData;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ listing }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isNeighbourhoodExpanded, setIsNeighbourhoodExpanded] = useState(false);

  return (
    <section id="location-section" className="py-8 border-b border-[#EBEBEB]">
      <h2 className="text-[22px] font-bold text-[#222222] mb-1">Where you'll be</h2>
      <p className="text-base text-[#222222] mb-6">Candolim, Goa, India</p>

      {/* Styled Interactive Map */}
      <div className="relative w-full h-[380px] md:h-[460px] rounded-3xl overflow-hidden border border-[#DDDDDD] bg-[#E8ECE9] shadow-xs group select-none">
        {/* Styled Vector Map Canvas Texture */}
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{
            transform: `scale(${zoomLevel})`,
            backgroundImage: `
              radial-gradient(#15803d15 2px, transparent 2px),
              linear-gradient(to right, #d4dfd4 1px, transparent 1px),
              linear-gradient(to bottom, #d4dfd4 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 120px 120px, 120px 120px',
            backgroundColor: '#e6ede4',
          }}
        >
          {/* Simulated Coastline & Roads */}
          <div className="absolute top-0 right-0 w-2/5 h-full bg-[#cbd5e1]/40 -skew-x-12" />
          <div className="absolute left-1/4 top-0 w-8 h-full bg-[#f8fafc]/80 -rotate-12" />
          <div className="absolute top-1/2 left-0 w-full h-6 bg-[#f8fafc]/90 -rotate-3" />
          <div className="absolute top-1/3 left-10 w-96 h-4 bg-[#e2e8f0]/80 rotate-45" />

          {/* Location Area Label */}
          <div className="absolute top-12 left-16 text-emerald-900/60 font-black tracking-widest text-lg uppercase select-none">
            Candolim Beach Road
          </div>
          <div className="absolute bottom-16 right-24 text-blue-900/50 font-black tracking-widest text-base uppercase select-none">
            Arabian Sea
          </div>
        </div>

        {/* Central Circular Pin Badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Outer pulsating translucent radius ring */}
            <div className="w-40 h-40 rounded-full bg-[#FF385C]/15 animate-ping duration-1000" />
            <div className="absolute w-28 h-28 rounded-full bg-[#FF385C]/25 border border-[#FF385C]/40 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#FF385C] text-white flex items-center justify-center shadow-2xl ring-4 ring-white">
                <Home className="w-7 h-7 fill-white text-[#FF385C]" />
              </div>
            </div>
          </div>
        </div>

        {/* Zoom Controls (+ / -) */}
        <div className="absolute top-4 right-4 flex flex-col bg-white rounded-lg shadow-md border border-[#DDDDDD] overflow-hidden">
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
            aria-label="Zoom in map"
            className="p-2.5 hover:bg-[#F7F7F7] text-[#222222] transition-colors border-b border-[#EBEBEB] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
            aria-label="Zoom out map"
            className="p-2.5 hover:bg-[#F7F7F7] text-[#222222] transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Locate search icon */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md border border-[#DDDDDD] overflow-hidden">
          <button
            onClick={() => setZoomLevel(1)}
            aria-label="Recenter map"
            className="p-2.5 hover:bg-[#F7F7F7] text-[#222222] transition-colors cursor-pointer"
          >
            <Locate className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description below map */}
      <div className="mt-6 space-y-4">
        <p className="text-sm font-semibold text-[#222222]">
          Exact location will be provided after booking.
        </p>

        <div>
          <h3 className="font-bold text-base text-[#222222] mb-1">
            Neighbourhood highlights
          </h3>
          <p className="text-sm text-[#222222] leading-relaxed">
            Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
            {isNeighbourhoodExpanded && (
              <span className="block mt-2 text-[#717171]">
                Enjoy world-famous beach shacks like Calamari and Fisherman’s Cove, vibrant nightlife at Tito's Lane (10 mins away), supermarkets, scooters on rent, and boutique eateries right outside the gate.
              </span>
            )}
          </p>

          <button
            onClick={() => setIsNeighbourhoodExpanded(!isNeighbourhoodExpanded)}
            className="flex items-center gap-1 text-sm font-bold text-[#222222] underline underline-offset-4 mt-2 hover:opacity-80 cursor-pointer"
          >
            <span>{isNeighbourhoodExpanded ? 'Show less' : 'Show more'}</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
