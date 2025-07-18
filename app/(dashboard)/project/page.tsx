'use client'

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Eye, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { UserService } from '@/service/user/user.service';
import AddNewProjectForm from '@/components/allforms/AddNewProjectForm';

// Icons
import swap from '@/public/icons/arrow-swap.svg';
import down from '@/public/icons/file-download.svg';
import DeletePopUp from '@/components/reusable/DeletePopUp';

interface Project {
  id: string;
  name: string;
  assignees: Array<{ user: { avatarUrl: string } }>;
  start_date: string;
  priority: string;
  price: number;
  status: number;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 6, 7, 8, 9, 10];

export default function ProjectManagementPage() {
  const [data, setData] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [projectToDelete, setprojectToDelete] = useState<string | null>(null)

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);


  const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        setprojectToDelete(null)
    }

  const fetchProjectData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await UserService.getProjectData();
      if (res?.data?.success) {
        setData(res.data.data);
      } else {
        toast.error(res?.response?.data?.message || "Failed to fetch data");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching data"
      );
      // console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  const handleDeleteProject = async () => {
    try {
      setLoading(true);
      const res = await UserService.deleteProject(projectToDelete);
      if (res?.data?.success) {
        toast.success("Project deleted successfully");
        setData(prev => prev.filter(project => project.id !== projectToDelete));
        if (currentItems.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        closeDeleteModal()
      } else {
        toast.error(res?.response?.data?.message || "Failed to delete project");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "An error occurred while deleting project"
      );
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleModal = () => setIsModalOpen(prev => !prev);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button key={1} onClick={() => handlePageChange(1)} className="w-[40px] h-[40px] m-1 rounded-xl text-[#1D1F2C] hover:bg-gray-100">
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(<span key="start-ellipsis" className="px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-[40px] h-[40px] m-1 rounded-xl ${currentPage === i ? 'bg-[#F8FAFB] text-[#1D1F2C]' : 'text-[#1D1F2C] hover:bg-gray-100'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="end-ellipsis" className="px-2">...</span>);
      }
      buttons.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)} className="w-[40px] h-[40px] m-1 rounded-xl text-[#1D1F2C] hover:bg-gray-100">
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="bg-white p-5 bg-gradient-to-l from-white/60 rounded-2xl flex flex-col gap-6">
        <DeletePopUp isDeleteModalOpen={isDeleteModalOpen} closeDeleteModal={closeDeleteModal} isDeleting={loading} handleDelete={handleDeleteProject} title={(data.find(project => project.id === projectToDelete)?.name || 'Project')}/>
      {/* Header Section */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-5">
        <div className="flex flex-col justify-start gap-2">
          <h1 className="text-neutral-800 text-2xl font-semibold">Project</h1>
          <p className="text-zinc-500 text-base">Manage your Projects</p>
        </div>
        <div className="flex gap-3 sm:gap-5 w-full sm:w-auto">
          <button className="w-full sm:w-44 p-3 sm:p-4 rounded-xl flex justify-center items-center outline-1 hover:bg-gray-100">
            <Image className="w-3 h-4" src={down} alt="Download" />
            <span className="text-sky-300 ml-2">Download</span>
          </button>
          <button 
            onClick={toggleModal} 
            className="w-full sm:w-44 p-3 sm:p-4 bg-sky-300 hover:bg-sky-300/70 rounded-xl flex justify-center items-center gap-1"
          >
            <Plus className="text-white" size={16} />
            <span className="text-white">Add New</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className='overflow-x-auto'>
        <table className="w-full rounded-tl-[10px] rounded-tr-[10px]">
          <thead className="bg-slate-50">
            <tr className="grid grid-cols-8 min-w-[800px]">
              <TableHeaderCell label="SL" width="w-16" />
              <TableHeaderCell label="Project Name" width="w-36" />
              <TableHeaderCell label="Assignees" width="w-34" />
              <TableHeaderCell label="Due Date" width="w-36" />
              <TableHeaderCell label="Priority" width="w-32" />
              <TableHeaderCell label="Price" width="w-36" />
              <TableHeaderCell label="Status" width="w-46" />
              <th className="w-36 p-4 bg-slate-50 text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr className="grid grid-cols-8 min-w-[800px]">
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  Loading projects...
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr className="grid grid-cols-8 min-w-[800px]">
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No projects found
                </td>
              </tr>
            ) : (
              currentItems.map((row, index) => (
                <ProjectRow 
                  key={row.id}
                  row={row}
                  index={index}
                  onDelete={()=> {setprojectToDelete(row?.id);setIsDeleteModalOpen(true)}}
                  loading={loading}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1} 
            className="p-2 rounded-lg border disabled:opacity-50"
          >
            <MdKeyboardArrowLeft />
          </button>
          {renderPaginationButtons()}
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages} 
            className="p-2 rounded-lg border disabled:opacity-50"
          >
            <MdKeyboardArrowRight />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="text-sm">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }} 
            className="border rounded-md px-2 py-1 text-sm"
          >
            {ITEMS_PER_PAGE_OPTIONS.map(number => (
              <option key={number} value={number}>{number}</option>
            ))}
          </select>
        </div>
      </div>

      {isModalOpen && (
        <AddNewProjectForm 
          isOpen={isModalOpen} 
          handleDialogToggle={toggleModal} 
          onSuccess={() => {
            fetchProjectData();
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
}

// Extracted components for better readability and reusability

const TableHeaderCell = ({ label, width }: { label: string; width: string }) => (
  <th className={`${width} pl-4 py-4 bg-slate-50 flex justify-between items-center gap-3`}>
    <span className="flex-1 text-neutral-600 text-xs font-semibold font-['Urbanist'] leading-tight">
      {label}
    </span>
    <Image src={swap} alt="Sort" className="w-3 h-3" />
  </th>
);

const ProjectRow = ({ row, index, onDelete, loading }: { 
  row: Project; 
  index: number; 
  onDelete: (id: string) => void;
  loading: boolean;
}) => {
  const startDate = new Date(row.start_date).toLocaleDateString();
  const priority = row.priority.charAt(0).toUpperCase() + row.priority.slice(1).toLowerCase();
  const statusText = row.status === 1 ? "In Progress" : "Completed";
  const statusClass = row.status === 2 ? 'bg-sky-100' : 'bg-green-50';

  return (
    <tr className="grid grid-cols-8 min-w-[800px] bg-white hover:bg-gray-50">
      <td className="w-16 pl-4 py-4 flex items-center text-sm">{index + 1}</td>
      <td className="w-36 pl-4 py-4 flex items-center text-sm">{row.name}</td>
      <td className="w-34 pl-4 py-4 flex items-center">
        <AssigneeAvatars assignees={row.assignees} />
      </td>
      <td className="w-36 pl-10 py-4 flex items-center text-sm">{startDate}</td>
      <td className="w-32 pl-10 py-4 flex items-center text-sm">{priority}</td>
      <td className="w-36 pl-14 py-4 flex items-center text-sm">${row.price}</td>
      <td className={`w-32 mx-6 my-auto h-8 flex justify-center items-center text-teal-600 ${statusClass} rounded-lg text-[10px] font-medium`}>
        {statusText}
      </td>
      <td className="w-36 p-2 flex justify-center items-center gap-2">
        <Link 
          href={`/project/${row.id}`} 
          className="bg-sky-300 rounded-lg p-2 text-white hover:bg-sky-400 transition-colors"
          aria-label="View project"
        >
          <Eye size={16} />
        </Link>
        <button
          onClick={() => onDelete(row.id)}
          disabled={loading}
          className="bg-red-500 rounded-lg p-2 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
          aria-label="Delete project"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

const AssigneeAvatars = ({ assignees }: { assignees: Project['assignees'] }) => (
  <div className="flex -space-x-3">
    {assignees.slice(0, 3).map((assignee, index) => (
      <div key={index} className="relative">
        <Image
          className="w-6 h-6 rounded-full border-2 border-sky-300 bg-white"
          src={assignee?.user?.avatarUrl || '/default-avatar.png'}
          alt={`Assignee ${index + 1}`}
          width={24}
          height={24}
        />
      </div>
    ))}
    {assignees.length > 3 && (
      <div className="bg-gray-100 p-1.5 -ml-4 rounded-full text-neutral-800 text-xs flex items-center justify-center w-6 h-6">
        +{assignees.length - 3}
      </div>
    )}
  </div>
);