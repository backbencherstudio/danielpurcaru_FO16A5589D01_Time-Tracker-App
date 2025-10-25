'use client'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { UserService } from '@/service/user/user.service'
import DeletePopUp from '../reusable/DeletePopUp'
import avatar from "@/public/avatar.png"

interface EmployeeLoan {
    id: string;
    user: {
        name: string;
        avatarUrl?: string;
    };
    created_at: string;
    loan_amount: number;
    loan_status: string;
}

interface EmpLoanTableProps {
    empData: EmployeeLoan[];
    isLoading: boolean;
    handleLoading: (st: boolean) => void;
    fetchEmpData: () => void;
    handleEmpLoan: (id:string,status:boolean)=> void;
}

const EmpLoanTable = ({ empData, isLoading, handleLoading, fetchEmpData,handleEmpLoan }: EmpLoanTableProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [loanToDelete, setLoanToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState({ text: '', isError: false })
    const [sortConfig, setSortConfig] = useState<{ key: keyof EmployeeLoan; direction: 'asc' | 'desc' } | null>(null)

    // Filter employees based on search query (name)
    const filteredData = empData.filter((emp) =>
        emp?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Apply sorting
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig) return 0

        const key = sortConfig.key
        let aValue, bValue

        if (key === 'user') {
            aValue = a.user.name.toLowerCase()
            bValue = b.user.name.toLowerCase()
        } else {
            aValue = a[key]
            bValue = b[key]
        }

        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
    })

    const requestSort = (key: keyof EmployeeLoan) => {
        let direction: 'asc' | 'desc' = 'asc'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    // Open delete confirmation modal
    const openDeleteModal = (loanId: string) => {
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
        if (!loanToDelete) return
        handleLoading(true);
        setIsDeleting(true)
        try {
            const response = await UserService.deleteEmpLoadData(loanToDelete)
            if (response?.data?.success) {
                setDeleteMessage({ text: 'Loan deleted successfully', isError: false })
                // Note: In server-side pagination, we should refresh the data instead of local filtering
                closeDeleteModal()
                fetchEmpData();
            } else {
                setDeleteMessage({
                    text: response?.response?.data?.message || 'Failed to delete loan',
                    isError: true,
                })
            }
        } catch (error) {
            console.error('Error deleting loan:', error)
            setDeleteMessage({
                text: 'Error deleting loan',
                isError: true,
            })
        } finally {
            setIsDeleting(false)
            handleLoading(false);
        }
    }

    const getSortIcon = (key: string) => {
        if (!sortConfig || sortConfig.key !== key) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer">
                    <path d="M6.00682 13.6662L2.66016 10.3262" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.00586 2.33398V13.6673" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <g opacity="0.4">
                        <path d="M9.99414 2.33398L13.3408 5.67398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.99414 13.6673V2.33398" stroke="#4A4C56" strokeWidth="1.6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </svg>
            )
        }
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer">
                <path
                    d="M6.00682 13.6662L2.66016 10.3262"
                    stroke="#4A4C56"
                    strokeWidth="1.6"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={sortConfig.direction === 'desc' ? 1 : 0.4}
                />
                <path
                    d="M6.00586 2.33398V13.6673"
                    stroke="#4A4C56"
                    strokeWidth="1.6"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={sortConfig.direction === 'desc' ? 1 : 0.4}
                />
                <path
                    d="M9.99414 2.33398L13.3408 5.67398"
                    stroke="#4A4C56"
                    strokeWidth="1.6"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={sortConfig.direction === 'asc' ? 1 : 0.4}
                />
                <path
                    d="M9.99414 13.6673V2.33398"
                    stroke="#4A4C56"
                    strokeWidth="1.6"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={sortConfig.direction === 'asc' ? 1 : 0.4}
                />
            </svg>
        )
    }

    return (
        <div className="space-y-6 bg-white p-4 rounded-lg">
            <DeletePopUp
                isDeleteModalOpen={isDeleteModalOpen}
                closeDeleteModal={closeDeleteModal}
                isDeleting={isDeleting}
                handleDelete={handleDelete}
                title={(empData.find(emp => emp.id === loanToDelete)?.user?.name + "'s Loan" || 'Loan')}
            />

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
                                    {/* {getSortIcon('id')} */}
                                </div>
                            </th>
                            <th className="py-4 text-start px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Employee Name</span>
                                    <div onClick={() => requestSort('user')}>
                                        {/* {getSortIcon('user')} */}
                                    </div>
                                </div>
                            </th>
                            <th className="py-4 text-start px-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Date</span>
                                    <div onClick={() => requestSort('created_at')}>
                                        {/* {getSortIcon('created_at')} */}
                                    </div>
                                </div>
                            </th>
                            <th className="py-4 px-4 text-start">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Price</span>
                                    <div onClick={() => requestSort('loan_amount')}>
                                        {/* {getSortIcon('loan_amount')} */}
                                    </div>
                                </div>
                            </th>
                            <th className="py-4 px-4 text-start">
                                <div className="flex items-center justify-between gap-2">
                                    <span>Status</span>
                                    <div onClick={() => requestSort('loan_amount')}>
                                        {/* {getSortIcon('loan_amount')} */}
                                    </div>
                                </div>
                            </th>
                            <th className="py-4 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#1D1F2C] text-[12px] font-medium">
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8">
                                    Loading...
                                </td>
                            </tr>
                        ) : sortedData.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-500">
                                    {searchQuery ? 'No employees found matching your search' : 'No loan data available'}
                                </td>
                            </tr>
                        ) : (
                            sortedData.map((emp, index) => (
                                <tr key={emp.id} className="border-t-[0.2px] border-[#F6F8FA]">
                                    <td className="text-center p-4">{index + 1}</td>
                                    <td className="flex items-center gap-2 p-4">
                                        <Image
                                            src={emp?.user?.avatarUrl || avatar}
                                            alt={`${emp.user.name}'s avatar`}
                                            className="w-[24px] h-[24px] rounded-full"
                                            width={24}
                                            height={24}
                                        />
                                        <h3 className="text-nowrap">{emp.user.name}</h3>
                                    </td>
                                    <td className="p-4">
                                        {emp.created_at ? new Date(emp.created_at).toISOString().split('T')[0] : '-'}
                                    </td>
                                    <td className="p-4">${emp.loan_amount}</td>
                                    <td className={`p-4 ${emp?.loan_status === 'REJECTED' ? "text-red-400" : emp?.loan_status === 'PENDING' ? "text-blue-400" : "text-green-500"}`}>{emp?.loan_status}</td>
                                    <td className="flex items-center justify-end p-4 space-x-2.5">
                                        {emp?.loan_status === "PENDING"&&<div className="flex w-full sm:w-fit justify-start gap-2.5">
                                            <button className="px-2.5 py-1.5 flex gap-2.5 bg-red-400 hover:bg-red-400/90 rounded-sm cursor-pointer" onClick={() => handleEmpLoan(emp?.id, false)}>
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.5001 18.3332C15.0834 18.3332 18.8334 14.5832 18.8334 9.99984C18.8334 5.4165 15.0834 1.6665 10.5001 1.6665C5.91675 1.6665 2.16675 5.4165 2.16675 9.99984C2.16675 14.5832 5.91675 18.3332 10.5001 18.3332Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8.1416 12.3583L12.8583 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12.8583 12.3583L8.1416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {/* <div className="text-white text-sm font-normal font-['Urbanist'] leading-snug">Reject</div> */}
                                            </button>
                                            <button className="px-2.5 py-1.5 flex gap-2.5 bg-sky-300 hover:bg-sky-300/90 rounded-sm cursor-pointer" onClick={() => handleEmpLoan(emp?.id, true)}>
                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.5001 18.3332C15.0834 18.3332 18.8334 14.5832 18.8334 9.99984C18.8334 5.4165 15.0834 1.6665 10.5001 1.6665C5.91675 1.6665 2.16675 5.4165 2.16675 9.99984C2.16675 14.5832 5.91675 18.3332 10.5001 18.3332Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M6.95825 9.99993L9.31659 12.3583L14.0416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {/* <div className="text-white text-sm font-normal font-['Urbanist'] leading-snug">Accept</div> */}
                                            </button>
                                        </div>}
                                        <div
                                            className="w-7 h-7 bg-red-600 rounded-sm flex justify-center items-center cursor-pointer hover:bg-red-700 transition-colors"
                                            onClick={() => openDeleteModal(emp.id)}
                                        >
                                            <Trash2 className='text-white' size={18} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmpLoanTable