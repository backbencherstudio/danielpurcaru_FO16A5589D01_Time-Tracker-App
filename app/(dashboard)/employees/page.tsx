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
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function page() {
    const empData = [
        [1, ronald, "Ronald Richards", "Baker", 10, 160],
        [2, sanvannah, "Savannah Nguyen", "Handyman", 15, 140],
        [3, guy, "Guy Hawkins", "Electrician", 14, 168],
        [4, Jerome, "Jerome Bell", "Handyman", 18, 152],
        [5, theresa, "Theresa Webb", "Electrician", 10, 142],
        [6, ronald, "Ronald Richards", "Baker", 10, 160],
        [7, sanvannah, "Savannah Nguyen", "Handyman", 15, 140],
        [8, guy, "Guy Hawkins", "Electrician", 14, 168],
        [9, Jerome, "Jerome Bell", "Handyman", 18, 152],
        [10, theresa, "Theresa Webb", "Electrician", 10, 142],
        [11, ronald, "Ronald Richards", "Baker", 10, 160],
        [12, sanvannah, "Savannah Nguyen", "Handyman", 15, 140],
        [13, guy, "Guy Hawkins", "Electrician", 14, 168],
        [14, Jerome, "Jerome Bell", "Handyman", 18, 152],
        [15, theresa, "Theresa Webb", "Electrician", 10, 142],
        [16, ronald, "Ronald Richards", "Baker", 10, 160],
        [17, sanvannah, "Savannah Nguyen", "Handyman", 15, 140],
        [18, guy, "Guy Hawkins", "Electrician", 14, 168],
        [19, Jerome, "Jerome Bell", "Handyman", 18, 152],
        [20, theresa, "Theresa Webb", "Electrician", 10, 142],
    ];
    const totalPages = Math.ceil(empData.length / 8);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageStart,setPageStart] = useState(0);
    const [pageLeft, setPageLeft] = useState([]);
    const [pageRight, setPageRight] = useState([]);
    const [isLargeScreen, setIsLargeScreen] = useState(2);
const [isModalOpen, setIsModalOpen] = useState(false);
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

    return (
        <div className="bg-white rounded-lg p-5">
             <div className="w-full flex justify-between items-start gap-5 mb-5">
                <div className="flex flex-col justify-start gap-2">
                    <span className="text-neutral-800 text-2xl font-semibold">Employees</span>
                    <span className="text-zinc-500 text-base">Manage your Employee</span>
                </div>
                {/* Buttons for Download and Add New */}
                <div className="flex gap-5">
                    <button className="w-fit sm:w-44 p-4 rounded-xl flex justify-center items-center outline-1 hover:bg-gray-100">
                        <Image className="w-3 h-4" src={down} alt="Download" />
                        <span className="text-sky-300">Download</span>
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="w-fit   p-4 bg-sky-300 hover:bg-sky-300/70 rounded-xl flex justify-center items-center gap-1">
                        <Plus className="text-white" />
                        <span className="text-white text-nowrap">Add New Employee</span>
                    </button>
                </div>
            </div>
            <EmployeeTable empData={empData} start={pageStart} end={8}/>
            <div className="bg-white rounded-lg">
                {empData.length > 0 && (
                    <div className="flex justify-start items-center mt-10 mb-4 max-w-[1200px] mx-auto font-bold rounded-lg">
                        <div className="flex items-center rounded-lg sm:px-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`flex items-center gap-1 pr-2 sm:px-2 ${currentPage === 1
                                    ? "text-[#1D1F2C]"
                                    : "text-[#1D1F2C]"
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
                                            }  text-xs sm:text-base w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] m-1 rounded-xl`}
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
                                <div key={number} className="">
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

            {isModalOpen  && <AddEmployeeDialog isOpen={isModalOpen} handleDialogToggle={setIsModalOpen}/>}
        </div>
    );
}
