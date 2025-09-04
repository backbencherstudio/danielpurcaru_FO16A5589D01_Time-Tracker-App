'use client'

import { UserService } from "@/service/user/user.service";
import Image from "next/image";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import avatar from '@/public/avatar.png'

interface Employee {
    id: string;
    first_name?: string;
    last_name?: string;
    avatarUrl?: string;
}

interface Holiday {
    id: string;
    user_id: string;
    user?: {
        avatarUrl?: string;
        name: string;
    };
    start_date: string;
    end_date: string;
    total_days: number;
}

export default function Page() {
    const { handleSubmit } = useForm();
    const [empHolidays, setEmpHolidays] = useState<Holiday[]>([]);
    const [addHoliday, setAddHoliday] = useState(false);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState(false);
    const [empData, setEmpData] = useState<Employee[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

    const handleAddHolidayOpen = () => {
        setAddHoliday((prev) => !prev);
        if (!addHoliday) {
            setSelectedEmployeeId("");
            setStartDate(new Date());
            setEndDate(new Date());
        }
    };

    // token extract helper
    const getCookieToken = () => {
        if (typeof document === "undefined") return null;

        const cookieString = document.cookie
            .split("; ")
            .find((cookie) => cookie.startsWith("empdashtoken="));
        return cookieString?.split("=")[1] || null;
    };

    const handleFormSubmit = async () => {
        if (!selectedEmployeeId) {
            toast.error("Please select an employee");
            return;
        }

        // Validate dates
        if (startDate > endDate) {
            toast.error("End date must be after start date");
            return;
        }

        const holidayData = {
            user_id: selectedEmployeeId,
            start_date: startDate.toISOString().split("T")[0],
            end_date: endDate.toISOString().split("T")[0],
        };

        console.log(holidayData);

        try {
            setLoading(true);
            const res = await UserService?.createEmpHoliday(holidayData);

            if (res?.data?.success) {
                toast.success(res.data.message);
                setAddHoliday(false);
                // Refresh the holidays list
                const holidaysRes = await UserService?.getEmpHolidays();
                if (holidaysRes?.data?.success) {
                    setEmpHolidays(holidaysRes.data.data);
                }
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to add holiday");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = getCookieToken();
        const fetchData = async () => {
            try {
                setLoading(true);
                const [empRes, holidaysRes] = await Promise.all([
                    UserService?.getAllEmpData(),
                    UserService?.getEmpHolidays()
                ]);

                if (empRes?.data?.success) {
                    setEmpData(empRes.data.data);
                    console.log("Employee data loaded:", empRes.data.data); // Debug log
                }

                if (holidaysRes?.data?.success) {
                    setEmpHolidays(holidaysRes.data.data);
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
        };
        if (token) {
            fetchData();
        }
    }, []);

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row w-full justify-between">
                <div className="text-center">
                    <h4 className="text-[#1D1F2C] text-[24px] font-semibold">Employee Holiday</h4>
                    <h3 className="text-[#777980] text-base">All employee holidays</h3>
                </div>
                <button
                    className="bg-[#82C8E5] flex gap-1 items-center px-4 py-4 rounded-xl cursor-pointer hover:bg-[#6ab0cc] transition-colors"
                    onClick={handleAddHolidayOpen}
                    disabled={loading}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.0002 3.3335C10.4604 3.3335 10.8335 3.70659 10.8335 4.16683V15.8335C10.8335 16.2937 10.4604 16.6668 10.0002 16.6668C9.53993 16.6668 9.16683 16.2937 9.16683 15.8335V4.16683C9.16683 3.70659 9.53993 3.3335 10.0002 3.3335Z" fill="white" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.3335 10.0002C3.3335 9.53993 3.70659 9.16683 4.16683 9.16683H15.8335C16.2937 9.16683 16.6668 9.53993 16.6668 10.0002C16.6668 10.4604 16.2937 10.8335 15.8335 10.8335H4.16683C3.70659 10.8335 3.3335 10.4604 3.3335 10.0002Z" fill="white" />
                    </svg>
                    <span className="text-white text-[16px] font-medium">Add Holiday</span>
                </button>
            </div>

            <div className="bg-white rounded-xl p-5 overflow-x-auto">
                {loading && !empHolidays.length ? (
                    <div className="flex justify-center items-center h-32">
                        <p>Loading holidays...</p>
                    </div>
                ) : empHolidays.length === 0 ? (
                    <div className="flex justify-center items-center h-32">
                        <p>No holidays found</p>
                    </div>
                ) : (
                    <table className="w-full table-auto">
                        <thead className="text-[#4A4C56] bg-[#F6F8FA] font-semibold text-[12px] w-full text-nowrap">
                            <tr className="rounded-xl">
                                <th className="py-4 px-4 flex justify-between gap-3">
                                    <span>SL</span>
                                    {/* <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <g opacity="0.4">
                                                <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                        </svg>
                                    </button> */}
                                </th>
                                <th className="py-4 text-start px-4">
                                    <div className="flex items-center justify-between">
                                        <span>Name</span>
                                        {/* <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <g opacity="0.4">
                                                    <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </svg>
                                        </button> */}
                                    </div>
                                </th>
                                <th className="py-4 text-start px-4">
                                    <div className="flex justify-between items-center">
                                        <span>From</span>
                                        {/* <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <g opacity="0.4">
                                                    <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </svg>
                                        </button> */}
                                    </div>
                                </th>
                                <th className="py-4 text-start px-4">
                                    <div className="flex items-center justify-between">
                                        <span>To</span>
                                        {/* <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <g opacity="0.4">
                                                    <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </svg>
                                        </button> */}
                                    </div>
                                </th>
                                <th className="py-4 text-center px-4">Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#1D1F2C] text-[12px] font-medium">
                            {empHolidays.map((emp, index) => (
                                <tr key={emp.id} className="border-t-[0.2px] border-[#F6F8FA] hover:bg-gray-50">
                                    <td className="p-4">{index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}</td>
                                    <td className="flex items-center gap-2 p-4">
                                        <Image
                                            src={emp?.user?.avatarUrl || avatar}
                                            alt="Emp image"
                                            width={24}
                                            height={24}
                                            className="rounded-full object-cover"
                                        />
                                        <h3>{emp?.user?.name}</h3>
                                    </td>
                                    <td className="p-4">{emp.start_date.split("T")[0]}</td>
                                    <td className="p-4">{emp.end_date.split("T")[0]}</td>
                                    <td className="text-center p-4">{emp.total_days} Days</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {addHoliday && (
                <div className="fixed inset-0 bg-[#e2e2e233] z-[99] flex items-center justify-center backdrop-blur-[10px]">
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white w-[567px] rounded-xl p-[32px] space-y-[40px] relative">
                        <h3 className="text-[#1D1F2C] text-[24px] font-semibold">Add Employee Holiday</h3>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="employee" className="text-[#1D1F2C] text-base font-medium">Employee</label>
                                    <select
                                        id="employee"
                                        onChange={(e) => setSelectedEmployeeId(e.currentTarget.value)}
                                    >
                                        <option value="">Select an employee</option>
                                        {empData.map(emp => {
                                            const { id, first_name, last_name } = emp;
                                            return (
                                                <option key={id} value={id}>
                                                    {`${first_name} ${last_name ?? ''}`}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {empData.length === 0 && !loading && (
                                        <p className="text-sm text-red-500">No employees available to select</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="startDate" className="text-[#1D1F2C] text-base font-medium">Start Date</label>
                                <div className="bg-[#F7F8F9] py-[18px] px-4 rounded-lg border border-[#E9E9EA] text-[#1D1F2C] text-base relative flex">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date: Date) => setStartDate(date)}
                                        dateFormat="MMMM d, yyyy"
                                        className="w-full"
                                        placeholderText="Select a date"
                                        minDate={new Date()}
                                        id="startDate"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="endDate" className="text-[#1D1F2C] text-base font-medium">End Date</label>
                                <div className="bg-[#F7F8F9] py-[18px] px-4 rounded-lg border border-[#E9E9EA] text-[#1D1F2C] text-base relative flex">
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date: Date) => setEndDate(date)}
                                        dateFormat="MMMM d, yyyy"
                                        className="w-full outline-none flex-1"
                                        placeholderText="Select a date"
                                        minDate={startDate}
                                        id="endDate"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#82C8E5] py-[11px] rounded-lg text-white font-medium cursor-pointer hover:bg-[#6ab0cc] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={loading || empData.length === 0}
                        >
                            {loading ? "Adding..." : "Add Holiday"}
                        </button>
                        <button
                            type="button"
                            className="absolute top-4 right-4 cursor-pointer hover:bg-gray-100 p-1 rounded-full"
                            onClick={handleAddHolidayOpen}
                            disabled={loading}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M17.885 16.0001L24.9424 8.94276C25.4637 8.42276 25.4637 7.5775 24.9424 7.0575C24.421 6.53617 23.5784 6.53617 23.057 7.0575L15.9997 14.1148L8.94235 7.0575C8.42102 6.53617 7.57835 6.53617 7.05702 7.0575C6.53568 7.5775 6.53568 8.42276 7.05702 8.94276L14.1143 16.0001L7.05702 23.0575C6.53568 23.5775 6.53568 24.4228 7.05702 24.9428C7.31702 25.2028 7.65835 25.3335 7.99968 25.3335C8.34102 25.3335 8.68235 25.2028 8.94235 24.9428L15.9997 17.8855L23.057 24.9428C23.317 25.2028 23.6583 25.3335 23.9997 25.3335C24.341 25.3335 24.6824 25.2028 24.9424 24.9428C25.4637 24.4228 25.4637 23.5775 24.9424 23.0575L17.885 16.0001Z" fill="#82C8E5" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}