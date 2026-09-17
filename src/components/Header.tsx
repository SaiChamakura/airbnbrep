import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, Menu, User, Heart, HelpCircle, Gift, Sparkles, X } from 'lucide-react';

interface HeaderProps {
  onSearchClick?: () => void;
  savedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ savedCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [destination, setDestination] = useState('Malibu, California');
  const [guestText, setGuestText] = useState('2 guests');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EBEBEB] shadow-xs">
      <div className="max-w-[1280px] mx-auto px-6 xl:px-12 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex-1 flex items-center">
          <a
            href="/"
            aria-label="Airbnb homepage"
            className="flex items-center gap-2 text-[#FF385C] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#222222] rounded-lg p-1"
          >
            <svg
              className="w-8 h-8 fill-current shrink-0"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.479.96 3.322.146 2.484-.962 4.787-3.004 6.241-1.637 1.166-3.666 1.777-5.712 1.722l-.767-.042c-2.327-.246-4.509-1.428-6.006-3.262-1.497 1.834-3.679 3.016-6.006 3.262l-.767.042c-2.046.055-4.075-.556-5.712-1.722-2.042-1.454-3.15-3.757-3.004-6.241.05-.843.293-1.731.96-3.322l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C8.537 1.963 9.992 1 12 1h4zm0 2.2c-1.282 0-2.274.659-3.36 2.659l-.497.954c-1.922 3.766-6.065 12.441-7.037 14.708l-.133.324c-.58 1.385-.77 2.083-.807 2.716-.104 1.777.683 3.42 2.134 4.453 1.171.834 2.623 1.272 4.088 1.233l.548-.03c2.072-.22 3.999-1.378 5.176-3.149l.788-1.189.788 1.189c1.177 1.771 3.104 2.929 5.176 3.149l.548.03c1.465.039 2.917-.399 4.088-1.233 1.451-1.033 2.238-2.676 2.134-4.453-.037-.633-.227-1.331-.807-2.716l-.133-.324c-.972-2.267-5.115-10.942-7.037-14.708l-.497-.954C18.274 3.859 17.282 3.2 16 3.2zm0 13.8c2.209 0 4 1.791 4 4 0 2.115-1.637 3.847-3.714 3.989L16 25c-2.209 0-4-1.791-4-4 0-2.115 1.637-3.847 3.714-3.989L16 17zm0 2.2c-.994 0-1.8.806-1.8 1.8 0 .937.716 1.706 1.632 1.792L16 22.8c.994 0 1.8-.806 1.8-1.8 0-.937-.716-1.706-1.632-1.792L16 19.2z" />
            </svg>
            <span className="text-[#FF385C] font-bold text-xl tracking-tight hidden sm:inline">airbnb</span>
          </a>
        </div>

        {/* Center: Search pill */}
        <div className="flex-initial">
          <button
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            className="flex items-center text-sm font-medium border border-[#DDDDDD] rounded-full py-2 pl-5 pr-2 shadow-xs hover:shadow-md transition-shadow cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#222222]"
            aria-label="Search destinations, dates, and guests"
          >
            <span className="font-semibold text-[#222222] pr-3 border-r border-[#EBEBEB]">Anywhere</span>
            <span className="font-semibold text-[#222222] px-3 border-r border-[#EBEBEB]">Any week</span>
            <span className="text-[#717171] pl-3 pr-2">Add guests</span>
            <div className="bg-[#FF385C] text-white p-2 rounded-full ml-1">
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </button>
        </div>

        {/* Right: Actions and User Profile */}
        <div className="flex-1 flex items-center justify-end gap-1">
          <a
            href="#host-section"
            className="text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] px-3.5 py-2.5 rounded-full transition-colors hidden md:block"
          >
            Airbnb your home
          </a>

          <button
            aria-label="Choose language and currency"
            className="p-2.5 text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors cursor-pointer"
            onClick={() => alert('Language set to English (US) · Currency set to USD ($)')}
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* User Menu Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 border border-[#DDDDDD] rounded-full pl-3.5 pr-1.5 py-1.5 hover:shadow-md transition-shadow cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#222222]"
              aria-expanded={isMenuOpen}
              aria-label="User navigation menu"
            >
              <Menu className="w-4 h-4 text-[#222222] stroke-[2.2]" />
              <div className="w-8 h-8 bg-[#717171] text-white rounded-full flex items-center justify-center overflow-hidden relative">
                <User className="w-5 h-5 fill-current text-white translate-y-0.5" />
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF385C] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white">
                    {savedCount}
                  </span>
                )}
              </div>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2.5 w-64 bg-white rounded-2xl shadow-xl border border-[#EBEBEB] py-2 z-50 text-sm animate-in fade-in zoom-in-95 duration-100">
                <div className="py-1">
                  <button
                    onClick={() => { alert('Sign up modal'); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={() => { alert('Log in modal'); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                  >
                    Log in
                  </button>
                </div>
                <div className="h-px bg-[#EBEBEB] my-1" />
                <div className="py-1">
                  <a
                    href="#host-section"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2.5 text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                  >
                    Airbnb your home
                  </a>
                  <button
                    onClick={() => { alert('Host an experience'); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                  >
                    Host an experience
                  </button>
                  <button
                    onClick={() => { alert('Help center'); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                  >
                    Help Center
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Search Bar Drawer */}
      {isSearchExpanded && (
        <div className="border-t border-[#EBEBEB] bg-[#F7F7F7] py-4 px-6 shadow-inner animate-in slide-in-from-top-2 duration-150">
          <div className="max-w-[850px] mx-auto bg-white border border-[#DDDDDD] rounded-full shadow-lg p-2 flex items-center divide-x divide-[#EBEBEB]">
            <div className="flex-1 px-6 py-2">
              <label className="block text-[11px] font-bold tracking-wider uppercase text-[#222222]">Where</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Search destinations"
                className="w-full text-sm font-medium text-[#222222] focus:outline-hidden bg-transparent"
              />
            </div>
            <div className="flex-1 px-6 py-2">
              <label className="block text-[11px] font-bold tracking-wider uppercase text-[#222222]">Check in / out</label>
              <div className="text-sm font-medium text-[#222222]">Oct 12 – Oct 17</div>
            </div>
            <div className="flex-1 px-6 py-2 flex items-center justify-between">
              <div>
                <label className="block text-[11px] font-bold tracking-wider uppercase text-[#222222]">Who</label>
                <input
                  type="text"
                  value={guestText}
                  onChange={(e) => setGuestText(e.target.value)}
                  className="w-full text-sm font-medium text-[#222222] focus:outline-hidden bg-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSearchExpanded(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsSearchExpanded(false)}
                  className="bg-[#FF385C] hover:bg-[#E00B41] text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
