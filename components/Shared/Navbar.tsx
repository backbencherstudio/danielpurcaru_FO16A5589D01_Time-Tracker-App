'use client'

import NotificationBanner from "../notificationBanner/NotificationBanner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Profilepic from '@/public/images/Employee/ronald.png';
import Profilepic2 from '@/public/images/Employee/sanvannah.png';
import Profilepic3 from '@/public/images/profileIcon.png';
import { UserService } from "@/service/user/user.service";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import defaultAvatar from "@/public/avatar.png"
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";


interface loanData {
    created_at: string,
    id: string,
    loan_amount: string,
    loan_status: string,
    notes: string,
    user: userType,
    user_id: string,
}

interface userType {
    avatar: string,
    avatarUrl: string,
    id: string,
    name: string
}

export default function Navbar() {
    const [empLoanData, setEmpLoanData] = useState<loanData[]>()
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [avatar, setAvatar] = useState();
    const [adminInfo, setAdminInfo] = useState({
        name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        country: "",
        state: "",
        city: "",
        address: "",
        zip_code: "",
        avatar_url: ""
    })


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
        const fetchEmpData = async () => {
            try {
                const res = await UserService?.getEmpLoanData();
                if (res?.data?.success) {
                    console.log("Response load :", res.data.data);
                    setEmpLoanData(res.data.data)
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
                // setLoading(false);
            }
        }

        if (token) {
            fetchEmpData()
        }
    }, [])


    useEffect(() => {
        const token = getCookieToken();
        const getProfileInfo = async () => {
            try {
                const res = await UserService?.getProfile();
                if (res?.data?.success) {
                    setAdminInfo(res.data.data)
                    setAvatar(res.data.data.avatar_url)
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
            }
        }

        if (token) {
            getProfileInfo();
        }
    }, [])


    return (
        <div className="w-full flex justify-between sm:px-5 px-2 py-3 gap-5 bg-white fixed z-[2] max-w-[1440px]">

            <Link href="/" className="text-nowrap text-[#82C8E5] text-xl sm:text-[24px] font-semibold py-[15px]">
                C.D.C.G
            </Link>
            <div className="flex md:gap-[32px] gap-3 items-center">
                <LanguageSwitcher />
                {/* notification  */}
                <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                    <PopoverTrigger asChild>
                        <div className="md:px-[14px] px-1 py-1 md:py-[12px] border border-[#E9E9EA] rounded-lg cursor-pointer relative" onClick={() => setIsNotificationOpen(prev => !prev)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10.0166 2.4248C7.25828 2.4248 5.01662 4.66647 5.01662 7.4248V9.83314C5.01662 10.3415 4.79995 11.1165 4.54162 11.5498L3.58328 13.1415C2.99162 14.1248 3.39995 15.2165 4.48328 15.5831C8.07495 16.7831 11.95 16.7831 15.5416 15.5831C16.55 15.2498 16.9916 14.0581 16.4416 13.1415L15.4833 11.5498C15.2333 11.1165 15.0166 10.3415 15.0166 9.83314V7.4248C15.0166 4.6748 12.7666 2.4248 10.0166 2.4248Z" stroke="#161618" strokeWidth="1.4" strokeMiterlimit="10" strokeLinecap="round" />
                                <path d="M11.5583 2.6667C11.3 2.5917 11.0333 2.53337 10.7583 2.50003C9.95831 2.40003 9.19164 2.45837 8.47498 2.6667C8.71664 2.05003 9.31664 1.6167 10.0166 1.6167C10.7166 1.6167 11.3166 2.05003 11.5583 2.6667Z" stroke="#161618" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12.5167 15.8833C12.5167 17.2583 11.3917 18.3833 10.0167 18.3833C9.33339 18.3833 8.70006 18.1 8.25006 17.65C7.80006 17.2 7.51672 16.5666 7.51672 15.8833" stroke="#161618" strokeWidth="1.5" strokeMiterlimit="10" />

                            </svg>
                            <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-[2px] -right-[2px]"></div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4 rounded-xl shadow-[5px_5px_50px_0px_rgba(26,32,44,0.06)]">

                        <NotificationBanner notifications={empLoanData} closeNotification={() => setIsNotificationOpen(prev => !prev)} />

                    </PopoverContent>
                </Popover>

                <div className="flex md:gap-[12px]">
                    <div>
                        <Image src={avatar || defaultAvatar} alt="Pic" className="rounded-full w-[30px] h-[30px] object-cover" width={500} height={500} />
                    </div>
                    <div className="hidden md:block">
                        <h3 className="text-[14px] text-[#1D1F2C] font-semibold">{adminInfo?.name || "No-name"}</h3>
                        <h2 className="text-[#A5A5AB] text-[10px] font-medium">{adminInfo?.email || "example@abc.com"}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
