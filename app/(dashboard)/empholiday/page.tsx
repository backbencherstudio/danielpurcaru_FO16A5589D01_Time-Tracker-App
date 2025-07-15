'use client'

import guy from "@/public/images/Employee/guy.png";
import Jerome from "@/public/images/Employee/Jerome.png";
import ronald from "@/public/images/Employee/ronald.png";
import sanvannah from "@/public/images/Employee/sanvannah.png";
import theresa from "@/public/images/Employee/theresa.png";
import { UserService } from "@/service/user/user.service";
import Image from "next/image";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

export default function Page() {
    const [empHolidays, setEmpHolidays] = useState([]);
    const [addHoliday, setAddHoliday] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading,setLoading] = useState(false)

    // Toggle visibility of the Add Holiday form
    const handleAddHolidayOpen = () => {
        setAddHoliday((prev) => !prev);

    }

    // Handle adding holiday (this is where you should handle the form submission)
    const handleEmpAddHoliday = (e) => {
        e.preventDefault();
        // Add holiday logic (for now just log the date values)
        console.log("Holiday added from:", startDate, "to:", endDate);

    }


    useEffect(() => {
        setLoading(true)
        const fetchHoliday = async () => {
            try {
                const res = await UserService?.getEmpHolidays();
                if (res?.data?.success) {
                    // console.log("Response load :", res.data.data);
                    setEmpHolidays(res.data.data)
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
        fetchHoliday()
    }, [])


    console.log(empHolidays)

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row w-full justify-between">
                <div className="text-center">
                    <h4 className="text-[#1D1F2C] text-[24px] font-semibold">Employee Holiday</h4>
                    <h3 className="text-[#777980] text-base">All employee holidays</h3>
                </div>
                <button className="bg-[#82C8E5] flex gap-1 items-center px-4 py-4 rounded-xl cursor-pointer" onClick={handleAddHolidayOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0002 3.3335C10.4604 3.3335 10.8335 3.70659 10.8335 4.16683V15.8335C10.8335 16.2937 10.4604 16.6668 10.0002 16.6668C9.53993 16.6668 9.16683 16.2937 9.16683 15.8335V4.16683C9.16683 3.70659 9.53993 3.3335 10.0002 3.3335Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.3335 10.0002C3.3335 9.53993 3.70659 9.16683 4.16683 9.16683H15.8335C16.2937 9.16683 16.6668 9.53993 16.6668 10.0002C16.6668 10.4604 16.2937 10.8335 15.8335 10.8335H4.16683C3.70659 10.8335 3.3335 10.4604 3.3335 10.0002Z" fill="white" />
                    </svg>
                    <span className="text-white text-[16px] font-medium">Add Holiday</span>
                </button>
            </div>
            <div className="bg-white rounded-xl p-5 overflow-x-auto">
                <table className="w-full table-auto">
                    <thead className="text-[#4A4C56] bg-[#F6F8FA] font-semibold text-[12px] w-full text-nowrap">
                        <tr className="rounded-xl">
                            <th className="py-4 px-4 flex justify-between gap-3">
                                <span>SL</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer">
                                    <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <g opacity="0.4">
                                        <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </th>
                            <th className="py-4 text-start px-4 ">
                                <div className="flex items-center justify-between">
                                    <span>Name</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer">
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                </div>
                            </th>
                            <th className="py-4 text-start px-4">
                                <div className="flex justify-between items-center">
                                    <span>From</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer">
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                </div>
                            </th>
                            <th className="py-4 text-start px-4">
                                <div className="flex items-center justify-between">
                                    <span>To</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer">
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                </div>
                            </th>
                            <th className="py-4 text-center px-4">Total</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#1D1F2C] text-[12px] font-medium">
                        {empHolidays.map((emp,index) => (
                            <tr key={emp.id} className="border-t-[0.2px] border-[#F6F8FA]">
                                <td className="p-4">{index+1 < 10 ? `0${index+1}` : `${index+1}`}</td>
                                <td className="flex items-center gap-2 p-4">
                                    <Image src={emp?.user?.avatarUrl} alt="Emp image" width={24} height={24} className="rounded-full" />
                                    <h3>{emp?.user?.name}</h3>
                                </td>
                                <td className="p-4">{emp.start_date.split("T")[0]}</td>
                                <td className="p-4">{emp.end_date.split("T")[0]}</td>
                                <td className="text-center p-4">{emp.total_days} Days</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {addHoliday && (
                <div className="top-0 bottom-0 left-0 right-0 bg-[#e2e2e233] absolute z-[99] flex items-center justify-center backdrop-blur-[10px]">
                    <form className="bg-white w-[567px] rounded-xl p-[32px] space-y-[40px] relative" onSubmit={handleEmpAddHoliday}>
                        <h3 className="text-[#1D1F2C] text-[24px] font-semibold">Add Employee Holiday</h3>
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-[#1D1F2C] text-base font-medium">Employee Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Employee Name"
                                    className="bg-[#F7F8F9] py-[18px] px-4 rounded-lg border border-[#E9E9EA] text-[#1D1F2C] text-base outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="startDate" className="text-[#1D1F2C] text-base font-medium">Start Date</label>
                                <div className="bg-[#F7F8F9] py-[18px] px-4 rounded-lg border border-[#E9E9EA] text-[#1D1F2C] text-base relative flex">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date: Date) => setStartDate(date)}  // Handle date change
                                        dateFormat="MMMM d, yyyy"  // Format for displaying the date
                                        className="w-full"
                                        placeholderText="Select a date"
                                        minDate={new Date()} // Ensure the selected date is not in the past
                                        id="startDate"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="endDate" className="text-[#1D1F2C] text-base font-medium">End Date</label>
                                <div className="bg-[#F7F8F9] py-[18px] px-4 rounded-lg border border-[#E9E9EA] text-[#1D1F2C] text-base relative flex">
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date: Date) => setEndDate(date)}  // Handle date change
                                        dateFormat="MMMM d, yyyy"  // Format for displaying the date
                                        className="w-full outline-none flex-1"
                                        placeholderText="Select a date"
                                        minDate={new Date()}  // Disable past dates
                                        id="endDate"
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-[#82C8E5] py-[11px] rounded-lg text-white font-medium cursor-pointer">Add Holiday</button>
                        <div className="absolute top-4 right-4 cursor-pointer" onClick={handleAddHolidayOpen}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M17.885 16.0001L24.9424 8.94276C25.4637 8.42276 25.4637 7.5775 24.9424 7.0575C24.421 6.53617 23.5784 6.53617 23.057 7.0575L15.9997 14.1148L8.94235 7.0575C8.42102 6.53617 7.57835 6.53617 7.05702 7.0575C6.53568 7.5775 6.53568 8.42276 7.05702 8.94276L14.1143 16.0001L7.05702 23.0575C6.53568 23.5775 6.53568 24.4228 7.05702 24.9428C7.31702 25.2028 7.65835 25.3335 7.99968 25.3335C8.34102 25.3335 8.68235 25.2028 8.94235 24.9428L15.9997 17.8855L23.057 24.9428C23.317 25.2028 23.6583 25.3335 23.9997 25.3335C24.341 25.3335 24.6824 25.2028 24.9424 24.9428C25.4637 24.4228 25.4637 23.5775 24.9424 23.0575L17.885 16.0001Z" fill="#82C8E5" />
                            </svg>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}