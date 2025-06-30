'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const OTPPage = () => {
    // Initial time is 2 minutes and 30 seconds (150 seconds)
    const [timeLeft, setTimeLeft] = useState(150);
    const [isExpired, setIsExpired] = useState(false);

    const [otp, setOtp] = useState(['', '', '', '']); // Array for OTP digits

    // Handle the countdown
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true); // Time expired, so we enable "Resend"
            return;
        }

        // Set an interval to count down every second
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        // Clear the interval when the component unmounts or when time reaches zero
        return () => clearInterval(interval);
    }, [timeLeft]);

    // Format time in mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    // Handle OTP input change and focus navigation
    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return; // Prevent non-numeric input

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Focus on next input after typing a digit
        if (value && index < otp.length - 1) {
            const nextInput = document.getElementById(`input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    // Handle backspace and focus on previous input
    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            // Focus on the previous input if the current one is empty
            if (index > 0) {
                const prevInput = document.getElementById(`input-${index - 1}`);
                if (prevInput) prevInput.focus();
            }
        }
    };

    const handleResend = () => {
        // Reset timer and states for a new OTP request
        setIsExpired(false);
        setTimeLeft(5);  // Reset to 2:30
     };

    // Check if the OTP is fully filled
    const isOtpComplete = otp.every((digit) => digit !== '');

    return (
        <div id='OTPPage' className='mx-auto min-h-screen justify-center w-full px-5 py-6 md:px-10 md:py-8 lg:px-[100px] lg:py-[60px] flex flex-col'>
            {/* OTP form */}
            <div className='flex w-fit mx-auto flex-col gap-6 md:max-w-[485px]'>
                <div className='flex flex-col gap-4'>
                    <h1 className="text-neutral-800 text-3xl font-semibold font-['Urbanist'] leading-10">Verification OTP</h1>
                    <p className="text-neutral-600 text-base font-normal font-['Urbanist'] leading-relaxed">
                        Enter the verification code we just sent to your email address
                    </p>
                </div>

                <div className='flex gap-2 sm:gap-4'>
                    {/* OTP Input Fields */}
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`input-${index}`}
                            value={digit}
                            className="bg-indigo-50/30 rounded-md outline-[1.50px] outline-offset-[-1.50px] outline-sky-300 w-full max-w-24 aspect-square px-4 py-3 inline-flex justify-center items-center text-center text-sky-300 text-2xl font-semibold font-['Inter'] leading-loose"
                            maxLength={1}
                            placeholder='_'
                            onChange={(e) => handleOtpChange(e, index)} // Change focus to the next field
                            onKeyDown={(e) => handleOtpKeyDown(e, index)} // Handle backspace
                        />
                    ))}
                </div>

                <button
                    disabled={!isOtpComplete || isExpired} // Disable if OTP is incomplete or expired
                    className={`w-full p-4 rounded-xl inline-flex justify-center items-center ${
                        !isOtpComplete   ? 'bg-red-300 cursor-not-allowed' : 'bg-sky-300 hover:bg-sky-300/70'
                    }`}
                >
                    <span className="justify-start text-white text-base font-medium font-['Urbanist'] leading-relaxed">Verify</span>
                </button>

                <div className="resend-code">
                    {isExpired ? (
                        <Link
                            className="text-zinc-900 text-base font-normal font-['Urbanist'] leading-relaxed"
                            href={''}
                            onClick={handleResend} // Reset timer and resend OTP
                        >
                            Resend code
                        </Link>
                    ) : (
                        <div className='flex justify-between'>
                            <span className="text-zinc-900 text-base font-normal font-['Urbanist'] leading-relaxed">Resend code in</span>
                            <span className="text-zinc-900 text-base font-normal font-['Urbanist'] leading-relaxed text-right">{formatTime(timeLeft)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OTPPage;
