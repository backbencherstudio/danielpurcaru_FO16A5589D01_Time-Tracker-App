'use client'
 
 import React, { useState } from 'react'


const RecoveryPage = () => {
     
    return (
        <div id='RecoveryPage' className=' mx-auto  min-h-screen justify-center w-full  px-5 py-6 md:px-10 md:py-8  lg:px-[100px] lg:py-[60px] flex flex-col   '>
            {/* input form */}
            <div className='flex w-full flex-col gap-6 md:max-w-[485px]'>

                <div className='flex flex-col gap-4'>
                    <h1 className="text-neutral-800 text-3xl font-semibold font-['Urbanist'] leading-10">Recovery Password</h1>
                    <p className="text-neutral-600 text-base font-normal font-['Urbanist'] leading-relaxed "> We will send a new password to your account from email, to help recover your account.</p>
                </div>
                <div className='flex flex-col gap-2.5'>
                    <label htmlFor="email" className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug"> Email</label>
                    <input id='email' type="text" placeholder='Enter your Email' className="px-5 py-4  outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl" />
                </div>

                <button className='w-full p-4 bg-sky-300 hover:bg-sky-300/70 rounded-xl inline-flex justify-center items-center'><span className="justify-start text-white text-base font-medium font-['Urbanist'] leading-relaxed">Submit</span></button>
            </div>

        </div>
    )
}

export default RecoveryPage
