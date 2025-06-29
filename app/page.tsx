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

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Choose what you need
  display: 'swap',
});

export default function Home() {
  const cardData = [
    ["Total Employee", 2500],
    ["Total Hours", 1540],
    ["Labor Cost", 3540],
    ["Active Project", 10]
  ]
      const empData = [
        [1, ronald, "Ronald Richards", "Baker", 10, 160],
        [2, sanvannah, "Savannah Nguyen", "Handyman", 15, 140],
        [3, guy, "Guy Hawkins", "Electrician", 14, 168],
        [4, Jerome, "Jerome Bell", "Handyman", 18, 152],
        [5, theresa, "Theresa Webb", "Electrician", 10, 142],
    ];
  const typeOfEmp = [[500, 700, 900], ["Baker", "Handyman", "Electrician"],["#F59E0B", "#3B82F6", "#14B8A6"]]


  const totalEmp:any = typeOfEmp[0].reduce(
    (sum: number, item: number): number => {
      return sum + item;
    },
    0 // Initial value is 0
  );

  // Calculate the percentage for each element in typeOfEmp[0]
  const percentEmp = typeOfEmp[0].map((emp) => {
    return ((emp / totalEmp) * 100).toFixed(2)  // Calculating percentage of each value in the array
  });


  return (
    <div className="space-y-4">
      <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cardData?.map((card, index) => <DashboardCard key={index} title={card[0]} value={card[1]} />)}
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
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
              {typeOfEmp[1].map((emp,index:number)=><div key={index} className="flex justify-between py-[6px]">
                <div className="flex items-center gap-3">
                  <div className={`w-[12px] h-[12px] rounded-full bg-[${typeOfEmp[2][index]}]`}></div>
                  <h3 className={`${roboto.className} text-[14px] text-[#404040]`}>{emp}</h3>
                </div>
                <div className={`text-[#0A0A0A] text-[14px] font-medium ${roboto.className}`}>{percentEmp[index]}%</div>
              </div>)}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg">
          <BarChart />
        </div>
      </div>
      <div className="bg-white rounded-lg p-5 space-y-6">
        <div className="flex justify-between">
          <h3 className="text-[#1D1F2C] text-[24px] font-semibold">Employees</h3>
          <button className="text-base font-medium text-[#82C8E5]  px-[16px] py-[11px] border rounded-lg cursor-pointer">See More</button>
        </div>
        <EmployeeTable empData={empData} start={0} end={5}/>
      </div>
    </div>
  );
}
