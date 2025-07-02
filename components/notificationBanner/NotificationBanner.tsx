import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

const NotificationBanner = ({ notifications }) => {
  // Function to generate relative time
   

  return (
    <div className="w-full bg-white flex flex-col gap-4">
      {/* Notification Header */}
      <div className="text-neutral-800 text-base font-bold leading-relaxed ">Notification</div>

      {/* Notification Content */}
      <div className="w-full flex divide-slate-100 divide-y-1 flex-col">
        {/* Map through the notifications array */}
        {notifications.map((notification, index) => (
          <div className="flex items-center py-5 gap-4" key={index}>
            <Image className="w-10 h-10 rounded-full" src={notification.imageSrc} alt="Profile" />
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-center">
                <div className="text-neutral-800 text-base font-normal font-['Urbanist'] leading-relaxed">
                  {notification.name}
                </div>
                <div className="text-zinc-500 text-xs">{ notification.time}</div>
              </div>
              <div className="text-zinc-500 text-xs mt-1">{notification.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Link className="w-full h-12 px-6 py-3 bg-sky-300 rounded-lg flex justify-center items-center" href={'/notification'}>
        <span className="text-white text-base font-medium">Show All Notifications</span>
      </Link>
    </div>
  )
}

export default NotificationBanner
