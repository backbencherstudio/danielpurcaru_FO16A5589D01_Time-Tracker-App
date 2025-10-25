'use client'
import AddEmployeeDialog from "@/components/Shared/AddEmployeeDialog";
import EmployeeTable from "@/components/Shared/EmployeeTable";
import down from '@/public/icons/file-download.svg';
import guy from "@/public/images/Employee/guy.png";
import Jerome from "@/public/images/Employee/Jerome.png";
import ronald from "@/public/images/Employee/ronald.png";
import sanvannah from "@/public/images/Employee/sanvannah.png";
import theresa from "@/public/images/Employee/theresa.png";
import { Plus } from "lucide-react";
import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { UserService } from "@/service/user/user.service";
import toast, { Toaster } from "react-hot-toast";
import { EmpDataContext } from "@/context/EmpDataContext";



export default function page() {
    const [empData, setEmpData] = useState([])
    const totalPages = Math.ceil(empData.length / 8);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageStart, setPageStart] = useState(0);
    const [pageLeft, setPageLeft] = useState([]);
    const [pageRight, setPageRight] = useState([]);
    const [isLargeScreen, setIsLargeScreen] = useState(2);
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [empDataSaved, setEmpDataSaved] = useState(false);
    const handlePageChange = async (pageNumber) => {
        if (pageNumber != currentPage) {
            // setPageLoading(true);
            setCurrentPage(pageNumber);
            setPageStart(Math.abs(pageNumber - 1) * 8)
            // Add a small delay to create a smooth transition effect
            await new Promise((resolve) => setTimeout(resolve, 300));
            // setPageLoading(false);
        }
    };


    const handleLoading = (state: boolean) => {
        setLoading(state);
    }


    // token extract helper
    const getCookieToken = () => {
        if (typeof document === "undefined") return null;

        const cookieString = document.cookie
            .split("; ")
            .find((cookie) => cookie.startsWith("empdashtoken="));
        return cookieString?.split("=")[1] || null;
    };

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 600 ? 3 : 2);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const fetchEmpData = async () => {
        setLoading(true);
        try {
            const res = await UserService?.getAllEmpData();
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
        const token = getCookieToken();
        if (token) {
            fetchEmpData()
        }
    }, [])

    const getPageNumbers = () => {
        const pageNumbers = [];
        const totalPagesToShow = isLargeScreen === 3 ? 6 : 4;

        let startPage = Math.max(currentPage - Math.floor(totalPagesToShow / 2), 1);
        let endPage = Math.min(startPage + totalPagesToShow - 1, totalPages);

        if (endPage - startPage + 1 < totalPagesToShow) {
            startPage = Math.max(endPage - totalPagesToShow + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        setPageLeft(pageNumbers.slice(0, Math.ceil(pageNumbers.length / 2)));
        setPageRight(pageNumbers.slice(Math.ceil(pageNumbers.length / 2)));
    };

    useEffect(() => {
        getPageNumbers();
    }, [currentPage, isLargeScreen]);


    const handleEmpDataSaved = () => {
        setEmpDataSaved(prev => !prev)
    }

    if (loading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#82C8E5]"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg p-5">
            <Toaster position="top-right" />
            <div className="w-full flex justify-between items-start gap-5 mb-5">
                <div className="flex flex-col justify-start gap-2">
                    <span className="text-neutral-800 text-2xl font-semibold">Employees</span>
                    <span className="text-zinc-500 text-base">Manage your Employee</span>
                </div>
                {/* Buttons for Download and Add New */}
                <div className="flex gap-5">
                    {/* <button className="w-fit sm:w-44 p-4 rounded-xl flex justify-center items-center outline-1 hover:bg-gray-100">
                        <Image className="w-3 h-4" src={down} alt="Download" />
                        <span className="text-sky-300">Download</span>
                    </button> */}
                    <button onClick={() => setIsModalOpen(true)} className="w-fit   p-4 bg-sky-300 hover:bg-sky-300/70 rounded-xl flex justify-center items-center gap-1">
                        <Plus className="text-white" />
                        <span className="text-white text-nowrap">Add New Employee</span>
                    </button>
                </div>
            </div>
            <EmpDataContext.Provider value={{ fetchEmpData, handleEmpDataSaved,handleLoading }}>
                <EmployeeTable empData={empData} empDataSaved={empDataSaved} showPage={true} onUpdate={fetchEmpData}/>
                {isModalOpen && <AddEmployeeDialog isOpen={isModalOpen} handleDialogToggle={()=>setIsModalOpen(prev => !prev)} />}
            </EmpDataContext.Provider>
        </div>
    );
}
