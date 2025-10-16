'use client'

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart as BChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';



interface OriginalData {
    dates: string[];
    present: number[];
    absent: number[];
}

const BarChart = ({ newData }) => {
    const [transformData, setTransformData] = useState([])
    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        return date.toLocaleString('default', { month: 'long', day: 'numeric' });
    };
    useEffect(() => {
        const transformToLast10Days = (data: OriginalData) => {
            let startDate = 0;
            if(new Date().getDate() >= 18 ){
                startDate = new Date().getDate() - 10;
            }
            const newData = { absent: [], present: [], dates: [] }
            const dataArray = [];
            newData.absent = data?.absent?.slice(startDate,new Date().getDate());
            newData.present = data?.present?.slice(startDate,new Date().getDate());
            newData.dates = data?.dates?.slice(startDate,new Date().getDate());
            for (let i = 0; i < newData?.dates?.length; i++) {
                dataArray.push({ date: formatDate(newData.dates[i]), present: newData.present[i], absent: newData.absent[i] })
            }
            setTransformData(dataArray)
        }
        transformToLast10Days(newData);
    }, [newData])
    return (
        <div style={{ width: '100%', height: '415px' }} className="bg-white rounded-lg py-6 pr-4 overflow-hidden">
            <div className='h-[315px]'>
                <ResponsiveContainer width='100%' height="100%">
                    <BChart data={transformData} barCategoryGap="auto" barGap={5} barSize={17}>
                        <XAxis dataKey="date" axisLine={false}
                            tickLine={false} tickMargin={12}
                            tick={{ fontSize: 12, fill: '#687588' }}
                        />
                        <YAxis axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#687588' }}
                        />
                        <Tooltip />
                        <Bar dataKey="present" label={false} fill="#82C8E5" radius={[8, 8, 0, 0]} />
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
    )
};

export default BarChart;
