import AppLayout from '@/layouts/app-layout'
import type { BreadcrumbItem } from '@/types'
import  StudentsInterns  from "./Table-Interns/interns";
import { usePage } from "@inertiajs/react";
import AddStudent from './Dialogss/AddStudent';
import ImportDialog from './Dialogss/ImportReport';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Users,
  Briefcase,
  FileText,
  ChartNoAxesCombined,
  Download
} from "lucide-react"


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Interns',
    href: '/interns',
  },
]
type PageProps = {
  stats: {
    totalInterns: number;
    activeOjt: number;
    pendingDocs: number;
    avgCompletion: number;
    growth: number;
  };
  batchYears: string[];
};

export default function Interns({ interns = [], batchYears = [] }: { interns?: any[], batchYears?: string[] }) {
  const { stats } = usePage<PageProps>().props;
  const activePercent = stats.totalInterns > 0
    ? Math.round((stats.activeOjt / stats.totalInterns) * 100)
    : 0;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-semibold">Intern Management</h1>
            <p className="text-muted-foreground text-sm">
              Track progress, manage documentation, and monitor performance across all partner companies.
            </p>
          </div>

          <div className="flex gap-2">        
          <ImportDialog/>

          <AddStudent/>
        </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-0">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Interns
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-200">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>

            <CardContent className="pt-0 pb-3">
              <div className="text-2xl font-bold pb-2">
                {stats.totalInterns}
              </div>

              <p className='text-xs text-green-600'>
                Lorem Ipsum
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium  text-gray-600">
                Active OJT
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-200">
                <Briefcase className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold pb-2">
                {stats.activeOjt}
              </div>

              <p className="text-xs text-muted-foreground">
                {activePercent}% of registered students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium  text-gray-600">
                Pending Docs
              </CardTitle>
              <div className="p-2 rounded-lg bg-orange-200">
                <FileText className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold pb-2">
                {stats.pendingDocs}
              </div>

              <p className="text-xs text-orange-600">
                Action required by students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium  text-gray-600">
                Avg. Completion
              </CardTitle>
              <div className="p-2 rounded-lg bg-purple-200">
                <ChartNoAxesCombined className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold pb-2">
              {stats.avgCompletion}%
            </div>

            <div className="mt-2 h-2 w-full rounded-full bg-muted">
              <div 
                className="h-2 rounded-full bg-purple-500"
                style={{ width: `${stats.avgCompletion}%` }}
              ></div>
            </div>
            </CardContent>
          </Card>

        </div>
         <div className="px-4">
        <StudentsInterns interns={interns} batchYears={batchYears} />        
        </div>
      </div>

    </AppLayout>
  )
}