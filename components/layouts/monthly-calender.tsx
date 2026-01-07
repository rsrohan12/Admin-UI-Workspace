import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/plugins/monthSelect/style.css"; // Import plugin styles
import  monthSelectPlugin  from "flatpickr/dist/plugins/monthSelect"; // Import plugin
import React, { useEffect, useState } from "react";

interface CalendarProps {
  mode: "single";
  onDateChange: (date: Date[]) => void;
  initialDate?: string;
}

const MonthlyCalender: React.FC<CalendarProps> = ({ mode, onDateChange, initialDate }) => {
  const [picker, setPicker] = useState<Date | null>(null);

  useEffect(() => {
    if (initialDate) {
      const date = new Date(initialDate);
      date.setDate(1); // Set to the first day of the month
      date.setHours(0, 0, 0, 0);
      setPicker(date);
    }
  }, [initialDate]);

  const handleMonthChange = (date: Date[]) => {
    if (date.length > 0) {
      const firstDate = new Date(date[0]);
      firstDate.setDate(1); // Set to the first day of the month
      firstDate.setHours(0, 0, 0, 0);
      setPicker(firstDate);
      onDateChange([firstDate]);
    }
  };

  return (
    <div className="flex h-10 w-full items-center border border-gray-200">
      <Flatpickr
        value={picker ? [picker] : undefined}
        className="form-control w-full border-gray-300 pl-5 focus:outline-none"
        options={{
          mode: mode,
          dateFormat: "F Y", // Display month and year
          plugins: [monthSelectPlugin({})], // Correctly use the plugin
        }}
        onChange={handleMonthChange}
      />
    </div>
  );
};

export default MonthlyCalender;
