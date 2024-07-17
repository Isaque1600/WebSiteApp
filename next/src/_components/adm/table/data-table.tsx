"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Pagination from "../Pagination";
import PerPage from "../PerPage";
import Search from "../Search";
import { columnsSchema } from "./UsersColumn";

interface DataTableProps<TData, TValue> {
  data: TData[];
  pages: Array<number>;
  page: number;
  search: string;
  filter: string;
  searchColumns: string[];
  per_page: number;
}
export default function DataTable<TData, TValue>({
  data,
  pages,
  page,
  search,
  filter,
  searchColumns,
  per_page,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<TData, any>[] = columnsSchema as any;
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  //-TODO - SS Pagination
  //-TODO - Search
  //-TODO - Per page content
  // TODO - Select Type
  // TODO - Select Status
  // TODO - Toggle column SS (update actual column rendering method)

  return (
    <div className="my-4 flex flex-col items-center">
      <div className="flex w-full gap-10 py-4">
        <Search search={search} filter={filter} columns={searchColumns} />
        <PerPage per_page={per_page} />
      </div>
      <div className="w-full">
        <Table className="w-full rounded-lg" containerClassName="">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="w-full border-none hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="rounded-lg px-0.5 [&>div]:first:rounded-tl-md [&>div]:last:rounded-tr-md"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-none hover:bg-transparent [&>td:first-child>div]:last:rounded-bl-md [&>td:last-child>div]:last:rounded-br-md [&>td>div]:even:bg-zinc-725"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-0.5 text-center">
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
      <Pagination pages={pages} page={page} />
    </div>
  );
}
