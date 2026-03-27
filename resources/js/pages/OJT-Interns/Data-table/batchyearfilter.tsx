"use client";

import { CalendarFoldIcon, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

interface BatchYearFilterProps<TData> {
  table: Table<TData>;
  batchYears: string[];
}

export default function BatchYearFilter<TData>({
  table,
  batchYears,
}: BatchYearFilterProps<TData>) {
  const currentFilter = table.getColumn("batchyear")?.getFilterValue() as string | undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-1 text-gray-500">
          <CalendarFoldIcon className="h-4 w-4" />
          Batch Year
          <ChevronDown className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        <DropdownMenuCheckboxItem
          onClick={() => table.getColumn("batchyear")?.setFilterValue(undefined)}
        >
          All
        </DropdownMenuCheckboxItem>

        {batchYears.map((year) => (
          <DropdownMenuCheckboxItem
            key={year}
            onClick={() =>
              table.getColumn("batchyear")?.setFilterValue(year)
            }
          >
            {currentFilter === year && <Check className="h-4 w-4 mr-2" />}
            {year}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}