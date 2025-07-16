'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTrigger } from '../ui/dialog';
import { useForm } from 'react-hook-form';
import prof from "@/public/images/profileIcon.png";
import { StaticImageData } from 'next/image';
import { UserService } from '@/service/user/user.service';
import { toast } from 'react-toastify';

export default function AddEmployeeDialog({ isOpen, handleDialogToggle }) {
    const [avatar, setAvatar] = useState<string | StaticImageData>(prof);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = URL.createObjectURL(e.target.files[0]);
            setAvatar(file);
            setValue("avatar", e.target.files[0]);
        }
    };

    const onSubmit = async (data: any) => {
        const empData = {
            ...(data.avatar && { file: data.avatar }),
            first_name: data.firstName,
            last_name: data.lastName,
            password: data.password,
            email: data.email,
            phone_number: data.phone,
            physical_number: data.physicalNumber,
            hourly_rate: parseInt(data.hourlyRate),
            employee_role: data.role,
            address: data.address,
        }
        try {
            setLoading(true)
            const res = await UserService?.createEmployee(empData);

            if (res?.data?.success) {
                toast.success(res.data.message);
                handleDialogToggle()
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed");
            console.log(error);
        } finally {
            setLoading(false);
        }
        handleDialogToggle();
    };

    return (
        <div className="p-6">
            <Dialog open={isOpen} onOpenChange={handleDialogToggle}>
                <DialogContent className="max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <h3 className="text-xl font-semibold">Add New Employee</h3>
                    </DialogHeader>

                    {/* Upload Photo Section */}
                    <div className="flex justify-center items-center space-x-4 border-dashed border-2 border-gray-400 rounded-lg p-4 mb-6">
                        <Image src={avatar} alt="Upload" width={24} height={24} />
                        <label htmlFor="img" className="text-gray-500 text-sm">Upload photo (Maximum size of 2MB)</label>
                        <input
                            type="file"
                            name="img"
                            id="img"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    {/* Employee Form Fields */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">First Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter First Name"
                                    {...register("firstName", { required: "First name is required" })}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{`${errors.firstName.message}`}</p>}
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Last Name"
                                    {...register("lastName", { required: "Last name is required" })}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{`${errors.lastName.message}`}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{`${errors.email.message}`}</p>}
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Password"
                                    {...register("password", { required: "Password is required" })}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{`${errors.password.message}`}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Phone</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Phone Number"
                                    {...register("phone", { required: "Phone number is required" })}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{`${errors.phone.message}`}</p>}
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium">Physical Number</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Physical Number"
                                    {...register("physicalNumber", { required: "Physical number is required" })}
                                />
                                {errors.physicalNumber && <p className="text-red-500 text-sm">{`${errors.physicalNumber.message}`}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Role</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Role"
                                    {...register("role", { required: "Role is required" })}
                                />
                                {errors.role && <p className="text-red-500 text-sm">{`${errors.role.message}`}</p>}
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium">Hourly Rate ($)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Hourly Rate"
                                    {...register("hourlyRate", { required: "Hourly rate is required" })}
                                />
                                {errors.hourlyRate && <p className="text-red-500 text-sm">{`${errors.hourlyRate.message}`}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Address</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                placeholder="Enter Address"
                                {...register("address", { required: "Address is required" })}
                            />
                            {errors.address && <p className="text-red-500 text-sm">{`${errors.address.message}`}</p>}
                        </div>

                        {/* Dialog Footer with Action */}
                        <DialogFooter>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Add Employee
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}