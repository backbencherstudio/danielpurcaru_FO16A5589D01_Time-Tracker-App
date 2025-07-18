'use client'
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { CookieHelper } from '@/helper/cookie.helper';
import { UserService } from '@/service/user/user.service';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

type FormValues = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

const LoginPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        try {
            const res = await UserService.login({
                email: data.email,
                password: data.password
            });

            if (res?.data?.success) {
                const token = res.data.authorization?.token;
                console.log(res)
                if (token) {
                    CookieHelper.set({
                        key: "empdashtoken",
                        value: token,
                        expires: data.rememberMe ? 7 : undefined

                    });
                    toast.success(res.data.message);
                    router.push("/");
                }
            } else {
                toast.error(res?.response?.data?.message || "Login failed");
            }
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "An error occurred during login"
            );
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id='LoginPage' className='mx-auto min-h-screen w-full px-5 py-6 md:px-10 md:py-8 lg:px-[100px] lg:py-[60px] flex flex-col justify-between'>
            <h1 className="text-neutral-800 text-2xl font-bold font-['Urbanist'] leading-10 tracking-tight">
                Company Name
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col gap-6 md:max-w-[485px]'>
                <h1 className="text-neutral-800 text-3xl font-semibold font-['Urbanist'] leading-10">
                    Welcome
                </h1>

                <div className='flex flex-col gap-4'>
                    {/* Email Field */}
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="email" className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug">
                            Email
                        </label>
                        <input
                            id='email'
                            type="text"
                            placeholder='Enter your email'
                            className="px-5 py-4 outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="password" className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug">
                            Password
                        </label>
                        <div className="flex items-center outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="px-5 py-4 w-full outline-0"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="p-2 cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-xs">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            <input
                                id='rememberMe'
                                type="checkbox"
                                {...register("rememberMe")}
                                className='h-4 w-4 accent-sky-300'
                            />
                            <label htmlFor="rememberMe" className="text-zinc-500 text-sm font-normal font-['Urbanist'] leading-snug">
                                Remember me
                            </label>
                        </div>
                        <Link
                            href='/recovery'
                            className="text-sky-300 text-sm font-medium font-['Urbanist'] leading-snug hover:text-sky-400 transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full p-4 bg-sky-300 hover:bg-sky-300/70 rounded-xl inline-flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed transition-opacity'
                >
                    <span className="text-white text-base font-medium font-['Urbanist'] leading-relaxed">
                        {loading ? "Loading..." : "Login"}
                    </span>
                </button>
            </form>

            {/* Sign Up Link */}
            <span className="text-zinc-500 text-base font-normal font-['Urbanist'] leading-relaxed">
                Don't have an account yet?{' '}
                <Link
                    href='/registerpage'
                    className="text-neutral-800 text-base font-semibold font-['Urbanist'] leading-relaxed hover:text-neutral-700 transition-colors"
                >
                    Sign up now
                </Link>
            </span>
        </div>
    )
}

export default LoginPage