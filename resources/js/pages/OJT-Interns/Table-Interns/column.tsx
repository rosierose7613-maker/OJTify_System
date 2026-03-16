"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleEllipsis, CircleAlert } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical } from "lucide-react";

export type InternData = {
  id: string;
  name: string;
  studentId: string;
  company: string;
  role: string;
  hoursRendered: number;
  totalHours: number;
  completion: number;
  docAudit: number;
  status: "ON-TRACK" | "EVALUATION PENDING" | "AT RISK";
};

export const internColumns = (
  setSelectedRow: (row: InternData) => void
): ColumnDef<InternData>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
                  <p className="font-medium">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.studentId}</p>
                </div>
              </div>
            );
          },
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
          const percentage = Math.floor((hoursRendered / totalHours) * 100);
          return (
            <div className="flex flex-col gap-1">
              <p className="text-xs text-bold">
                {hoursRendered} / {totalHours} hrs
              </p>
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
        const dots = row.original.docAudit; 
        return (
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => {
              if (i <= dots) {
                return <CircleCheck key={i} className="h-3.5 w-3.5 text-green-500" />;
              } else if (i === dots + 1) {
                return <CircleEllipsis key={i} className="h-3.5 w-3.5 text-orange-300" />;
              } else if (i === dots + 2) {
                return <CircleAlert key={i} className="h-3.5 w-3.5 text-red-500" />;
              } else {
                return <CircleCheck key={i} className="h-3.5 w-3.5 text-gray-300" />;
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
            "ON-TRACK": "bg-green-100 text-green-800",
            "EVALUATION PENDING": "bg-blue-100 text-blue-800",
            "AT RISK": "bg-red-100 text-red-800",
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
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedRow(intern)}>
                  <Eye className="mr-2 h-4 w-4" /> View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];