'use client'
import Image from 'next/image';
import { useState } from 'react';
import down from '@/public/icons/file-download.svg'
import swap from '@/public/icons/arrow-swap.svg'
import { Eye, Plus, Trash2 } from 'lucide-react';
import AddNewProjectForm from '@/components/allforms/AddNewProjectForm';

// Sample Data for Table Rows
const initialData = [
    { id: 1, name: 'Project 1', assignee: 'John Doe', dueDate: '01/06/2025', priority: 'High', price: '$10,000', status: 'In Progress' },
    { id: 2, name: 'Project 2', assignee: 'Jane Smith', dueDate: '01/06/2025', priority: 'Normal', price: '$10,000', status: 'Complete' },
    { id: 3, name: 'Project 3', assignee: 'Alice Brown', dueDate: '01/06/2025', priority: 'Urgent', price: '$10,000', status: 'In Progress' },
    { id: 4, name: 'Project 4', assignee: 'Bob White', dueDate: '01/06/2025', priority: 'Low', price: '$10,000', status: 'Complete' },
    { id: 15, name: 'Project 1', assignee: 'John Doe', dueDate: '01/06/2025', priority: 'High', price: '$10,000', status: 'In Progress' },
    { id: 25, name: 'Project 2', assignee: 'Jane Smith', dueDate: '01/06/2025', priority: 'Normal', price: '$10,000', status: 'Complete' },
    { id: 53, name: 'Project 3', assignee: 'Alice Brown', dueDate: '01/06/2025', priority: 'Urgent', price: '$10,000', status: 'In Progress' },
    { id: 54, name: 'Project 4', assignee: 'Bob White', dueDate: '01/06/2025', priority: 'Low', price: '$10,000', status: 'Complete' },
    { id: 51, name: 'Project 1', assignee: 'John Doe', dueDate: '01/06/2025', priority: 'High', price: '$10,000', status: 'In Progress' },
    { id: 52, name: 'Project 2', assignee: 'Jane Smith', dueDate: '01/06/2025', priority: 'Normal', price: '$10,000', status: 'Complete' },
    { id: 35, name: 'Project 3', assignee: 'Alice Brown', dueDate: '01/06/2025', priority: 'Urgent', price: '$10,000', status: 'In Progress' },
    { id: 45, name: 'Project 4', assignee: 'Bob White', dueDate: '01/06/2025', priority: 'Low', price: '$10,000', status: 'Complete' },
    { id: 45, name: 'Project 4', assignee: 'Bob White', dueDate: '01/06/2025', priority: 'Low', price: '$10,000', status: 'Complete' },
    // Add more rows as needed
];

export default function Page() {
    const [data, setData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [isExpired, setIsExpired] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const totalItems = data.length;

    // Handle Pagination
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleUpdateTable = () => {
        // Simulate an update by adding new data (you can customize this logic)
        setData([
            ...data,
            { id: 5, name: 'Project 5', assignee: 'Charlie King', dueDate: '01/06/2025', priority: 'Normal', price: '$15,000', status: 'In Progress' }
        ]);
    };

    // Get Current Page Data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="   bg-white p-5 bg-gradient-to-l from-white/60 rounded-2xl   flex flex-col justify-start items-start gap-6">
            {/* Header Section */}
            <div className="w-full flex justify-start flex-col sm:flex-row items-start gap-5">

                <div className="flex-1    flex flex-col justify-start items-start gap-2">
                    <span className="  text-neutral-800 text-2xl font-semibold font-['Urbanist'] leading-9">Project</span>
                    <span className="  text-zinc-500 text-base font-normal font-['Urbanist'] leading-relaxed">Manage your Project</span>
                </div>

                {/* download and add new button */}
                <div className="  flex   justify-start items-start gap-5">
                    <button
                        data-size="Large"
                        data-type="Additional Button"
                        className="w-fit sm:w-44 p-4   rounded-xl flex justify-center items-center outline-1 hover:bg-gray-100 outline-sky-300 gap-1"
                    >
                        <div className="w-5 h-5 relative overflow-hidden">
                            <Image className="w-3 h-4 absolute left-[3.54px] top-[1.88px] scale-150" src={down} alt="Download Icon" />
                        </div>
                        <div className="  justify-start text-sky-300 text-base font-medium font-['Urbanist'] leading-relaxed">Download</div>
                    </button>
                    <button
                        onClick={() => setIsModal(true)}
                        data-size="Large"
                        data-type="Additional Button"
                        className="w-fit sm:w-44 p-4 bg-sky-300 hover:bg-sky-300/70 outline-1 outline-sky-300 rounded-xl flex justify-center items-center gap-1"
                    >
                        <div className="w-5 h-5 relative overflow-hidden">
                            <Plus className="w-3 h-4 absolute left-[3.54px] top-[1.88px] scale-150 text-white stroke-3  " />
                        </div>
                        <div className="  justify-start text-white text-base font-medium font-['Urbanist'] leading-relaxed">Add New</div>
                    </button>
                </div>

            </div>
            {/* searchbar */}
            {/* <div className="w-96 px-5 py-3 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-start gap-2.5">
                <div className="w-5 h-5 relative">
                    <div className="w-4 h-4 left-[1.69px] top-[1.69px] absolute bg-neutral-800" />
                </div>
                <div className="flex-1 justify-center text-slate-400 text-sm font-normal font-['Urbanist'] leading-snug">Search Project</div>
            </div> */}

            {/* Table Section */}
            <div className=" w-  overflow-x-auto  self-stretch text-nowrap rounded-tl-[10px] rounded-tr-[10px] flex flex-col justify-start items-start overflow-hidden">
                <div className="w-full min-w-fit inline-flex justify-start items-center bg-slate-50">
                    <div className="w-16 pl-4 py-4 bg-slate-50 flex justify-between items-center gap-3">
                        <div className="flex-1 justify-center text-neutral-600 text-xs font-semibold font-['Inter'] leading-tight">SL</div>
                        <Image src={swap} alt={''} className=' w-fit ' />
                    </div>
                    <div className="w-36 pl-4 py-4 bg-slate-50 flex justify-between items-center gap-3">
                        <div className="flex-1 justify-center text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">Project Name</div>
                        <Image src={swap} alt={''} className=' w-fit ' />
                    </div>
                    <div className="w-28 pl-4 py-4 bg-slate-50 flex justify-between items-center">
                        <div className="justify-center text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">Assignee</div>
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
                    <div className="w-40 pl-14 py-4 bg-slate-50 flex justify-between items-center">
                        <div className="justify-center text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">Status</div>
                        <Image src={swap} alt={''} className=' w-fit ' />
                    </div>
                    <div className="w-36 p-4 bg-slate-50 flex justify-center items-center">
                        <div className="justify-center text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">Action</div>
                    </div>
                </div>

                {/* Table Rows */}
                {currentItems.map((row, index) => (
                    <div key={index} className="w-full min-w-fit inline-flex justify-start items-center bg-white">
                        <div className="w-16 pl-4 py-4 flex justify-start items-center">{row.id}</div>
                        <div className="w-36 pl-4 py-4 flex justify-start items-center">{row.name}</div>
                        <div className="w-28 pl-4 py-4 flex justify-start items-center">{row.assignee}</div>
                        <div className="w-36 pl-10 py-4 flex justify-start items-center">{row.dueDate}</div>
                        <div className="w-32 pl-10 py-4 flex justify-start items-center">{row.priority}</div>
                        <div className="w-36 pl-14 py-4 flex justify-start items-center">{row.price}</div>
                        <div className="w-40 pl-14 py-4 flex justify-start items-center">{row.status}</div>
                        <div className="w-36 p-4 flex justify-start items-center gap-3">
                            <button className="bg-sky-300 rounded-lg p-2 text-white"><Eye /></button>
                            <button className="bg-red-500 rounded-lg p-2 text-white"><Trash2 /></button>
                        </div>
                    </div>
                ))}


                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-gray-300 p-2 rounded-md"
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 p-2 rounded-md"
                        >
                            Next
                        </button>
                    </div>
                    <div className="text-sm">
                        Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {totalItems} entries
                    </div>
                </div>
            </div>
            {isModal && <AddNewProjectForm open={isModal} setIsOpen={setIsModal} />}

            {/* Button to simulate updating table */}
            {/* <div className="mt-4">
                <button onClick={handleUpdateTable} className="bg-blue-500 p-4 rounded-xl text-white">
                    Add New Project
                </button>
            </div> */}
        </div>
    );
}
