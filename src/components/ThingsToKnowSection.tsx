import React from 'react';
import { CalendarX2, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

interface ThingsToKnowSectionProps {
  cancellationPolicy: string;
  houseRules: string[];
  safetyProperty: string[];
}

export const ThingsToKnowSection: React.FC<ThingsToKnowSectionProps> = ({
  cancellationPolicy,
  houseRules,
  safetyProperty,
}) => {
  return (
    <section id="things-to-know" className="py-8 border-b border-[#EBEBEB]">
      <h2 className="text-[22px] font-bold text-[#222222] mb-6">Things to know</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cancellation Policy */}
        <div className="space-y-3">
          <div className="text-[#222222]">
            <CalendarX2 className="w-5 h-5 stroke-[1.8]" />
          </div>
          <h3 className="font-bold text-base text-[#222222]">Cancellation policy</h3>
          <p className="text-sm text-[#222222] leading-relaxed">
            {cancellationPolicy}
          </p>
          <button
            onClick={() => alert('Full cancellation policy: Cancel up to 24 hours before check-in for a full refund.')}
            className="flex items-center gap-1 text-sm font-bold text-[#222222] underline underline-offset-4 hover:opacity-80 pt-1 cursor-pointer"
          >
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* House Rules */}
        <div className="space-y-3">
          <div className="text-[#222222]">
            <Clock className="w-5 h-5 stroke-[1.8]" />
          </div>
          <h3 className="font-bold text-base text-[#222222]">House rules</h3>
          <div className="space-y-2 text-sm text-[#222222]">
            {houseRules.map((rule, idx) => (
              <div key={idx}>{rule}</div>
            ))}
          </div>
          <button
            onClick={() => alert('House Rules: No smoking indoors. Respect quiet hours 10 PM - 8 AM.')}
            className="flex items-center gap-1 text-sm font-bold text-[#222222] underline underline-offset-4 hover:opacity-80 pt-1 cursor-pointer"
          >
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Safety & Property */}
        <div className="space-y-3">
          <div className="text-[#222222]">
            <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
          </div>
          <h3 className="font-bold text-base text-[#222222]">Safety & property</h3>
          <div className="space-y-2 text-sm text-[#222222]">
            {safetyProperty.map((item, idx) => (
              <div key={idx}>{item}</div>
            ))}
          </div>
          <button
            onClick={() => alert('Safety details: Property includes on-site CCTV coverage for security in communal areas.')}
            className="flex items-center gap-1 text-sm font-bold text-[#222222] underline underline-offset-4 hover:opacity-80 pt-1 cursor-pointer"
          >
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
