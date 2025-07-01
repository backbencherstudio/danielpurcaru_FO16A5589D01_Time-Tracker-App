import { useState } from "react"

export default function TableData({ index, workHour, handleWorkHour, emp }) {
    const [updateWorkHour, setUpdateWorkHour] = useState(emp)
    const [openUpdateMenu, setOpenUpdateMenu] = useState(false);
    return (
        <td key={index} className="relative w-[36.16px] border border-[#ECEFF3] flex items-center justify-center aspect-square text-[#4A4C56] text-[12px] bg-[#FAFAFA]" onClick={() => setOpenUpdateMenu(true)}>
            {workHour ? `${workHour}hr` : ""}
            {openUpdateMenu && <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-white w-[100px] h-full p-3 space-y-3">
                <h3 className="text-[#1D1F2C] font-medium">Edit Hour</h3>
                <div className="flex gap-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 14 2" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.75 1C13.75 1.41421 13.4142 1.75 13 1.75L1 1.75C0.585786 1.75 0.25 1.41421 0.25 1C0.25 0.585786 0.585786 0.25 1 0.25L13 0.25C13.4142 0.25 13.75 0.585786 13.75 1Z" fill="#1D1F2C" />
                        </svg>
                    </div>
                    <div>{updateWorkHour}</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75 1C7.75 0.585786 7.41421 0.25 7 0.25C6.58579 0.25 6.25 0.585786 6.25 1V6.25H1C0.585786 6.25 0.25 6.58579 0.25 7C0.25 7.41421 0.585786 7.75 1 7.75H6.25V13C6.25 13.4142 6.58579 13.75 7 13.75C7.41421 13.75 7.75 13.4142 7.75 13V7.75H13C13.4142 7.75 13.75 7.41421 13.75 7C13.75 6.58579 13.4142 6.25 13 6.25H7.75V1Z" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>}
        </td>
    )
}