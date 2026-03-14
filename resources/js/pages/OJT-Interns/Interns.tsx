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
  BarChart3,
  Plus,
  Import
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

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-semibold">Intern Management</h1>
            <p className="text-muted-foreground text-sm">
              Track progress, manage documentation, and monitor performance across all partner companies.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
            <Import/>
              Import Report
            </Button>

            <Button className='text-white bg-blue-600 hover:bg-blue-700'>
            <Plus/>
              Add Student
            </Button>
          </div>

        </div>


        {/* STAT CARDS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL INTERNS */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Total Interns
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                1,248
              </div>

              <p className="text-xs text-green-600">
                +12% from last semester
              </p>
            </CardContent>
          </Card>


          {/* ACTIVE OJT */}
          <Card className='pl-4'>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Active OJT
              </CardTitle>

              <Briefcase className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                982
              </div>

              <p className="text-xs text-muted-foreground">
                78% of registered students
              </p>
            </CardContent>
          </Card>


          {/* PENDING DOCS */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Pending Docs
              </CardTitle>

              <FileText className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                45
              </div>

              <p className="text-xs text-orange-600">
                Action required by students
              </p>
            </CardContent>
          </Card>


          {/* AVG COMPLETION */}
          <Card className='pr-4'>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Avg. Completion
              </CardTitle>

              <BarChart3 className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>

            <CardContent>

              <div className="text-2xl font-bold">
                64%
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div className="h-2 w-[64%] rounded-full bg-purple-500"></div>
              </div>

            </CardContent>
          </Card>

        </div>
         <div className="mt-6">
          <StudentsInterns />
        </div>

      </div>

    </AppLayout>
  )
}