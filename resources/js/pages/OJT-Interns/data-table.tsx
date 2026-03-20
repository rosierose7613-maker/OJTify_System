'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import {
  ListFilter,
  ChevronsUpDown,
  X,
  ChevronDown
} from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
          initialState: {
            pagination: {
                pageSize: 6,
            },
        },
    });
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    const totalRows = table.getFilteredRowModel().rows.length;

    const start = pageIndex * pageSize + 1;
    const end = Math.min(start + pageSize - 1, totalRows);

    return (
        <div>
           <div className="flex items-center justify-between py-4 text-black">
            <Input
                placeholder="Search student..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                />
            <div className="flex gap-2">

                    <Button variant="outline" className='text-gray-600'>
                        <ListFilter className="to-gray-600  h-2 w-2" />
                        Filters
                    </Button>

                    <Button variant="outline" className='text-gray-600'>
                        <ChevronsUpDown className="to-gray-600 h-2 w-2" />
                        Sort
                    </Button>

                </div>
            </div>
            
            <div className="flex items-center gap-2 pb-4">

                <Button
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer text-sm h-7 px-2 gap-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                    Status: Active
                    <X className="h-3 w-3 text-blue-700" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm" className="text-sm h-7 px-2 gap-1 cursor-pointer">
                        Company: All Partners
                        <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>All Partners</DropdownMenuItem>
                        <DropdownMenuItem>Google</DropdownMenuItem>
                        <DropdownMenuItem>Microsoft</DropdownMenuItem>
                        <DropdownMenuItem>Local Company</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm" className="text-sm h-7 px-2 gap-1 cursor-pointer">
                        Progress: Any
                        <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Any</DropdownMenuItem>
                        <DropdownMenuItem>0-40%</DropdownMenuItem>
                        <DropdownMenuItem>41-80%</DropdownMenuItem>
                        <DropdownMenuItem>81-100%</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer text-sm h-7 px-2 gap-1 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                    >
                    Clear all filters
                </Button>

            </div>

          
            <div className="overflow-hidden rounded-md border">
                <Table>

                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </div>
             <div className="flex items-center justify-between py-4">
                
            <div className="text-sm text-muted-foreground">
                Showing {start} to {end} of {totalRows} results
            </div>

            <div className="flex items-center gap-4">

                <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                >
                Previous
                </Button>

                <span className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md">
                {table.getState().pagination.pageIndex + 1}
                </span>

                <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                >
                Next
                </Button>

            </div>

            </div>
        </div>
    );
}