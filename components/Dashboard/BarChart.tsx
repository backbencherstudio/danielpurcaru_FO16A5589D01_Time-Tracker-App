'use client'

import React from 'react';
import { ResponsiveContainer, BarChart as BChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Sample data for the chart
const data = [
    { name: 'Dec 25', present: 74, absent: 38 },
    { name: 'Dec 26', present: 33, absent: 49 },
    { name: 'Dec 27', present: 88, absent: 79 },
    { name: 'Dec 28', present: 21, absent: 28 },
    { name: 'Dec 29', present: 67, absent: 91 },
    { name: 'Dec 30', present: 42, absent: 85 },
    { name: 'Dec 31', present: 95, absent: 32 },
    { name: 'Jan 1', present: 56, absent: 70 },
    { name: 'Jan 2', present: 24, absent: 97 },
    { name: 'Jan 3', present: 63, absent: 60 },
];

const BarChart = () => (
    <div style={{ width: '100%', height: '415px' }} className="bg-white rounded-lg py-6 pr-4 overflow-hidden">
        <div className='h-[315px]'>
            <ResponsiveContainer width='100%' height="100%">
                <BChart data={data} barCategoryGap="auto" barGap={5} barSize={17}>
                    <XAxis dataKey="name" axisLine={false}
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
        </div>
    </div>
);

export default BarChart;
