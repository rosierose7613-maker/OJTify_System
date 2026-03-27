"use client";

import AppLayout from '@/layouts/app-layout'
import type { BreadcrumbItem } from '@/types'
import { usePage } from "@inertiajs/react";
import {DetailsTable} from './details-table';
import { detailsColumns, ActivityLog } from './Table-StudentDetail/column';
import { User, ZapIcon,CheckCircle, Clock } from "lucide-react";
import {Label} from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Interns", href: "/interns" },
];

interface Student {
  name: string;
  studentId: string;
  role: string;
  course: string;
  totalHours: number;
  renderedHours: number;
  tasksLogged: number;
  aiPerformance: number;
  milestoneProgress: number;
  executiveSummary: string;
  status: "ON-TRACK" | "EVALUATION PENDING" | "AT RISK";
}


export default function ViewDetails() {
  type PageProps = {
  student: Student;
  logs: ActivityLog[];
};

const { student, logs } = usePage<PageProps>().props;
  const initial = student.name.charAt(0).toUpperCase();
  const progress = student.milestoneProgress;

  const statusColors: Record<string, string> = {
    "ON-TRACK": "bg-green-100 text-green-800",
    "EVALUATION PENDING": "bg-blue-100 text-blue-800",
    "AT RISK": "bg-red-100 text-red-800",
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4">

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-blue-600" />
                  Student Profile
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col items-center text-center p-6 gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
                  {initial}
                </div>

                <div>
                  <h2 className="font-bold text-lg">{student.name}</h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Student ID: {student.studentId}
                  </p>
                  <p className="text-sm text-blue-600">{student.course}</p>
                  
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">

            <div>
              <h2 className="text-xl font-semibold">Student Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm text-gray-600">
                    Total Rendered Hours
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h2 className="text-lg font-bold">{student.renderedHours}h</h2>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm text-gray-600">
                    Tasks Logged
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h2 className="text-lg font-bold">{student.tasksLogged}</h2>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm text-gray-600">
                    Performance
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-purple-100">
                    <ZapIcon className="h-4 w-4 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h2 className="text-lg font-bold">{student.aiPerformance}%</h2>
                </CardContent>
              </Card>
            </div>
            <div>
              <Label className="text-sm text-gray-600">
                  Activity Log Snapshot
              </Label>
              <div>
                <DetailsTable columns={detailsColumns} data={logs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}