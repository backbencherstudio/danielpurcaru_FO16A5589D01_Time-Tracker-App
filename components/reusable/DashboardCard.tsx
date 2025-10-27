import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // Choose what you need
    display: 'swap',
});

const summeryData={
    totalEmployee:"Total Employee",
    totalHours: "Total Hours",
    laborCost: "Labor Cost",
    activeProject: "Active Project"
}

export default function DashboardCard({ title, value }) {
    return (
        <div className="space-y-4 p-6 bg-white rounded-lg text-center">
            <h3 className="text-[#4A4C56] text-base font-semibold">{summeryData[title]}</h3>
            <h4 className={`text-[#1D1F2C] text-[24px] font-semibold ${poppins.className}`}>{title === "laborCost"?`€ ${value.toFixed(2)}`:value}</h4>
        </div>
    )
}