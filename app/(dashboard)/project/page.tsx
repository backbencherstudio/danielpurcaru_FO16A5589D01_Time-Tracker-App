'use client'

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Eye, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { UserService } from '@/service/user/user.service';
import AddNewProjectForm from '@/components/allforms/AddNewProjectForm';
import down from '@/public/icons/file-download.svg';
import DeletePopUp from '@/components/reusable/DeletePopUp';
import { Toaster } from 'react-hot-toast';
import avatar from "@/public/avatar.png"
import { editIcon } from '@/public/icons/Iconst';
import EditProjects from '@/components/allforms/EditProjects';

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

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export default function ProjectManagementPage() {
  const [data, setData] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project>()
  const [editing, setEditing] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // token extract helper
  const getCookieToken = () => {
    if (typeof document === "undefined") return null;

    const cookieString = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("empdashtoken="));
    return cookieString?.split("=")[1] || null;
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  const fetchProjectData = async () => {
    setLoading(true);
    try {
      const res = await UserService.getProjectData({ limit: itemsPerPage, page: currentPage });
      if (res?.data?.success) {
        setData(res.data.data);
        setTotalItems(res.data?.meta?.total);
        setTotalPages(res.data?.meta?.totalPages);
        setSelectedProject(res?.data?.data[0]);
      } else {
        toast.error(res?.response?.data?.message || "Failed to fetch data");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching data"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = getCookieToken();
    console.log("Items per apge : ", itemsPerPage)
    if (token)
      fetchProjectData();
  }, [currentPage, itemsPerPage]);

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      setLoading(true);
      const res = await UserService.deleteProject(projectToDelete);
      if (res?.data?.success) {
        toast.success("Project deleted successfully");
        setCurrentPage(1);
        closeDeleteModal();
      } else {
        toast.error(res?.response?.data?.message || "Failed to delete project");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "An error occurred while deleting project"
      );
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

  const getVisiblePageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const visiblePages = useMemo(() => getVisiblePageNumbers(), [currentPage, totalPages]);

  if (loading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#82C8E5]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 bg-gradient-to-l from-white/60 rounded-2xl flex flex-col gap-6">
      <Toaster position="top-right" />
      <DeletePopUp
        isDeleteModalOpen={isDeleteModalOpen}
        closeDeleteModal={closeDeleteModal}
        isDeleting={loading}
        handleDelete={handleDeleteProject}
        title={(data.find(project => project.id === projectToDelete)?.name || 'Project')}
      />

      {/* Header Section */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-5">
        <div className="flex flex-col justify-start gap-2">
          <h1 className="text-neutral-800 text-2xl font-semibold">Project</h1>
          <p className="text-zinc-500 text-base">Manage your Projects</p>
        </div>
        <div className="flex gap-3 sm:gap-5 w-full sm:w-auto">
          {/* <button className="w-full sm:w-44 p-3 sm:p-4 rounded-xl flex justify-center items-center outline-1 hover:bg-gray-100">
            <Image className="w-3 h-4" src={down} alt="Download" />
            <span className="text-sky-300 ml-2">Download</span>
          </button> */}
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
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">
                <div className="flex items-center justify-between gap-2 font-medium text-sm">
                  <span>SL</span>
                  {/* <SortIcon onClick={() => requestSort('id')} /> */}
                </div>
              </th>
              <th className="p-4 text-left">
                <div className="flex items-center justify-between gap-2 text-nowrap font-medium text-sm">
                  <span>Project Name</span>
                  {/* <SortIcon onClick={() => requestSort('name')} /> */}
                </div>
              </th>
              {/* <th className="p-4 text-left">
                <div className="flex items-center justify-between gap-2 font-medium text-sm">
                  <span>Assignees</span>
                  <SortIcon onClick={() => { }} />
                </div>
              </th> */}
              <th className="p-4 text-left">
                <div className="flex items-center justify-between gap-2 text-nowrap font-medium text-sm">
                  <span>Due Date</span>
                  {/* <SortIcon onClick={() => requestSort('start_date')} /> */}
                </div>
              </th>
              <th className="p-4 text-left">
                <div className="flex items-center justify-between gap-2 font-medium text-sm">
                  <span>Priority</span>
                  {/* <SortIcon onClick={() => requestSort('priority')} /> */}
                </div>
              </th>
              <th className="p-4 text-left">
                <div className="flex items-center justify-between gap-2 font-medium text-sm">
                  <span>Price</span>
                  {/* <SortIcon onClick={() => requestSort('price')} /> */}
                </div>
              </th>
              <th className="p-4 text-left">
                <div className="flex items-center justify-between gap-2 font-medium text-sm">
                  <span>Status</span>
                  {/* <SortIcon onClick={() => requestSort('status')} /> */}
                </div>
              </th>
              <th className="p-4 text-center font-medium text-sm">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No projects found
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const endDate = new Date(row.end_date).toLocaleDateString();
                const priority = row.priority.charAt(0).toUpperCase() + row.priority.slice(1).toLowerCase();
                const statusText = row.status === 1 ? "In Progress" : "Completed";
                const statusClass = row.status === 1 ? 'bg-sky-100' : 'bg-green-50';

                return (
                  <tr key={row.id} className="bg-white hover:bg-gray-50 border-b">
                    <td className="p-4">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td className="p-4">{row.name}</td>
                    {/* <td className="p-4">
                      <div className="flex -space-x-3">
                        {row.assignees.slice(0, 3).map((assignee, idx) => (
                          <div key={idx} className="relative">
                            <Image
                              className="w-6 h-6 rounded-full border-2 border-sky-300 bg-white object-cover"
                              src={assignee?.user?.avatarUrl || avatar}
                              alt={`Assignee ${idx + 1}`}
                              width={24}
                              height={24}
                            />
                          </div>
                        ))}
                        {row.assignees.length > 3 && (
                          <div className="bg-gray-100 p-1.5 -ml-4 rounded-full text-neutral-800 text-xs flex items-center justify-center w-6 h-6">
                            +{row.assignees.length - 3}
                          </div>
                        )}
                      </div>
                    </td> */}
                    <td className="p-4">{endDate}</td>
                    <td className="p-4">{priority}</td>
                    <td className="p-4">${Number(row.price).toFixed(2)}</td>
                    <td className="p-4 text-nowrap">
                      <div className={`px-2 py-1 flex justify-center items-center text-teal-600 ${statusClass} rounded-lg text-[10px] font-medium`}>
                        {statusText}
                      </div>
                    </td>
                    <td className="p-4 flex justify-center items-center gap-2">
                      <Link
                        href={`/project/${row.id}`}
                        className="bg-sky-300 rounded-lg p-2 text-white hover:bg-sky-400 transition-colors"
                        aria-label="View project"
                      >
                        <Eye size={20} />
                      </Link>
                      <button
                        onClick={() => { setSelectedProject(row); setEditing(true) }}
                        className="bg-[#82C8E5] hover:bg-sky-400 w-fit px-[7px] py-[7px] rounded-lg cursor-pointer"
                      >
                        {editIcon}
                      </button>
                      <button
                        onClick={() => { setProjectToDelete(row.id); setIsDeleteModalOpen(true); }}
                        disabled={loading}
                        className="bg-red-500 rounded-lg p-2 text-white hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                        aria-label="Delete project"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {data.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 max-w-[1200px] mx-auto font-bold rounded-lg gap-4 w-full">
          <div className="flex items-center rounded-lg sm:px-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#1D1F2C] hover:bg-gray-100"
                } border border-[#F6F8FA] rounded-lg`}
            >
              <MdKeyboardArrowLeft className="text-xl" />
            </button>

            {visiblePages.map((number) => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`mx-1 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center ${currentPage === number ? "bg-[#F6F8FA]" : "text-[#1D1F2C] hover:bg-gray-100"
                  } rounded-lg`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-2 sm:px-3 py-2 ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#1D1F2C] hover:bg-gray-100"
                } border border-[#F6F8FA] rounded-lg`}
            >
              <MdKeyboardArrowRight className="text-xl" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base text-[#777980] font-normal">
            <span>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border rounded-md px-2 py-1 text-[#1D1F2C]"
            >
              {[5, 10, 20, 50].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

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
      {editing &&
        <EditProjects project={selectedProject} onClose={() => { setEditing(false) }} onUpdate={() => { fetchProjectData(); setEditing(false) }} />
      }
    </div>
  );
}