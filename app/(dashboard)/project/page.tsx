'use client'

import { useState } from 'react';
import AddNewProjectForm from '@/components/allforms/AddNewProjectForm';
import swap from '@/public/icons/arrow-swap.svg';
import down from '@/public/icons/file-download.svg';
import { Eye, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const initialData = [
    { id: 1, name: 'Project 1', assignees: ['/images/Employee/Jerome.png', '/images/Employee/sanvannah.png', '/images/Employee/ronald.png', '/images/Employee/ronald.png', '/images/Employee/sanvannah.png'], dueDate: '01/06/2025', priority: 'High', price: '$10,000', status: 'In Progress' },
    { id: 2, name: 'Project 2', assignees: ['/images/Employee/sanvannah.png'], dueDate: '01/06/2025', priority: 'Normal', price: '$10,000', status: 'Complete' },
    { id: 3, name: 'Project 3', assignees: ['/images/Employee/ronald.png', '/images/Employee/sanvannah.png'], dueDate: '01/06/2025', priority: 'Urgent', price: '$10,000', status: 'In Progress' },
    { id: 4, name: 'Project 4', assignees: ['/images/Employee/ronald.png'], dueDate: '01/06/2025', priority: 'Low', price: '$10,000', status: 'Complete' },
    { id: 5, name: 'Project 5', assignees: ['/images/Employee/sanvannah.png'], dueDate: '01/06/2025', priority: 'Normal', price: '$10,000', status: 'Complete' },
    { id: 6, name: 'Project 6', assignees: ['/images/Employee/Jerome.png', '/images/Employee/sanvannah.png', '/images/Employee/ronald.png', '/images/Employee/ronald.png', '/images/Employee/sanvannah.png'], dueDate: '01/06/2025', priority: 'High', price: '$10,000', status: 'In Progress' },
    { id: 7, name: 'Project 7', assignees: ['/images/Employee/ronald.png', '/images/Employee/sanvannah.png'], dueDate: '01/06/2025', priority: 'Urgent', price: '$10,000', status: 'In Progress' },
    { id: 8, name: 'Project 8', assignees: ['/images/Employee/ronald.png'], dueDate: '01/06/2025', priority: 'Low', price: '$10,000', status: 'Complete' },
    // More projects can be added here
];

export default function Page() {
    const [data, setData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="bg-white p-5 bg-gradient-to-l from-white/60 rounded-2xl flex flex-col gap-6">
            {/* Header Section */}
            <div className="w-full flex justify-between items-start gap-5">
                <div className="flex flex-col justify-start gap-2">
                    <span className="text-neutral-800 text-2xl font-semibold">Project</span>
                    <span className="text-zinc-500 text-base">Manage your Projects</span>
                </div>
                {/* Buttons for Download and Add New */}
                <div className="flex gap-5">
                    <button className="w-fit sm:w-44 p-4 rounded-xl flex justify-center items-center outline-1 hover:bg-gray-100">
                        <Image className="w-3 h-4" src={down} alt="Download" />
                        <span className="text-sky-300">Download</span>
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="w-fit sm:w-44 p-4 bg-sky-300 hover:bg-sky-300/70 rounded-xl flex justify-center items-center gap-1">
                        <Plus className="text-white" />
                        <span className="text-white">Add New</span>
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto w-full rounded-tl-[10px] rounded-tr-[10px]">
                <div className="w-full min-w-fit bg-slate-50 flex">
                    <div className="w-full min-w-fit inline-flex justify-start items-center bg-slate-50">
                        {/* Column Headers */}
                        <div className="w-16 pl-4 py-4 bg-slate-50 flex justify-between items-center gap-3">
                            <div className="flex-1 justify-center text-neutral-600 text-xs font-semibold font-['Inter'] leading-tight">SL</div>
                            <Image src={swap} alt={''} className=' w-fit ' />
                        </div>
                        <div className="w-36 pl-4 py-4 bg-slate-50 flex justify-between items-center gap-3">
                            <div className="flex-1 justify-center text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">Project Name</div>
                            <Image src={swap} alt={''} className=' w-fit ' />
                        </div>
                        <div className="w-34 pl-4 py-4 bg-slate-50 flex justify-between items-center">
                            <div className="justify-center text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">Assignees</div>
                            <Image src={swap} alt={''} className=' w-fit ' />
                        </div>
                        <div className="w-36 pl-10 py-4 bg-slate-50 flex justify-between items-center gap-3">
                            <div className="flex-1 justify-center text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">Due Date</div>
                            <Image src={swap} alt={''} className=' w-fit ' />
                        </div>
                        <div className="w-32 pl-10 py-4 bg-slate-50 flex justify-between items-center">
                            <div className="justify-center text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">Priority</div>
                            <Image src={swap} alt={''} className=' w-fit ' />
                        </div>
                        <div className="w-36 pl-14 py-4 bg-slate-50 flex justify-between items-center">
                            <div className="justify-center text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">Price</div>
                            <Image src={swap} alt={''} className=' w-fit ' />
                        </div>
                        <div className="w-46 pl-18 py-4 bg-slate-50 flex justify-between items-center">
                            <div className="justify-center flex-1  text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">Status</div>
                            <Image src={swap} alt={''} className=' w-fit ' />
                        </div>
                        <div className="w-36 p-4 bg-slate-50 flex justify-center items-center">
                            <div className="justify-center text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">Action</div>
                        </div>
                    </div>
                </div>

                {currentItems.map((row) => (
                    <div key={row.id} className="w-full min-w-fit bg-white flex">
                        {/* Project Data */}
                        <div className="w-16 pl-4 py-4 flex justify-start items-center">{row.id}</div>
                        <div className="w-36 pl-4 py-4 flex justify-start items-center">{row.name}</div>

                        <div className="w-34 pl-4 py-4 flex justify-start items-center">
                            {/* Render Assignees as images */}
                            {row.assignees.slice(0, 3).map((assignee, index) => (
                                <Image
                                    key={index}
                                    className={`w-6 h-6 rounded-full border-2 border-sky-300 ${index === 1 ? "-translate-x-2" : ""} ${index === 2 ? "-translate-x-4.5" : ""}`}
                                    src={assignee}
                                    alt={`Assignee ${index + 1}`}
                                    width={2400}
                                    height={2400}
                                />
                            ))}
                            {/* Show number of remaining assignees */}
                            {row.assignees.length > 3 && (
                                <div className=" bg-gray-100 p-1.5 -translate-x-7.5 rounded-full text-neutral-800 text-sm font-normal font-['Urbanist'] leading-none">{row.assignees.length - 3}+</div>
                            )}
                        </div>


                        <div className="w-36 pl-10 py-4 flex justify-start items-center">{row.dueDate}</div>
                        <div className="w-32 pl-10 py-4 flex justify-start items-center">{row.priority}</div>
                        <div className="w-36 pl-14 py-4 flex justify-start items-center">{row.price}</div>
                        <div className={`w-32 mx-6.5  my-auto h-8 flex justify-center  items-center text-teal-600 ${row.status==='Complete'? 'bg-sky-100' : 'bg-green-50'} rounded-lg text-[10px] font-medium font-['Inter'] leading-none`}>{row.status}</div>
                         
                        <div className="w-36 p-2 flex justify-center items-center gap-3">
                            <button className="bg-sky-300 rounded-lg p-2 text-white"><Eye /></button>
                            <button className="bg-red-500 rounded-lg p-2 text-white"><Trash2 /></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Section */}
            <div className="w-full flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="text-xs sm:text-base border py-2 rounded-lg">
                        <MdKeyboardArrowLeft />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)} className={`w-[40px] h-[40px] m-1 rounded-xl ${currentPage === index + 1 ? 'bg-[#F8FAFB] text-[#1D1F2C]' : 'text-[#1D1F2C] hover:bg-gray-100'}`}>
                            {index + 1}
                        </button>
                    ))}
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="text-xs sm:text-base border py-2 rounded-lg">
                        <MdKeyboardArrowRight />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span>Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries</span>
                    <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="border-1 rounded-sm pl-2 py-1">
                        {[5, 6, 7, 8, 9, 10].map((number) => (
                            <option key={number} value={number}>{number}</option>
                        ))}
                    </select>
                </div>
            </div>

            {isModalOpen && <AddNewProjectForm open={isModalOpen} setIsOpen={setIsModalOpen} />}
        </div>
    );
}
