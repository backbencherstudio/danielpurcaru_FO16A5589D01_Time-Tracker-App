'use client'
// components/AcademicCalendar.js
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for event interaction
import FullCalendar from '@fullcalendar/react';
import { useState } from 'react';
 
export default function AcademicCalendar() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // Event handlers for calendar date click
    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setModalOpen(true);  // Open modal on date click
    };

    return (
        <div className="calendar-container !bg-white">
            <h2 className="calendar-header">Academic Calendar</h2>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={[
                    { title: 'Off Day', date: '2025-06-01' },
                    { title: 'Off Day', date: '2025-06-08' },
                    { title: 'Off Day', date: '2025-06-15' },
                    { title: 'Off Day', date: '2025-06-22' },
                    { title: 'Off Day', date: '2025-06-29' },
                    { title: 'Holiday', date: '2025-06-19' },
                    // Add more events as necessary
                ]}
                dateClick={handleDateClick} // Listen for date clicks
            />

            {/* Modal to show the selected date */}
             
        </div>
    );
}
