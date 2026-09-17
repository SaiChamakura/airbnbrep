import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, Menu, User, Star } from 'lucide-react';
import { AirbnbLogo } from './AirbnbLogo';

interface HeaderProps {
  onSearchClick?: () => void;
  savedCount?: number;
  isScrolled?: boolean;
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  pricePerNight?: number;
  rating?: number;
  reviewCount?: number;
  onReserveClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount = 0,
  isScrolled = false,
  activeSection = 'photos',
  onNavigate = () => {},
  pricePerNight = 5699,
  rating = 4.95,
  reviewCount = 19,
  onReserveClick = () => {},
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
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

  const navTabs = [
    { id: 'photos', label: 'Photos' },
    { id: 'amenities-section', label: 'Amenities' },
    { id: 'reviews-section', label: 'Reviews' },
    { id: 'location-section', label: 'Location' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EBEBEB] transition-all duration-200">
      <div className="max-w-[1280px] mx-auto px-6 xl:px-12 h-20 flex items-center justify-between">
        {/* Left: Authentic Airbnb Logo */}
        <div className="flex-1 flex items-center">
          <a
            href="/"
            aria-label="Airbnb homepage"
            className="flex items-center gap-2 text-[#FF385C] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#222222] rounded-lg p-1 group"
          >
            <AirbnbLogo className="w-8 h-8" />
            <span className="text-[#FF385C] font-extrabold text-[22px] tracking-tight hidden sm:inline select-none">
              airbnb
            </span>
          </a>
        </div>

        {/* Center: Dynamic depending on scroll state */}
        {!isScrolled ? (
          /* State 1: Search Pill at top of page */
          <div className="flex-initial transition-opacity duration-200">
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="flex items-center text-sm font-medium border border-[#DDDDDD] rounded-full py-2.5 pl-5 pr-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#222222]"
              aria-label="Search destinations, dates, and guests"
            >
              <span className="font-semibold text-[#222222] pr-3.5 border-r border-[#EBEBEB]">
                Anywhere
              </span>
              <span className="font-semibold text-[#222222] px-3.5 border-r border-[#EBEBEB]">
                Any week
              </span>
              <span className="text-[#717171] pl-3.5 pr-2">Add guests</span>
              <div className="bg-[#FF385C] text-white p-2 rounded-full ml-1">
                <Search className="w-3.5 h-3.5 stroke-[2.8]" />
              </div>
            </button>
          </div>
        ) : (
          /* State 2: Transformed Upper Bar when scrolled down */
          <nav className="hidden md:flex items-center gap-8 h-full">
            {navTabs.map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`h-20 text-sm font-semibold transition-all relative flex items-center cursor-pointer ${
                    isActive
                      ? 'text-[#222222]'
                      : 'text-[#717171] hover:text-[#222222]'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#222222] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right: Actions or Sticky Reserve Info */}
        {!isScrolled ? (
          /* Standard Right Header Actions */
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
              onClick={() => alert('Language: English (India) · Currency: INR (₹)')}
            >
              <Globe className="w-4 h-4 stroke-[2]" />
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
                <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-[#EBEBEB] py-2 z-50 text-sm animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      alert('Sign up dialog');
                    }}
                    className="w-full text-left px-4 py-3 font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      alert('Log in dialog');
                    }}
                    className="w-full text-left px-4 py-3 text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
                  >
                    Log in
                  </button>
                  <div className="h-px bg-[#EBEBEB] my-1" />
                  <a
                    href="#host-section"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                  >
                    Airbnb your home
                  </a>
                  <a
                    href="#help"
                    onClick={() => {
                      setIsMenuOpen(false);
                      alert('Help Center');
                    }}
                    className="block px-4 py-3 text-[#222222] hover:bg-[#F7F7F7] transition-colors"
                  >
                    Help Center
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Scrolled Right: Price & Reserve Button in the transformed upper bar */
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <div>
                <span className="text-base font-extrabold text-[#222222]">
                  ₹{pricePerNight.toLocaleString('en-IN')}
                </span>{' '}
                <span className="text-xs text-[#717171] font-medium">night</span>
              </div>
              <div className="flex items-center justify-end gap-1 text-xs text-[#222222]">
                <Star className="w-3 h-3 fill-current text-[#222222]" />
                <span className="font-semibold">{rating.toFixed(2)}</span>
                <span className="text-[#717171] underline cursor-pointer">
                  ({reviewCount})
                </span>
              </div>
            </div>

            <button
              onClick={onReserveClick}
              className="bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] hover:opacity-95 text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-sm transition-transform active:scale-[0.98] cursor-pointer"
            >
              Reserve
            </button>
          </div>
        )}
      </div>

      {/* Expanded Search Bar Drawer */}
      {isSearchExpanded && !isScrolled && (
        <div className="border-t border-[#EBEBEB] bg-white py-4 px-6 shadow-md animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-[850px] mx-auto bg-[#F7F7F7] border border-[#DDDDDD] rounded-full flex items-center p-2 shadow-xs">
            <div className="flex-1 px-6 py-2 hover:bg-white hover:shadow-xs rounded-full cursor-pointer transition-all">
              <div className="text-xs font-bold text-[#222222]">Where</div>
              <input
                type="text"
                defaultValue="Candolim, Goa, India"
                className="w-full text-sm font-medium text-[#222222] bg-transparent outline-hidden"
                placeholder="Search destinations"
              />
            </div>
            <div className="h-8 w-px bg-[#DDDDDD]" />
            <div className="flex-1 px-6 py-2 hover:bg-white hover:shadow-xs rounded-full cursor-pointer transition-all">
              <div className="text-xs font-bold text-[#222222]">When</div>
              <div className="text-sm font-medium text-[#222222]">Oct 18 – Oct 23</div>
            </div>
            <div className="h-8 w-px bg-[#DDDDDD]" />
            <div className="flex-1 px-6 py-2 hover:bg-white hover:shadow-xs rounded-full cursor-pointer transition-all">
              <div className="text-xs font-bold text-[#222222]">Who</div>
              <div className="text-sm font-medium text-[#717171]">2 guests</div>
            </div>
            <button
              onClick={() => setIsSearchExpanded(false)}
              className="bg-[#FF385C] hover:bg-[#E00B41] text-white flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-colors cursor-pointer shadow-xs"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Search</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
