// import React, { useState } from "react";
// import { Calendar, momentLocalizer, Event } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

// const CustomCalendar = () => {
//   const [events, setEvents] = useState<Event[]>([
//     {
//       title: "Sample Event",
//       start: new Date(),
//       end: new Date(),
//       allDay: true,
//     },
//   ]);

//   const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
//     const title = window.prompt("New Event Name");
//     if (title) {
//       setEvents([...events, { start, end, title }]);
//     }
//   };

//   return (
//     <div style={{ height: "500px" }}>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         selectable
//         onSelectSlot={handleSelectSlot}
//         style={{ height: "100vh" }}
//       />
//     </div>
//   );
// };

// export default CustomCalendar;
