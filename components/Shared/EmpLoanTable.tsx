import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const EmpLoanTable = ({ empData, start, end }: any) => {
    return (
        <div className="space-y-6 bg-white p-4 rounded-lg shadow-sm">
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
                        placeholder="Search employee"
                        className="w-full text-[14px] placeholder:text-[#A0AEC0] text-[#1D1F2C] outline-none"
                    />
                </div>

                 
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
                <table className="w-full table-auto">
                    <thead className="text-[#4A4C56] bg-[#F6F8FA] font-semibold text-[12px]">
                        <tr>
                            <th className="py-4 px-4">SL</th>
                            <th className="py-4 text-start px-4">Employee Name</th>
                            <th className="py-4 text-start px-4">Date</th>
                            <th className="py-4 px-4 text-start">Price</th>
                            <th className="py-4 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#1D1F2C] text-[12px] font-medium">
                        {empData.slice(start, start + end)?.map((emp) => (
                            <tr key={emp.SL} className="border-t-[0.2px] border-[#F6F8FA]">
                                <td className="text-center p-4">{emp.SL}</td>
                                <td className="flex items-center gap-2 p-4">
                                    <Image src={emp?.image} alt="Emp image" className="w-[24px] h-[24px] rounded-full" />
                                    <h3 className="text-nowrap">{emp.employeeName}</h3>
                                </td>

                                <td className=" p-4">{emp.date}</td>
                                <td className=" p-4">${emp.price}</td>
                                <td className="flex items-center justify-center p-4">
                                    <div className="w-7 h-7 bg-red-600 rounded-sm flex justify-center items-center">
                                        <Trash2 className='text-white' size={18} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty Overlay for Modal/Other Usage */}
            <div className="bg-gray-300 top-0 left-0 right-0 bottom-0 fixed z-[99] hidden"></div>
        </div>
    )
}

export default EmpLoanTable
