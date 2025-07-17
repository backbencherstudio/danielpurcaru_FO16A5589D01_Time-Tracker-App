'use client'
import { UserService } from "@/service/user/user.service";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa6";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

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
    index: number;
    workHour: number;
}

export default function Page() {
    const [days, setDays] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [WorkHourEditor, setWorkHourEditor] = useState(false);
    const [loading, setLoading] = useState(false)
    const [updateWorkHour, setUpdateWorkHour] = useState<UpdateWorkHour | null>(null);
    const [attendanceData, setAttendanceData] = useState<EmployeeAttendance[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentHour, setCurrentHour] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    // const [empWorkingHour, setEmpWorkingHour] = useState<any>([
    //     ["Williamson", Array(31).fill("8hr")],
    //     ["Floyd Miles", Array(31).fill("8hr")],
    //     ["Cody Fisher", Array(31).fill("8hr")],
    //     ["Annette Black", Array(31).fill("8hr")],
    //     ["Jane Cooper", Array(31).fill("8hr")],
    //     ["Wade Warren", Array(31).fill("8hr")],
    //     ["Jerome Bell", Array(31).fill("8hr")],
    //     ["Savannah ", Array(31).fill("8hr")],
    // ]);

    const handleMonthChange = (month: number) => {
        setSelectedMonth(month);
    }

    useEffect(() => {
        const currentYear = new Date().getFullYear();

        // Get the total number of days in the selected month
        const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();

        // Weekday names
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const daysArray = [];
        // Generate days with corresponding weekday names
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, selectedMonth, day);
            const weekdayName = weekdays[date.getDay()]; // Get the weekday name
            daysArray.push({ day, weekdayName });
        }

        // Update the state with the days and their weekday names
        setDays(daysArray);

        // // Update empWorkingHour: Set Sundays' working hours to empty string
        // setEmpWorkingHour(prevEmpWorkingHour => {
        //     return prevEmpWorkingHour.map(employee => {
        //         const updatedWorkHours = daysArray.map((workHour, index) => {
        //             // If the day is Sunday, set workHour to ""
        //             if (daysArray[index] && daysArray[index].weekdayName === 'Sun') {
        //                 return "";
        //             }
        //             return "8";
        //         });
        //         return [employee[0], updatedWorkHours]; // Return employee with updated work hours
        //     });
        // });
    }, [selectedMonth]); // This effect runs when selectedMonth changes


    useEffect(() => {
        const fetchEmpData = async () => {
            try {
                const res = await UserService?.getAttendanceData(selectedMonth);
                if (res?.data?.success) {
                    // console.log("Response:", res.data.data);
                    setAttendanceData(res.data.data)
                } else {
                    toast.error(res?.response?.data?.message || "Failed to fetch data");
                }
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message ||
                    error.message ||
                    "An error occurred while fetching data"
                );
                // console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEmpData()
    }, [selectedMonth])

    const handleWorkHour = (empId: string, dayIndex: number, operator: "+" | "-") => {
        setAttendanceData(prev => prev.map(employee => {
            if (employee.user.id !== empId) return employee;

            const updatedDays = Object.entries(employee.days).map(([key, value], idx) => {
                if (idx !== dayIndex) return [key, value];

                const currentHours = value?.hours || 0;
                const newHours = operator === "+" ? currentHours + 1 : Math.max(-1, currentHours - 1);
                setCurrentHour(newHours);

                return [key, { ...value, hours: newHours < 0 ? null : newHours }];
            });

            return {
                ...employee,
                days: Object.fromEntries(updatedDays)
            };
        }));
    };



    // pagination functions

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };


    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newItemsPerPage = Number(e.target.value);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const filteredAttendanceData = useMemo(() => {
        if (!searchTerm) return attendanceData;
        return attendanceData.filter(emp =>
            emp.user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [attendanceData, searchTerm]);


    const totalItems = filteredAttendanceData.length;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentEntries = filteredAttendanceData.slice(firstIndex, lastIndex);
    // console.log("Total length : ", attendanceData.length)
    const totalPages = Math.ceil(attendanceData.length / itemsPerPage)
    // console.log("Total pages : ", totalPages)


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

    // console.log("Update data : ", attendanceData)

    return (
        <div className="p-6 bg-white rounded-xl space-y-6">
            <div className="flex items-center">
                <h3 className="flex-1 text-[#1D1F2C] text-[24px] font-semibold">Attendance</h3>
                <div className="flex gap-5">
                    <div className="flex items-center gap-[10px] border border-[#E9EAEC] rounded-xl px-[20px] py-4 relative w-[303px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.80541 2.93994C6.01372 2.93994 2.93994 6.01372 2.93994 9.80541C2.93994 13.5971 6.01372 16.6709 9.80541 16.6709C13.5971 16.6709 16.6709 13.5971 16.6709 9.80541C16.6709 6.01372 13.5971 2.93994 9.80541 2.93994ZM1.68994 9.80541C1.68994 5.32336 5.32336 1.68994 9.80541 1.68994C14.2875 1.68994 17.9209 5.32336 17.9209 9.80541C17.9209 14.2875 14.2875 17.9209 9.80541 17.9209C5.32336 17.9209 1.68994 14.2875 1.68994 9.80541Z" fill="#A5A5AB" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5727 14.9628C14.8164 14.7184 15.2121 14.7179 15.4565 14.9617L18.3932 17.8907C18.6376 18.1345 18.6381 18.5302 18.3944 18.7746C18.1506 19.019 17.7549 19.0195 17.5105 18.7758L14.5738 15.8467C14.3294 15.6029 14.3289 15.2072 14.5727 14.9628Z" fill="#A5A5AB" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search member"
                            className="w-full text-[14px] placeholder:text-[#A0AEC0] text-[#1D1F2C] outline-none"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                    </div>
                    <div >
                        <select className="py-[18px] border border-[#E8ECF4] justify-center rounded-xl text-base text-[#1D1F2C] outline-none" onChange={(e) => handleMonthChange(parseInt(e.target.value))} value={selectedMonth}>
                            <option value={0} className="hover:bg-[#ECEFF3] rounded-lg cursor-pointer duration-300">January</option>
                            <option value={1} >February</option>
                            <option value={2} >March</option>
                            <option value={3} >April</option>
                            <option value={4} >May</option>
                            <option value={5} >June</option>
                            <option value={6} >July</option>
                            <option value={7} >August</option>
                            <option value={8} >September</option>
                            <option value={9} >October</option>
                            <option value={10}>November</option>
                            <option value={11}>December</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="relative rounded-tl-xl rounded-tr-xl">
                <div className="overflow-x-auto  border border-[#ECEFF3] pb-2">
                    <table className="w-[1096.26px] table-auto">
                        <thead>
                            <tr className="flex items-center w-full justify-between">
                                <th className="w-[82px] flex items-center justify-center text-[8px] font-bold bg-[#F6F8FA] text-[#4A4C56] py-[12px]">Day</th>
                                {
                                    days.map(day => (
                                        <th key={day.day} className="flex-1 border border-[#ECEFF3] flex items-center justify-center aspect-square text-[#4A4C56] text-[12px] bg-[#FAFAFA]">
                                            {day.weekdayName}
                                        </th>
                                    ))
                                }
                            </tr>
                            <tr className="flex items-center w-full justify-between">
                                <th className="w-[82px] flex items-center justify-center text-[8px] bg-[#ECEFF3] py-[12px] text-[#4A4C56] font-medium">Name/Date</th>
                                {
                                    days.map((_, index) => (
                                        <th key={index} className="flex-1 border border-[#ECEFF3] flex items-center justify-center aspect-square text-[#4A4C56] text-[12px] bg-[#FAFAFA]">
                                            {index < 9 ? `0${index + 1}` : index + 1}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {currentEntries.map(emp => (
                                <tr key={emp?.user?.id} className="flex items-center w-full justify-between">
                                    <td className="w-[82px] flex items-center justify-center text-[8px] py-[12px] border-b border-[#ECEFF3]">{emp?.user?.name}</td>
                                    {
                                        Object.entries(emp?.days).map((workHour, index) => (
                                            <td key={index} className="relative w-[36.16px] border border-[#ECEFF3] flex items-center justify-center aspect-square text-[#4A4C56] text-[12px] bg-[#fff]" onClick={() => { setUpdateWorkHour({ emp: emp?.user?.id, index: index, workHour: workHour[1]?.hours }), setWorkHourEditor(true) }}>
                                                {(workHour[1]?.hours || workHour[1]?.hours >= 0) && workHour[1]?.hours !== null ? `${workHour[1]?.hours}hr` : ""}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="bg-white rounded-lg">
                    {attendanceData.length > 0 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 mb-4 max-w-[1200px] mx-auto font-bold rounded-lg gap-4">
                            <div className="flex items-center rounded-lg sm:px-4">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${currentPage === 1
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-[#1D1F2C] hover:bg-gray-100"
                                        } border border-[#F6F8FA] rounded-lg`}
                                >
                                    <MdKeyboardArrowLeft className="text-xl" />
                                </button>

                                {visiblePages.map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => handlePageChange(number)}
                                        className={`mx-1 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center ${currentPage === number
                                            ? "bg-[#F6F8FA]"
                                            : "text-[#1D1F2C] hover:bg-gray-100"
                                            } rounded-lg`}
                                    >
                                        {number}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${currentPage === totalPages
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-[#1D1F2C] hover:bg-gray-100"
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
                                    onChange={handleItemsPerPageChange}
                                    className="border rounded-md px-2 py-1 text-[#1D1F2C]"
                                >
                                    {[5, 6, 10, 15, 20].map((number) => (
                                        <option key={number} value={number}>
                                            {number}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </div>



                {WorkHourEditor && <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-3 space-y-3 bg-white rounded-lg">
                    <div className="flex justify-between">
                        <h3>Edit Hour</h3>
                        <FaCheck className="text-[#82C8E5] cursor-pointer" onClick={() => setWorkHourEditor(false)} />
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" fill="none" className="cursor-pointer" onClick={() => setWorkHourEditor(false)}>
                            <path d="M17.8855 16.0001L24.9428 8.94276C25.4642 8.42276 25.4642 7.5775 24.9428 7.0575C24.4215 6.53617 23.5788 6.53617 23.0575 7.0575L16.0002 14.1148L8.94284 7.0575C8.42151 6.53617 7.57884 6.53617 7.0575 7.0575C6.53617 7.5775 6.53617 8.42276 7.0575 8.94276L14.1148 16.0001L7.0575 23.0575C6.53617 23.5775 6.53617 24.4228 7.0575 24.9428C7.3175 25.2028 7.65884 25.3335 8.00017 25.3335C8.3415 25.3335 8.68284 25.2028 8.94284 24.9428L16.0002 17.8855L23.0575 24.9428C23.3175 25.2028 23.6588 25.3335 24.0002 25.3335C24.3415 25.3335 24.6828 25.2028 24.9428 24.9428C25.4642 24.4228 25.4642 23.5775 24.9428 23.0575L17.8855 16.0001Z" fill="#82C8E5" />
                        </svg> */}
                    </div>
                    <div className="flex gap-2">
                        <div className="w-[32px] h-[32px] flex items-center justify-center border border-[#E8ECF4] rounded-sm" onClick={() => handleWorkHour(updateWorkHour.emp, updateWorkHour.index, "-")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 14 2" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.75 1C13.75 1.41421 13.4142 1.75 13 1.75L1 1.75C0.585786 1.75 0.25 1.41421 0.25 1C0.25 0.585786 0.585786 0.25 1 0.25L13 0.25C13.4142 0.25 13.75 0.585786 13.75 1Z" fill="#1D1F2C" />
                            </svg>
                        </div>
                        <div className="select-none border border-[#E8ECF4] rounded-sm flex items-center text-[#4A4C56] font-medium justify-center px-4 bg-[#F7F8F9]">
                            {currentHour}hr
                        </div>
                        <div className="w-[32px] h-[32px] flex items-center justify-center border border-[#E8ECF4] rounded-sm bg-[#82C8E5]" onClick={() => handleWorkHour(updateWorkHour.emp, updateWorkHour.index, "+")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75 1C7.75 0.585786 7.41421 0.25 7 0.25C6.58579 0.25 6.25 0.585786 6.25 1V6.25H1C0.585786 6.25 0.25 6.58579 0.25 7C0.25 7.41421 0.585786 7.75 1 7.75H6.25V13C6.25 13.4142 6.58579 13.75 7 13.75C7.41421 13.75 7.75 13.4142 7.75 13V7.75H13C13.4142 7.75 13.75 7.41421 13.75 7C13.75 6.58579 13.4142 6.25 13 6.25H7.75V1Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}
