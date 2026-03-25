"use client";

import AppLayout from '@/layouts/app-layout'
import type { BreadcrumbItem } from '@/types'
import { usePage } from "@inertiajs/react";
import { User, Users, CheckCircle, Activity, ClipboardList } from "lucide-react";
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
  tasksLogged: number;
  aiPerformance: number;
  milestoneProgress: number;
  executiveSummary: string;
  status: "ON-TRACK" | "EVALUATION PENDING" | "AT RISK";
}

export default function ViewDetails() {
  const { student } = usePage<{ student: Student }>().props;
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

        <div>
          <h1 className="text-2xl font-bold">Intern Details</h1>
          <p className="text-sm text-gray-500">
            Track intern performance and progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4">

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4" />
                  Student Profile
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col items-center text-center p-6 gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
                  {initial}
                </div>

                <div>
                  <h2 className="font-bold text-lg">{student.name}</h2>
                  <p className="text-sm text-gray-500">{student.role}</p>
                  <p className="text-sm text-gray-400">{student.course}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    ID: {student.studentId}
                  </p>
                </div>

                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[student.status]}`}>
                  {student.status}
                </span>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">

            <div>
              <h2 className="text-xl font-semibold">Overall Summary</h2>
              <p className="text-xs text-gray-500">
                Weekly performance overview
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-2">
                  <CardTitle className="text-sm text-gray-600">
                    Total Hours
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Activity className="h-4 w-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h2 className="text-lg font-bold">{student.totalHours}</h2>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-2">
                  <CardTitle className="text-sm text-gray-600">
                    Tasks
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-green-100">
                    <ClipboardList className="h-4 w-4 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h2 className="text-lg font-bold">{student.tasksLogged}</h2>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-2">
                  <CardTitle className="text-sm text-gray-600">
                    AI Score
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-purple-100">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h2 className="text-lg font-bold">{student.aiPerformance}%</h2>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-2">
                  <CardTitle className="text-sm text-gray-600">
                    Completion
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-orange-100">
                    <Users className="h-4 w-4 text-orange-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h2 className="text-lg font-bold">{progress}%</h2>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Work Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>

                <div className="bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  {student.executiveSummary}
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}