import Image from "next/image";
 
const NotificationCard = ({ imageSrc, name, message,id,handleEmpLoan }) => (
    <div className="w-full p-4 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 rounded-lg outline-1 outline-offset-[-1px] outline-gray-100 bg-white">
        <div className="w-full flex items-center gap-3">
            <Image src={imageSrc} alt={name} width={3000} height={3000} className="h-10 w-10 aspect-square rounded-full object-cover" />
            <div className="w-full flex flex-col">
                <h1 className="h-6 text-gray-900 text-base font-semibold font-['Urbanist'] leading-relaxed">{name}</h1>
                <span className="h-5 text-wrap text-slate-500 text-xs font-normal font-['Urbanist'] leading-tight">{message}</span>
            </div>
        </div>
        <div className="flex w-full sm:w-fit sm:flex-col justify-start gap-2.5">
            <button className="px-2.5 py-1.5 flex gap-2.5 bg-red-400 hover:bg-red-400/90 rounded-sm cursor-pointer" onClick={()=>handleEmpLoan(id,false)}>
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5001 18.3332C15.0834 18.3332 18.8334 14.5832 18.8334 9.99984C18.8334 5.4165 15.0834 1.6665 10.5001 1.6665C5.91675 1.6665 2.16675 5.4165 2.16675 9.99984C2.16675 14.5832 5.91675 18.3332 10.5001 18.3332Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.1416 12.3583L12.8583 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.8583 12.3583L8.1416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-white text-sm font-normal font-['Urbanist'] leading-snug">Reject</div>
            </button>
            <button className="px-2.5 py-1.5 flex gap-2.5 bg-sky-300 hover:bg-sky-300/90 rounded-sm cursor-pointer" onClick={()=>handleEmpLoan(id,true)}>
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5001 18.3332C15.0834 18.3332 18.8334 14.5832 18.8334 9.99984C18.8334 5.4165 15.0834 1.6665 10.5001 1.6665C5.91675 1.6665 2.16675 5.4165 2.16675 9.99984C2.16675 14.5832 5.91675 18.3332 10.5001 18.3332Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.95825 9.99993L9.31659 12.3583L14.0416 7.6416" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-white text-sm font-normal font-['Urbanist'] leading-snug">Accept</div>
            </button>
        </div>
    </div>
);
export default NotificationCard