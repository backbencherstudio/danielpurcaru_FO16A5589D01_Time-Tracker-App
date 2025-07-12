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
    let totalValue: string = value;
    if (value.toString().length >= 7) {
        totalValue = `${value.toString().slice(0,2)},${value.toString().slice(2,4)},${value.toString().slice(4)}`

    }
    else if (value.toString().length === 6) {
        totalValue = `${value.toString().slice(0, 3)},${value.toString().slice(3)}`
    } else if (value.toString().length === 5) {
        totalValue = `${value.toString().slice(0, 2)},${value.toString().slice(2)}`
    }
    else if (value.toString().length > 3) {
        totalValue = `${value.toString()[0]},${value.toString().slice(1)}`
    }
    return (
        <div className="space-y-4 p-6 bg-white rounded-lg text-center">
            <h3 className="text-[#4A4C56] text-base font-semibold">{summeryData[title]}</h3>
            <h4 className={`text-[#1D1F2C] text-[32px] font-semibold ${poppins.className}`}>{totalValue}</h4>
        </div>
    )
}