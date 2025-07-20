'use client'

import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useMemo, useEffect } from 'react'
import { UserService } from '@/service/user/user.service'
import DeletePopUp from '../reusable/DeletePopUp'

type empLoan={
    id:string,

}

const EmpLoanTable = ({ empData, start, end }: any) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState([])
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [loanToDelete, setLoanToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState({ text: '', isError: false })
     const [sortOrder, setSortOrder] = useState('asc');

    // Initialize data with empData and update when empData changes
    useEffect(() => {
        setData(empData)
    }, [empData])

    // Filter employees based on search query (name)
    const filteredData = useMemo(() => {
        if (!searchQuery) return data
        return data.filter((emp: any) =>
            emp?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [data, searchQuery])

    // Apply pagination to filtered data
    const paginatedData = useMemo(() => {
        return filteredData.slice(start, start + end)
    }, [filteredData, start, end])

    // Open delete confirmation modal
    const openDeleteModal = (loanId: any) => {
        setLoanToDelete(loanId)
        setIsDeleteModalOpen(true)
    }

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        setLoanToDelete(null)
        setDeleteMessage({ text: '', isError: false })
    }

    // Delete function
    const handleDelete = async () => {
        if (!loanToDelete) return;
        setIsDeleting(true);
        try {
            const response = await UserService?.deleteEmpLoadData(loanToDelete);
            if (response?.data?.success) {
                setData(prevData => prevData.filter((emp: any) => emp.id !== loanToDelete)); // Use loanToDelete.id for comparison
                setDeleteMessage({ text: 'Loan deleted successfully', isError: false });
                closeDeleteModal()
            } else {
                setDeleteMessage({
                    text: 'Failed to delete loan',
                    isError: true,
                });
            }
        } catch (error) {
            console.error('Error deleting loan:', error);
            setDeleteMessage({
                text: 'Error deleting loan',
                isError: true,
            });
        } finally {
            setIsDeleting(false);
        }
    };


    const handleSorting = (key:string) => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);

        setData([...data].sort((a, b) => {
            // Add null checks
            let aValue:typeof data ;
            let bValue: typeof data ;
            if(key === "name"){
                aValue = a.user[key] || '';
                bValue = b.user[key] || '';
            }else{
                aValue = a[key] || '';
                bValue = b[key] || '';
            }

            if (newOrder === 'asc') {
                return String(aValue).localeCompare(String(bValue));
            } else {
                return String(bValue).localeCompare(String(aValue));
            }
        }));
    };
    return (
        <div className="space-y-6 bg-white p-4 rounded-lg shadow-sm">
            <DeletePopUp isDeleteModalOpen={isDeleteModalOpen} closeDeleteModal={closeDeleteModal} isDeleting={isDeleting} handleDelete={handleDelete} title={(data.find(project => project.id === loanToDelete)?.user?.name + "'s Loan" || 'Project')}/>
            {/* Search and Filter Section */}
            <div className="flex gap-4 flex-wrap">
                <span className="flex-2 text-neutral-800 text-2xl font-semibold">Employee Loan List</span>

                {/* Search Bar */}
                <div className="flex-1 flex items-center gap-[10px] border border-[#E9EAEC] rounded-xl px-4 py-3 relative">
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
                        placeholder="Search by username"
                        className="w-full text-[14px] placeholder:text-[#A0AEC0] text-[#1D1F2C] outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto">
                    <thead className="text-[#4A4C56] bg-[#F6F8FA] font-semibold text-[12px]">
                        <tr>
                            <th className="py-4 px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>SL</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("id")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                </div>
                            </th>
                            <th className="py-4 text-start px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Employee Name</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("name")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                </div>
                            </th>
                            <th className="py-4 text-start px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Date</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("created_at")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                </div>
                            </th>
                            <th className="py-4 px-4 text-start">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Price</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer" onClick={() => handleSorting("loan_amount")}>
                                        <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <g opacity="0.4">
                                            <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                </div>
                            </th>
                            <th className="py-4 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#1D1F2C] text-[12px] font-medium">
                        {paginatedData?.map((emp: any, index: number) => (
                            <tr key={emp?.id} className="border-t-[0.2px] border-[#F6F8FA]">
                                <td className="text-center p-4">{index + 1}</td>
                                <td className="flex items-center gap-2 p-4">
                                    <Image
                                        src={emp?.user?.avatarUrl}
                                        alt={`${emp?.name}'s avatar`}
                                        className="w-[24px] h-[24px] rounded-full"
                                        width={24}
                                        height={24}
                                    />
                                    <h3 className="text-nowrap">{emp?.user?.name}</h3>
                                </td>
                                <td className="p-4">
                                    {emp?.created_at ? new Date(emp.created_at).toISOString().split('T')[0] : null}
                                </td>
                                <td className="p-4">${emp?.loan_amount}</td>
                                <td className="flex items-center justify-center p-4">
                                    <div
                                        className="w-7 h-7 bg-red-600 rounded-sm flex justify-center items-center cursor-pointer hover:bg-red-700 transition-colors"
                                        onClick={() => openDeleteModal(emp?.id)}
                                    >
                                        <Trash2 className='text-white' size={18} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty state when no results found */}
            {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No employees found matching your search
                </div>
            )}

            {/* Empty Overlay for Modal/Other Usage */}
            <div className="bg-gray-300 top-0 left-0 right-0 bottom-0 fixed z-[99] hidden"></div>
        </div>
    )
}

export default EmpLoanTable