'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTrigger } from '../ui/dialog';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'; // Importing Heroicons for eye icon
import { UserService } from '@/service/user/user.service';
import { toast } from 'react-toastify';

export default function EditEmployeeDialog({ isOpen, handleDialogToggle, empId, data }) {
    const [empName, setEmpName] = useState(data?.find((emp: typeof data) => emp?.id === empId)?.name);
    const [empRole, setEmpRole] = useState(data?.find((emp: typeof data) => emp?.id === empId)?.employee_role);
    const [empHourlyRate, setEmpHourlyRate] = useState(data?.find((emp: typeof data) => emp?.id === empId)?.hourly_rate);
    const [empPassword, setEmpPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            ...(empName && { name: empName }),
            ...(empRole && { employee_role: empRole }),
            ...(empHourlyRate && { hourly_rate: empHourlyRate }),
            ...(empPassword && { password: empPassword }),
        };
        try {
            setLoading(true)
            const res = await UserService?.updateEmp(data, empId);

            if (res?.data?.success) {
                toast.success(res.data.message);
                handleDialogToggle()
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6">
            <Dialog open={isOpen} onOpenChange={handleDialogToggle}>
                <DialogContent className="max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <h3 className="text-xl font-semibold">Edit Employee</h3>
                    </DialogHeader>

                    {/* Employee Form Fields */}
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
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

                        <div className="flex flex-col sm:flex-row sm:space-x-6">
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
                                    {/* Eye Icon for toggling password visibility */}
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
                        </div>

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
