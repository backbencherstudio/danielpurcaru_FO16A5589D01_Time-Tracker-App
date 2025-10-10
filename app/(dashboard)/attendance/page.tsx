'use client'
import { UserService } from "@/service/user/user.service";
import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import toast,{Toaster} from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface AttendanceDay {
    hours?: number;
    id?: string;
}

interface EmployeeAttendance {
    user: {
        id: string;
        name: string;
    };
    days: Record<string, AttendanceDay>;
}

interface UpdateWorkHour {
    emp: string;
    id: string;
    index: number;
    workHour: number;
}

type ProjectType = {
    name: string;
    id: string;
}

// Custom hook for detecting clicks outside an element
const useOnClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};

export default function Page() {
    const [days, setDays] = useState<Array<{ day: number, weekdayName: string }>>([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [WorkHourEditor, setWorkHourEditor] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updateWorkHour, setUpdateWorkHour] = useState<UpdateWorkHour | null>(null);
    const [attendanceData, setAttendanceData] = useState<EmployeeAttendance[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentHour, setCurrentHour] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [editorPosition, setEditorPosition] = useState({ top: 0, left: 0 });
    const [projects, setProjects] = useState<ProjectType[]>()
    const [selectedProject, setSelectedProject] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    const editorRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(editorRef, () => setWorkHourEditor(false));

    // Month days calculation
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const daysArray = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, selectedMonth, day);
            daysArray.push({ day, weekdayName: weekdays[date.getDay()] });
        }

        setDays(daysArray);
    }, [selectedMonth]);

    // Fetch attendance data
    useEffect(() => {
        const fetchEmpData = async () => {
            try {
                setLoading(true);
                const res = await UserService?.getAttendanceData(selectedMonth + 1);
                if (res?.data?.success) {
                    setAttendanceData(res.data.data);
                } else {
                    toast.error(res?.response?.data?.message || "Failed to fetch data");
                }
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message ||
                    error.message ||
                    "An error occurred while fetching data"
                );
            } finally {
                setLoading(false);
            }
        }
        fetchEmpData();
    }, [selectedMonth]);

    const fetchProjectData = async () => {
        setLoading(true);
        try {
            const res = await UserService.getProjectData();
            if (res?.data?.success && Array.isArray(res?.data?.data)) {
                const projectList = res?.data?.data?.map((project) => ({
                    name: project?.name,
                    id: project?.id,
                }));
                console.log("Projects : ",projectList);
                setProjects(projectList);
            } else {
                toast.error(res?.response?.data?.message || "Failed to fetch data");
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "An error occurred while fetching data";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjectData();
    }, []);

    useEffect(() => {
        setSelectedProject('');
    }, [WorkHourEditor])

    const handleSelectChange = (id: string) => {
        console.log("Selected id : ",id);
        setSelectedProject(id);
        setIsOpen(false);
    }


    const handleWorkHour = (empId: string, dayIndex: number, operator: "+" | "-") => {
        setAttendanceData(prev => prev.map(employee => {
            if (employee.user.id !== empId) return employee;

            const updatedDays = Object.entries(employee.days).map(([key, value], idx) => {
                if (idx !== dayIndex) return [key, value];

                const currentHours = value?.hours || 0;
                const newHours = operator === "+" ? currentHours + 1 : Math.max(0, currentHours - 1);
                setCurrentHour(newHours);

                return [key, { ...value, hours: newHours }];
            });

            return {
                ...employee,
                days: Object.fromEntries(updatedDays)
            };
        }));
    };

    const handleSaveData = async (id: string) => {
        if(selectedProject === ''){
            toast.error("Select a project first.");
            return;
        }
        try {
            setLoading(true);
            const res = await UserService?.updateAttendance(id, {
                hours: currentHour,
                // attendance_status: currentHour === 0 ? "ABSENT" : "PRESENT",
                project_id: selectedProject
            });
            if (res?.data?.success) {
                toast.success("Attendance updated successfully");
                setWorkHourEditor(false);
                setSelectedProject('');
            } else {
                toast.error(res?.response?.data?.message || "Failed to update attendance");
            }
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "An error occurred while updating attendance"
            );
        } finally {
            setWorkHourEditor(false);
            setLoading(false);
        }
    }

    const handleCellClick = (event: React.MouseEvent, workHour: AttendanceDay, empId: string, index: number) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        setEditorPosition({
            top: rect.top + scrollTop + rect.height,
            left: rect.left
        });

        setUpdateWorkHour({
            id: workHour?.id || '',
            emp: empId,
            index: index,
            workHour: workHour?.hours || 0
        });

        setCurrentHour(workHour?.hours || 0);
        setWorkHourEditor(true);
    };

    // Pagination and filtering
    const filteredAttendanceData = useMemo(() => {
        if (!searchTerm) return attendanceData;
        return attendanceData.filter(emp =>
            emp.user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [attendanceData, searchTerm]);

    const totalItems = filteredAttendanceData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentEntries = useMemo(() => {
        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;
        return filteredAttendanceData.slice(firstIndex, lastIndex);
    }, [filteredAttendanceData, currentPage, itemsPerPage]);

    const handleMonthChange = (month: number) => {
        setSelectedMonth(month);
        setCurrentPage(1); // Reset to first page when changing months
    };

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const getVisiblePageNumbers = () => {
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const visiblePages = useMemo(() => getVisiblePageNumbers(), [currentPage, totalPages]);

    if (loading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#82C8E5]"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-xl space-y-6">
            {/* Header and Filters */}
            <Toaster position="top-right"/>
            <div className="flex items-center">
                <h3 className="flex-1 text-[#1D1F2C] text-[24px] font-semibold">Attendance</h3>
                <div className="flex gap-5">
                    <div className="flex items-center gap-[10px] border border-[#E9EAEC] rounded-xl px-[20px] py-4 relative w-[303px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.80541 2.93994C6.01372 2.93994 2.93994 6.01372 2.93994 9.80541C2.93994 13.5971 6.01372 16.6709 9.80541 16.6709C13.5971 16.6709 16.6709 13.5971 16.6709 9.80541C16.6709 6.01372 13.5971 2.93994 9.80541 2.93994ZM1.68994 9.80541C1.68994 5.32336 5.32336 1.68994 9.80541 1.68994C14.2875 1.68994 17.9209 5.32336 17.9209 9.80541C17.9209 14.2875 14.2875 17.9209 9.80541 17.9209C5.32336 17.9209 1.68994 14.2875 1.68994 9.80541Z" fill="#A5A5AB" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.5727 14.9628C14.8164 14.7184 15.2121 14.7179 15.4565 14.9617L18.3932 17.8907C18.6376 18.1345 18.6381 18.5302 18.3944 18.7746C18.1506 19.019 17.7549 19.0195 17.5105 18.7758L14.5738 15.8467C14.3294 15.6029 14.3289 15.2072 14.5727 14.9628Z" fill="#A5A5AB" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search member"
                            className="w-full text-[14px] placeholder:text-[#A0AEC0] text-[#1D1F2C] outline-none"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                    </div>
                    <div>
                        <select
                            className="py-[18px] border border-[#E8ECF4] justify-center rounded-xl text-base text-[#1D1F2C] outline-none"
                            onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                            value={selectedMonth}
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={i}>
                                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="relative rounded-tl-xl rounded-tr-xl">
                <div className="overflow-x-auto border border-[#ECEFF3] pb-2">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="flex items-center w-full justify-between">
                                <th className="w-[82px] flex items-center justify-center text-[8px] font-bold bg-[#F6F8FA] text-[#4A4C56] py-[12px]">Day</th>
                                {days.map(day => (
                                    <th key={day.day} className="flex-1 border border-[#ECEFF3] flex items-center justify-center aspect-square text-[#4A4C56] text-[12px] bg-[#FAFAFA]">
                                        {day.weekdayName}
                                    </th>
                                ))}
                            </tr>
                            <tr className="flex items-center w-full justify-between">
                                <th className="w-[82px] flex items-center justify-center text-[8px] bg-[#ECEFF3] py-[12px] text-[#4A4C56] font-medium">Name/Date</th>
                                {days.map((_, index) => (
                                    <th key={index} className="flex-1 border border-[#ECEFF3] flex items-center justify-center aspect-square text-[#4A4C56] text-[12px] bg-[#FAFAFA]">
                                        {index < 9 ? `0${index + 1}` : index + 1}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntries.map(emp => (
                                <tr key={emp?.user?.id} className="flex items-center w-full justify-between">
                                    <td className="w-[82px] flex items-center justify-center text-[8px] py-[12px] border-b border-[#ECEFF3]">
                                        {emp?.user?.name}
                                    </td>
                                    {Object.entries(emp?.days).map(([date, workHour], index) => (
                                        <td
                                            key={date}
                                            className="relative w-[36.16px] border border-[#ECEFF3] flex items-center justify-center aspect-square text-[#4A4C56] text-[12px] bg-[#fff] cursor-pointer"
                                            onClick={(e) => handleCellClick(e, workHour, emp?.user?.id, index)}
                                        >
                                            {(workHour?.hours || workHour?.hours === 0) ? `${workHour?.hours}hr` : ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {attendanceData.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-10 mb-4 max-w-[1200px] mx-auto font-bold rounded-lg gap-4">
                        <div className="flex items-center rounded-lg sm:px-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#1D1F2C] hover:bg-gray-100"
                                    } border border-[#F6F8FA] rounded-lg`}
                            >
                                <MdKeyboardArrowLeft className="text-xl" />
                            </button>

                            {visiblePages.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => handlePageChange(number)}
                                    className={`mx-1 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center ${currentPage === number ? "bg-[#F6F8FA]" : "text-[#1D1F2C] hover:bg-gray-100"
                                        } rounded-lg`}
                                >
                                    {number}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#1D1F2C] hover:bg-gray-100"
                                    } border border-[#F6F8FA] rounded-lg`}
                            >
                                <MdKeyboardArrowRight className="text-xl" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 text-sm sm:text-base text-[#777980] font-normal">
                            <span>
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
                            </span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="border rounded-md px-2 py-1 text-[#1D1F2C]"
                            >
                                {[5, 10, 20, 50].map((number) => (
                                    <option key={number} value={number}>
                                        {number}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* Work Hour Editor */}
                {WorkHourEditor && (
                    <div
                        ref={editorRef}
                        className="fixed z-50 p-3 space-y-3 bg-white rounded-lg shadow-lg border border-[#ECEFF3] w-full max-w-[224px]"
                        style={{
                            top: `${editorPosition.top}px`,
                            left: `${editorPosition.left}px`,
                        }}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium">Edit Hour</h3>
                            <FaCheck
                                className="text-[#82C8E5] cursor-pointer"
                                onClick={() => {
                                    if (updateWorkHour?.id) {
                                        handleSaveData(updateWorkHour.id);
                                    }
                                }}
                            />
                        </div>
                        <div className="relative w-full max-w-[200px]">
                            <button
                                onClick={() => setIsOpen(prev => !prev)}
                                className="w-full bg-white border rounded p-2 text-left truncate"
                            >
                                {(selectedProject && projects.filter(item => item.id === selectedProject)?.[0]?.name) || 'Select a project'}
                            </button>

                            {isOpen && (
                                <div className="absolute w-full bg-white border rounded mt-1 shadow-lg">
                                    {projects?.map((project) => (
                                        <div
                                            key={project?.id}
                                            className="truncate px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => handleSelectChange(project.id)}
                                            title={project.name}
                                        >
                                            {project?.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="w-full flex justify-center">
                            <div className="flex gap-2 items-center">
                                <button
                                    className="w-8 h-8 flex items-center justify-center border border-[#E8ECF4] rounded-sm"
                                    onClick={() => updateWorkHour && handleWorkHour(updateWorkHour.emp, updateWorkHour.index, "-")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 14 2" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.75 1C13.75 1.41421 13.4142 1.75 13 1.75L1 1.75C0.585786 1.75 0.25 1.41421 0.25 1C0.25 0.585786 0.585786 0.25 1 0.25L13 0.25C13.4142 0.25 13.75 0.585786 13.75 1Z" fill="#1D1F2C" />
                                    </svg>
                                </button>
                                <div className="select-none border border-[#E8ECF4] rounded-sm flex items-center text-[#4A4C56] font-medium justify-center px-4 bg-[#F7F8F9] h-8">
                                    {currentHour}hr
                                </div>
                                <button
                                    className="w-8 h-8 flex items-center justify-center border border-[#E8ECF4] rounded-sm bg-[#82C8E5]"
                                    onClick={() => updateWorkHour && handleWorkHour(updateWorkHour.emp, updateWorkHour.index, "+")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.75 1C7.75 0.585786 7.41421 0.25 7 0.25C6.58579 0.25 6.25 0.585786 6.25 1V6.25H1C0.585786 6.25 0.25 6.58579 0.25 7C0.25 7.41421 0.585786 7.75 1 7.75H6.25V13C6.25 13.4142 6.58579 13.75 7 13.75C7.41421 13.75 7.75 13.4142 7.75 13V7.75H13C13.4142 7.75 13.75 7.41421 13.75 7C13.75 6.58579 13.4142 6.25 13 6.25H7.75V1Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}