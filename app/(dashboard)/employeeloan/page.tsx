'use client'
import EditEmployeeDialog from "@/components/Shared/EditEmployeeDialog";
import EmpLoanTable from "@/components/Shared/EmpLoanTable";
import down from '@/public/icons/file-download.svg';
import loanImage from "@/public/images/profileIcon.png"; // Correct image import
import { UserService } from "@/service/user/user.service";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

export default function Page() {
    const [empLoadData,setEmpLoadData] = useState([])
    const totalPages = Math.ceil(empLoadData.length / 8);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageStart, setPageStart] = useState(0);
    const [pageLeft, setPageLeft] = useState([]);
    const [pageRight, setPageRight] = useState([]);
    const [isLargeScreen, setIsLargeScreen] = useState(2);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
            setPageStart((pageNumber - 1) * itemsPerPage);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 600 ? 3 : 2);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

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


    useEffect(()=>{
        const fetchEmpData = async () => {
            try {
                const res = await UserService?.getEmpLoanData();
                if (res?.data?.success) {
                    console.log("Response load :", res.data.data);
                    setEmpLoadData(res.data.data)
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
        fetchEmpData()
    },[])

    return (
        <div className="bg-white rounded-lg">
            <EmpLoanTable empData={empLoadData} start={pageStart} end={pageStart + itemsPerPage} />
            <div className="bg-white rounded-lg">
                {empLoadData.length > 0 && (
                    <div className="flex justify-start items-center mt-10 mb-4 max-w-[1200px] mx-auto font-bold rounded-lg">
                        <div className="flex items-center rounded-lg sm:px-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`flex items-center gap-1 pr-2 sm:px-2 ${currentPage === 1
                                    ? "text-[#1D1F2C]"
                                    : "text-[#1D1F2C] hover:bg-gray-100"
                                    } text-xs sm:text-base border border-[#F6F8FA] py-2 rounded-lg`}
                            >
                                <MdKeyboardArrowLeft className="text-xl" />
                            </button>

                            {pageLeft.map((number) => (
                                <div key={number} className="m-auto">
                                    <button
                                        onClick={() => handlePageChange(number)}
                                        className={` ${currentPage === number
                                            ? "bg-[#F8FAFB] text-[#1D1F2C]"
                                            : "text-[#1D1F2C] hover:bg-gray-100"
                                            } text-xs sm:text-base w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] m-1 rounded-xl`}
                                    >
                                        {number}
                                    </button>
                                </div>
                            ))}

                            {pageRight.length !== 0 && (
                                <div className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] m-1 flex items-center justify-center">
                                    <div className="text-xl">...</div>
                                </div>
                            )}

                            {pageRight.map((number) => (
                                <div key={number} className="m-auto">
                                    <button
                                        onClick={() => handlePageChange(number)}
                                        className={`w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] m-1 ${currentPage === number
                                            ? "bg-[#F8FAFB] text-[#1D1F2C]"
                                            : "text-[#1D1F2C] hover:bg-gray-100"
                                            } text-xs sm:text-base rounded-xl`}
                                    >
                                        {number}
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`flex text-xs sm:text-base items-center pl-2 sm:px-2 ${currentPage === totalPages
                                    ? "text-gray-400"
                                    : "text-gray-700 hover:text-blue-600"
                                    } border border-[#F6F8FA] py-2 rounded-lg`}
                            >
                                <MdKeyboardArrowRight className="text-xl" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
