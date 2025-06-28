'use client'
import { Eye, EyeOff } from 'lucide-react';

import Link from 'next/link'
import React, { useState } from 'react'


const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };
    return (
        <div id='LoginPage' className=' mx-auto  min-h-screen  w-full  px-5 py-6 md:px-10 md:py-8  lg:px-[100px] lg:py-[60px] flex flex-col justify-between  '>
            <h1 className="text-neutral-800 text-2xl font-bold font-['Urbanist'] leading-10 tracking-tight ">Company Name</h1>
            {/* input form */}
            <div className='flex w-full flex-col gap-6 md:max-w-[485px]'>
                <h1 className="text-neutral-800 text-3xl font-semibold font-['Urbanist'] leading-10">Welcome</h1>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2.5'>
                        <label htmlFor="username" className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug"> Username</label>
                        <input id='username' type="text" placeholder='Enter your username' className="px-5 py-4  outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl" />
                    </div>

                    <div className="flex flex-col gap-2.5">
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
                                className="px-5 py-4 w-full "
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
                    <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <input id='rememberMe' type="checkbox" className='' />
                            <label htmlFor="rememberMe" className="text-zinc-500 text-sm font-normal font-['Urbanist'] leading-snug ">Remember me</label>
                        </div>
                        <Link href={'//'} className=" text-sky-300 text-sm font-medium font-['Urbanist'] leading-snug" >Recovery Password ? </Link>

                    </div>
                </div>
                <button className='w-full p-4 bg-sky-300 rounded-xl inline-flex justify-center items-center'><span className="justify-start text-white text-base font-medium font-['Urbanist'] leading-relaxed">Login</span></button>
            </div>
            <span className="text-zinc-500 text-base font-normal font-['Urbanist'] leading-relaxed">Don't have an account yet? <Link href={''} className="text-neutral-800 text-base font-semibold font-['Urbanist'] leading-relaxed">Sign up now</Link></span>

        </div>
    )
}

export default LoginPage
