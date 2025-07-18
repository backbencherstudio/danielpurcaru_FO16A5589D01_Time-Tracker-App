'use client'

import React, { useEffect, useState } from 'react'
import ProjectDetailsTable from './ProjectDetailsTable'
import loanImage from "@/public/images/profileIcon.png"; // Correct image import
import DashboardCard from '@/components/reusable/DashboardCard';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import ProjectDetailsCard from './ProjectDetailsCard';
import { UserService } from '@/service/user/user.service';
import { toast } from 'react-toastify';


export default function ProjectDetails({ id }) {
    // console.log(id);
    // const projectData = {
    //     "projectName": "Project 01",
    //     "status": "Active",
    //     "employees": [
    //         { "SL": 1, "Name": "Ronald Richards", "Role": "Baker", "Hours": 40, "Cost": "$400", "image": "/images/Employee/guy.png" },
    //         { "SL": 2, "Name": "Savannah Nguyen", "Role": "Handyman", "Hours": 50, "Cost": "$500", "image": "/images/Employee/guy.png" },
    //         { "SL": 3, "Name": "Guy Hawkins", "Role": "Electrician", "Hours": 60, "Cost": "$600", "image": "/images/Employee/guy.png" },
    //         { "SL": 4, "Name": "Bessie Cooper", "Role": "Handyman", "Hours": 48, "Cost": "$4800", "image": "/images/Employee/guy.png" },
    //         { "SL": 5, "Name": "Floyd Miles", "Role": "Handyman", "Hours": 40, "Cost": "$400", "image": "/images/Employee/guy.png" },
    //         { "SL": 6, "Name": "Jacob Jones", "Role": "Handyman", "Hours": 60, "Cost": "$600", "image": "/images/Employee/guy.png" },
    //         { "SL": 7, "Name": "Darrel Steward", "Role": "Handyman", "Hours": 48, "Cost": "$4800", "image": "/images/Employee/guy.png" },
    //         { "SL": 8, "Name": "Theresa Webb", "Role": "Electrician", "Hours": 48, "Cost": "$4800", "image": "/images/Employee/guy.png" }
    //     ]
    // };
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [pageStart, setPageStart] = useState(0);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [pageLeft, setPageLeft] = useState<number[]>([]);
    const [pageRight, setPageRight] = useState<number[]>([]);
    const [projectData,setProjectData] = useState(null)
    const [loading,setLoading] = useState(false)

    // Calculate total pages based on employee data length
    const totalPages = Math.ceil(projectData?.assignees?.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
            setPageStart((pageNumber - 1) * itemsPerPage);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 600);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const totalPagesToShow = isLargeScreen ? 6 : 4;

        let startPage = Math.max(currentPage - Math.floor(totalPagesToShow / 2), 1);
        let endPage = Math.min(startPage + totalPagesToShow - 1, totalPages);

        if (endPage - startPage + 1 < totalPagesToShow) {
            startPage = Math.max(endPage - totalPagesToShow + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        setPageLeft(pageNumbers.slice(0, Math.ceil(pageNumbers.length / 2)));
        setPageRight(pageNumbers.slice(Math.ceil(pageNumbers.length / 2)));
    };

    useEffect(() => {
        getPageNumbers();
    }, [currentPage, isLargeScreen]);


    useEffect(() => {
        setLoading(true)
        const fetchPojectData = async () => {
            try {
                const res = await UserService?.getSingleProjectData(id);
                if (res?.data?.success) {
                    // console.log("Response project :", res.data.data);
                    setProjectData(res.data.data)
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
        fetchPojectData()
    }, [])

    return (
        <div>
            {/* Project Header Section */}
            <div className="space-y-6   p-6 rounded-2xl ">
                <div className="flex flex-col  items-start w-full ">
                    <div className='flex gap-2 items-center'>
                        <Link href={'/project'}><ChevronLeft className='hover:bg-gray-200' /></Link>
                        <h2 className="text-2xl font-semibold text-neutral-800">Project Name: {projectData?.name}</h2>
                    </div>
                    <div className='flex w-full mt-4 gap-6'>
                        <div className=' w-full'><ProjectDetailsCard title={'Total Hours'} value={projectData?.totalHours} isNumber={false} /></div>
                        <div className=' w-full'><ProjectDetailsCard title={'Total Cost'} value={`$${projectData?.totalCost}`} isNumber={true} /></div>
                        <div className=' w-full'><ProjectDetailsCard title={'Project Status'} value={projectData?.status === 1?"Active":"Completed"} isNumber={false} /></div>
                    </div>
                </div>

                {/* Employee Table */}
                <ProjectDetailsTable projectData={projectData} start={pageStart} end={pageStart + itemsPerPage} />
            </div>

            {/* Pagination */}
            {/* <div className="flex justify-center mt-4">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        {pageLeft.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`mx-1 ${currentPage === pageNum ? "font-bold" : ""}`}
          >
            {pageNum}
          </button>
        ))}
        {pageRight.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`mx-1 ${currentPage === pageNum ? "font-bold" : ""}`}
          >
            {pageNum}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div> */}
        </div>
    );
}