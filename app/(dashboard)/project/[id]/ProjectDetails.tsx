'use client';

import React, { useEffect, useState, useCallback } from 'react';
import ProjectDetailsTable from './ProjectDetailsTable';
import ProjectDetailsCard from './ProjectDetailsCard';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { UserService } from '@/service/user/user.service';
import { toast } from 'react-toastify';

interface Employee {
  SL: number;
  Name: string;
  Role: string;
  Hours: number;
  Cost: string;
  image: string;
}

interface Project {
  id: string;
  name: string;
  totalHours: number;
  totalCost: number;
  status: number;
  assignees: Employee[];
}

interface ProjectDetailsProps {
  id: string;
}

export default function ProjectDetails({ id }: ProjectDetailsProps) {
  const itemsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [projectData, setProjectData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  // calculate total pages
  const totalPages = Math.ceil(
    (projectData?.assignees?.length || 0) / itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  // cookie helper
  const getCookieToken = () => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(
      /(?:^|;\s*)empdashtoken=([^;]+)/
    );
    return match ? match[1] : null;
  };

  // resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 600);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // pagination numbers
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const totalPagesToShow = isLargeScreen ? 6 : 4;

    let startPage = Math.max(
      currentPage - Math.floor(totalPagesToShow / 2),
      1
    );
    let endPage = Math.min(startPage + totalPagesToShow - 1, totalPages);

    if (endPage - startPage + 1 < totalPagesToShow) {
      startPage = Math.max(endPage - totalPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // fetch project
  const fetchProjectData = useCallback(async () => {
    const token = getCookieToken();
    if (!token) return;

    setLoading(true);
    try {
      const res = await UserService?.getSingleProjectData(id);
      if (res?.data?.success) {
        setProjectData(res.data.data);
      } else {
        toast.error(res?.response?.data?.message || 'Failed to fetch data');
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'An error occurred while fetching data'
      );
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#82C8E5]"></div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No project data found.</p>
      </div>
    );
  }

  // slice data for table
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const statusMap: Record<number, string> = {
    1: 'Active',
    2: 'Completed',
    3: 'On Hold',
  };

  return (
    <div className="space-y-6 p-6 rounded-2xl">
      {/* Project Header Section */}
      <div className="flex flex-col items-start w-full">
        <div className="flex gap-2 items-center">
          <Link href="/project">
            <ChevronLeft className="hover:bg-gray-200 cursor-pointer" />
          </Link>
          <h2 className="text-2xl font-semibold text-neutral-800">
            Project Name: {projectData.name}
          </h2>
        </div>

        <div className="flex w-full mt-4 gap-6">
          <div className="w-full">
            <ProjectDetailsCard
              title="Total Hours"
              value={projectData.totalHours}
              isNumber={false}
            />
          </div>
          <div className="w-full">
            <ProjectDetailsCard
              title="Total Cost"
              value={`€${projectData.totalCost.toFixed(2)}`}
              isNumber={true}
            />
          </div>
          <div className="w-full">
            <ProjectDetailsCard
              title="Project Status"
              value={statusMap[projectData.status] || 'Unknown'}
              isNumber={false}
            />
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <ProjectDetailsTable
        projectData={projectData}
        start={start}
        end={end}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded-md ${
                pageNum === currentPage
                  ? 'bg-[#82C8E5] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
