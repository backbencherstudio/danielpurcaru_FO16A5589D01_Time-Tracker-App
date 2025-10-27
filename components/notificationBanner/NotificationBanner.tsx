import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface notification {
    entity_id: string;
    amount: number;
    sender_id: string;
    sender_image: string;
    sender_name: string;
    text: string;
}


type propType={
  notifications: notification[],
  closeNotification: ()=> void;
  handleNewNotification: ()=> void;
}


const NotificationBanner = ({ notifications,closeNotification,handleNewNotification }:propType) => {
  // Function to generate relative time
   
  useEffect(()=>{
    handleNewNotification()
  },[])

  return (
    <div className="w-full bg-white flex flex-col gap-4">
      {/* Notification Header */}
      <div className="text-neutral-800 text-base font-bold leading-relaxed ">Notification</div>

      {/* Notification Content */}
      <div className="w-full flex divide-slate-100 divide-y-1 flex-col overflow-y-auto max-h-[350px]">
        {/* Map through the notifications array */}
        {notifications?.map(nt=>(
          <div className="flex items-center py-5 gap-4">
            <Image className="w-10 h-10 rounded-full" src={nt?.sender_image} alt="Profile" width={40} height={40}/>
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-center">
                <div className="text-neutral-800 text-base font-normal font-['Urbanist'] leading-relaxed">
                  {nt?.sender_name}
                </div>
                {/* <div className="text-zinc-500 text-xs">{ notification.time}</div> */}
              </div>
              <div className="text-zinc-500 text-xs mt-1">{`${nt?.sender_name}  has requested a payment of € ${nt?.amount}`}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Link className="w-full h-12 px-6 py-3 bg-sky-300 rounded-lg flex justify-center items-center" href={'/notification'} onClick={closeNotification}>
        <span className="text-white text-base font-medium">Show All Notifications</span>
      </Link>
    </div>
  )
}

export default NotificationBanner
