'use client'


import { ArrowLeft, Briefcase, Clock, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/Card"
import EmployeeHeader from "./EmployeeDetailsHeader"
import ProjectAssignments from "./EmployeeProjects"
import AttendanceRecords from "./EmployeeAttendanceRecords"
import { useEffect, useState } from "react"
import { UserService } from "@/service/user/user.service"
import toast from "react-hot-toast"

// Mock data - replace with actual API call

interface projectAssigneeType {
    project: {
        id: string;
        name: string;
    },
    total_hours: string;
    total_cost: string;
}

interface attendanceType {
    id: string;
    hours: string;
    date: string;
    attendance_status: string;
    start_time: string;
    lunch_start: string;
    lunch_end: string;
    end_time: string;
    project: {
        id: string;
        name: string;
    }
}

interface employeeType {
    id: string;
    first_name: string;
    last_name: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
    employee_role: string;
    hourly_rate: string;
    projectAssignee: projectAssigneeType[];
    attendance: attendanceType[];
    recorded_hours: number;
    earning: number;
    avatarUrl: string;
}

export default function EmployeeDetailsPage({ id }: { id: string }) {

    const [loading, setLoading] = useState(false);
    const [empData, setEmpData] = useState<employeeType>();

    const fetchEmpData = async () => {
        setLoading(true);
        try {
            const res = await UserService?.getSingleEmpData(id);
            if (res?.data?.success) {
                setEmpData(res.data.data)
            } else {
                toast.error(res?.response?.data?.message || "Failed to fetch data");
            }
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "An error occurred while fetching data"
            );
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchEmpData();
        }
    }, [id])

    if (loading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#82C8E5]"></div>
            </div>
        );
    }

    return (
        <div className=" bg-background">
            {/* Main Content */}
            <div className="p-3 sm:p-4">
                <div className="grid gap-6">
                    {/* Employee Header Card */}
                    {empData && <EmployeeHeader employee={empData} />}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                        <Card className="p-2 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-1 sm:p-2 bg-blue-100 rounded-lg">
                                    <Clock className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Recorded Hours</p>
                                    <p className="text-md sm:text-2xl font-semibold">{empData?.recorded_hours}h</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-2 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-1 sm:p-2 bg-green-100 rounded-lg">
                                    <DollarSign className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                                    <p className="text-md sm:text-2xl font-semibold"><span className="font-semibold">€ </span>{empData?.earning}</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-2 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-1 sm:p-2 bg-purple-100 rounded-lg">
                                    <Briefcase className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                                    <p className="text-md sm:text-2xl font-semibold"><span className="font-semibold">€ </span>{empData?.hourly_rate}/h</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-2 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-1 sm:p-2 bg-orange-100 rounded-lg">
                                    <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Role</p>
                                    <p className="text-md sm:text-2xl font-semibold">{empData?.employee_role}</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Project Assignments */}
                    <div className="max-w-full">
                        {empData &&
                            <ProjectAssignments projects={empData?.projectAssignee} />
                        }
                    </div>

                    {/* Attendance Records */}
                    {empData&&
                        <AttendanceRecords attendance={empData?.attendance} />
                    }
                </div>
            </div>
        </div>
    )
}
