'use client'
import { ApexOptions } from "apexcharts";
import dynamic from 'next/dynamic';

//Import chart dynamically
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});


import { Roboto } from 'next/font/google';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // Choose what you need
    display: 'swap',
});

export default function DonutChart({ typeOfEmp, title }) {
    const series = typeOfEmp[0];
    const options: ApexOptions = {
        chart: {
            type: "donut" as const
        },
        labels: typeOfEmp[1],
        colors: ["#F59E0B", "#3B82F6", "#14B8A6"],
        legend: {
            show: false,
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 50,
                    },
                    legend: {
                        position: "bottom",
                        show: false
                    },
                },
            },
        ],
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    size: "70px",
                }
            },
        },
        dataLabels: {
            enabled: false
        },
    };

    const value: number = typeOfEmp[0].reduce(
        (sum: number, item: number): number => {
            return sum + item;
        },
        0
    );

    let totalValue: string = value.toString();
    if (value.toString().length >= 7) {
        totalValue = `${value.toString().slice(0, 2)},${value.toString().slice(2, 4)},${value.toString().slice(4)}`

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
        <div className="bg-white rounded-lg w-[200px] relative">
            <Chart options={options} series={series} type="donut" height="200px" width={"100%"} />
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <h3 className="text-[#4A4C56] text-base">{title}</h3>
                <h4 className={`text-[#1D1F2C] text-[28px]  font-bold ${roboto.className}`}>{ totalValue }</h4>
            </div>
        </div>
    )
}