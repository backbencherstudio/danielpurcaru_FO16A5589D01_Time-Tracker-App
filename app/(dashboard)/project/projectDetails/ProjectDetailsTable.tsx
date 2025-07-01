import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ProjectDetailsTable = ({ projectData }: any) => {
    return (
        <div className="bg-white p-5 rounded-[10px] ">
            {/* Project Header Section */}
     
            {/* Table Section */}
            <div className="overflow-x-auto rounded-t-[10px] ">
                <table className="w-full table-auto">
                    <thead className="text-[#4A4C56] bg-[#F6F8FA] font-semibold text-[12px]">
                        <tr>
                            <th className="py-4 px-4">SL</th>
                            <th className="py-4 text-start px-4">Name</th>
                            <th className="py-4 text-start px-4">Role</th>
                            <th className="py-4 px-4 text-start">Hours</th>
                            <th className="py-4 px-4">Cost</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#1D1F2C] text-[12px] font-medium">
                        {projectData.employees.map((emp: any) => (
                            <tr key={emp.SL} className="border-t-[0.2px] border-[#F6F8FA]">
                                <td className="text-center p-4">{emp.SL}</td>
                                <td className="flex items-center gap-2 p-4">
                                    <Image src={emp.image} alt="Emp image" width={24} height={24} className="w-[24px] h-[24px] rounded-full" />
                                    <h3 className="text-nowrap">{emp.Name}</h3>
                                </td>
                                <td className=" p-4">{emp.Role}</td>
                                <td className=" p-4">{emp.Hours}</td>
                                <td className=" p-4">{emp.Cost}</td>
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

export default ProjectDetailsTable;
