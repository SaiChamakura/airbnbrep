import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, Menu, User, Heart, Star, Sparkles, X } from 'lucide-react';

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

export const AirbnbLogoSVG: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} fill-[#FF385C] shrink-0`}
    aria-hidden="true"
  >
    <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.479.96 3.322.146 2.484-.962 4.787-3.004 6.241-1.637 1.166-3.666 1.777-5.712 1.722l-.767-.042c-2.327-.246-4.509-1.428-6.006-3.262-1.497 1.834-3.679 3.016-6.006 3.262l-.767.042c-2.046.055-4.075-.556-5.712-1.722-2.042-1.454-3.15-3.757-3.004-6.241.05-.843.293-1.731.96-3.322l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C8.537 1.963 9.992 1 12 1h4zm0 2.2c-1.282 0-2.274.659-3.36 2.659l-.497.954c-1.922 3.766-6.065 12.441-7.037 14.708l-.133.324c-.58 1.385-.77 2.083-.807 2.716-.104 1.777.683 3.42 2.134 4.453 1.171.834 2.623 1.272 4.088 1.233l.548-.03c2.072-.22 3.999-1.378 5.176-3.149l.788-1.189.788 1.189c1.177 1.771 3.104 2.929 5.176 3.149l.548.03c1.465.039 2.917-.399 4.088-1.233 1.451-1.033 2.238-2.676 2.134-4.453-.037-.633-.227-1.331-.807-2.716l-.133-.324c-.972-2.267-5.115-10.942-7.037-14.708l-.497-.954C18.274 3.859 17.282 3.2 16 3.2zm0 13.8c2.209 0 4 1.791 4 4 0 2.115-1.637 3.847-3.714 3.989L16 25c-2.209 0-4-1.791-4-4 0-2.115 1.637-3.847 3.714-3.989L16 17zm0 2.2c-.994 0-1.8.806-1.8 1.8 0 .937.716 1.706 1.632 1.792L16 22.8c.994 0 1.8-.806 1.8-1.8 0-.937-.716-1.706-1.632-1.792L16 19.2z" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  savedCount = 0,
  isScrolled = false,
  activeSection = 'photos',
  onNavigate = () => {},
  pricePerNight = 495,
  rating = 4.97,
  reviewCount = 148,
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
            <AirbnbLogoSVG className="w-8 h-8" />
            <span className="text-[#FF385C] font-extrabold text-[22px] tracking-tight hidden sm:inline">
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
          /* State 2: Transformed Upper Bar when scrolled down (as requested in item 9!) */
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
              onClick={() => alert('Language: English (US) · Currency: USD ($)')}
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
          /* Scrolled Right: Price & Reserve Button in the transformed upper bar! */
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <div>
                <span className="text-base font-extrabold text-[#222222]">
                  ${pricePerNight}
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
                defaultValue="Malibu, California"
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
