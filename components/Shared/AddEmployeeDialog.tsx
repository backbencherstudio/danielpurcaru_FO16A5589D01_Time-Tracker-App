'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTrigger } from '../ui/dialog';
import prof from "@/public/images/profileIcon.png"

export default function AddEmployeeDialog({ isOpen, handleDialogToggle }) {

    return (
        <div className="p-6">
            <Dialog open={isOpen} onOpenChange={handleDialogToggle}>
               
                <DialogContent className="max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <h3 className="text-xl font-semibold">Add New Employee</h3>
                    </DialogHeader>

                    {/* Upload Photo Section */}
                    <div className="flex justify-center items-center space-x-4 border-dashed border-2 border-gray-400 rounded-lg p-4 mb-6">
                        <Image src={prof} alt="Upload" width={24} height={24} />
                        <p className="text-gray-500 text-sm">Upload photo (Maximum size of 2MB)</p>
                        
                    </div>

                    {/* Employee Form Fields */}
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">First Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter First Name"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Last Name"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Password"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Phone</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Phone Number"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium">Physical Number</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Physical Number"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Role</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Role"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-sm font-medium">Hourly Rate ($)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Hourly Rate"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Address</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                placeholder="Enter Address"
                            />
                        </div>
                    </div>

                    {/* Dialog Footer with Action */}
                    <DialogFooter>
                        <button
                            onClick={handleDialogToggle}
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Add Employee
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
 