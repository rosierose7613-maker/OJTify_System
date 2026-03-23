"use client";
import AppLayout from '@/layouts/app-layout'
import type { BreadcrumbItem } from '@/types'
import { usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Student {
  name: string;
  studentId: string;
  role: string;
  course: string;
  profilePhoto?: string;
  totalHours: number;
  tasksLogged: number;
  aiPerformance: number;
  milestone: string;
  milestoneProgress: number;
  executiveSummary: string;
}

    const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Interns",
      href: "/interns",
    },
  ];


export default function ViewDetails() {
  const { student } = usePage<{ student: Student }>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="flex flex-col md:flex-row gap-6 p-6">
      
      {/* Left: Student Profile */}
      <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6 flex flex-col items-center gap-4">
        <img
          src={student.profilePhoto || "/default-avatar.png"}
          alt={student.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="text-center">
          <h2 className="text-lg font-semibold">{student.name}</h2>
          <p className="text-sm text-muted-foreground">{student.role}</p>
          <p className="text-sm text-blue-600">Student ID: {student.studentId}</p>
          <p className="text-sm text-muted-foreground">{student.course}</p>
        </div>

        {/* Next Milestone */}
        <div className="mt-4 w-full">
          <h3 className="text-sm font-medium text-gray-700">Next Milestone</h3>
          <p className="text-sm">{student.milestone}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${student.milestoneProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{student.milestoneProgress}% complete</p>
        </div>
      </div>

      {/* Right: Overall Summary */}
      <div className="w-full md:w-2/3 bg-white shadow rounded-lg p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Overall Summary</h2>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" /> Download PDF
          </Button>
        </div>
        <p className="text-xs text-gray-500 mb-4">November 11 - November 15, 2025 • Week 6 Review</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">Total Hours</p>
            <p className="font-semibold">{student.totalHours}h</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">Tasks Logged</p>
            <p className="font-semibold">{student.tasksLogged}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">AI Performance</p>
            <p className="font-semibold">{student.aiPerformance}%</p>
          </div>
        </div>

        {/* Executive AI Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-2">Executive AI Summary</h3>
          <p className="text-sm text-gray-600">{student.executiveSummary}</p>
        </div>
      </div>
    </div>
</AppLayout>
  );
}