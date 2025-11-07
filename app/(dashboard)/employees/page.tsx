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
    const [currentPage, setCurrentPage] = useState(1);
    const [isLargeScreen, setIsLargeScreen] = useState(2);
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [empDataSaved, setEmpDataSaved] = useState(false);
    const [totalPages,setTotalPages] = useState(1);
    const [itemsPerPage,setItemsPerPage] = useState(10);
    const [totalItems,setTotalItems] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());


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
            const res = await UserService?.getAllEmpData({page:currentPage,limit:itemsPerPage,month:selectedMonth});
            if (res?.data?.success) {
                setEmpData(res.data.data);
                setTotalPages(res?.data?.meta?.totalPages);
                setTotalItems(res?.data?.meta?.total);
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
    }, [currentPage,itemsPerPage,selectedMonth])


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
                <EmployeeTable 
                empData={empData} 
                empDataSaved={empDataSaved} 
                showPage={true} 
                onUpdate={fetchEmpData} 
                pagination={{totalPages,itemsPerPage,currentPage,totalItems}} 
                paginationUpdate={({limit,page}:{limit:number,page:number})=>{
                    if(page)
                        setCurrentPage(page);
                    if(limit)
                        setItemsPerPage(limit);
                }}
                changeMonth={(month)=>setSelectedMonth(Number(month))}
                selectedMonth={selectedMonth}
                />
                {isModalOpen && <AddEmployeeDialog isOpen={isModalOpen} handleDialogToggle={()=>setIsModalOpen(prev => !prev)} />}
            </EmpDataContext.Provider>
        </div>
    );
}
