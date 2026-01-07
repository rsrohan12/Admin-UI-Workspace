import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/flatpickr.css";
import React, { useEffect, useState } from 'react';

interface CalendarProps {
  mode: 'time' | 'multiple' | 'single' | 'range';
  onDateChange: (date: Date[]) => void;
  initialDate?: string; 
}

const DateArrayCalendar: React.FC<CalendarProps> = ({ mode, onDateChange, initialDate }) => {
  const [picker, setPicker] = useState<Date[] | null>(null);

  useEffect(() => {
    if (initialDate) {
      const date = new Date(initialDate);
      setPicker([date]); 
    } else {
      setPicker(null); // Set picker to null if no initialDate is provided
    }
  }, [initialDate]);

  const handleDateChange = (date: Date[]) => {
    setPicker(date);

    if (mode === 'range' && date.length === 2) {
      const [startDate, endDate] = date;
      const allDatesInRange = getAllDatesInRange(startDate, endDate);
      onDateChange(allDatesInRange);
    } else {
      onDateChange(date);
    }
  };

  const getAllDatesInRange = (start: Date, end: Date): Date[] => {
    const dates: Date[] = [];
    const currentDate = new Date(start);
    
    while (currentDate <= end) {
      dates.push(new Date(currentDate)); 
      currentDate.setDate(currentDate.getDate() + 1); 
    }

    return dates;
  };

  return (
    <div className='border-gray-200 border w-full h-10 flex items-center'>
      <Flatpickr
        value={picker || undefined}
        id="range-picker"
        className={`form-control w-full pl-5 border-gray-300 ${picker ? 'border-blue-500' : 'border-gray-300'} focus:outline-none `}
        placeholder="dd/mm/yyyy"
        onChange={handleDateChange}
        options={{
          mode: mode,
          dateFormat: "d/m/Y",
        }}
      />
    </div>
  );
};

export default DateArrayCalendar;