'use client'

import { useState, useContext, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTrigger } from '../ui/dialog';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'; // Importing Heroicons for eye icon
import { UserService } from '@/service/user/user.service';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { useEmpData } from '@/context/EmpDataContext';
import { Form, useForm } from 'react-hook-form';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

interface Employee {
    id: string;
    first_name: string;
    last_name: string;
    name: string;
    employee_role: string;
    hourly_rate: string;
    avatarUrl: string;
    email: string;
    phone: string;
    phone_number: string;
    physical_number: string;
    address: string;
}


type formData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    physicalNumber: string;
    role: string;
    hourlyRate: string;
    address: string;
}


type propType = {
    isOpen: boolean;
    handleDialogToggle: () => void;
    empId: string;
}

export default function EditEmployeeDialog({ isOpen, handleDialogToggle, empId }: propType) {
    const { handleSubmit, register, formState: { errors }, setValue } = useForm<formData>();
    const { fetchEmpData, handleEmpDataSaved } = useEmpData();
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState<string>('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [empData, setEmpData] = useState<Employee>();
    const [fetching, setFetching] = useState(false);

    const fetchSingleEmpData = async () => {
        setFetching(true);
        try {
            const res = await UserService?.getSingleEmpData({id:empId});
            console.log("Response : ", res);
            if (res?.data?.success) {
                setEmpData(res?.data?.data);
            }
        } catch (err) {
            console.log(err);
        }
        finally {
            setFetching(false);
        }
    }

    const handleFormSubmit = async (data: formData) => {
        const fd = new FormData();
        { data?.firstName && fd.append('first_name', data?.firstName) }
        { data?.lastName && fd.append('last_name', data?.lastName) }
        { data?.phone && fd.append('phone_number', data?.phone) }
        { data?.address && fd.append('address', data?.address) };
        { data?.physicalNumber && fd.append('physical_number', data?.physicalNumber) }
        { data?.password && fd.append('password', data?.password) }
        { data?.hourlyRate && fd.append('hourly_rate', data?.hourlyRate) };
        { data?.role && fd.append('employee_role', data?.role) }
        { avatarFile && fd.append('avatar', avatarFile) }
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

    useEffect(() => {
        fetchSingleEmpData()
    }, [])

    useEffect(() => {
        if (empData) {
            setValue('address', empData?.address);
            setValue('firstName', empData?.first_name);
            setValue('lastName', empData?.last_name);
            setValue('email', empData?.email);
            setValue('hourlyRate', empData?.hourly_rate);
            setValue('phone', empData?.phone_number);
            setValue('physicalNumber', empData?.physical_number);
            setValue('role', empData?.employee_role);
            setAvatar(empData?.avatarUrl);
        }
    }, [empData])

    return (
        <div className="p-6">
            <Toaster position="top-right" />
            <Dialog open={isOpen} onOpenChange={handleDialogToggle}>
                <DialogContent className="max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <h3 className="text-xl font-semibold">Edit Employee</h3>
                    </DialogHeader>

                    {/* Employee Form Fields */}
                    {fetching ?
                        <div className='w-full h-full flex items-center justify-center'>
                            <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#82C8E5]"></div>
                        </div>
                        :
                        <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="flex w-[100px] aspect-square justify-center items-center border-dashed border-2 border-gray-400 rounded-full mb-6">
                                <label htmlFor="img" className="text-gray-500 text-sm w-full h-full cursor-pointer flex justify-center items-center">
                                    <Image src={avatar} alt="Upload" width={500} height={500} className='w-full h-full rounded-full' />
                                </label>
                                <input
                                    type="file"
                                    name="img"
                                    id="img"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
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
                                        disabled
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg opacity-40 cursor-not-allowed"
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
                                    <div className="relative">
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg pr-10"
                                            placeholder="Enter Password"
                                            {...register("password", { required: false })}
                                        />
                                        <button
                                            type="button"
                                            className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 mt-2"
                                            onClick={() => setPasswordVisible(prev => !prev)}
                                        >
                                            {passwordVisible ?
                                                <FaEyeSlash />
                                                :
                                                <FaEye />
                                            }
                                        </button>
                                    </div>
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
                                        inputMode='numeric'
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                        placeholder="Enter Hourly Rate"
                                        {...register('hourlyRate', {
                                            required: true,
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: "Hourly rate is required"
                                            },
                                            onChange: (e) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                            }
                                        })}
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
                                    type='submit'
                                    className="w-full py-2 cursor-pointer bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    {!loading ? "Save" : "Loading..."}
                                </button>
                            </DialogFooter>
                        </form>}
                </DialogContent>
            </Dialog>
        </div>
    );
}
