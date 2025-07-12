'use client'

import React from 'react';
import { ResponsiveContainer, BarChart as BChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Sample data for the chart
// const data = [
//     { date: 'Dec 25', present: 74, absent: 38 },
//     { date: 'Dec 26', present: 33, absent: 49 },
//     { date: 'Dec 27', present: 88, absent: 79 },
//     { date: 'Dec 28', present: 21, absent: 28 },
//     { date: 'Dec 29', present: 67, absent: 91 },
//     { date: 'Dec 30', present: 42, absent: 85 },
//     { date: 'Dec 31', present: 95, absent: 32 },
//     { date: 'Jan 1', present: 56, absent: 70 },
//     { date: 'Jan 2', present: 24, absent: 97 },
//     { date: 'Jan 3', present: 63, absent: 60 },
// ];


interface OriginalData {
  dates: string[];
  present: number[];
  absent: number[];
}

interface TransformedItem {
  date: string;
  present: number;
  absent: number;
}

const transformToLast10Days = (data: OriginalData): TransformedItem[] => {
    console.log(data)
  // Get the last 10 entries from each array
  const last10Dates = data.dates.slice(-10);
  const last10Present = data.present.slice(-10);
  const last10Absent = data.absent.slice(-10);

  return last10Dates.map((dateStr, index) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    
    return {
      date: `${month} ${day}`,
      present: last10Present[index],
      absent: last10Absent[index]
    };
  });
};

const BarChart = ({ newData }) => {
    // const data = transformToLast10Days(newData);
    console.log("newData",newData)
    return (
        <div style={{ width: '100%', height: '415px' }} className="bg-white rounded-lg py-6 pr-4 overflow-hidden">
            {/* <div className='h-[315px]'>
                <ResponsiveContainer width='100%' height="100%">
                    <BChart data={data} barCategoryGap="auto" barGap={5} barSize={17}>
                        <XAxis dataKey="date" axisLine={false}
                            tickLine={false} tickMargin={12}
                            tick={{ fontSize: 12, fill: '#687588' }}
                        />
                        <YAxis axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#687588' }}
                        />
                        <Tooltip />
                        <Bar dataKey="present" label="false" fill="#82C8E5" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="absent" fill="#F4C700" radius={[8, 8, 0, 0]} />
                    </BChart>
                </ResponsiveContainer>
            </div>
            <div className='py-5 flex gap-[48px] pl-8'>
                <div className='flex items-center gap-2'>
                    <div className='w-[10px] h-[10px] bg-[#82C8E5] rounded-full'></div>
                    <h3>Present</h3>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='w-[10px] h-[10px] bg-[#F4C700] rounded-full'></div>
                    <h3>Absent</h3>
                </div>
            </div> */}
        </div>
    )
};

export default BarChart;
