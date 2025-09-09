'use client'

import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { UserService } from '@/service/user/user.service'
import { toast } from 'react-toastify'

type Event = {
  id: string
  title: string
  event_type: string
  start_date: string
  end_date?: string | null;
  summary?: string;
}

interface GoogleCalendarHoliday {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  creator: {
    email: string;
    displayName: string;
    self: boolean;
  };
  organizer: {
    email: string;
    displayName: string;
    self: boolean;
  };
  start: {
    date: string; // Format: "YYYY-MM-DD"
    dateTime?: never; // Holidays are all-day events
  };
  end: {
    date: string; // Format: "YYYY-MM-DD"
    dateTime?: never; // Holidays are all-day events
  };
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: number;
  eventType: string;
}

type data = {
  events: Event[],
  holidays: GoogleCalendarHoliday[]
}

export default function AcademicCalendar() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [eventTitle, setEventTitle] = useState('')
  const [eventType, setEventType] = useState('OFF_DAY')
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState<data>()
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr)
    setEndDate('')
    setEventTitle('')
    setEventType('OFF_DAY')
    setDialogOpen(true)
  }

  const formatDateForAPI = (dateString: string): string => {
    if (!dateString) return '';
    // Create a Date object from the input string (which is in YYYY-MM-DD format)
    const date = new Date(dateString);
    // Convert to ISO string and return
    return date.toISOString();
  };

  const handleEventClick = (arg: { event: { id: string } }) => {
    const event = events.events.find(e => e.id === arg.event.id)
    if (event) {
      setSelectedEventId(event.id)
      setEventTitle(event.title)
      setEventType(event.event_type)
      setSelectedDate(event.start_date)
      setEndDate(event.end_date || '')
      setEditDialogOpen(true)
    }
  }

  const handleSaveEvent = async () => {
    try {
      const newEvent = {
        title: eventTitle,
        event_type: eventType,
        start_date: formatDateForAPI(selectedDate),
        end_date: formatDateForAPI(endDate) || formatDateForAPI(selectedDate)
      }

      const response = await UserService.createEvent(newEvent)
      if (response.data.success) {
        toast.success('Event created successfully')
        fetchProjectData() // Refresh events
        setDialogOpen(false)
      } else {
        toast.error(response.data.message || 'Failed to create event')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error creating event')
    }
  }

  const handleDatesSet = (arg) => {
    setCurrentMonth(arg.view.currentEnd.getMonth());
  };


  const handleEditEvent = async () => {
    if (!selectedEventId) return

    try {
      const updatedEvent = {
        title: eventTitle,
        event_type: eventType,
        start_date: formatDateForAPI(selectedDate),
        end_date: formatDateForAPI(endDate) || formatDateForAPI(selectedDate)
      }

      const response = await UserService.updateEvent(selectedEventId, updatedEvent)
      if (response.data.success) {
        toast.success('Event updated successfully')
        fetchProjectData() // Refresh events
        setEditDialogOpen(false)
      } else {
        toast.error(response.data.message || 'Failed to update event')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error updating event')
    }
  }

  const handleDeleteEvent = async () => {
    if (!selectedEventId) return

    try {
      const response = await UserService.deleteEvent(selectedEventId)
      if (response.data.success) {
        toast.success('Event deleted successfully')
        fetchProjectData() // Refresh events
        setEditDialogOpen(false)
      } else {
        toast.error(response.data.message || 'Failed to delete event')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error deleting event')
    }
  }

  const getEventColor = (type: string): string => {
    switch (type) {
      case 'HOLIDAY': return '#42f56f'
      case 'SEMINAR': return '#f5a742'
      case 'EXAM': return '#f54242'
      default: return '#4287f5'
    }
  }

  const formatCalendarEndDate = (dateString?: string | null): string | undefined => {
    if (!dateString) return undefined
    const date = new Date(dateString)
    date.setDate(date.getDate() + 1)
    return date.toISOString().split('T')[0]
  }

  const fetchProjectData = useCallback(async () => {
    setLoading(true)
    let month = currentMonth;
    if (month === 0) {
      month = 12;
    }
    try {
      const res = await UserService.getEvents(month)
      if (res?.data?.success) {
        console.log(res.data.data)
        setEvents(res.data.data)
      } else {
        toast.error(res?.response?.data?.message || "Failed to fetch events")
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching events"
      )
    } finally {
      setLoading(false)
    }
  }, [currentMonth])


  // token extract helper
  const getCookieToken = () => {
    if (typeof document === "undefined") return null;

    const cookieString = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("empdashtoken="));
    return cookieString?.split("=")[1] || null;
  };

  useEffect(() => {
    const token = getCookieToken();
    if (token)
      fetchProjectData()
  }, [fetchProjectData, currentMonth])

  // console.log("Events : ", events);

  if (loading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#82C8E5]"></div>
      </div>
    );
  }

  return (
    <div className="calendar-container bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Academic Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        datesSet={handleDatesSet}
        events={[
          ...(events?.events?.map(e => ({
            id: e.id,
            title: e.title,
            start: e.start_date,
            allDay: true,
            end: formatCalendarEndDate(e.end_date),
            color: getEventColor(e.event_type),
            extendedProps: {
              event_type: e.event_type
            }
          })) || []),
          ...(events?.holidays?.map(h => ({
            id: h.id,
            title: h.summary,
            start: h.start.date,
            allDay: true,
            end: h.end.date,
            color: '#ff9f89', // You can set a specific color for holidays
            extendedProps: {
              event_type: 'HOLIDAY'
            }
          })) || [])
        ]}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        }}
        height="auto"
        eventContent={(arg) => (
          <div className="fc-event-content select-none" title={arg.event.title}>
            <div className="truncate">
              {arg.event.title}
            </div>
          </div>
        )}
      />

      {/* Add Event Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block mb-1">Event Title*</label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Start Date*</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-1">End Date (optional)</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                min={selectedDate}
              />
            </div>

            <div>
              <label className="block mb-1">Event Type*</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="OFF_DAY">Off Day</option>
                <option value="HOLIDAY">Holiday</option>
                <option value="SEMINAR">Seminar</option>
                <option value="EXAM">Exam Day</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              onClick={handleSaveEvent}
              disabled={!eventTitle || !selectedDate || !eventType}
            >
              Add Event
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block mb-1">Event Title*</label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Start Date*</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-1">End Date (optional)</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                min={selectedDate}
              />
            </div>

            <div>
              <label className="block mb-1">Event Type*</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="OFF_DAY">Off Day</option>
                <option value="HOLIDAY">Holiday</option>
                <option value="SEMINAR">Seminar</option>
                <option value="EXAM">Exam Day</option>
              </select>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={handleDeleteEvent}
            >
              Delete
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              onClick={handleEditEvent}
              disabled={!eventTitle || !selectedDate || !eventType}
            >
              Save Changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
