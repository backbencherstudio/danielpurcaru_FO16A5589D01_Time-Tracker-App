'use client'
import EmpLoanTable from "@/components/Shared/EmpLoanTable";
import EmployeeTable from "@/components/Shared/EmployeeTable";
import { UserService } from "@/service/user/user.service";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";

interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface ApiResponse {
    data: any[];
    meta: PaginationMeta;
    success: boolean;
}

export default function Page() {
    const [empLoadData, setEmpLoadData] = useState<any[]>([]);
    const [loading,setLoading] = useState(false);
    const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1
    });
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getVisiblePages = () => {
        const totalVisiblePages = isLargeScreen ? 10 : 5;
        const { page, totalPages } = paginationMeta;

        let startPage = Math.max(page - Math.floor(totalVisiblePages / 2), 1);
        let endPage = Math.min(startPage + totalVisiblePages - 1, totalPages);

        if (endPage - startPage + 1 < totalVisiblePages) {
            startPage = Math.max(endPage - totalVisiblePages + 1, 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const visiblePages = getVisiblePages();

    const handlePageChange = async (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= paginationMeta.totalPages && pageNumber !== paginationMeta.page) {
            await fetchEmpData(pageNumber, paginationMeta.limit);
        }
    };

    const handleItemsPerPageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = Number(e.target.value);
        await fetchEmpData(1, newLimit); // Always reset to page 1 when changing limit
    };

    const fetchEmpData = async (page: number = 1, limit: number = 10) => {
        setIsLoading(true);
        try {
            const res = await UserService.getEmpLoanData(page, limit);
            if (res?.data?.success) {
                setEmpLoadData(res.data.data);
                setPaginationMeta(res.data.meta);
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
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetchEmpData();
    }, []);

    const handleLoading=(st:boolean)=>{
        setIsLoading(st);
    }

    // console.log("Employee loan data : ",empLoadData)

    if (isLoading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#82C8E5]"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg">
            <EmpLoanTable
                empData={empLoadData}
                isLoading={isLoading}
                handleLoading={handleLoading}
                fetchEmpData={fetchEmpData}
            />

            {paginationMeta.total > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-10 mb-4 max-w-[1200px] mx-auto font-bold rounded-lg gap-4">
                    <div className="flex items-center rounded-lg sm:px-4">
                        <button
                            onClick={() => handlePageChange(paginationMeta.page - 1)}
                            disabled={paginationMeta.page === 1 || isLoading}
                            className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${paginationMeta.page === 1 || isLoading
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-[#1D1F2C] hover:bg-gray-100"
                                } border border-[#F6F8FA] rounded-lg`}
                        >
                            <MdKeyboardArrowLeft className="text-xl" />
                        </button>

                        {visiblePages.map(number => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                disabled={isLoading}
                                className={`mx-1 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center ${paginationMeta.page === number
                                        ? "bg-[#F6F8FA]"
                                        : "text-[#1D1F2C] hover:bg-gray-100"
                                    } rounded-lg`}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(paginationMeta.page + 1)}
                            disabled={paginationMeta.page === paginationMeta.totalPages || isLoading}
                            className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${paginationMeta.page === paginationMeta.totalPages || isLoading
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-[#1D1F2C] hover:bg-gray-100"
                                } border border-[#F6F8FA] rounded-lg`}
                        >
                            <MdKeyboardArrowRight className="text-xl" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-sm sm:text-base text-[#777980] font-normal">
                        <span>
                            Showing {((paginationMeta.page - 1) * paginationMeta.limit) + 1} to{' '}
                            {Math.min(paginationMeta.page * paginationMeta.limit, paginationMeta.total)} of {paginationMeta.total} entries
                        </span>
                        <select
                            value={paginationMeta.limit}
                            onChange={handleItemsPerPageChange}
                            disabled={isLoading}
                            className="border rounded-md px-2 py-1 text-[#1D1F2C]"
                        >
                            {[5, 10, 20, 50].map(number => (
                                <option key={number} value={number}>{number}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}