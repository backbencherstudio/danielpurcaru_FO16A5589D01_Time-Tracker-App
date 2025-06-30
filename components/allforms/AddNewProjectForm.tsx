import { Controller, useForm } from 'react-hook-form';

import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import { useState } from 'react';

export default function AddNewProjectForm({ open, setIsOpen }) {
    const { handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // handle form submission logic here
    };
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <Dialog open={open} onOpenChange={setIsOpen}>

            <DialogContent className="max-w-[631px]">

                <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
                    {/* Project Name */}
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <label className="justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                                Project Name
                            </label>

                            <Controller
                                name="projectName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="projectname"
                                        className="h-14 px-4 py-4 bg-stone-50 rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                    />
                                )}
                            />
                        </div>

                        {/* Assignee */}
                        <div className='flex flex-col gap-2'>
                            <label className="justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                                Assignee
                            </label>
                            <Controller
                                name="assignee"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        id="assignee"
                                        className="h-14 px-4 py-4 bg-stone-50 rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                    >
                                        <option value="">Select an Option</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                )}
                            />
                        </div>
                    </div>

                    {/* Start Date and End Date */}
                    <div className=' flex gap-6'>
                        <div className='w-full flex flex-col gap-2'>
                            <label className="justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                                Start Date
                            </label>
                            <Controller
                                name="startDate"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="date"
                                        id="startdate"
                                        className="h-14   px-4 py-4 bg-stone-50 rounded-lg   outline-offset-[-1px] outline-gray-200"
                                    />
                                )}
                            />
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <label className="justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                                End Date
                            </label>
                            <Controller
                                name="endDate"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="date"
                                        id="enddate"
                                        className="h-14  px-4 py-4 bg-stone-50 rounded-lg   outline-offset-[-1px] outline-gray-200"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Priority and Address */}
                    <div className='flex gap-6'>
                        <div className='w-full flex flex-col gap-2'>
                            <label className="justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                                Priority
                            </label>

                            <Controller
                                name="priority"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <select
                                        {...field}

                                        id="priority"
                                        className="h-14 px-4 py-4 bg-stone-50 rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                    >
                                        <option value="">Select an Option</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                )}
                            />
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <label className="justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                                Address
                            </label>
                            <Controller
                                name="address"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        id="address"
                                        className="h-14 px-4 py-4 bg-stone-50 rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                                    >
                                        <option value="">Select an Option</option>
                                        <option value="Vietnum">Vietnum</option>
                                        <option value="LA">LA</option>
                                        <option value="USA">USA</option>
                                    </select>
                                )}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer py-3  bg-sky-300 rounded-lg text-white text-base font-medium font-['Urbanist'] leading-relaxed"
                    >
                        Add Project
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
