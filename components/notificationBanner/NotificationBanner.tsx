import React from 'react'

const NotificationBanner = () => {
    return (
        <div className="w-96 p-4 bg-white rounded-xl shadow-[5px_5px_50px_0px_rgba(26,32,44,0.06)] inline-flex flex-col justify-center items-start gap-4">
            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                <div className="flex-1 justify-start text-neutral-800 text-base font-bold font-['Urbanist'] leading-relaxed">Notification</div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch flex flex-col justify-center items-center">
                    <div className="self-stretch px-4 py-5 inline-flex justify-start items-center gap-3 overflow-hidden">
                        <img className="w-10 h-10 rounded-full" src="https://placehold.co/40x40" />
                        <div className="flex-1 inline-flex flex-col justify-center items-start">
                            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                <div className="flex-1 h-6 justify-center text-neutral-800 text-base font-normal font-['Urbanist'] leading-relaxed">Marvin McKinney</div>
                                <div className="text-right justify-center text-zinc-500 text-xs font-normal font-['Urbanist'] leading-snug">Now</div>
                            </div>
                            <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                <div className="flex-1 h-5 justify-center text-zinc-500 text-xs font-normal font-['Urbanist'] leading-tight">Ronald Richards has requested a payment of $150</div>
                            </div>
                        </div>
                    </div>
                    <div data-darkmode="No" data-transparant="No" className="self-stretch h-px p-2.5 bg-slate-50" />
                </div>
                 
            </div>
            <div className="self-stretch h-12 px-6 py-5 bg-sky-300 rounded-lg inline-flex justify-center items-center gap-2">
                <div className="text-center justify-start text-white text-base font-medium font-['Urbanist'] leading-relaxed">Show All Notification</div>
            </div>
        </div>
    )
}

export default NotificationBanner
