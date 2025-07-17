'use client'
import { useState, useEffect } from "react"
import Link from "next/link";

export default function Sidebar() {
    const [menu, setMenu] = useState({
        dashboard: false,
        employees: false,
        project: false,
        attendance: false,
        academiccalendar: false,
        employeeloan: false,
        notification: false,
        profile: false,
        empholiday: false,
    })

    const [empHoliday, setEmpHoliday] = useState(false);


    const handleEmpHoliday = () => {
        setEmpHoliday(prev => !prev)
    }

    const handleMenu = (menuItem: string) => {
        setMenu((prev) => {
            const updatedMenu: typeof prev = {} as typeof prev;

            // Set all keys to false
            Object.keys(prev).forEach((key) => {
                updatedMenu[key as keyof typeof prev] = false;
            });

            // Set the selected menu item to true
            updatedMenu[menuItem as keyof typeof prev] = true;

            return updatedMenu;
        });
    };

    useEffect(() => {
        if (window.location.pathname === "/") {
            handleMenu("dashboard")
        } else {
            handleMenu(window.location.pathname.split("/")[1])
        }
    }, [])



    return (
        <div className="sm:px-4 px-2 bg-white translate-y-[90px] flex flex-col gap-5 justify-between" style={{ height: "calc(100vh - 130px)" }}>
            <div className="space-y-3">
                <Link href="/" className={`flex ${menu.dashboard ? "text-white bg-[#82C8E5]" : "bg-white text-[#4A4C56]"} items-center gap-[10px] px-[12px] py-2 rounded-lg cursor-pointer`} onClick={() => handleMenu("dashboard")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5.66699 10.667C6.58721 10.6672 7.33283 11.4128 7.33301 12.333V15.667C7.33283 16.5872 6.58721 17.3328 5.66699 17.333H2.33301C1.41279 17.3328 0.667168 16.5872 0.666992 15.667V12.333C0.667168 11.4128 1.41279 10.6672 2.33301 10.667H5.66699ZM15.667 10.667C16.5872 10.6672 17.3328 11.4128 17.333 12.333V15.667C17.3328 16.5872 16.5872 17.3328 15.667 17.333H12.333C11.4128 17.3328 10.6672 16.5872 10.667 15.667V12.333C10.6672 11.4128 11.4128 10.6672 12.333 10.667H15.667ZM5.66699 0.666992C6.58721 0.667168 7.33283 1.41279 7.33301 2.33301V5.66699C7.33283 6.58721 6.58721 7.33283 5.66699 7.33301H2.33301C1.41279 7.33283 0.667168 6.58721 0.666992 5.66699V2.33301C0.667168 1.41279 1.41279 0.667168 2.33301 0.666992H5.66699ZM15.667 0.666992C16.5872 0.667168 17.3328 1.41279 17.333 2.33301V5.66699C17.3328 6.58721 16.5872 7.33283 15.667 7.33301H12.333C11.4128 7.33283 10.6672 6.58721 10.667 5.66699V2.33301C10.6672 1.41279 11.4128 0.667168 12.333 0.666992H15.667Z" fill="currentColor" />
                    </svg>
                    <span className="text-[16px] text-nowrap hidden lg:block">Dashboard</span>
                </Link>
                <div className={`flex flex-col items-center justify-between w-fit lg:w-full`}>
                    <div className={`flex justify-between items-center w-fit lg:w-full px-[12px] py-2 rounded-lg ${menu.employees ? "bg-[#82C8E5] text-white" : "text-[#4A4C56] bg-white"}`}>
                        <Link href="/employees" className="flex items-center gap-[10px] cursor-pointer" onClick={() => handleMenu("employees")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <ellipse cx="8.33333" cy="14.5832" rx="5.83333" ry="2.91667" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <circle cx="8.33333" cy="5.83333" r="3.33333" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M12.7152 3.4248C14.4098 3.53563 15.7504 4.94441 15.7504 6.66699C15.7503 8.46175 14.2951 9.91678 12.5004 9.91699C12.1327 9.91699 11.7792 9.85474 11.4496 9.74219C11.9134 9.37188 12.3107 8.92176 12.6185 8.41113C13.5297 8.35012 14.2503 7.59357 14.2504 6.66699C14.2504 5.98092 13.8545 5.38842 13.2797 5.10156C13.1916 4.50127 12.9968 3.93588 12.7152 3.4248Z" fill="currentColor" />
                                <path d="M12.848 10.9248C14.1698 10.9605 15.3896 11.1954 16.3246 11.585C16.831 11.796 17.2905 12.0667 17.6342 12.4053C17.9803 12.7464 18.2503 13.2015 18.2504 13.75C18.2503 14.2987 17.9804 14.7545 17.6342 15.0957C17.2905 15.4343 16.8311 15.7049 16.3246 15.916C16.0195 16.0431 15.683 16.1511 15.3236 16.2441C15.6516 15.7291 15.8333 15.1699 15.8334 14.584C15.8334 14.5538 15.8304 14.5232 15.8295 14.4932C16.1827 14.3376 16.4308 14.1758 16.5814 14.0273C16.7406 13.8705 16.7503 13.7766 16.7504 13.75C16.7503 13.7232 16.74 13.63 16.5814 13.4736C16.4192 13.3139 16.1454 13.1356 15.7474 12.9697C15.5909 12.9045 15.4194 12.846 15.2367 12.79C14.719 12.0468 13.8892 11.4053 12.848 10.9248Z" fill="currentColor" />
                            </svg>
                            <span className="text-[16px] text-nowrap hidden lg:block">Employees</span>
                        </Link>
                        <div onClick={handleEmpHoliday} className="cursor-pointer hidden lg:block">
                            <div className={`${empHoliday ? "-rotate-90" : ""}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M8.33333 5.8335L11.6667 10.0002L8.33333 14.1668" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {empHoliday && <Link href="/empholiday" className={`cursor-pointer px-4 py-2 ${menu.empholiday ? "text-white bg-[#82C8E5]" : "bg-white text-[#4A4C56]"} rounded-lg hidden lg:block`} onClick={() => handleMenu("empholiday")}>
                        Employee Holiday
                    </Link>}
                </div>

                <Link href="/empholiday" className={`flex ${menu.empholiday ? "text-white bg-[#82C8E5]" : "bg-white text-[#4A4C56]"} items-center lg:gap-[10px] px-[12px] py-2 rounded-lg cursor-pointer w-fit lg:w-full lg:hidden`} onClick={() => handleMenu("empholiday")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <ellipse cx="8.33333" cy="14.5832" rx="5.83333" ry="2.91667" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <circle cx="8.33333" cy="5.83333" r="3.33333" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M12.7152 3.4248C14.4098 3.53563 15.7504 4.94441 15.7504 6.66699C15.7503 8.46175 14.2951 9.91678 12.5004 9.91699C12.1327 9.91699 11.7792 9.85474 11.4496 9.74219C11.9134 9.37188 12.3107 8.92176 12.6185 8.41113C13.5297 8.35012 14.2503 7.59357 14.2504 6.66699C14.2504 5.98092 13.8545 5.38842 13.2797 5.10156C13.1916 4.50127 12.9968 3.93588 12.7152 3.4248Z" fill="currentColor" />
                        <path d="M12.848 10.9248C14.1698 10.9605 15.3896 11.1954 16.3246 11.585C16.831 11.796 17.2905 12.0667 17.6342 12.4053C17.9803 12.7464 18.2503 13.2015 18.2504 13.75C18.2503 14.2987 17.9804 14.7545 17.6342 15.0957C17.2905 15.4343 16.8311 15.7049 16.3246 15.916C16.0195 16.0431 15.683 16.1511 15.3236 16.2441C15.6516 15.7291 15.8333 15.1699 15.8334 14.584C15.8334 14.5538 15.8304 14.5232 15.8295 14.4932C16.1827 14.3376 16.4308 14.1758 16.5814 14.0273C16.7406 13.8705 16.7503 13.7766 16.7504 13.75C16.7503 13.7232 16.74 13.63 16.5814 13.4736C16.4192 13.3139 16.1454 13.1356 15.7474 12.9697C15.5909 12.9045 15.4194 12.846 15.2367 12.79C14.719 12.0468 13.8892 11.4053 12.848 10.9248Z" fill="currentColor" />
                    </svg>
                </Link>
                <Link href="/project" className={`flex ${menu.project ? "text-white bg-[#82C8E5]" : "bg-white text-[#4A4C56]"} items-center lg:gap-[10px] px-[12px] py-2 rounded-lg cursor-pointer w-fit lg:w-full`} onClick={() => handleMenu("project")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M18 6.38028V14.6197C18 17.1549 16.21 18 14 18H6C3.79 18 2 17.1549 2 14.6197V6.38028C2 3.6338 3.79 3 6 3C6 3.52394 6.24997 3.99718 6.65997 4.34366C7.06997 4.69014 7.63 4.90141 8.25 4.90141H11.75C12.99 4.90141 14 4.04789 14 3C16.21 3 18 3.6338 18 6.38028Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 3C14 4.10222 12.99 5 11.75 5H8.25C7.63 5 7.06997 4.77777 6.65997 4.41333C6.24997 4.04889 6 3.55111 6 3C6 1.89778 7.01 1 8.25 1H11.75C12.37 1 12.93 1.22223 13.34 1.58667C13.75 1.95111 14 2.44889 14 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 10H9.33333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 13.334H12.6667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[16px] text-nowrap hidden lg:block">Project</span>
                </Link>
                <Link href="/attendance" className={`flex ${menu.attendance ? "text-white bg-[#82C8E5]" : "bg-white text-[#4A4C56]"} items-center lg:gap-[10px] px-[12px] py-2 rounded-lg cursor-pointer w-fit lg:w-full`} onClick={() => handleMenu("attendance")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M2.5 6.91651C2.5 4.70737 4.29086 2.9165 6.5 2.9165H13.5C15.7091 2.9165 17.5 4.70737 17.5 6.9165V14.3332C17.5 16.5423 15.7091 18.3332 13.5 18.3332H6.5C4.29086 18.3332 2.5 16.5423 2.5 14.3332V6.91651Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M2.5 7.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M6.66667 1.6665L6.66667 4.1665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.3333 1.6665V4.1665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="10" cy="12.4998" r="0.833333" fill="currentColor" />
                        <ellipse cx="13.3333" cy="12.4998" rx="0.833333" ry="0.833333" fill="currentColor" />
                        <ellipse cx="6.66667" cy="12.4998" rx="0.833333" ry="0.833333" fill="currentColor" />
                    </svg>
                    <span className="text-[16px] text-nowrap hidden lg:block">Attendance</span>
                </Link>
                <Link href="/academiccalendar" className={`flex ${menu.academiccalendar ? "text-white bg-[#82C8E5]" : "bg-white text-[#4A4C56]"} items-center lg:gap-[10px] px-[12px] py-2 rounded-lg cursor-pointer w-fit lg:w-full`} onClick={() => handleMenu("academiccalendar")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M2.5 6.91651C2.5 4.70737 4.29086 2.9165 6.5 2.9165H13.5C15.7091 2.9165 17.5 4.70737 17.5 6.9165V14.3332C17.5 16.5423 15.7091 18.3332 13.5 18.3332H6.5C4.29086 18.3332 2.5 16.5423 2.5 14.3332V6.91651Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M2.5 7.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M6.66667 1.6665L6.66667 4.1665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.3333 1.6665V4.1665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="10" cy="12.4998" r="0.833333" fill="currentColor" />
                        <ellipse cx="13.3333" cy="12.4998" rx="0.833333" ry="0.833333" fill="currentColor" />
                        <ellipse cx="6.66667" cy="12.4998" rx="0.833333" ry="0.833333" fill="currentColor" />
                    </svg>
                    <span className="text-[16px] text-nowrap hidden lg:block">Academic Calendar</span>
                </Link>
                <Link href="/employeeloan" className={`flex ${menu.employeeloan ? "text-white bg-[#82C8E5]" : "bg-white text-[#4A4C56]"} items-center lg:gap-[10px] px-[12px] py-2 rounded-lg cursor-pointer w-fit lg:w-full`} onClick={() => handleMenu("employeeloan")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M16.2837 8.65809C15.6382 7.69407 14.9331 6.95676 14.2505 6.50836C14.4108 6.26513 14.4961 5.98017 14.4959 5.68887C14.4959 5.07774 14.1274 4.55137 13.6011 4.31934L14.1559 2.87231C14.2427 2.64586 14.5068 1.95665 14.1121 1.44192C13.7152 0.924224 13.0033 0.99813 12.4834 1.05211C12.3612 1.06481 12.2457 1.0768 12.1646 1.07794C11.7729 1.0829 11.5475 0.934341 11.2622 0.745865C10.9694 0.55231 10.6066 0.312505 10.0898 0.312505C10.0824 0.312505 10.075 0.312584 10.0676 0.312662C9.53914 0.305318 9.16914 0.549654 8.87187 0.745982C8.58656 0.934458 8.36023 1.08368 7.96969 1.07797C7.88844 1.07684 7.77297 1.06485 7.6507 1.05215C7.13078 0.998169 6.41894 0.924263 6.02199 1.44196C5.6273 1.95665 5.89144 2.64586 5.97828 2.87239L6.53301 4.31938C6.00676 4.55141 5.63828 5.07778 5.63828 5.68887C5.63805 5.95553 5.70955 6.21735 5.84527 6.44688C5.13309 6.88766 4.39184 7.64856 3.71601 8.65809C2.59047 10.3393 1.94492 12.2695 1.94492 13.9538C1.94492 15.6243 2.57754 17.0237 3.77441 18.0007C5.14566 19.12 7.24027 19.6876 10.0001 19.6876C12.7599 19.6876 14.8544 19.12 16.2257 18.0008C17.4225 17.0238 18.0552 15.6245 18.0552 13.954C18.0552 12.2696 17.4095 10.3394 16.2838 8.65813L16.2837 8.65809ZM7.52965 2.21774C7.67875 2.23321 7.81961 2.24786 7.95359 2.24973C8.70594 2.26047 9.17519 1.95008 9.51773 1.72383C9.76101 1.56317 9.88738 1.48442 10.0459 1.48442C10.0492 1.48442 10.0525 1.48442 10.0558 1.4845L10.0676 1.48473L10.0795 1.4845C10.2421 1.48176 10.3684 1.55977 10.6161 1.72352C10.9587 1.94989 11.4269 2.25958 12.1808 2.24973C12.3145 2.24786 12.4553 2.23325 12.6045 2.21774C12.7498 2.20266 12.9926 2.17747 13.1412 2.18743C13.1305 2.2454 13.1081 2.33169 13.0617 2.4529L12.3947 4.19274H7.73945L7.0725 2.45293C7.02605 2.33169 7.00359 2.2454 6.99293 2.18743C7.14176 2.17739 7.38441 2.20266 7.52965 2.21774ZM7.13437 6.01313C6.95863 6.01313 6.81012 5.86465 6.81012 5.68887C6.81012 5.51309 6.95863 5.36461 7.13437 5.36461H12.9997C13.1755 5.36461 13.324 5.51309 13.324 5.68887C13.324 5.86465 13.1755 6.01313 12.9997 6.01313H7.13437ZM15.4846 17.0929C14.328 18.037 12.4827 18.5156 10.0001 18.5156C7.51742 18.5156 5.67203 18.0369 4.51547 17.0928C3.58738 16.3352 3.1168 15.2791 3.1168 13.9537C3.1168 12.5172 3.70484 10.7812 4.6898 9.31001C5.62379 7.91493 6.63605 7.18501 7.15324 7.18501H12.8458C13.3633 7.18501 14.3759 7.91497 15.31 9.31012C16.2952 10.7814 16.8832 12.5173 16.8832 13.9539C16.8832 15.2792 16.4127 16.3354 15.4846 17.0929H15.4846ZM12.1759 10.8694L8.76988 15.5223C8.71548 15.5967 8.64425 15.6573 8.56201 15.699C8.47977 15.7407 8.38884 15.7623 8.29664 15.7622C8.17652 15.7622 8.05531 15.7254 7.95098 15.649C7.68984 15.4579 7.63312 15.0913 7.8243 14.8301L11.2303 10.1772C11.4215 9.9161 11.7882 9.85942 12.0492 10.0506C12.3103 10.2417 12.3671 10.6083 12.1759 10.8695V10.8694ZM11.9578 12.5284C11.1951 12.5284 10.5746 13.1494 10.5746 13.9127V14.3789C10.5746 15.1416 11.1951 15.7621 11.9578 15.7621C12.7204 15.7621 13.3421 15.1416 13.3421 14.3789V13.9127C13.3421 13.1494 12.7211 12.5284 11.9578 12.5284ZM12.1702 14.3789C12.1702 14.4934 12.0729 14.5902 11.9578 14.5902C11.8432 14.5902 11.7465 14.4934 11.7465 14.3789V13.9127C11.7465 13.7976 11.8433 13.7003 11.9578 13.7003C12.0729 13.7003 12.1702 13.7976 12.1702 13.9127V14.3789ZM9.42555 11.7878V11.3216C9.42555 10.5583 8.80457 9.93735 8.04125 9.93735C7.27793 9.93735 6.65695 10.5583 6.65695 11.3216V11.7878C6.65695 12.5511 7.27793 13.1721 8.04125 13.1721C8.80457 13.1721 9.42555 12.5511 9.42555 11.7878ZM7.82883 11.7878V11.3216C7.82883 11.2065 7.92609 11.1092 8.04125 11.1092C8.15641 11.1092 8.25367 11.2065 8.25367 11.3216V11.7878C8.25367 11.903 8.15641 12.0002 8.04125 12.0002C7.92609 12.0002 7.82883 11.903 7.82883 11.7878Z" fill="currentColor" />
                    </svg>
                    <span className="text-[16px] text-nowrap hidden lg:block">Employee Loan</span>
                </Link>
                <Link href="/notification" className={`flex ${menu.notification ? "text-white bg-[#82C8E5]" : "bg-white text-[#4A4C56]"} items-center lg:gap-[10px] px-[12px] py-2 rounded-lg cursor-pointer w-fit lg:w-full`} onClick={() => handleMenu("notification")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 3.125C9.72373 3.125 9.45878 3.23475 9.26343 3.4301C9.07067 3.62286 8.96125 3.8834 8.95839 4.1557C8.96047 4.27817 8.9263 4.39845 8.86141 4.50112C8.81445 4.57542 8.7514 4.6405 8.67436 4.69052C8.64717 4.70825 8.61852 4.72393 8.58862 4.73732C7.73928 5.14156 7.01518 5.76831 6.49332 6.5511C5.97167 7.33359 5.67165 8.24264 5.625 9.18174V11.6667C5.625 11.6918 5.62349 11.7169 5.62047 11.7418C5.546 12.357 5.32811 12.9462 4.98435 13.4618C4.96644 13.4887 4.94822 13.5153 4.92968 13.5417H15.0703C15.0518 13.5153 15.0336 13.4887 15.0156 13.4618C14.6719 12.9462 14.454 12.357 14.3795 11.7418C14.3765 11.7169 14.375 11.6918 14.375 11.6667V9.18174C14.3283 8.24264 14.0283 7.33359 13.5067 6.5511C12.9824 5.76467 12.254 5.13572 11.3995 4.73168C11.181 4.62837 11.0417 4.40835 11.0417 4.16667C11.0417 3.8904 10.9319 3.62545 10.7366 3.4301C10.5412 3.23475 10.2763 3.125 10 3.125ZM7.74375 3.7653C7.82535 3.30659 8.04559 2.88017 8.37955 2.54621C8.80932 2.11644 9.39221 1.875 10 1.875C10.6078 1.875 11.1907 2.11644 11.6205 2.54621C11.9544 2.88017 12.1747 3.30659 12.2563 3.7653C13.1768 4.26544 13.9636 4.98302 14.5467 5.85773C15.1969 6.83291 15.5694 7.96663 15.6243 9.13736C15.6248 9.14712 15.625 9.15689 15.625 9.16667V11.627C15.6799 12.0351 15.8271 12.4255 16.0557 12.7684C16.2909 13.1212 16.6057 13.4139 16.9746 13.6228C17.2216 13.7627 17.3434 14.0514 17.271 14.3259C17.1987 14.6004 16.9505 14.7917 16.6667 14.7917H3.33333C3.04949 14.7917 2.80128 14.6004 2.72896 14.3259C2.65664 14.0514 2.77837 13.7627 3.02536 13.6228C3.39433 13.4139 3.70909 13.1212 3.94429 12.7684C4.17288 12.4255 4.32013 12.0351 4.375 11.627V9.16667C4.375 9.15689 4.37523 9.14712 4.37569 9.13736C4.43064 7.96663 4.80314 6.83291 5.45326 5.85773C6.0364 4.98302 6.82318 4.26544 7.74375 3.7653Z" fill="currentColor" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.5 13.5417C7.84518 13.5417 8.125 13.8215 8.125 14.1667V15C8.125 15.4973 8.32254 15.9742 8.67418 16.3258C9.02581 16.6775 9.50272 16.875 10 16.875C10.4973 16.875 10.9742 16.6775 11.3258 16.3258C11.6775 15.9742 11.875 15.4973 11.875 15V14.1667C11.875 13.8215 12.1548 13.5417 12.5 13.5417C12.8452 13.5417 13.125 13.8215 13.125 14.1667V15C13.125 15.8288 12.7958 16.6237 12.2097 17.2097C11.6237 17.7958 10.8288 18.125 10 18.125C9.1712 18.125 8.37634 17.7958 7.79029 17.2097C7.20424 16.6237 6.875 15.8288 6.875 15V14.1667C6.875 13.8215 7.15482 13.5417 7.5 13.5417Z" fill="currentColor" />
                    </svg>
                    <span className="text-[16px] text-nowrap hidden lg:block">Notification</span>
                </Link>
                <Link href="/profile" className={`flex ${menu.profile ? "text-white bg-[#82C8E5]" : "bg-white text-[#4A4C56]"} items-center lg:gap-[10px] px-[12px] py-2 rounded-lg cursor-pointer w-fit lg:w-full`} onClick={() => handleMenu("profile")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <ellipse cx="10" cy="14.5832" rx="5.83333" ry="2.91667" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <ellipse cx="10" cy="5.83333" rx="3.33333" ry="3.33333" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[16px] text-nowrap hidden lg:block">Profile</span>
                </Link>
            </div>

            <Link href="/login" className={`flex   items-center lg:gap-[10px] py-2 rounded-lg cursor-pointer w-fit lg:w-full`}  >
                <div className="bg-[#FEECEE] p-3 rounded-full w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 11.75C9.95093 12.9846 8.92207 14.0329 7.54373 13.9992C7.22307 13.9913 6.82673 13.8796 6.03408 13.656C4.12641 13.1179 2.47037 12.2135 2.07304 10.1877C2 9.81533 2 9.39627 2 8.5582V7.4418C2 6.60374 2 6.1847 2.07304 5.81231C2.47037 3.78643 4.12641 2.8821 6.03408 2.34402C6.82673 2.12042 7.22307 2.00863 7.54373 2.00079C8.92207 1.96707 9.95093 3.01538 10 4.25" stroke="#EB3D4D" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M13.9998 8.00016H6.6665M13.9998 8.00016C13.9998 7.53336 12.6703 6.66118 12.3332 6.3335M13.9998 8.00016C13.9998 8.46696 12.6703 9.33916 12.3332 9.66683" stroke="#EB3D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <span className="text-[16px] text-nowrap hidden lg:block">Logout</span>
            </Link>

             
        </div>
    )
}