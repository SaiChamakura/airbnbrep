import React from 'react';
import { Globe, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F7F7F7] border-t border-[#DDDDDD] text-[#222222]">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1280px] mx-auto px-6 xl:px-12 py-5 border-b border-[#EBEBEB]">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-sm text-[#717171]">
          <a href="#" className="hover:underline hover:text-[#222222]">Airbnb</a>
          <ChevronRight className="w-3 h-3" />
          <a href="#" className="hover:underline hover:text-[#222222]">United States</a>
          <ChevronRight className="w-3 h-3" />
          <a href="#" className="hover:underline hover:text-[#222222]">California</a>
          <ChevronRight className="w-3 h-3" />
          <a href="#" className="hover:underline hover:text-[#222222]">Los Angeles County</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#222222] font-semibold">Malibu</span>
        </nav>
      </div>

      {/* 4 Columns Links */}
      <div className="max-w-[1280px] mx-auto px-6 xl:px-12 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Support */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#222222]">Support</h4>
          <ul className="space-y-2.5 text-[#222222]">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">AirCover</a></li>
            <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
            <li><a href="#" className="hover:underline">Disability support</a></li>
            <li><a href="#" className="hover:underline">Cancellation options</a></li>
            <li><a href="#" className="hover:underline">Report neighborhood concern</a></li>
          </ul>
        </div>

        {/* Community */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#222222]">Community</h4>
          <ul className="space-y-2.5 text-[#222222]">
            <li><a href="#" className="hover:underline">Airbnb.org: disaster relief housing</a></li>
            <li><a href="#" className="hover:underline">Support Afghan refugees</a></li>
            <li><a href="#" className="hover:underline">Combating discrimination</a></li>
          </ul>
        </div>

        {/* Hosting */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#222222]">Hosting</h4>
          <ul className="space-y-2.5 text-[#222222]">
            <li><a href="#" className="hover:underline">Airbnb your home</a></li>
            <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
            <li><a href="#" className="hover:underline">Hosting resources</a></li>
            <li><a href="#" className="hover:underline">Community forum</a></li>
            <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
            <li><a href="#" className="hover:underline">Airbnb-friendly apartments</a></li>
          </ul>
        </div>

        {/* Airbnb */}
        <div className="space-y-3">
          <h4 className="font-bold text-[#222222]">Airbnb</h4>
          <ul className="space-y-2.5 text-[#222222]">
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">New features</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
            <li><a href="#" className="hover:underline">Gift cards</a></li>
            <li><a href="#" className="hover:underline">Emergency stays</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="max-w-[1280px] mx-auto px-6 xl:px-12 py-6 border-t border-[#DDDDDD] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#222222]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-center md:text-left">
          <span>© 2026 Airbnb, Inc.</span>
          <span>·</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span>·</span>
          <a href="#" className="hover:underline">Terms</a>
          <span>·</span>
          <a href="#" className="hover:underline">Sitemap</a>
          <span>·</span>
          <a href="#" className="hover:underline">Company details</a>
        </div>

        <div className="flex items-center gap-6 font-semibold">
          <button
            onClick={() => alert('Language options')}
            className="flex items-center gap-2 hover:underline cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>English (IN)</span>
          </button>
          <button
            onClick={() => alert('Currency options')}
            className="hover:underline cursor-pointer"
          >
            ₹ INR
          </button>
        </div>
      </div>
    </footer>
  );
};
