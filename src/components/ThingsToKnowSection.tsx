import React, { useState } from 'react';
import { ChevronRight, Clock, ShieldAlert, CalendarX, X } from 'lucide-react';
import { ListingData } from '../types';

interface ThingsToKnowSectionProps {
  listing: ListingData;
}

export const ThingsToKnowSection: React.FC<ThingsToKnowSectionProps> = ({ listing }) => {
  const [activeModal, setActiveModal] = useState<'rules' | 'safety' | 'cancellation' | null>(null);

  return (
    <section className="py-8 border-b border-[#EBEBEB]">
      <h2 className="text-[22px] font-bold text-[#222222] mb-6">Things to know</h2>

      {/* SINGLE COLUMN LAYOUT AS REQUESTED IN ITEM #12 */}
      <div className="flex flex-col space-y-6 divide-y divide-[#EBEBEB] max-w-2xl text-sm">
        {/* House rules */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-base text-[#222222] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#222222]" />
            <span>House rules</span>
          </h3>
          <ul className="space-y-2 text-[#222222]">
            <li>Check-in: 3:00 PM – 9:00 PM</li>
            <li>Checkout before 11:00 AM</li>
            <li>{listing.guestsCount} guests maximum</li>
            <li>No commercial parties or events</li>
          </ul>
          <button
            onClick={() => setActiveModal('rules')}
            className="inline-flex items-center gap-1 font-semibold text-[#222222] underline underline-offset-4 hover:text-black cursor-pointer pt-1"
          >
            <span>Show more</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Safety & property */}
        <div className="space-y-3 pt-6">
          <h3 className="font-bold text-base text-[#222222] flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#222222]" />
            <span>Safety & property</span>
          </h3>
          <ul className="space-y-2 text-[#222222]">
            <li>Exterior security cameras on property</li>
            <li>Carbon monoxide alarm installed</li>
            <li>Smoke alarm installed</li>
            <li>Infinity pool and heated spa – unfenced</li>
          </ul>
          <button
            onClick={() => setActiveModal('safety')}
            className="inline-flex items-center gap-1 font-semibold text-[#222222] underline underline-offset-4 hover:text-black cursor-pointer pt-1"
          >
            <span>Show more</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Cancellation policy */}
        <div className="space-y-3 pt-6">
          <h3 className="font-bold text-base text-[#222222] flex items-center gap-2">
            <CalendarX className="w-4 h-4 text-[#222222]" />
            <span>Cancellation policy</span>
          </h3>
          <p className="text-[#222222] leading-relaxed">
            Free cancellation for 48 hours. Cancel up to 14 days before check-in for a full refund.
          </p>
          <button
            onClick={() => setActiveModal('cancellation')}
            className="inline-flex items-center gap-1 font-semibold text-[#222222] underline underline-offset-4 hover:text-black cursor-pointer pt-1"
          >
            <span>Show more</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Modal Dialog */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
              <h3 className="text-xl font-bold text-[#222222]">
                {activeModal === 'rules' && 'House Rules'}
                {activeModal === 'safety' && 'Safety & Property'}
                {activeModal === 'cancellation' && 'Cancellation Policy'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#222222] leading-relaxed">
              {activeModal === 'rules' && (
                <div className="space-y-4">
                  <p>You'll be staying in someone's home, so please treat it with care and respect.</p>
                  <div className="space-y-2">
                    <h4 className="font-bold text-base">Checking in and out</h4>
                    <p>• Check-in: 3:00 PM – 9:00 PM</p>
                    <p>• Checkout: 11:00 AM</p>
                    <p>• Self check-in with keypad smart lock</p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-[#EBEBEB]">
                    <h4 className="font-bold text-base">During your stay</h4>
                    <p>• 8 guests maximum</p>
                    <p>• No pets permitted</p>
                    <p>• Quiet hours: 10:00 PM – 8:00 AM</p>
                    <p>• Commercial filming or unauthorized photography is prohibited</p>
                    <p>• No smoking anywhere inside or on exterior decks</p>
                  </div>
                </div>
              )}

              {activeModal === 'safety' && (
                <div className="space-y-4">
                  <p>Avoid surprises by reviewing these safety features and property characteristics.</p>
                  <div className="space-y-2">
                    <h4 className="font-bold text-base">Safety devices</h4>
                    <p>• Exterior security cameras on driveway and entrance for property monitoring</p>
                    <p>• Carbon monoxide detector</p>
                    <p>• Smoke detector</p>
                    <p>• Fire extinguisher in kitchen and laundry room</p>
                    <p>• First aid kit in primary bath</p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-[#EBEBEB]">
                    <h4 className="font-bold text-base">Property info</h4>
                    <p>• Pool/hot tub without a gate or lock</p>
                    <p>• Hillside terrain with exterior stairs</p>
                  </div>
                </div>
              )}

              {activeModal === 'cancellation' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-base">Flexible Cancellation</h4>
                  <p>
                    • Full refund within 48 hours of booking, provided check-in is at least 14 days away.
                  </p>
                  <p>
                    • 50% refund up to 7 days before check-in.
                  </p>
                  <p>
                    • Review Host's full cancellation policy which applies even if you cancel for illness or disruptions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
