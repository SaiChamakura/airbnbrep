import React from 'react';
import { BedDouble, BedSingle } from 'lucide-react';
import { Bedroom } from '../types';

interface SleepingArrangementsProps {
  bedrooms: Bedroom[];
}

export const SleepingArrangements: React.FC<SleepingArrangementsProps> = ({ bedrooms }) => {
  return (
    <section className="py-8 border-b border-[#EBEBEB]">
      <h2 className="text-[22px] font-bold text-[#222222] mb-6">Where you'll sleep</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {bedrooms.map((room) => (
          <div
            key={room.id}
            className="border border-[#DDDDDD] rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-400 transition-colors bg-white shadow-xs"
          >
            <div>
              <div className="w-8 h-8 text-[#222222] mb-4">
                {room.bedType.includes('single') || room.bedType.includes('twin') ? (
                  <BedSingle className="w-7 h-7 stroke-[1.8]" />
                ) : (
                  <BedDouble className="w-7 h-7 stroke-[1.8]" />
                )}
              </div>
              <h3 className="font-semibold text-base text-[#222222] mb-1">{room.name}</h3>
              <p className="text-sm text-[#717171] leading-snug">{room.bedCount}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
