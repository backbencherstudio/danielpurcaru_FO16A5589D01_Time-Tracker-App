'use client'
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function page() {
    const initialData = [
        ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri'],
        ['Project 1', 'John Doe', '01/06/2025', '01/07/2025', 'High', 'Portugal'],
        ['Project 2', 'Jane Smith', '01/06/2025', '01/07/2025', 'Low', 'USA'],
        ['Project 3', 'Alice Brown', '01/06/2025', '01/07/2025', 'Medium', 'Brazil'],
    ];
    const { handleSubmit, control } = useForm();
    const [data, setData] = useState(initialData);

    const onSubmit = (formData) => {
        console.log(formData);
        // Handle form submission logic here
    };
    const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
        const updatedData = [...data];
        updatedData[rowIndex][colIndex] = value;
        setData(updatedData);
    };


    return (
        // <div>Hello, Academic Calendar</div>
        <div className="p-6 bg-white ">
            <div className="flex w-full ">
                <table className="">
                    <thead>
                        <tr className="bg-gray-200">
                            {data[0].map((header, index) => (
                                <th key={index} className="p-4 self-stretch text-center justify-center text-zinc-500 text-xs font-bold font-['Urbanist'] leading-tight tracking-tight">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td key={colIndex} className="border border-gray-300">
                                        <Controller
                                            name={`cell-${rowIndex}-${colIndex}`}
                                            control={control}
                                            defaultValue={cell}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    onChange={(e) => handleCellChange(rowIndex + 1, colIndex, e.target.value)}
                                                    className="w-full p-2 text-gray-700 bg-transparent border-none outline-none"
                                                />
                                            )}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}