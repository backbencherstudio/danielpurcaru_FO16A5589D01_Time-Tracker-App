'use client'

import { Controller, Form, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff, Plus } from 'lucide-react';

export default function page() {
    const { handleSubmit, control, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };
    const togglePasswordVisibility2 = () => {
        setShowPassword2(prevState => !prevState);
    };

    const onSubmit = (data) => {
        console.log(data);
        // handle form submission logic here
    };
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <div className='p-8 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-indigo-50  flex flex-col justify-center  gap-12'>
            <form className=' flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
                <div className="w-20 aspect-square bg-slate-100 rounded-full relative" >
                    <button  className='absolute bottom-[2px] right-[2px] bg-sky-300 text-white rounded-full hover:bg-sky-300/70'>
                        <Plus className='stroke-3  ' />
                    </button>
                </div>
                <div className='   flex flex-col sm:flex-row gap-4'>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Full Name
                        </label>
                        <Controller
                            name="fullName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="projectname"
                                    className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                />
                            )}
                        />
                    </div>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Email
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="email"
                                    className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className='w-full  flex flex-col sm:flex-row gap-4'>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Phone No*
                        </label>
                        <Controller
                            name="PhoneNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="PhoneNo"
                                    className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                />
                            )}
                        />
                    </div>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Date of Birth*
                        </label>
                        <Controller
                            name="DateOfBirth"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="date"
                                    id="DateOfBirth"
                                    className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className='w-full  flex flex-col sm:flex-row gap-4'>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Country*
                        </label>
                        <Controller
                            name="country"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <select
                                    {...field}
                                    id="country"
                                    className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                >
                                    <option value="">Select an Option</option>
                                    <option value="USA">USA</option>
                                    <option value="medium">New 1</option>
                                    <option value="low">New 2</option>
                                </select>
                            )}
                        />
                    </div>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            State*
                        </label>
                        <Controller
                            name="State"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <select
                                    {...field}
                                     id="State"
                                    className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                >
                                    <option value="">Select a State</option>
                                    <option value="USA">New York</option>
                                    <option value="Callifornia">Callifornia</option>
                                    <option value="Texas">Texas</option>
                                </select>
                            )}
                        />
                    </div>
                </div>
                {/* city address zip */}
                <div className='w-full  flex flex-col sm:flex-row gap-4'>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            City*
                        </label>
                        <Controller
                            name="City"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <select
                                    {...field}
                                     id="City"
                                    className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                >
                                    <option value="">Select an Option</option>
                                    <option value="USA">New York</option>
                                    <option value="medium">New 1</option>
                                    <option value="low">New 2</option>
                                </select>
                            )}
                        />
                    </div>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Address*
                        </label>
                        <Controller
                            name="Address"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="Address"
                                    className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                />
                            )}
                        />
                    </div>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Zip Code
                        </label>
                        <Controller
                            name="zipCode"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    id="zipCode"
                                    className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                />
                            )}
                        />
                    </div>
                </div>
                {/* paasword */}
                <div className='w-full flex flex-col sm:flex-row gap-4'>
                    <div className="w-full flex flex-col gap-2.5">
                        <label
                            htmlFor="password"
                            className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug"
                        >
                            Password
                        </label>
                        <div className="flex items-center outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="px-5 py-4 w-full outline-0   "
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="p-2 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2.5">
                        <label
                            htmlFor="password"
                            className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug"
                        >
                            Confirm Password
                        </label>
                        <div className="flex items-center outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl">
                            <input
                                id="password"
                                type={showPassword2 ? "text" : "password"}
                                placeholder="Enter your password"
                                className="px-5 py-4 w-full  outline-0 "
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility2}
                                className="p-2 cursor-pointer"
                            >
                                {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                </div>
                <button
                    type="submit"
                    className="w-fit cursor-pointer h-12 px-6  bg-sky-300 hover:bg-sky-300/70 rounded-md  text-white text-sm font-medium font-['Urbanist'] leading-relaxed"
                >
                    Save Changes
                </button>

            </form>
        </div>
    )
}