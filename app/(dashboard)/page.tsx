'use client'

import DashboardCard from "@/components/reusable/DashboardCard";
import DonutChart from "@/components/Dashboard/DonutChart";
import { Roboto } from 'next/font/google';
import BarChart from "@/components/Dashboard/BarChart";
import EmployeeTable from "@/components/Shared/EmployeeTable";
import ronald from "@/public/images/Employee/ronald.png";
import sanvannah from "@/public/images/Employee/sanvannah.png";
import guy from "@/public/images/Employee/guy.png";
import Jerome from "@/public/images/Employee/Jerome.png";
import theresa from "@/public/images/Employee/theresa.png";
import { useEffect, useState } from "react";
import { UserService } from "@/service/user/user.service";
import { CookieHelper } from "@/helper/cookie.helper";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Choose what you need
  display: 'swap',
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({})
  const [typeOfEmp, setTypeOfEmp] = useState([])
  const [chartData, setChartData] = useState([])
  const [empDataSaved, setEmpDataSaved] = useState(false);


  // token extract helper
  const getCookieToken = () => {
    if (typeof document === "undefined") return null;

    const cookieString = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("empdashtoken="));
    return cookieString?.split("=")[1] || null;
  };


  useEffect(() => {
    const token = getCookieToken();
    // checkAttendance
    const checkAttendance = async () => {
      try {
        const res = await UserService?.checkAttendance();
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching data"
        );
        console.error("Fetch error:", error);
      } finally {
      }
    }
    if (token) {
      checkAttendance();
    }
  }, [])


  useEffect(() => {
    const token = getCookieToken();
    setLoading(true);

    const fetchSummeryData = async () => {
      try {
        if(token){
          const res = await UserService?.getSummary({
          title: "Home",
          href: "/"
        });
        if (res?.data?.success) {
          setCardData(res?.data?.data)
        } else {
          toast.error(res?.response?.data?.message || "Failed to fetch data");
        }
        }
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching data"
        );
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchEmpRoleOverview = async () => {
      const token = getCookieToken();
      try {
        if (token) {
          const res = await UserService?.getEmpRoleOverview({
            title: "Home",
            href: "/"
          });
          if (res?.data?.success) {
            setTypeOfEmp(res.data.data.roles)
          } else {
            toast.error(res?.response?.data?.message || "Failed to fetch data");
          }
        }
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching data"
        );
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }


    const fetchAttendanceReport = async () => {
      const token = getCookieToken();
      try {
        if (token) {
          const res = await UserService?.getAttendanceReport({
            title: "Home",
            href: "/"
          });
          if (res?.data?.success) {
            setChartData(res.data.data)
          } else {
            toast.error(res?.response?.data?.message || "Failed to fetch data");
          }
        }
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching data"
        );
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    const fetchEmpData = async () => {
      const token = getCookieToken();
      try {
        if (token) {
          const res = await UserService?.getEmpData(5);
          if (res?.data?.success) {
            // console.log("Response:", res.data.data);
            setEmpData(res.data.data)
          } else {
            toast.error(res?.response?.data?.message || "Failed to fetch data");
          }
        }
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching data"
        );
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAttendanceReport();
    fetchEmpRoleOverview();
    fetchSummeryData();
    fetchEmpData();
  }, [empDataSaved]);

  const [empData, setEmpData] = useState([]);
  // [
  //   [1, ronald, "Ronald Richards", "Baker", 10, 160],
  //   [2, sanvannah, "Savannah Nguyen", "Handyman", 15, 140],
  //   [3, guy, "Guy Hawkins", "Electrician", 14, 168],
  //   [4, Jerome, "Jerome Bell", "Handyman", 18, 152],
  //   [5, theresa, "Theresa Webb", "Electrician", 10, 142],
  // ];
  const typeOfEmpColor = ["#F59E0B", "#3B82F6", "#14B8A6"]

  // console.log("Fetch data ", empData)


  const handleEmpDataSaved = () => {
    console.log("Emp update saved...")
    setEmpDataSaved(prev => !prev)
  }

  return (
    <div className="space-y-4">
      <Toaster position="top-right" />
      <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {loading && <div className="text-lg font-medium">Loading...</div>}
        {Object.entries(cardData || {})?.map((card, index) => <DashboardCard key={index} title={card[0]} value={card[1]} />)}
      </div>
      {!loading && <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-fit bg-white flex flex-col items-center justify-center rounded-lg">
          <div className="md:px-[56px] py-6 bg-white w-fit rounded-lg">
            <DonutChart typeOfEmp={typeOfEmp} title="Total Emp." />
          </div>
          <div className="px-6 space-y-[6px] w-full">
            <div className={`flex justify-between py-[6px] border-b border-[#D4D4D4] ${roboto.className}`}>
              <span className="text-[#737373] text-[14px] font-medium">Status</span>
              <span className="text-[#737373] text-[14px] font-medium">%</span>
            </div>
            <div className="pb-6">
              {typeOfEmp.map((emp, index: number) => <div key={index} className="flex justify-between py-[6px]">
                <div className="flex items-center gap-3">
                  <div className={`w-[12px] h-[12px] rounded-full bg-[${typeOfEmpColor[index]}]`}></div>
                  <h3 className={`${roboto.className} text-[14px] text-[#404040]`}>{emp.role}</h3>
                </div>
                <div className={`text-[#0A0A0A] text-[14px] font-medium ${roboto.className}`}>{emp.percent}%</div>
              </div>)}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg">
          <BarChart newData={chartData} />
        </div>
      </div>}
      {!loading && <div className="bg-white rounded-lg p-5 space-y-6">
        <div className="flex justify-between">
          <h3 className="text-[#1D1F2C] text-[24px] font-semibold">Employees</h3>
          <Link href="/employees" className="text-base font-medium text-[#82C8E5]  px-[16px] py-[11px] border rounded-lg cursor-pointer">See More</Link>
        </div>
        <EmployeeTable empData={empData} empDataSaved={empDataSaved} handleEmpDataSaved={handleEmpDataSaved} showPage={false} />
      </div>}
    </div>
  );
}
