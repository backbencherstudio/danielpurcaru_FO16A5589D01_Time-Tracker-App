'use client'

import Image from "next/image";
import NotificationCard from "./NotificationCard";
// import Profilepic from '@/public/images/Employee/ronald.png';
// import Profilepic2 from '@/public/images/Employee/sanvannah.png';
// import Profilepic3 from '@/public/images/profileIcon.png';
import { UserService } from "@/service/user/user.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface loanData {
  created_at: string,
  id: string,
  loan_amount: string,
  loan_status: string,
  notes: string,
  user: userType,
  user_id: string,
}

interface userType {
  avatar: string,
  avatarUrl: string,
  id: string,
  name: string
}


// const notifications = [
//   {
//     imageSrc: Profilepic3,
//     name: "Kathryn Murphy",
//     message: "Kathryn Murphy has requested a payment of $150",
//   },
//   {
//     imageSrc: Profilepic,
//     name: "Leslie Alexander",
//     message: "Leslie Alexander has requested a payment of $150",
//   },
//   {
//     imageSrc: Profilepic2,
//     name: "Leslie Murphy",
//     message: "Leslie Murphy has requested a payment of $150",
//   },
//   {
//     imageSrc: Profilepic3,
//     name: "Kathryn Murphy",
//     message: "Kathryn Murphy has requested a payment of $150",
//   },
// ];


export default function Page() {

  const [empLoanData, setEmpLoanData] = useState<loanData[]>();


  const handleEmpLoan = (id: string, status: boolean)=>{

    const newData = empLoanData.map(loan => {
      if (loan.id === id) {
        if(status){
          loan.loan_status = "ACCEPTED"
        }else{
          loan.loan_status = "REJECTED"
        }
      }
      return loan;
    })

    setEmpLoanData(newData)

    console.log("Updated loan : ",newData);
  }

  useEffect(() => {
    const fetchEmpData = async () => {
      try {
        const res = await UserService?.getEmpLoanData();
        if (res?.data?.success) {
          console.log("Response load :", res.data.data);
          setEmpLoanData(res.data.data)
        } else {
          toast.error(res?.response?.data?.message || "Failed to fetch data");
        }
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching data"
        );
        console.error("Fetch error:", error);
      } finally {
        // setLoading(false);
      }
    }
    fetchEmpData()
  }, [])
  return (
    <div className="p-5 bg-gradient-to-l from-white/60 to-white rounded-2xl">
      <div className="flex flex-col gap-8">
        <div>
          <div className="justify-start text-neutral-800 text-2xl font-semibold font-['Urbanist'] leading-9">
            Notification
          </div>
          <div className="self-stretch justify-start text-zinc-500 text-base font-normal font-['Urbanist'] leading-relaxed">
            All Notifications
          </div>
        </div>

        {/* Map through the notifications array */}
        {empLoanData?.filter(emp => emp.loan_status.toLowerCase() === "pending").map((notification, index) => (
          <NotificationCard
            key={index}
            imageSrc={notification?.user?.avatarUrl}
            name={notification?.user?.name}
            id={notification.id}
            handleEmpLoan={handleEmpLoan}
            message={`${notification.user.name}  has requested a payment of $ ${notification.loan_amount}`}
          />
        ))}
      </div>
    </div>
  );
}

