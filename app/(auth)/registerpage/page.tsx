'use client'
import { Eye, EyeOff } from 'lucide-react';
import { UserService } from '@/service/user/user.service';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

type FormValues = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterPage = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const password = watch("password", "");

    const validatePassword = (value: string) => {
        if (!value) return "Password is required";
        if (!PASSWORD_REGEX.test(value)) {
            return "Password must contain: 1 uppercase, 1 lowercase, 1 number, 1 special character (@$!%*?&), and be at least 8 characters";
        }
        return true;
    };

    const validateConfirmPassword = (value: string) => {
        if (!value) return "Please confirm your password";
        if (value !== password) return "Passwords do not match";
        return true;
    };

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        try {
            const res = await UserService?.register({
                username: data.username,
                email: data.email,
                password: data.password
            });

            if (res?.data?.success) {
                toast.success(res.data.message);
                localStorage.setItem("verifyemail", data.email);
                // router.push("/verify-email");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }else{
                toast.error(res.data.message)
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id='RegisterPage' className='mx-auto min-h-screen w-full px-5 py-6 md:px-10 md:py-8 lg:px-[100px] lg:py-[60px] flex flex-col justify-between'>
             <Toaster position="top-right" />
            <h1 className="text-neutral-800 text-2xl font-bold font-['Urbanist'] leading-10 tracking-tight">Company Name</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col gap-6 md:max-w-[485px]'>
                <h1 className="text-neutral-800 text-3xl font-semibold font-['Urbanist'] leading-10">Register</h1>
                
                <div className='flex flex-col gap-4'>
                    {/* Username Field */}
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="username" className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug">Name</label>
                        <input
                            id='username'
                            {...register("username", { required: "Name is required" })}
                            placeholder='Enter your name'
                            className="px-5 py-4 outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl"
                        />
                        {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
                    </div>

                    {/* Email Field */}
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="email" className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug">Email</label>
                        <input
                            id='email'
                            type='email'
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            placeholder='Enter your email'
                            className="px-5 py-4 outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl"
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="password" className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug">Password</label>
                        <div className="flex items-center outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register("password", { validate: validatePassword })}
                                placeholder="Enter your password"
                                className="px-5 py-4 w-full outline-0"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="p-2 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="confirmPassword" className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug">Confirm Password</label>
                        <div className="flex items-center outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword", { validate: validateConfirmPassword })}
                                placeholder="Confirm your password"
                                className="px-5 py-4 w-full outline-0"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="p-2 cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className='w-full p-4 bg-sky-300 hover:bg-sky-300/70 rounded-xl inline-flex justify-center items-center disabled:opacity-70'
                >
                    <span className="justify-start text-white text-base font-medium font-['Urbanist'] leading-relaxed">
                        {loading ? "Loading..." : "Register"}
                    </span>
                </button>
            </form>

            <span className="text-zinc-500 text-base font-normal font-['Urbanist'] leading-relaxed">
                Already have an account? <Link href={'/login'} className="text-neutral-800 text-base font-semibold font-['Urbanist'] leading-relaxed">Login now</Link>
            </span>
        </div>
    )
}

export default RegisterPage