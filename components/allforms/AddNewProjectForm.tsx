'use client'

import React, { useEffect, useState } from 'react';
import { UserService } from '@/service/user/user.service';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

interface Employee {
  id: string;
  name: string;
}

interface ProjectFormData {
  name: string;
  price: string;
  start_date: string;
  end_date: string;
  priority: string;
  address: string;
  // Add other form fields as needed
}

interface AddNewProjectFormProps {
  isOpen: boolean;
  handleDialogToggle: () => void;
  onSuccess: ()=> void;
}

export default function AddNewProjectForm({ isOpen, handleDialogToggle,onSuccess }: AddNewProjectFormProps) {
  const { handleSubmit, register, formState: { errors } } = useForm<ProjectFormData>();
  const [priority, setPriority] = useState('high');
  const [empData, setEmpData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [assignMember, setAssignMember] = useState<string[]>([]);
  const [selectedMember, setSelectedMember] = useState("");

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

  const handleAssignMember = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const memberId = e.target.value;
    if (memberId && !assignMember.includes(memberId)) {
      setAssignMember(prev => [...prev, memberId]);
      setSelectedMember(memberId);
    }
  };

  const removeMember = (memberId: string) => {
    setAssignMember(prev => prev.filter(id => id !== memberId));
    if (selectedMember === memberId) {
      setSelectedMember(assignMember.length > 1 ? assignMember[0] : "");
    }
  };

  const handleFormSubmit = (data: ProjectFormData) => {
    if (assignMember.length === 0) {
      toast.error("Please assign at least one member");
      return;
    }

    const newProjectData={
        name: data.name,
        address:data.address,
        start_date:data.start_date,
        end_date:data.end_date,
        price:Number(parseFloat(data.price).toFixed(2)),
        priority:priority.toUpperCase(),
        assignees:assignMember
    }

    const addNewProject=async()=>{
        try {
            setLoading(true)
            const res = await UserService?.createNewProject(newProjectData);

            if (res?.data?.success) {
                toast.success(res.data.message);
                onSuccess();
                handleDialogToggle()
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    addNewProject();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[5] flex items-center justify-center backdrop-blur-sm">
      <div className='max-w-xl mx-auto p-6 shadow-sm rounded-lg bg-white'>
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold mb-6">Add New Project</h2>
          <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" onClick={handleDialogToggle}>
            <path d="M17.8855 16.0001L24.9428 8.94276C25.4642 8.42276 25.4642 7.5775 24.9428 7.0575C24.4215 6.53617 23.5788 6.53617 23.0575 7.0575L16.0002 14.1148L8.94284 7.0575C8.42151 6.53617 7.57884 6.53617 7.0575 7.0575C6.53617 7.5775 6.53617 8.42276 7.0575 8.94276L14.1148 16.0001L7.0575 23.0575C6.53617 23.5775 6.53617 24.4228 7.0575 24.9428C7.3175 25.2028 7.65884 25.3335 8.00017 25.3335C8.3415 25.3335 8.68284 25.2028 8.94284 24.9428L16.0002 17.8855L23.0575 24.9428C23.3175 25.2028 23.6588 25.3335 24.0002 25.3335C24.3415 25.3335 24.6828 25.2028 24.9428 24.9428C25.4642 24.4228 25.4642 23.5775 24.9428 23.0575L17.8855 16.0001Z" fill="#82C8E5" />
          </svg>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid grid-cols-2 gap-4 text-[#1D1F2C]">
          {/* Project Name */}
          <div className="space-y-2 col-span-2">
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              placeholder="Enter project name"
              className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md bg-[#F7F8F9] text-[#1D1F2C]"
              {...register("name", { required: "Project name is required..." })}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

          {/* Assigners */}
          <div className='space-y-2 col-span-2'>
            <label htmlFor="assignee" className="block text-sm font-medium text-[#1D1F2C]">
              Assignee
            </label>
            <div className='w-full px-3 py-2 border border-[#E9E9EA] rounded-md bg-[#F7F8F9] text-[#1D1F2C]'>
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
          </div>

          {/* Price */}
          <div className="space-y-2 col-span-2">
            <label htmlFor="price" className="block text-sm font-medium text-[#1D1F2C]">
              Price
            </label>
            <input
              id="price"
              type="text"
              placeholder="$1000"
              className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md bg-[#F7F8F9] text-[#1D1F2C]"
              {...register("price", { required: "Set a price..." })}
            />
            {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1D1F2C]">Start date</label>
            <input
              type='date'
              className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md bg-[#F7F8F9] text-[#1D1F2C]"
              {...register("start_date", { required: "Enter start date..." })}
            />
            {errors.start_date && <p className="text-red-500 text-xs">{errors.start_date.message}</p>}
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1D1F2C]">End date</label>
            <input
              type='date'
              className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md bg-[#F7F8F9] text-[#1D1F2C]"
              {...register("end_date", { required: "Add end date..." })}
            />
            {errors.end_date && <p className="text-red-500 text-xs">{errors.end_date.message}</p>}
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1D1F2C]">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md bg-[#F7F8F9] text-[#1D1F2C]"
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-[#1D1F2C]">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              className="w-full px-3 py-2 border border-[#E9E9EA] rounded-md bg-[#F7F8F9] text-[#1D1F2C]"
              {...register("address", { required: "Add project address" })}
            />
            {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}