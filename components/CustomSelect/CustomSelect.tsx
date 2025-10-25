'use client'

import { useEffect, useRef, useState } from "react";

const CustomDropdown = ({ empData, loading, selectedEmployeeId, setSelectedEmployeeId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (employee) => {
        setSelectedEmployeeId(employee.id);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col gap-2" ref={dropdownRef}>
            <label className="text-[#1D1F2C] text-base font-medium">Employee</label>
            
            {/* Custom dropdown trigger */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="
                        w-full 
                        px-3 
                        py-2 
                        border 
                        border-gray-300 
                        rounded-md 
                        shadow-sm 
                        bg-white 
                        text-left
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500 
                        focus:border-blue-500
                        flex
                        justify-between
                        items-center
                    "
                >
                    <span>
                        {selectedEmployeeId 
                            ? `${empData.find(emp => emp.id === selectedEmployeeId)?.first_name} ${empData.find(emp => emp.id === selectedEmployeeId)?.last_name || ''}`
                            : 'Select an employee'
                        }
                    </span>
                    <svg 
                        className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="
                        absolute 
                        z-10 
                        w-full 
                        mt-1 
                        bg-white 
                        border 
                        border-gray-300 
                        rounded-md 
                        shadow-lg 
                        max-h-[300px]
                        overflow-y-auto
                    ">
                        {empData.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-gray-500">
                                No employees available
                            </div>
                        ) : (
                            empData.map(emp => (
                                <button
                                    key={emp.id}
                                    type="button"
                                    onClick={() => handleSelect(emp)}
                                    className="
                                        w-full 
                                        text-left 
                                        px-3 
                                        py-2 
                                        hover:bg-blue-50 
                                        focus:bg-blue-100 
                                        focus:outline-none
                                        border-b
                                        border-gray-100
                                        last:border-b-0
                                    "
                                >
                                    {`${emp.first_name} ${emp.last_name || ''}`}
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>

            {empData.length === 0 && !loading && (
                <p className="text-sm text-red-500">No employees available to select</p>
            )}
        </div>
    );
};


export default CustomDropdown