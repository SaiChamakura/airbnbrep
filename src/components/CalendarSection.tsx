import React, { useState } from 'react';
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
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const months = [
    { year: 2026, month: 9, name: 'October 2026', daysInMonth: 31, startDayOfWeek: 4 },
    { year: 2026, month: 10, name: 'November 2026', daysInMonth: 30, startDayOfWeek: 0 },
    { year: 2026, month: 11, name: 'December 2026', daysInMonth: 31, startDayOfWeek: 2 },
  ];

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return null;
    const diff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  const formatDateRange = () => {
    if (checkInDate && checkOutDate) {
      const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
      return `${checkInDate.toLocaleDateString('en-US', opts)} – ${checkOutDate.toLocaleDateString('en-US', opts)}`;
    }
    if (checkInDate) {
      return `Check-in: ${checkInDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
    return 'Add your travel dates for exact pricing';
  };

  const isDateSelected = (d: Date) => {
    if (checkInDate && d.toDateString() === checkInDate.toDateString()) return 'start';
    if (checkOutDate && d.toDateString() === checkOutDate.toDateString()) return 'end';
    if (checkInDate && checkOutDate && d > checkInDate && d < checkOutDate) return 'between';
    return null;
  };

  const renderMonthGrid = (m: typeof months[0]) => {
    const days = [];
    for (let i = 0; i < m.startDayOfWeek; i++) {
      days.push(<div key={`blank-${i}`} className="h-11 w-full" />);
    }
    for (let day = 1; day <= m.daysInMonth; day++) {
      const date = new Date(m.year, m.month, day);
      const status = isDateSelected(date);
      const isPast = date < new Date(2026, 9, 1);
      const dayOfWeek = (m.startDayOfWeek + day - 1) % 7;
      const isStartCol = dayOfWeek === 0;
      const isEndCol = dayOfWeek === 6;

      days.push(
        <div
          key={day}
          className="relative h-11 w-full flex items-center justify-center"
        >
          {/* Continuous cylinder background band for middle and boundary dates */}
          {status === 'between' && (
            <div
              className={`absolute inset-0 bg-[#F7F7F7] ${
                isStartCol ? 'rounded-l-full' : ''
              } ${isEndCol ? 'rounded-r-full' : ''}`}
            />
          )}

          {status === 'start' && checkOutDate && (
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[#F7F7F7]" />
          )}

          {status === 'end' && checkInDate && (
            <div className="absolute inset-y-0 left-0 w-1/2 bg-[#F7F7F7]" />
          )}

          <button
            disabled={isPast}
            onClick={() => onSelectDate(date)}
            className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all relative z-10 cursor-pointer ${
              status === 'start' || status === 'end'
                ? 'bg-[#222222] text-white hover:bg-black shadow-xs'
                : status === 'between'
                ? 'text-[#222222] hover:bg-neutral-200'
                : isPast
                ? 'text-neutral-300 cursor-not-allowed line-through'
                : 'text-[#222222] hover:border hover:border-[#222222]'
            }`}
            aria-label={`${m.name} ${day}`}
          >
            {day}
          </button>
        </div>
      );
    }
    return days;
  };

  return (
    <section id="calendar-section" className="py-8 border-b border-[#EBEBEB]">
      <div className="mb-6">
        <h2 className="text-[22px] font-bold text-[#222222]">
          {nights ? `${nights} nights in ${city}` : 'Select check-in date'}
        </h2>
        <p className="text-sm text-[#717171] mt-1">{formatDateRange()}</p>
      </div>

      {/* 2-Month side by side layout */}
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentMonthIndex(Math.max(0, currentMonthIndex - 1))}
            disabled={currentMonthIndex === 0}
            className="p-2 rounded-full hover:bg-[#F7F7F7] disabled:opacity-30 disabled:cursor-not-allowed text-[#222222] transition-colors cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <button
            onClick={() =>
              setCurrentMonthIndex(Math.min(months.length - 2, currentMonthIndex + 1))
            }
            disabled={currentMonthIndex >= months.length - 2}
            className="p-2 rounded-full hover:bg-[#F7F7F7] disabled:opacity-30 disabled:cursor-not-allowed text-[#222222] transition-colors cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[months[currentMonthIndex], months[currentMonthIndex + 1]].map(
            (m, idx) =>
              m && (
                <div key={idx} className="space-y-3">
                  <h3 className="text-center font-bold text-base text-[#222222]">
                    {m.name}
                  </h3>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#717171]">
                    <div>Su</div>
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>
                  </div>

                  {/* Grid cells */}
                  <div className="grid grid-cols-7 text-center">
                    {renderMonthGrid(m)}
                  </div>
                </div>
              )
          )}
        </div>

        {/* Clear dates button moved BELOW the calendar (Change #8) */}
        <div className="flex justify-end pt-4">
          {(checkInDate || checkOutDate) && (
            <button
              onClick={onClearDates}
              className="text-sm font-semibold text-[#222222] underline hover:text-black cursor-pointer p-1"
            >
              Clear dates
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
