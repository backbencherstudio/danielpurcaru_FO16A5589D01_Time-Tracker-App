'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTrigger } from '../ui/dialog';

export default function EditEmployeeDialog({ isOpen, handleDialogToggle }) {

    return (
        <div className="p-6">
            <Dialog open={isOpen} onOpenChange={handleDialogToggle}>

                <DialogContent className="max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <h3 className="text-xl font-semibold ">Edit Employee</h3>
                    </DialogHeader>

                    

                    {/* Employee Form Fields */}
                    <div className="space-y-6">
                        <div className="flex  sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter First Name"
                                />
                            </div>

                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-6">

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
                                <label className="text-sm font-medium">Role</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Role"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Hourly Rate ($)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Hourly Rate"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Dialog Footer with Action */}
                    <DialogFooter>
                        <button
                            onClick={handleDialogToggle}
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
