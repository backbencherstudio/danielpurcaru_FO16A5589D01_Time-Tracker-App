'use client'
// components/AcademicCalendar.js
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for event interaction
import FullCalendar from '@fullcalendar/react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export default function AcademicCalendar() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventTitle, setEventTitle] = useState('');
    const [eventType, setEventType] = useState(''); // Event type
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [events, setEvents] = useState([
        { id: 1, title: 'Off Day', date: '2025-07-01', className: 'fc-event-OffDay' },
        { id: 2, title: 'Off Day', date: '2025-07-08', className: 'fc-event-OffDay' },
        { id: 3, title: 'Holiday', date: '2025-07-19', className: 'fc-event-Holiday' },
        { id: 4, title: 'Event: Seminar', date: '2025-07-22', className: 'fc-event-Seminar' },
        { id: 5, title: 'Event2', date: '2025-07-25', className: 'fc-event-ExamDay' },
        { id: 6, title: 'Holiday', date: '2025-07-29', className: 'fc-event-Holiday' },
        // Add more events as necessary
    ]);

    // Event handlers for calendar date click
    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setDialogOpen(true);  // Open dialog on date click
    };

    // Event handlers for calendar event click (to edit)
    const handleEventClick = (arg) => {
        const event = events.find(event => event.id === arg.event.id);
        if (event) {
            setSelectedEventId(event.id);
            setEventTitle(event.title);
            setEventType(event.className);
            setSelectedDate(event.date);
            setEditDialogOpen(true);
        }
    };

    // Save New Event
    const handleSaveEvent = () => {
        // Add new event to the events list
        const newEvent = { id: Date.now(), title: eventTitle, date: selectedDate, className: eventType };
        setEvents([...events, newEvent]); // Update the events state with the new event

        // Log and reset the dialog
        console.log(`Event "${eventTitle}" added on ${selectedDate}`);
        setDialogOpen(false);
        setEventTitle('');
    };

    // Save Edited Event
    const handleEditEvent = () => {
        // Find and update the event
        const updatedEvents = events.map(event => 
            event.id === selectedEventId 
                ? { ...event, title: eventTitle, className: eventType } 
                : event
        );
        setEvents(updatedEvents);

        // Close the dialog and reset
        console.log(`Event "${eventTitle}" updated on ${selectedDate}`);
        setEditDialogOpen(false);
        setEventTitle('');
    };

    // Close dialog
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEventTitle('');
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setEventTitle('');
    };

    return (
        <div className="calendar-container !bg-white">
            <h2 className="calendar-header">Academic Calendar</h2>

            {/* FullCalendar */}
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events} // Use the updated events state
                dateClick={handleDateClick} // Listen for date clicks
                eventClick={handleEventClick} // Listen for event clicks to edit
            />

            {/* ShadCN Dialog to Add Event */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    {/* Trigger is not needed here, but required to manage Dialog state */}
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Event for {selectedDate}</DialogTitle>
                    </DialogHeader>
                    <div>
                        <label htmlFor="eventTitle">Event Title</label>
                        <input
                            type="text"
                            id="eventTitle"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter event title"
                        />
                    </div>

                    <DialogFooter>
                        <button
                            className="bg-gray-300 p-2 rounded-md"
                            onClick={handleCloseDialog}
                        >
                            Close
                        </button>
                        <button
                            className="bg-blue-500 text-white p-2 rounded-md"
                            onClick={handleSaveEvent}
                        >
                            Save Event
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ShadCN Dialog to Edit Event */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogTrigger asChild>
                    {/* Trigger is not needed here, but required to manage Dialog state */}
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Event for {selectedDate}</DialogTitle>
                    </DialogHeader>
                    <div>
                        <label htmlFor="eventTitle">Event Title</label>
                        <input
                            type="text"
                            id="eventTitle"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter event title"
                        />
                    </div>

                    <div>
                        <label htmlFor="eventType">Event Type</label>
                        <select
                            id="eventType"
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="fc-event-OffDay">Off Day</option>
                            <option value="fc-event-Holiday">Holiday</option>
                            <option value="fc-event-ExamDay">Event2</option>
                            <option value="fc-event-Seminar">Seminar</option>
                        </select>
                    </div>

                    <DialogFooter>
                        <button
                            className="bg-gray-300 p-2 rounded-md"
                            onClick={handleCloseEditDialog}
                        >
                            Close
                        </button>
                        <button
                            className="bg-blue-500 text-white p-2 rounded-md"
                            onClick={handleEditEvent}
                        >
                            Save Changes
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
