"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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
  completion: number; // 0-100
  docAudit: number; // 0-3
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
    header: "Student Name",
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
    header: "Company",
  },
  {
    accessorKey: "hoursRendered",
    header: "Hours Rendered",
    cell: ({ row }) => {
      const { hoursRendered, totalHours } = row.original;
      const percentage = Math.floor((hoursRendered / totalHours) * 100);
      return (
        <div className="flex flex-col gap-1">
          <p className="text-sm">
            {hoursRendered} / {totalHours} hrs
          </p>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${
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
      const dots = row.original.docAudit; // 0-3
      return (
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i <= dots ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
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
          className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[status]}`}
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