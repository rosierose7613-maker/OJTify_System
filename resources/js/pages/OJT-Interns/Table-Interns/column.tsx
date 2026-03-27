"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleEllipsis, CircleAlert, Circle, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import Edit from '../Dialogss/Edit';



export type InternData = {
  id: string;
  name: string;
  studentId: string;
  course: string;
  company: string;
  hoursRendered: number;
  totalHours: number;
  completion: number;
  docAudit: number;
  totalDocs: number;
  batchyear: string; 
  status: "ON-TRACK" | "AT RISK";
};


export const internColumns = (
  setSelectedRow: (row: InternData) => void
): ColumnDef<InternData>[] => [
      {
        accessorKey: "name",
        enableColumnFilter: true,
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Student Name
            <ChevronsUpDown className="h-0.5 w-0.5"/>
            </Button>
          )
        },
        enableSorting: true,
        cell: ({ row }) => {
          const student = row.original;
          return (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                {student.name.charAt(0)}
              </div>
              <div>
                <Link
                  href={`/interns/${student.id}`} 
                  className="font-medium text-black hover:underline"
                >
                  {student.name}
                </Link>
                <p className="text-xs text-muted-foreground">ID {student.studentId}</p>
              </div>
            </div>
          );
        },
      },
      {
      accessorKey: "batchyear",
      header: "Batch Year",
      filterFn: (row, id, value) => {
        return row.getValue(id) === value
      }
    },
      {
        accessorKey: "company",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Company
            <ChevronsUpDown className="h-0.5 w-0.5"/>
            </Button>
          )
        },
        enableSorting: true,
      },
      {
        accessorKey: "hoursRendered",
        header: "Hours Rendered",
        cell: ({ row }) => {
          const { hoursRendered, totalHours } = row.original;
          const percentage = totalHours > 0
          ? Math.floor((hoursRendered / totalHours) * 100)
          : 0;
          return (
          <div className="flex flex-col gap-1 max-w-[180px]">
            <div className="flex justify-between items-center text-xs ">
              <span>
                {hoursRendered} / {totalHours} hrs
              </span>
              <span className="text-gray-500">
                {percentage}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full">
              <div
                className={`h-1.5 rounded-full ${
                  percentage > 80
                    ? "bg-green-500"
                    : percentage > 40
                    ? "bg-yellow-400"
                    : "bg-red-500"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          );
        },
      },
      {
  accessorKey: "docAudit",
  header: "Document Audit",
  cell: ({ row }) => {
    const completed = row.original.docAudit;
    const total = row.original.totalDocs;

    return (
      <div className="flex gap-2">
        {[...Array(total)].map((_, i) => {
          if (i < completed) {
            return <CircleCheck key={i} className="h-3.5 w-3.5 text-green-500" />;
          } else {
            return <Circle key={i} className="h-3.5 w-3.5 text-gray-300" />;
          }
        })}
      </div>
    );
  },
},
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          const colors: Record<string, string> = {
            "COMPLETED": "bg-green-100 text-green-800",
            "ON-GOING": "bg-yellow-100 text-yellow-800",
            "AT RISK": "bg-red-100 text-red-800",
            "INACTIVE": "bg-gray-100 text-gray-800",
          };
          return (
            <span
              className={`px-2 py-1 text-[10px] font-semibold rounded-full ${colors[status]}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const intern = row.original;
          
          const { processing, delete: destroy } = useForm();

          const handleDelete = (id: string, name: string) => {
            if (confirm(`Do you want to delete the intern - ${id}, ${name}?`)) {
              destroy(`/interns/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                  console.log("Deleted successfully");
                },
              });
            }
          };

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              <Edit intern={intern} />
              <DropdownMenuItem
                onClick={() => handleDelete(intern.id, intern.name)}
              >
              <span className="text-red-500 hover:text-red-600 cursor-pointer transition-colors">
                Delete
              </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];