"use client"

import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

interface AttendanceRecord {
    id: string
    hours: string
    date: string
    attendance_status: string
    start_time: string | null
    lunch_start: string | null
    lunch_end: string | null
    end_time: string | null
    project: {
        id: string
        name: string
    } | null
}

export default function AttendanceRecords({ attendance }: { attendance: AttendanceRecord[] }) {
    // const [sortBy, setSortBy] = useState<"date" | "status">("date")

    // const sortedAttendance = [...attendance].sort((a, b) => {
    //     if (sortBy === "date") {
    //         return new Date(b.date).getTime() - new Date(a.date).getTime()
    //     }
    //     return a.attendance_status.localeCompare(b.attendance_status)
    // })

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const formatTime = (timeString: string | null) => {
        if (!timeString) return "";
        try {
            const date = new Date(timeString);
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'UTC'
            });
        } catch (error) {
            console.error("Error formatting time:", error);
            return "";
        }
    };

    return (
        <Card className="p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-semibold">Attendance Records</h2>
                </div>
                {/* <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "date" | "status")}
                    className="text-sm border border-border rounded-md px-3 py-1 bg-background"
                >
                    <option value="date">Sort by Date</option>
                    <option value="status">Sort by Status</option>
                </select> */}
            </div>

            <div className="overflow-x-auto w-full pb-2" style={{ maxWidth: 'calc(100vw - 220px)' }}>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Hours</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground text-nowrap">Start Time</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground text-nowrap">End Time</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Project</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((record) => (
                            <tr key={record.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                                <td className="py-3 px-4">
                                    <span className="font-medium text-nowrap">{formatDate(record.date)}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        {record.attendance_status === "PRESENT" ? (
                                            <>
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Present</Badge>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-4 w-4 text-red-600" />
                                                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Absent</Badge>
                                            </>
                                        )}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="font-semibold">{record.hours}h</span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="text-sm">{formatTime(record.start_time)}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="text-sm">{formatTime(record.end_time)}</span>
                                </td>
                                <td className="py-3 px-4">
                                    {record.project ? (
                                        <span className="text-sm text-muted-foreground text-nowrap">{record.project.name}</span>
                                    ) : (
                                        <span className="text-sm text-muted-foreground italic">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {attendance.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No attendance records yet</div>
            )}
        </Card>
    )
}
