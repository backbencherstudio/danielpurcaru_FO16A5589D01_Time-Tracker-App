'use client'

import Image from "next/image";
import { useState, useMemo } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import EditEmployeeDialog from './EditEmployeeDialog'
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import avatar from '@/public/avatar.png'
import { editIcon } from "@/public/icons/Iconst";
import { Eye, Trash2 } from "lucide-react";
import DeletePopUp from "../reusable/DeletePopUp";
import { UserService } from "@/service/user/user.service";
import Link from "next/link";

interface Employee {
    id: string;
    first_name: string;
    last_name: string;
    name: string;
    employee_role: string;
    hourly_rate: string;
    recorded_hours: number;
    earnings: string,
    avatarUrl: string;
    username: string;
    email: string;
    phone: string;
}

interface EmployeeTableProps {
    empData: Employee[];
    empDataSaved: boolean;
    showPage: boolean;
    onUpdate: () => void;
    changeMonth: (month: number)=> void;
    pagination?: {
        currentPage: number;
        itemsPerPage: number;
        totalPages: number;
        totalItems: number;
    };
    selectedMonth: number;
    paginationUpdate?: ({ limit, page }: { limit?: number, page?: number }) => void;
}

export default function EmployeeTable({ empData, empDataSaved, showPage, onUpdate, pagination, paginationUpdate,changeMonth,selectedMonth }: EmployeeTableProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJobTitle, setSelectedJobTitle] = useState("All Job Titles");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEmpId, setSelectedEmpId] = useState("");
    const [sortOrder, setSortOrder] = useState('asc');
    const [employeeData, setEmployeeData] = useState(empData);
    const [loading, setLoading] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedEmp, setSelectedEmp] = useState<string>();


    const handleMonthChange = (month: number) => {
        paginationUpdate({ page: 1 });
        changeMonth(month)
    };

    useEffect(() => {
        setEmployeeData(empData);
    }, [empData, empDataSaved]);

    // Memoized filtered data
    const filteredEmpData = useMemo(() => {
        let result = employeeData;

        // Apply job title filter
        if (selectedJobTitle !== "All Job Titles") {
            result = result?.filter(emp => emp.employee_role === selectedJobTitle);
        }


        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(emp =>
                emp?.name?.toLowerCase().includes(query) ||
                emp?.employee_role?.toLowerCase().includes(query)
            );
        }

        return result;
    }, [employeeData, selectedJobTitle, searchQuery]);

    // Extract unique job titles
    const jobTitles = useMemo(() =>
        Array.from(new Set(employeeData.map(emp => emp?.employee_role))),
        [employeeData]
    );

    // Pagination calculations
    // let { currentEntries, totalPages } = useMemo(() => {
    //     const lastIndex = currentPage * itemsPerPage;
    //     const firstIndex = lastIndex - itemsPerPage;
    //     return {
    //         currentEntries: filteredEmpData.slice(firstIndex, lastIndex),
    //         totalPages: Math.ceil(filteredEmpData.length / itemsPerPage)
    //     };
    // }, [filteredEmpData, currentPage, itemsPerPage]);


    const handleSorting = (key: keyof Employee) => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);

        setEmployeeData([...employeeData].sort((a, b) => {
            // Add null checks
            const aValue = a[key] || '';
            const bValue = b[key] || '';

            if (newOrder === 'asc') {
                return String(aValue).localeCompare(String(bValue));
            } else {
                return String(bValue).localeCompare(String(aValue));
            }
        }));
    };

    const handleJobTitleFilter = (jobTitle: string) => {
        setSelectedJobTitle(jobTitle);
        paginationUpdate({ page: 1 });
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        paginationUpdate({ page: 1 });
    };

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= pagination?.totalPages) {
            paginationUpdate({ page: pageNumber });
        }
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newItemsPerPage = Number(e.target.value);
        paginationUpdate({ limit: newItemsPerPage });
        paginationUpdate({ page: 1 });
    };

    const getVisiblePageNumbers = () => {
        const maxVisiblePages = 5;
        let startPage = Math.max(1, pagination?.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(startPage + maxVisiblePages - 1, pagination?.totalPages);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedEmp(null);
    };

    const handleDeleteEmployee = async () => {
        if (!selectedEmp) return;

        try {
            setLoading(true);
            const res = await UserService.deleteEmployee(selectedEmp);
            if (res?.data?.success) {
                toast.success("Employee deleted successfully");
                paginationUpdate({ page: 1 });
                onUpdate();
            } else {
                toast.error(res?.response?.data?.message || "Failed to delete employee");
            }
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "An error occurred while deleting employee"
            );
        } finally {
            closeDeleteModal();
            setLoading(false);
        }
    };

    const visiblePages = getVisiblePageNumbers();
    return (
        <div className="space-y-6 bg-white">
            <Toaster position="top-right" />
            <DeletePopUp
                isDeleteModalOpen={isDeleteModalOpen}
                closeDeleteModal={closeDeleteModal}
                isDeleting={loading}
                handleDelete={handleDeleteEmployee}
                title={(employeeData.find(emp => emp.id === selectedEmp)?.name || 'Project')}
            />
            {/* Search and Filter Section */}
            <div className="flex gap-4 flex-wrap">
                {/* Search Bar */}
                <div className="flex-1 flex items-center gap-[10px] border border-[#E9EAEC] rounded-xl px-[20px] py-4 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.80547 2.93994C6.01378 2.93994 2.94 6.01372 2.94 9.80541C2.94 13.5971 6.01378 16.6709 9.80547 16.6709C13.5972 16.6709 16.6709 13.5971 16.6709 9.80541C16.6709 6.01372 13.5972 2.93994 9.80547 2.93994ZM1.69 9.80541C1.69 5.32336 5.32342 1.68994 9.80547 1.68994C14.2875 1.68994 17.9209 5.32336 17.9209 9.80541C17.9209 14.2875 14.2875 17.9209 9.80547 17.9209C5.32342 17.9209 1.69 14.2875 1.69 9.80541Z"
                            fill="#1D1F2C"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.5727 14.9628C14.8165 14.7184 15.2122 14.7179 15.4566 14.9617L18.3933 17.8907C18.6377 18.1345 18.6382 18.5302 18.3944 18.7746C18.1507 19.019 17.7549 19.0195 17.5106 18.7758L14.5739 15.8467C14.3295 15.6029 14.329 15.2072 14.5727 14.9628Z"
                            fill="#1D1F2C"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search employee"
                        className="w-full text-[14px] placeholder:text-[#A0AEC0] text-[#1D1F2C] outline-none"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                {/* Job Title Filter */}
                <div className="flex items-center gap-[10px] px-[20px] py-[16px] border rounded-xl border-[#E9EAEC] text-[#1D1F2C] text-[14px] font-medium cursor-pointer">
                    <select
                        className="rounded-lg py-[10px] px-4 outline-none"
                        value={selectedJobTitle}
                        onChange={(e) => handleJobTitleFilter(e.target.value)}
                    >
                        <option>All Job Titles</option>
                        {jobTitles.map((title, index) => (
                            <option key={index}>{title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        className="py-[25px] px-5 border border-[#E8ECF4] justify-center rounded-xl text-base text-[#1D1F2C] outline-none"
                        onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                        value={selectedMonth}
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i}>
                                {new Date(0, i).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead className="text-[#4A4C56] bg-[#F6F8FA] font-semibold text-[12px] w-full text-nowrap">
                        <tr>
                            <th className="py-4 px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>SL</span>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("id")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg> */}
                                </div>
                            </th>
                            <th className="py-4 px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Name</span>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("name")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg> */}
                                </div>
                            </th>
                            {/* <th className="py-4 px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>User Name</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("name")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                </div>
                            </th> */}
                            {/* <th className="py-4 px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Email</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("name")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                </div>
                            </th> */}
                            <th className="py-4 px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Role</span>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("employee_role")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg> */}
                                </div>
                            </th>
                            <th className="py-4 text-center px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Hourly Rate</span>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("hourly_rate")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg> */}
                                </div>
                            </th>
                            <th className="py-4 text-center px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Recorded Hours</span>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("recorded_hours")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg> */}
                                </div>
                            </th>
                            <th className="py-4 text-center px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Earnings</span>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("earnings")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg> */}
                                </div>
                            </th>
                            <th className="py-4 px-4">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-[#1D1F2C] text-[12px] font-medium ">
                        {filteredEmpData.map((emp, index) => (
                            <tr key={emp?.id} className="border-t-[0.2px] border-[#F6F8FA] ">
                                <td className="p-4">{index + 1}</td>
                                <td className="flex items-center gap-2 p-4">
                                    <div className="w-6 h-6">
                                        {emp?.avatarUrl && (
                                            <Image src={emp?.avatarUrl ? emp?.avatarUrl : avatar} alt={`${emp?.name}'s avatar`} width={24} height={24} className="w-[24px] h-[24px] rounded-full object-cover" />
                                        )}
                                    </div>
                                    <h3 className="text-nowrap">{emp?.name}</h3>
                                </td>
                                {/* <td className="p-4 text-nowrap">{emp?.username}</td> */}
                                {/* <td className="p-4 text-nowrap">{emp?.email}</td> */}
                                <td className="p-4 text-nowrap">{emp?.employee_role}</td>
                                <td className="text-center p-4"><span className="font-semibold">€ </span>{emp?.hourly_rate}</td>
                                <td className="text-center p-4">{emp?.recorded_hours}</td>
                                <td className="text-center p-4"><span className="font-semibold">€ </span>{(emp?.recorded_hours * parseFloat(emp?.hourly_rate)).toFixed(2)}</td>
                                <td className="flex items-center justify-center p-4 space-x-2">
                                    <Link
                                        href={`/employees/${emp?.id}?month=${selectedMonth}`}
                                        className="bg-sky-300 rounded-lg p-2 text-white hover:bg-sky-400 transition-colors"
                                        aria-label="View project"
                                    >
                                        <Eye size={20} />
                                    </Link>
                                    <button
                                        onClick={() => { setIsModalOpen(true); setSelectedEmpId(emp?.id) }}
                                        className="bg-[#82C8E5] w-fit px-[7px] py-[7px] rounded-lg cursor-pointer"
                                    >
                                        {editIcon}
                                    </button>
                                    <button
                                        onClick={() => { setSelectedEmp(emp?.id); setIsDeleteModalOpen(true); }}
                                        disabled={loading}
                                        className="bg-red-500 rounded-lg p-2 text-white hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                                        aria-label="Delete project"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {showPage && <div className="bg-white rounded-lg">
                {filteredEmpData.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-10 mb-4 max-w-[1200px] mx-auto font-bold rounded-lg gap-4">
                        <div className="flex items-center rounded-lg sm:px-4">
                            <button
                                onClick={() => handlePageChange(pagination?.currentPage - 1)}
                                disabled={pagination?.currentPage === 1}
                                className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${pagination?.currentPage === 1
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-[#1D1F2C] hover:bg-gray-100"
                                    } border border-[#F6F8FA] rounded-lg`}
                            >
                                <MdKeyboardArrowLeft className="text-xl" />
                            </button>

                            {visiblePages.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => handlePageChange(number)}
                                    className={`mx-1 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center ${pagination?.currentPage === number
                                        ? "bg-[#F6F8FA]"
                                        : "text-[#1D1F2C] hover:bg-gray-100"
                                        } rounded-lg`}
                                >
                                    {number}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(pagination?.currentPage + 1)}
                                disabled={pagination?.currentPage === pagination?.totalPages}
                                className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${pagination?.currentPage === pagination?.totalPages
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-[#1D1F2C] hover:bg-gray-100"
                                    } border border-[#F6F8FA] rounded-lg`}
                            >
                                <MdKeyboardArrowRight className="text-xl" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 text-sm sm:text-base text-[#777980] font-normal">
                            <span>
                                Showing {((pagination?.currentPage - 1) * pagination?.itemsPerPage) + 1} to{' '}
                                {Math.min(pagination?.currentPage * pagination?.itemsPerPage, pagination?.totalItems)} of {pagination?.totalItems} entries
                            </span>
                            <select
                                value={pagination?.itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                className="border rounded-md px-2 py-1 text-[#1D1F2C]"
                            >
                                {[5, 10, 20, 50].map((number) => (
                                    <option key={number} value={number}>
                                        {number}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>}
            {isModalOpen && <EditEmployeeDialog isOpen={isModalOpen} handleDialogToggle={() => setIsModalOpen(false)} empId={selectedEmpId} />}
        </div>
    );
}