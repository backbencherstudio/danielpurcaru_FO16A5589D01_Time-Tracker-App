'use client'

import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'; // Import Transition and Dialog from Headless UI
import { useForm, SubmitHandler } from 'react-hook-form'; // Import React Hook Form
import { Fragment } from 'react';

export default function EditEmployeeDialog({ isOpen, handleDialogToggle, empId }) {
    // Define the form data type
    type FormData = {
        fullName: string;
        password: string;
        role: string;
        hourlyRate: string;
    };

    // Initialize useForm with the type for the form data
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    // Handle form submission
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('Form Data:', data);
        handleDialogToggle(); // Close the dialog after form submission
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleDialogToggle}>
                {/* The overlay with transition */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-25" />
                </Transition.Child>

                {/* Main Dialog Content */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        {/* Dialog Panel with transition */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title className="text-xl font-semibold mb-4">Edit Employee</Dialog.Title>

                                {/* Form */}
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Full Name Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                            placeholder="Enter Full Name"
                                            {...register("fullName", { required: "Full Name is required" })}
                                        />
                                        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Password</label>
                                        <input
                                            type="password"
                                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                            placeholder="Enter Password"
                                            {...register("password", { required: "Password is required" })}
                                        />
                                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                                    </div>

                                    {/* Role Field (Dropdown) */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Role</label>
                                        <select
                                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                            {...register("role", { required: "Role is required" })}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="Handyman">Handyman</option>
                                            <option value="Project Manager">Project Manager</option>
                                            <option value="Electrician">Electrician</option>
                                        </select>
                                        {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
                                    </div>

                                    {/* Hourly Rate Field */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Hourly Rate ($)</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                            placeholder="Enter Hourly Rate"
                                            {...register("hourlyRate", { required: "Hourly Rate is required" })}
                                        />
                                        {errors.hourlyRate && <p className="text-red-500 text-xs">{errors.hourlyRate.message}</p>}
                                    </div>

                                    {/* Dialog Footer with Save Button */}
                                    <div className="flex justify-end gap-2 mt-6">
                                        <button
                                            type="button"
                                            onClick={handleDialogToggle}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
