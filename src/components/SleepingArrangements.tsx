import React from 'react';
import { Bedroom } from '../types';

interface SleepingArrangementsProps {
  bedrooms: Bedroom[];
}

export const SleepingArrangements: React.FC<SleepingArrangementsProps> = ({ bedrooms }) => {
  return (
    <section className="py-8 border-b border-[#EBEBEB]">
      <h2 className="text-[22px] font-bold text-[#222222] mb-6">Where you'll sleep</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {bedrooms.map((room) => (
          <div
            key={room.id}
            className="border border-[#DDDDDD] rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-400 transition-all bg-white shadow-xs group cursor-pointer"
          >
            {/* Bedroom Photo on top */}
            <div className="relative overflow-hidden rounded-xl mb-4 bg-neutral-100 aspect-4/3">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#222222] mb-1">{room.name}</h3>
              <p className="text-sm text-[#717171] leading-snug">{room.bedCount}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
