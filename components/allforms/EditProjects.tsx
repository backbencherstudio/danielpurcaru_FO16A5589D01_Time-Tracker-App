'use client'

import { UserService } from "@/service/user/user.service";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

interface Project {
    id: string;
    name: string;
    assignees: Array<{ user: { id: string } }>;
    start_date: string;
    end_date: string;
    priority: string;
    price: number;
    status: number;
}

interface Employee {
    id: string;
    name: string;
}

type propType = {
    project: Project;
    onClose: () => void;
    onUpdate: () => void;
}

export default function EditProjects({ project, onClose, onUpdate }: propType) {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Project>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [assignMember, setAssignMember] = useState<string[]>([]);
    const [selectedMember, setSelectedMember] = useState("");
    const [empData, setEmpData] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);


    const handleAssignMember = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const memberId = e.target.value;
        if (memberId && !assignMember.includes(memberId)) {
            setAssignMember(prev => [...prev, memberId]);
            setSelectedMember(memberId);
        }
    };

    useEffect(() => {
        const fetchEmpData = async () => {
            setLoading(true);
            try {
                const res = await UserService?.getAllEmpData();
                if (res?.data?.success) {
                    setEmpData(res.data.data);
                } else {
                    toast.error(res?.response?.data?.message || "Failed to fetch data");
                }
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message ||
                    error.message ||
                    "An error occurred while fetching data"
                );
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEmpData();
    }, []);

    useEffect(() => {
        // Set form values from project prop
        setValue("name", project?.name);
        setValue("price", project?.price);
        setValue("start_date", project?.start_date?.split("T")?.[0]);
        setValue("end_date", project?.end_date?.split("T")?.[0]);
        setValue("priority", project?.priority?.toLowerCase());
        setValue("status", project?.status);
        setAssignMember(project?.assignees?.map(member => member?.user?.id))
    }, []);

    const onSubmit = async (data: Project) => {
        setIsSubmitting(true);
        try {
            // Add the id to the updated data
            const updatedProject = {
                name: data.name,
                price: Number(Number(data.price).toFixed(2)),
                start_date: data.start_date,
                end_date: data.end_date,
                id: project.id,
                assignees: assignMember,
                priority: data.priority.toUpperCase(),
                status: Number(data.status)
            };
            const res = await UserService.updateProject({ data: updatedProject, id: project.id });
        } catch (error) {
            console.error("Failed to update project:", error);
        } finally {
            setIsSubmitting(false);
            onUpdate()
        }
    };

    const removeMember = (memberId: string) => {
        setAssignMember(prev => prev.filter(id => id !== memberId));
        if (selectedMember === memberId) {
            setSelectedMember(assignMember.length > 1 ? assignMember[0] : "");
        }
    };

    const statusOptions = [
        { value: 1, label: "In Progress" },
        { value: 2, label: "Completed" }
    ];

    return (
        <div className="inset-0 backdrop-blur-xs bg-[#0000001a] absolute z-[20] flex items-center justify-center my-4">
            <div className="h-fit w-fit max-h-screen mx-4 sm:my-0 overflow-y-auto">
                <div className="bg-white shadow p-6 rounded-lg w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Edit Project</h2>
                        {/* <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer p-1 rounded-full hover:bg-[#F7F8F9] duration-100 transition-colors"
                    >
                        <MdClose />
                    </button> */}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Project Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter project name"
                                    className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md text-[#1D1F2C]"
                                    {...register("name", { required: "Project name is required." })}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium mb-1">Price ($)</label>
                                    <input
                                        type="text"
                                        id="price"
                                        placeholder="Enter project price"
                                        className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md text-[#1D1F2C]"
                                        {...register("price", {
                                            required: "Price is required.",
                                        })}
                                    />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="priority" className="block text-sm font-medium mb-1">Priority</label>
                                    <select
                                        id="priority"
                                        className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md text-[#1D1F2C]"
                                        {...register("priority", { required: "Priority is required." })}
                                    >
                                        <option value="urgent">Urgent</option>
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                    {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <label htmlFor="assignee" className="block text-sm font-medium text-[#1D1F2C]">
                                    Assignee
                                </label>
                                <div className='w-full px-3 py-2 border border-[#E9E9EA] rounded-md text-[#1D1F2C]'>
                                    {loading ?
                                        <div>Loading...</div>
                                        :
                                        <div>
                                            <div className='flex flex-wrap gap-2 mb-2'>
                                                {assignMember.map(memberId => {
                                                    const member = empData.find(emp => emp.id === memberId);
                                                    return member ? (
                                                        <div key={memberId} className="flex items-center gap-1 py-1 px-2 bg-[#D8EEF7] rounded-full text-sm">
                                                            {member.name}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeMember(memberId)}
                                                                className="text-xs text-red-500"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ) : null;
                                                })}
                                            </div>
                                            <select
                                                onChange={handleAssignMember}
                                                value=""
                                                className="w-full outline-none bg-transparent"
                                                disabled={loading || empData.length === 0}
                                            >
                                                <option value="">Select a member</option>
                                                {empData.map(emp => (
                                                    <option key={emp.id} value={emp.id} disabled={assignMember.includes(emp.id)}>
                                                        {emp.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="start_date" className="block text-sm font-medium mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        id="start_date"
                                        className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md text-[#1D1F2C]"
                                        {...register("start_date", { required: "Start date is required." })}
                                    />
                                    {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="end_date" className="block text-sm font-medium mb-1">End Date</label>
                                    <input
                                        type="date"
                                        id="end_date"
                                        className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md text-[#1D1F2C]"
                                        {...register("end_date", {
                                            required: "End date is required.",
                                            validate: value => {
                                                const startDate = new Date(watch("start_date"));
                                                const endDate = new Date(value);
                                                return endDate >= startDate || "End date must be after start date";
                                            }
                                        })}
                                    />
                                    {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    id="status"
                                    className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md text-[#1D1F2C]"
                                    {...register("status", { required: "Status is required." })}
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 ${isSubmitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting && !loading}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 ${isSubmitting || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                {isSubmitting ? "Updating..." : "Update Project"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}