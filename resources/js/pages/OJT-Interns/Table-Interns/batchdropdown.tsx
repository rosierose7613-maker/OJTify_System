"use client"

import * as React from "react"
import {CalendarFoldIcon} from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropdownMenuCheckboxesProps {
  batchYears: string[];
  onSelect: (year: string | null) => void;
}

export function DropdownMenuCheckboxes({batchYears, onSelect}: any) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" 
        className="text-gray-500"
        >
        <CalendarFoldIcon className="h-4 w-4"/>
        Batch Year
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem
            key="all"
            onClick={() => onSelect(null)}
          >
            All
          </DropdownMenuCheckboxItem>
            {batchYears.map((year: string) =>(
          <DropdownMenuCheckboxItem
            key={year}
            onClick={() => onSelect(year.trim())} 
            >
                {year}
          </DropdownMenuCheckboxItem>
        ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
