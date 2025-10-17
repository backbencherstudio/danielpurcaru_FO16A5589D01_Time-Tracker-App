'use client'

import { useState, useContext } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTrigger } from '../ui/dialog';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'; // Importing Heroicons for eye icon
import { UserService } from '@/service/user/user.service';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { useEmpData } from '@/context/EmpDataContext';

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
}


type propType = {
    isOpen: boolean;
    handleDialogToggle: () => void;
    empId: string;
    data: Employee[];
}

export default function EditEmployeeDialog({ isOpen, handleDialogToggle, empId, data }: propType) {
    const { fetchEmpData, handleEmpDataSaved } = useEmpData();
    const [empName, setEmpName] = useState(data?.find((emp: Employee) => emp?.id === empId)?.name);
    const [empRole, setEmpRole] = useState(data?.find((emp: Employee) => emp?.id === empId)?.employee_role);
    const [empHourlyRate, setEmpHourlyRate] = useState(data?.find((emp: Employee) => emp?.id === empId)?.hourly_rate);
    const [empPassword, setEmpPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState<string>(data?.find(emp => emp.id === empId)?.avatarUrl);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const fd = new FormData();

        empName && fd.append('name', empName);
        empRole && fd.append('employee_role', empRole);
        empHourlyRate && fd.append('hourly_rate', empHourlyRate);
        empPassword && fd.append('password', empPassword);
        avatarFile && fd.append('file',avatarFile);
        try {
            setLoading(true)
            const res = await UserService?.updateEmp(fd, empId);

            if (res?.data?.success) {
                toast.success("Employee data saved...");
                handleDialogToggle()
                handleEmpDataSaved()
                fetchEmpData();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = URL.createObjectURL(e.target.files[0]);
            setAvatar(file);
            setAvatarFile(e.target.files?.[0])
        }
    };

    return (
        <div className="p-6">
            <Toaster position="top-right" />
            <Dialog open={isOpen} onOpenChange={handleDialogToggle}>
                <DialogContent className="max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <h3 className="text-xl font-semibold">Edit Employee</h3>
                    </DialogHeader>

                    {/* Employee Form Fields */}
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div className="flex w-[100px] aspect-square justify-center items-center border-dashed border-2 border-gray-400 rounded-full mb-6">
                            <label htmlFor="img" className="text-gray-500 text-sm w-full h-full cursor-pointer flex justify-center items-center">
                                <Image src={ avatar || data?.find(emp => emp.id === empId)?.avatarUrl} alt="Upload" width={500} height={500} className='w-full h-full rounded-full' />
                            </label>
                            <input
                                type="file"
                                name="img"
                                id="img"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <div className="flex sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Full Name"
                                    value={empName}
                                    onChange={(e) => setEmpName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Password</label>
                                <div className='relative mt-2'>
                                    <input
                                        type={passwordVisible ? "text" : "password"} // Toggle password visibility
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholder="Enter Password"
                                        value={empPassword}
                                        onChange={(e) => setEmpPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                    >
                                        {passwordVisible ? (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div> */}

                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Role</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Role"
                                    value={empRole}
                                    onChange={(e) => setEmpRole(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Hourly Rate ($)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Hourly Rate"
                                    value={empHourlyRate}
                                    onChange={(e) => setEmpHourlyRate(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Dialog Footer with Action */}
                        <DialogFooter>
                            <button
                                type='submit'
                                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                {!loading ? "Save" : "Loading..."}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
