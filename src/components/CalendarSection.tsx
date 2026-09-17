import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarSectionProps {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  onSelectDate: (date: Date) => void;
  onClearDates: () => void;
  city: string;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  checkInDate,
  checkOutDate,
  onSelectDate,
  onClearDates,
  city,
}) => {
  // Calendar starting month: October 2026 and November 2026
  const [currentMonthIndex, setCurrentMonthIndex] = React.useState(0);

  const months = [
    { year: 2026, month: 9, name: 'October 2026', daysInMonth: 31, startDayOfWeek: 4 }, // Thu Oct 1
    { year: 2026, month: 10, name: 'November 2026', daysInMonth: 30, startDayOfWeek: 0 }, // Sun Nov 1
    { year: 2026, month: 11, name: 'December 2026', daysInMonth: 31, startDayOfWeek: 2 }, // Tue Dec 1
  ];

  const month1 = months[currentMonthIndex];
  const month2 = months[currentMonthIndex + 1];

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return null;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  const formatDateRange = () => {
    if (!checkInDate) return 'Add your travel dates for exact pricing';
    if (!checkOutDate) {
      return `Minimum stay: 2 nights`;
    }
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${checkInDate.toLocaleDateString('en-US', options)} – ${checkOutDate.toLocaleDateString('en-US', options)}`;
  };

  const isDateSelected = (d: Date) => {
    if (checkInDate && d.toDateString() === checkInDate.toDateString()) return 'start';
    if (checkOutDate && d.toDateString() === checkOutDate.toDateString()) return 'end';
    if (checkInDate && checkOutDate && d > checkInDate && d < checkOutDate) return 'between';
    return null;
  };

  const renderMonthGrid = (m: typeof months[0]) => {
    const days = [];
    // Padding blanks
    for (let i = 0; i < m.startDayOfWeek; i++) {
      days.push(<div key={`blank-${i}`} className="h-10 w-10" />);
    }
    for (let day = 1; day <= m.daysInMonth; day++) {
      const date = new Date(m.year, m.month, day);
      const status = isDateSelected(date);
      const isPast = date < new Date(2026, 9, 1);

      let dayClass = 'h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors cursor-pointer ';
      if (status === 'start' || status === 'end') {
        dayClass += 'bg-[#222222] text-white hover:bg-black';
      } else if (status === 'between') {
        dayClass += 'bg-[#F7F7F7] text-[#222222] rounded-none hover:bg-neutral-200';
      } else {
        dayClass += isPast
          ? 'text-neutral-300 cursor-not-allowed'
          : 'text-[#222222] hover:border hover:border-black';
      }

      days.push(
        <button
          key={day}
          disabled={isPast}
          onClick={() => onSelectDate(date)}
          className={dayClass}
          aria-label={`${m.name} ${day}`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <section className="py-8 border-b border-[#EBEBEB]">
      <div className="mb-6">
        <h2 className="text-[22px] font-bold text-[#222222]">
          {nights ? `${nights} nights in ${city}` : 'Select check-in date'}
        </h2>
        <p className="text-sm text-[#717171] mt-1">{formatDateRange()}</p>
      </div>

      {/* Calendars side-by-side */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1))}
            disabled={currentMonthIndex === 0}
            className="p-2 rounded-full hover:bg-[#F7F7F7] text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentMonthIndex(Math.min(months.length - 2, currentMonthIndex + 1))}
            disabled={currentMonthIndex >= months.length - 2}
            className="p-2 rounded-full hover:bg-[#F7F7F7] text-[#222222] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Month 1 */}
          <div>
            <h3 className="text-base font-bold text-center text-[#222222] mb-4">{month1.name}</h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#717171] mb-2">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>
            <div className="grid grid-cols-7 gap-y-1 justify-items-center">
              {renderMonthGrid(month1)}
            </div>
          </div>

          {/* Month 2 */}
          {month2 && (
            <div>
              <h3 className="text-base font-bold text-center text-[#222222] mb-4">{month2.name}</h3>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#717171] mb-2">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>
              <div className="grid grid-cols-7 gap-y-1 justify-items-center">
                {renderMonthGrid(month2)}
              </div>
            </div>
          )}
        </div>

        {/* Clear dates button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClearDates}
            className="text-sm font-semibold text-[#222222] underline hover:text-black p-2 cursor-pointer"
          >
            Clear dates
          </button>
        </div>
      </div>
    </section>
  );
};
