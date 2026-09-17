import React, { useState } from 'react';
import { MapPin, Plus, Minus, Compass, Navigation } from 'lucide-react';

interface LocationSectionProps {
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  neighborhood,
  city,
  state,
  country,
}) => {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [mapType, setMapType] = useState<'map' | 'satellite'>('map');

  return (
    <section id="location-section" className="py-8 border-b border-[#EBEBEB]">
      <h2 className="text-[22px] font-bold text-[#222222] mb-2">Where you'll be</h2>
      <p className="text-base text-[#222222] mb-6">
        {city}, {state}, {country}
      </p>

      {/* Stylized Interactive Map Container */}
      <div className="relative w-full h-[400px] md:h-[460px] rounded-2xl overflow-hidden border border-[#DDDDDD] bg-[#E5E3DF] shadow-xs">
        {/* Map Canvas / Visual */}
        <div
          className={`w-full h-full transition-all duration-300 relative ${
            mapType === 'satellite'
              ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-800 via-stone-900 to-black'
              : 'bg-[#F2EFE9]'
          }`}
          style={{
            backgroundImage:
              mapType === 'map'
                ? `radial-gradient(#d5d3ce 1.5px, transparent 1.5px), radial-gradient(#d5d3ce 1.5px, #F2EFE9 1.5px)`
                : undefined,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        >
          {/* Coastal Line / Ocean Graphic */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Pacific ocean representation */}
            <div
              className={`absolute -bottom-10 -left-10 w-[120%] h-[55%] rounded-[40%] transform -rotate-6 transition-colors duration-300 ${
                mapType === 'satellite' ? 'bg-[#1a365d]/80' : 'bg-[#C2E0F9]'
              }`}
            >
              <span className="absolute bottom-16 right-32 text-xs uppercase tracking-widest font-bold text-sky-800/60 select-none">
                Pacific Ocean · Santa Monica Bay
              </span>
            </div>

            {/* Pacific Coast Highway (PCH) line */}
            <div className="absolute top-[48%] -left-10 w-[120%] h-3 bg-[#FFE082] transform -rotate-5 border-y border-amber-300 shadow-xs flex items-center justify-center">
              <span className="text-[9px] font-extrabold text-amber-900 uppercase tracking-wider">
                CA-1 · Pacific Coast Hwy
              </span>
            </div>

            {/* Hillside contour curves */}
            <div className="absolute top-12 left-12 w-64 h-36 border-2 border-emerald-800/10 rounded-full transform rotate-12" />
            <div className="absolute top-24 left-32 w-80 h-44 border-2 border-emerald-800/10 rounded-full transform -rotate-6" />

            {/* Pier Marker */}
            <div className="absolute bottom-32 left-[30%] flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs border border-neutral-300 text-xs font-semibold text-[#222222]">
              <Navigation className="w-3 h-3 text-sky-600" />
              <span>Malibu Pier & Farm</span>
            </div>

            {/* Carbon Beach Marker */}
            <div className="absolute bottom-24 left-[55%] flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs border border-neutral-300 text-xs font-semibold text-[#222222]">
              <Compass className="w-3 h-3 text-emerald-600" />
              <span>Carbon Beach (Billionaire's Beach)</span>
            </div>
          </div>

          {/* Central Property Radius Pin (Airbnb style circle) */}
          <div className="absolute top-[40%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10">
            {/* Animated soft outer circle */}
            <div className="w-24 h-24 rounded-full bg-[#FF385C]/20 border border-[#FF385C]/40 flex items-center justify-center animate-pulse">
              {/* Inner pin button */}
              <div className="w-12 h-12 rounded-full bg-[#FF385C] text-white shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 fill-current text-white" />
              </div>
            </div>
            <div className="bg-white px-3 py-1 rounded-md shadow-md text-xs font-bold text-[#222222] mt-2 border border-neutral-200">
              Exact location provided after booking
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            {/* Map / Satellite toggle */}
            <div className="bg-white rounded-lg shadow-md border border-[#DDDDDD] overflow-hidden flex text-xs font-semibold">
              <button
                onClick={() => setMapType('map')}
                className={`px-3 py-2 transition-colors cursor-pointer ${
                  mapType === 'map' ? 'bg-[#222222] text-white' : 'text-[#717171] hover:bg-[#F7F7F7]'
                }`}
              >
                Map
              </button>
              <button
                onClick={() => setMapType('satellite')}
                className={`px-3 py-2 transition-colors cursor-pointer ${
                  mapType === 'satellite' ? 'bg-[#222222] text-white' : 'text-[#717171] hover:bg-[#F7F7F7]'
                }`}
              >
                Satellite
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="bg-white rounded-lg shadow-md border border-[#DDDDDD] overflow-hidden flex flex-col divide-y divide-[#EBEBEB]">
              <button
                onClick={() => setZoomLevel((z) => Math.min(18, z + 1))}
                className="p-2 text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
                aria-label="Zoom in"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(10, z - 1))}
                className="p-2 text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
                aria-label="Zoom out"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scale note bottom left */}
          <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-neutral-600 font-mono">
            Zoom: {zoomLevel}x · Malibu Coastline
          </div>
        </div>
      </div>

      {/* Neighborhood Description */}
      <div className="mt-6 space-y-2">
        <h3 className="font-bold text-base text-[#222222]">{neighborhood}</h3>
        <p className="text-sm text-[#717171] leading-relaxed">
          The property is nestled high in the tranquil Malibu hills just minutes above Carbon Beach. You're a short 6-minute scenic drive to the Pacific Coast Highway, Nobu Malibu, Soho Little Beach House, and the shopping and gourmet markets at Malibu Country Mart. Santa Monica and LAX are approximately 30–45 minutes away.
        </p>
      </div>
    </section>
  );
};
