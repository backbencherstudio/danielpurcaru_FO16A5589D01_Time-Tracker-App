import React from 'react'
import profile from '@/public/images/profileIcon.png'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

const NotificationBanner = () => {
    // Function to generate relative time
    const getRelativeTime = (date: Date) => {
        return formatDistanceToNow(date, { addSuffix: true }) // Formats as 'x minutes ago' or 'about x hours ago'
    }

    const currentTime = new Date(); // Replace this with the actual time when the notification was created

    return (
        <div className="w-full bg-white flex flex-col gap-4">
            {/* Notification Header */}
            <div className="text-neutral-800 text-base font-bold leading-relaxed ">Notification</div>

            {/* Notification Content */}
            <div className="w-full flex divide-slate-100 divide-y-1 flex-col">
                <div className="flex items-center py-5 gap-4">
                    {/* Profile Image */}
                    <Image className="w-10 h-10 rounded-full" src={profile} alt="Profile" />

                    {/* Notification Content */}
                    <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-center">
                            {/* Name & Time */}
                            <div className="text-neutral-800 text-base font-normal font-['Urbanist'] leading-relaxed">Marvin McKinney</div>
                            <div className="text-zinc-500 text-xs">{getRelativeTime(currentTime)}</div>
                        </div>

                        {/* Message */}
                        <div className="text-zinc-500 text-xs mt-1">Ronald Richards has requested a payment of $150</div>
                    </div>
                </div>

                {/* Repeat for other notifications */}
                <div className="flex items-center py-5 gap-4">
                    <Image className="w-10 h-10 rounded-full" src={profile} alt="Profile" />
                    <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-center">
                            <div className="text-neutral-800 text-base font-normal font-['Urbanist'] leading-relaxed">Marvin McKinney</div>
                            <div className="text-zinc-500 text-xs">{getRelativeTime(currentTime)}</div>
                        </div>
                        <div className="text-zinc-500 text-xs mt-1">Ronald Richards has requested a payment of $150</div>
                    </div>
                </div>

                <div className="flex items-center py-5 gap-4">
                    <Image className="w-10 h-10 rounded-full" src={profile} alt="Profile" />
                    <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-center">
                            <div className="text-neutral-800 text-base font-normal font-['Urbanist'] leading-relaxed">Marvin McKinney</div>
                            <div className="text-zinc-500 text-xs">{getRelativeTime(currentTime)}</div>
                        </div>
                        <div className="text-zinc-500 text-xs mt-1">Ronald Richards has requested a payment of $150</div>
                    </div>
                </div>

                <div className="flex items-center py-5 gap-4">
                    <Image className="w-10 h-10 rounded-full" src={profile} alt="Profile" />
                    <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-center">
                            <div className="text-neutral-800 text-base font-normal font-['Urbanist'] leading-relaxed">Marvin McKinney</div>
                            <div className="text-zinc-500 text-xs">{getRelativeTime(currentTime)}</div>
                        </div>
                        <div className="text-zinc-500 text-xs mt-1">Ronald Richards has requested a payment of $150</div>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <Link className="w-full h-12 px-6 py-3 bg-sky-300 rounded-lg flex justify-center items-center" href={'/notification'}>
                <span className="text-white text-base font-medium">Show All Notifications</span>
            </Link>
        </div>
    )
}

export default NotificationBanner
 