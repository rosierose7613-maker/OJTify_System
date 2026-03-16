import AppLayout from '@/layouts/app-layout'
import type { BreadcrumbItem } from '@/types'
import  StudentsInterns  from "./Table-Interns/interns";
import { Button } from "@/components/ui/button"
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
  Plus,
  Download
} from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Interns',
    href: '/interns',
  },
]

export default function Interns() {
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
            <Button variant="outline" className='text-gray-500'>
            <Download className='to-gray-500'/>
              Import Report
            </Button>

            <Button className='text-white bg-blue-600 hover:bg-blue-700'>
            <Plus/>
              Add Student
            </Button>
          </div>

        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                1,248
              </div>

              <p className="text-xs text-green-600">
                +12% from last semester
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
                982
              </div>

              <p className="text-xs text-muted-foreground">
                78% of registered students
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
                45
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
                64%
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[64%] rounded-full bg-purple-500"></div>
              </div>

            </CardContent>
          </Card>

        </div>
         <div className="">
          <StudentsInterns />
        </div>

      </div>

    </AppLayout>
  )
}