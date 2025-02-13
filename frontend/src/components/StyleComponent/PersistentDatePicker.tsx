import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const PersistentDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(true); // Keeps the calendar open

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        onCalendarOpen={() => setIsOpen(true)}
        withPortal
        inline
        open={isOpen} // Keeps it open
        onClickOutside={() => setIsOpen(false)} // Closes when clicked outside
        onFocus={() => setIsOpen(true)} // Reopens when focused
      />
    </>
  );
};
