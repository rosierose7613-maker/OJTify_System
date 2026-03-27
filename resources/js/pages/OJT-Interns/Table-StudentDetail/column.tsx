"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Label } from "@/components/ui/label";

export type ActivityLog = {
  date: string;
  description: string;
  duration: string;
  status: string;
};

export const detailsColumns: ColumnDef<ActivityLog>[] = [
  {
    accessorKey: "date",
    header: () => (
      <Label className="text-black text-xs">
        Date
      </Label>
    ),
  },
  {
    accessorKey: "description",
    header: () => (
      <Label className="text-black text-xs pl-4">
        Task Description
      </Label>
    ),
  },
  {
    accessorKey: "duration",
    header: () => (
      <Label className="text-black text-xs">
        Duration
      </Label>
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.original.duration}</span>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <Label className="text-black text-xs text-right w-full block pr-4">
        Status
      </Label>
    ),
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <div className="text-right pr-4">
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
            {status}
          </span>
        </div>
      );
    },
  },
];