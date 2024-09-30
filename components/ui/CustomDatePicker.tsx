// import React, { useState } from "react";
// import { ChevronUp, ChevronDown } from "lucide-react";

// const CustomDatePicker = () => {
//     const [date, setDate] = useState(new Date());
//     const [isOpen, setIsOpen] = useState(false);

//     const months = [
//         "January",
//         "February",
//         "March",
//         "April",
//         "May",
//         "June",
//         "July",
//         "August",
//         "September",
//         "October",
//         "November",
//         "December",
//     ];
//     const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

//     const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

//     const generateCalendarDays = () => {
//         const year = date.getFullYear();
//         const month = date.getMonth();
//         const daysInMonth = getDaysInMonth(year, month);
//         const firstDayOfMonth = new Date(year, month, 1).getDay();
//         const calendarDays = [];

//         for (let i = 0; i < firstDayOfMonth; i++) {
//             calendarDays.push(null);
//         }

//         for (let i = 1; i <= daysInMonth; i++) {
//             calendarDays.push(i);
//         }

//         return calendarDays;
//     };

//     const handlePrevMonth = () => {
//         const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
//         if (newDate >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)) {
//             setDate(newDate);
//         }
//     };

//     const handleNextMonth = () => {
//         setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
//     };

//     const handleDayClick = (day) => {
//         if (day) {
//             const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
//             const today = new Date();
//             today.setHours(0, 0, 0, 0);

//             if (selectedDate >= today) {
//                 setDate(selectedDate);
//                 setIsOpen(false);
//             }
//         }
//     };

//     const isDateDisabled = (day) => {
//         if (!day) return true;
//         const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         return currentDate < today;
//     };

//     const calendarDays = generateCalendarDays();

//     return (
//         <div className="relative">
//             <input
//                 type="text"
//                 value={date.toLocaleDateString()}
//                 onClick={() => setIsOpen(!isOpen)}
//                 readOnly
//                 className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {isOpen && (
//                 <div className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-md shadow-lg">
//                     <div className="flex justify-between items-center p-2 border-b">
//                         <button onClick={handlePrevMonth} className="p-1">
//                             <ChevronUp size={16} />
//                         </button>
//                         <span className="font-semibold">{`${months[date.getMonth()]} ${date.getFullYear()}`}</span>
//                         <button onClick={handleNextMonth} className="p-1">
//                             <ChevronDown size={16} />
//                         </button>
//                     </div>
//                     <div className="p-2">
//                         <div className="grid grid-cols-7 gap-1 mb-1">
//                             {days.map((day) => (
//                                 <div key={day} className="text-center text-xs font-medium text-gray-500">
//                                     {day}
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="grid grid-cols-7 gap-1">
//                             {calendarDays.map((day, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => handleDayClick(day)}
//                                     disabled={isDateDisabled(day)}
//                                     className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
//                     ${day === date.getDate() ? "bg-blue-500 text-white" : "hover:bg-gray-100"}
//                     ${isDateDisabled(day) ? "text-gray-300 cursor-not-allowed" : ""}
//                     ${!day ? "invisible" : ""}
//                   `}>
//                                     {day}
//                                 </button>
//                             ))}
//                         </div>
//                         <div className="mt-2 flex justify-between">
//                             <button
//                                 onClick={() => setDate(new Date())}
//                                 className="text-sm text-blue-500 hover:underline">
//                                 Today
//                             </button>
//                             <button onClick={() => setIsOpen(false)} className="text-sm text-blue-500 hover:underline">
//                                 Clear
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomDatePicker;
