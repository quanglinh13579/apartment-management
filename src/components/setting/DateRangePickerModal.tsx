import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (start: Date | null, end: Date | null) => void;
  initialStart: Date | null;
  initialEnd: Date | null;
}

const DateRangePickerModal: React.FC<DateRangePickerModalProps> = ({
  isOpen, onClose, onSave, initialStart, initialEnd
}) => {
  const { t } = useTranslation();
  const MONTHS: string[] = t('date_picker.months', { returnObjects: true }) as string[];
  const WEEKDAYS: string[] = t('date_picker.weekdays', { returnObjects: true }) as string[];
  const [currentDate, setCurrentDate] = useState(initialStart || new Date());
  const [startDate, setStartDate] = useState<Date | null>(initialStart);
  const [endDate, setEndDate] = useState<Date | null>(initialEnd);

  if (!isOpen) return null;

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    clickedDate.setHours(0, 0, 0, 0);

    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    }
  };

  const isSelected = (day: number) => {
    const d = new Date(currentYear, currentMonth, day).getTime();
    const s = startDate?.getTime();
    const e = endDate?.getTime();
    return d === s || d === e;
  };

  const isBetween = (day: number) => {
    const d = new Date(currentYear, currentMonth, day).getTime();
    const s = startDate?.getTime();
    const e = endDate?.getTime();
    if (s && e) {
      return d > s && d < e;
    }
    return false;
  };

  const handleSave = () => {
    onSave(startDate, endDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4">
      <div
        className="bg-white rounded-modal-sm p-6 w-full max-w-[320px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="text-modal-title font-bold text-black">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-3">
          {WEEKDAYS.map((wd, i) => (
            <div key={i} className="text-center text-sm font-bold text-black">
              {wd}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-2 gap-x-0 relative">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const selected = isSelected(day);
            const between = isBetween(day);

            const s = startDate?.getTime();
            const e = endDate?.getTime();
            const d = new Date(currentYear, currentMonth, day).getTime();

            const isStart = d === s && e && s !== e;
            const isEnd = d === e && s && s !== e;

            return (
              <div key={day} className="relative flex items-center justify-center h-10 w-full">
                {between && (
                  <div className="absolute inset-0 bg-date-bg"></div>
                )}
                {isStart && (
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-date-bg"></div>
                )}
                {isEnd && (
                  <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-date-bg"></div>
                )}

                <button
                  onClick={() => handleDateClick(day)}
                  className={`
                    relative z-10 w-8 h-8 flex items-center justify-center text-date rounded-date
                    ${selected ? 'bg-date-active text-white font-bold' : ''}
                    ${!selected && between ? 'text-black' : ''}
                    ${!selected && !between ? 'text-black hover:bg-gray-100' : ''}
                  `}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-btn-md text-gray-400 font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            {t('date_picker.cancel')}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-date-active text-white font-bold rounded-btn-md text-sm hover:opacity-90 transition-opacity"
          >
            {t('date_picker.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePickerModal;
