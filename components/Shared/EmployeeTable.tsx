'use client'

import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import EditEmployeeDialog from "./EditEmployeeDialog"

interface EmployeeTableProps {
    empData: (string | number | StaticImageData)[][];
    start?: number;
    end?: number;
}

export default function EmployeeTable({ empData }: EmployeeTableProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredEmpData, setFilteredEmpData] = useState(empData);
    const [selectedJobTitle, setSelectedJobTitle] = useState("All Job Titles");
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [searchQuery, setSearchQuery] = useState("");
    const totalItems = filteredEmpData.length;

    // Extract unique job titles from empData
    const jobTitles = Array.from(new Set(empData.map(emp => emp[3])));

    const handleJobTitleFilter = (jobTitle: string) => {
        setSelectedJobTitle(jobTitle);
        setCurrentPage(1); // Reset to first page when filter changes

        if (jobTitle === "All Job Titles") {
            setFilteredEmpData(empData);
        } else {
            const filtered = empData.filter(emp => emp[3] === jobTitle);
            setFilteredEmpData(filtered);
        }
    };

    // Handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query) {
            const filtered = empData.filter((emp) =>
                emp[2].toLowerCase().includes(query.toLowerCase()) // Assuming `emp[2]` is the name field
            );
            setFilteredEmpData(filtered);
        } else {
            setFilteredEmpData(empData); // Reset when search is cleared
        }
        setCurrentPage(1); // Reset to first page when search changes
    };

    // Calculate pagination
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentEntries = filteredEmpData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredEmpData.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Handle entries per page change
    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newItemsPerPage = Number(e.target.value);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when items per page changes

        // Recalculate the total pages
        const newTotalPages = Math.ceil(filteredEmpData.length / newItemsPerPage);
        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages || 1);
        }
    };

    // Generate visible page numbers
    const getVisiblePageNumbers = () => {
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const visiblePages = getVisiblePageNumbers();

    return (
        <div className="space-y-6 bg-white">
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
                        onChange={(e) => handleSearch(e.target.value)} // Added the search handler
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
                            <option key={index}>{`${title}`}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead className="text-[#4A4C56] bg-[#F6F8FA] font-semibold text-[12px] w-full text-nowrap">
                        <tr>
                            <th className="py-4 px-4">SL</th>
                            <th className="py-4 px-4">Name</th>
                            <th className="py-4 px-4">Role</th>
                            <th className="py-4 text-center px-4">Hourly Rate</th>
                            <th className="py-4 text-center px-4">Recorded Hours</th>
                            <th className="py-4 text-center px-4">Earnings</th>
                            <th className="py-4 px-4">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-[#1D1F2C] text-[12px] font-medium">
                        {currentEntries.map((emp, index) => (
                            <tr key={parseInt(`${emp[0]}`)} className="border-t-[0.2px] border-[#F6F8FA]">
                                <td className="p-4">{parseInt(`${emp[0]}`) < 9 ? `0${parseInt(`${emp[0]}`)}` : parseInt(`${emp[0]}`)}</td>
                                <td className="flex items-center gap-2 p-4">
                                    <Image src={emp[1]["src"]} alt="Emp image" className="w-[24px] h-[24px] rounded-full" width={24} height={24} />
                                    <h3>{`${emp[2]}`}</h3>
                                </td>
                                <td className="p-4">{`${emp[3]}`}</td>
                                <td className="text-center p-4">${`${emp[4]}`}</td>
                                <td className="text-center p-4">{`${emp[5]}`}</td>
                                <td className="text-center p-4">${parseInt(`${emp[5]}`) * parseInt(`${emp[4]}`)}</td>
                                <td className="flex items-center justify-center p-4">
                                    <div onClick={() => setIsModalOpen(true)} className="bg-[#82C8E5] w-fit px-[7px] py-[7px] rounded-lg cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                            <path
                                                d="M9.62561 2.25H7.87561C3.50061 2.25 1.75061 4 1.75061 8.375V13.625C1.75061 18 3.50061 19.75 7.87561 19.75H13.1256C17.5006 19.75 19.2506 18 19.2506 13.625V11.875"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14.0344 3.14211L7.13941 10.0371C6.87691 10.2996 6.61441 10.8159 6.56191 11.1921L6.18566 13.8259C6.04566 14.7796 6.71941 15.4446 7.67316 15.3134L10.3069 14.9371C10.6744 14.8846 11.1907 14.6221 11.4619 14.3596L18.3569 7.46461C19.5469 6.27461 20.1069 4.89211 18.3569 3.14211C16.6069 1.39211 15.2244 1.95211 14.0344 3.14211Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M13.0468 4.13135C13.633 6.2226 15.2693 7.85885 17.3693 8.45385"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                            {isModalOpen  && <EditEmployeeDialog isOpen={isModalOpen} handleDialogToggle={setIsModalOpen}/>}
                
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-lg">
                {filteredEmpData.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-10 mb-4 max-w-[1200px] mx-auto font-bold rounded-lg gap-4">
                        <div className="flex items-center rounded-lg sm:px-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${currentPage === 1
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
                                    className={`mx-1 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center ${currentPage === number
                                        ? "bg-[#F6F8FA]"
                                        : "text-[#1D1F2C] hover:bg-gray-100"
                                        } rounded-lg`}
                                >
                                    {number}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${currentPage === totalPages
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-[#1D1F2C] hover:bg-gray-100"
                                    } border border-[#F6F8FA] rounded-lg`}
                            >
                                <MdKeyboardArrowRight className="text-xl" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 text-sm sm:text-base text-[#777980] font-normal">
                            <span>
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
                            </span>
                            <select
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                className="border rounded-md px-2 py-1 text-[#1D1F2C]"
                            >
                                {[5, 6, 10, 15, 20].map((number) => (
                                    <option key={number} value={number}>
                                        {number}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
