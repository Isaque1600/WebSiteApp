"use client";

import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/_components/ui/scroll-area";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
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
export function DataTable<TData, TValue>({
  data,
  pages,
  page,
  search,
  filter,
  searchColumns,
  per_page,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = columnsSchema as ColumnDef<TData, any>[];
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  useEffect(() => {
    const columnsSelected = columnVisibility;
    console.log(columnsSelected);
  }, [columnVisibility]);

  return (
    <div className="my-4 flex flex-col items-center">
      <div className="flex w-full gap-10 py-4">
        <Search search={search} filter={filter} columns={searchColumns} />
        <PerPage per_page={per_page} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-56">
            <Button
              variant="outline"
              className="h ml-auto border-none bg-neutral-600 text-neutral-100 shadow hover:bg-neutral-600 hover:bg-opacity-60 hover:text-neutral-100"
            >
              Selecione as Colunas a Exibir
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 border-none bg-neutral-600 text-neutral-100 shadow-lg"
          >
            <ScrollArea className="h-32">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      disabled={!column.getCanHide()}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full">
        <ScrollArea>
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
                        className="h-12 rounded-lg px-0.5 [&>div]:first:rounded-tl-md [&>div]:last:rounded-tr-md"
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
                      <TableCell
                        key={cell.id}
                        className="h-24 p-0.5 text-center"
                      >
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <Pagination pages={pages} page={page} />
    </div>
  );
}
