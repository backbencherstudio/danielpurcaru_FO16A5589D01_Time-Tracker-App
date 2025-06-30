'use client'
import { useState, useEffect } from "react"

export default function Page() {
    const [days, setDays] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [empWorkingHour, setEmpWorkingHour] = useState([
        ["Williamson", ["8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8"]],
        ["Jones", ["8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8"]],
    ]);

    const handleMonthChange = (month) => {
        const monthIndex = new Date(Date.parse(month + " 1, 2025")).getMonth(); // Convert month name to month index
        setSelectedMonth(monthIndex);
    }

    useEffect(() => {
        const currentYear = new Date().getFullYear();

        // Get the total number of days in the selected month
        const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();

        // Weekday names
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

        const daysArray = [];
        // Generate days with corresponding weekday names
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, selectedMonth, day);
            const weekdayName = weekdays[date.getDay()]; // Get the weekday name
            daysArray.push({ day, weekdayName });
        }

        // Update the state with the days and their weekday names
        setDays(daysArray);

        // Update empWorkingHour: Set Sundays' working hours to empty string
        setEmpWorkingHour(prevEmpWorkingHour => {
            return prevEmpWorkingHour.map(employee => {
                const updatedWorkHours = employee[1].map((workHour, index) => {
                    // If the day is Sunday (index 0), set workHour to ""
                    if (daysArray[index] && daysArray[index].weekdayName === 'Sun') {
                        return "";
                    }
                    return "8";
                });
                return [employee[0], updatedWorkHours]; // Return employee with updated work hours
            });
        });

    }, [selectedMonth]); // This effect runs when selectedMonth changes


    const handleWorkHour = (emp, day, value) => {
        setEmpWorkingHour(prev => {
            return prev.map(employee => {
                if (employee[0] === emp) {
                    const newempWorkHour = employee[1].map((hr, index) => {
                        if (index === day) {
                            return parseInt(value) + 1;
                        } else {
                            return hr;
                        }
                    });
                    return [employee[0], newempWorkHour];
                } else {
                    return employee;
                }
            });
        });
    };


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
                        />
                    </div>
                    <div >
                        <select className="py-[18px] border border-[#E8ECF4] justify-center rounded-xl text-base text-[#1D1F2C] outline-none" onChange={(e) => handleMonthChange(e.target.value)}>
                            <option className="hover:bg-[#ECEFF3] px-3 py-1 rounded-lg cursor-pointer duration-300">January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="overflow-x-scroll">
                <div className="border  w-[1096.26px]">
                    <div>
                        <div className="flex items-center w-full justify-between">
                            <h3 className="w-[82px] flex items-center justify-center text-[8px] bg-[#F6F8FA] py-[11px]">Day</h3>
                            <div className="flex w-full">
                                {
                                    days.map(day => <div key={day.day} className="flex-1 border border-[#ECEFF3] flex items-center justify-center aspect-square text-[#4A4C56] text-[12px] bg-[#FAFAFA]">{day.weekdayName}</div>)
                                }
                            </div>
                        </div>
                        <div className="flex items-center w-full justify-between">
                            <h3 className="w-[82px] flex items-center justify-center text-[8px] bg-[#ECEFF3] py-[11px]">Name/Date</h3>
                            <div className="flex w-full">
                                {
                                    days.map(day => <div key={day.day} className="flex-1 border border-[#ECEFF3] flex items-center justify-center aspect-square text-[#4A4C56] text-[12px] bg-[#FAFAFA]">{day.day}</div>)
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        {empWorkingHour.map(emp => (
                            <div key={emp[0]} className="flex items-center w-full justify-between">
                                <h3 className="w-[82px] flex items-center justify-center text-[8px] bg-[#ECEFF3] py-[11px]">{emp[0]}</h3>
                                <div className="flex w-full">
                                    {
                                        emp[1].map((workHour, index) => (
                                            <div key={index} className="flex-1 border border-[#ECEFF3] flex items-center justify-center aspect-square text-[#4A4C56] text-[12px] bg-[#FAFAFA]" onClick={() => handleWorkHour(emp[0], index, workHour)}>{workHour ? `${workHour}hr` : ""}</div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
