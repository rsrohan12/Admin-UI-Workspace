import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import React, { useEffect, useState } from "react";

interface CalendarProps {
  mode: "time" | "multiple" | "single" | "range";
  onDateChange: (date: Date[]) => void;
  initialDate?: string;
  preselectedDates?: string[]; // Dates to showcase with special styling
  allowedWeekdays?: number[]; // Allowed weekdays (0 = Sunday, 6 = Saturday)
}

const Calendar: React.FC<CalendarProps> = ({
  mode,
  onDateChange,
  initialDate,
  preselectedDates = [],
  allowedWeekdays = [],
}) => {
  const [picker, setPicker] = useState<Date | Date[] | null>(null);

  useEffect(() => {
    if (initialDate) {
      const date = new Date(initialDate);
      date.setHours(0, 0, 0, 0);
      setPicker(date);
    }
  }, [initialDate]);

  const handleDateChange = (date: Date[]) => {
    if (mode === "single") {
      setPicker(date[0]);
      onDateChange([date[0]]);
    } else if (mode === "range" && date.length === 2) {
      setPicker(date);
      onDateChange(date);
    }
  };

  const preselectedDateObjects = preselectedDates.map(dateStr => {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  useEffect(() => {
    if (picker) {
      preselectedDates.map(i => {
        const pickerDate = new Date(picker as Date).setHours(0, 0, 0, 0);
        const dateToCompare = new Date(i).setHours(0, 0, 0, 0);
        if (pickerDate === dateToCompare) {
          alert("Already some task is scheduled");
          setPicker(null);
        }
      });
    }
  }, [picker]);

  return (
    <div className="flex h-10 w-full items-center border border-gray-200">
      <Flatpickr
        value={picker || undefined}
        id="range-picker"
        className={`form-control w-full border-gray-300 pl-5 ${
          picker ? "border-blue-500" : "border-gray-300"
        } focus:outline-none `}
        placeholder="dd/mm/yyyy"
        onChange={handleDateChange}
        options={{
          mode: mode,
          dateFormat: "d/m/Y",
          disable: [
            date => {
              if (allowedWeekdays.length > 0) {
                const dayOfWeek = date.getDay();
                return !allowedWeekdays.includes(dayOfWeek);
              }
              return false;
            }
          ],
          onDayCreate: (dObj, dStr, fp, dayElem) => {
            const generatedDate = new Date(dayElem.dateObj);
            generatedDate.setHours(0, 0, 0, 0);
            if (
              preselectedDateObjects.some(
                preselectedDate =>
                  preselectedDate.getTime() === generatedDate.getTime()
              )
            ) {
              dayElem.classList.add("preselected-date");
            }
            if (allowedWeekdays.length > 0) {
              const dayOfWeek = generatedDate.getDay();
              if (!allowedWeekdays.includes(dayOfWeek)) {
                dayElem.classList.add("disabled");
                dayElem.setAttribute("disabled", "true");
              }
            }
          },
        }}
      />
    </div>
  );
};

export default Calendar;
