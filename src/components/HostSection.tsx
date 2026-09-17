import React from 'react';
import { Shield, Star, Award, GraduationCap, Lightbulb } from 'lucide-react';
import { Host } from '../types';

interface HostSectionProps {
  host: Host;
}

export const HostSection: React.FC<HostSectionProps> = ({ host }) => {
  return (
    <section id="host-section" className="py-8 border-b border-[#EBEBEB]">
      <h2 className="text-[22px] font-bold text-[#222222] mb-6">Meet your host</h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Mirashya Homes Profile Card */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#FFFFFF] border border-[#DDDDDD] rounded-3xl p-6 shadow-md">
            <div className="flex items-center justify-between gap-4">
              {/* Host Avatar & Name */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#18392b] text-[#f4e4c1] flex flex-col items-center justify-center p-2 border border-[#122b20] shadow-sm mb-3 select-none">
                  <span className="text-[11px] font-black uppercase tracking-tighter text-center leading-tight">
                    MIRASHYA
                  </span>
                  <span className="text-[8px] uppercase tracking-widest text-[#d8c397]">
                    HOMES
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#222222]">{host.name}</h3>
                <span className="text-xs text-[#717171] font-semibold mt-0.5">
                  Host
                </span>
              </div>

              {/* Host Stats */}
              <div className="space-y-3 text-right">
                <div>
                  <div className="text-xl font-black text-[#222222]">
                    {host.reviewsCount.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[#717171]">Reviews</div>
                </div>
                <div className="h-px bg-[#EBEBEB]" />
                <div>
                  <div className="text-xl font-black text-[#222222] flex items-center justify-end gap-1">
                    <span>{host.rating.toFixed(2)}</span>
                    <Star className="w-3.5 h-3.5 fill-current text-[#222222]" />
                  </div>
                  <div className="text-[11px] text-[#717171]">Rating</div>
                </div>
                <div className="h-px bg-[#EBEBEB]" />
                <div>
                  <div className="text-xl font-black text-[#222222]">
                    {host.yearsHosting}
                  </div>
                  <div className="text-[11px] text-[#717171]">Years hosting</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Host Details below card */}
          <div className="space-y-3 text-sm text-[#222222]">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-[#222222] shrink-0" />
              <span>Born in the 80s</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-[#222222] shrink-0" />
              <span>Where I went to school: NICMAR GOA</span>
            </div>
          </div>
        </div>

        {/* Right Column: Co-Hosts & Host Details */}
        <div className="md:col-span-7 space-y-6">
          {/* Co-Hosts */}
          {host.coHosts && host.coHosts.length > 0 && (
            <div>
              <h3 className="font-bold text-base text-[#222222] mb-3">Co-Hosts</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {host.coHosts.map((coHost, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    {coHost.avatar ? (
                      <img
                        src={coHost.avatar}
                        alt={coHost.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#EBEBEB] text-[#222222] font-bold text-xs flex items-center justify-center shrink-0">
                        {coHost.initial || coHost.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-[#222222] truncate">
                      {coHost.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Host Response Details */}
          <div className="space-y-1">
            <h3 className="font-bold text-base text-[#222222]">Host details</h3>
            <p className="text-sm text-[#222222]">
              Response rate: {host.responseRate}
            </p>
            <p className="text-sm text-[#222222]">
              Responds {host.responseTime}
            </p>
          </div>

          {/* Message Host Button */}
          <div>
            <button
              onClick={() => alert('Message Host dialog: Sending message to Mirashya Homes...')}
              className="border border-[#222222] bg-[#222222] text-white hover:bg-black font-semibold text-sm px-6 py-3 rounded-lg transition-colors cursor-pointer active:scale-98"
            >
              Message host
            </button>
          </div>

          {/* Safety & Protection Notice */}
          <div className="pt-2 flex items-start gap-3 text-xs text-[#717171]">
            <Shield className="w-4 h-4 text-[#FF385C] shrink-0 mt-0.5" />
            <p>
              To help protect your payment, always use Airbnb to send money and communicate with hosts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
