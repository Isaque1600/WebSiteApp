"use client";

import { ScrollArea } from "@/_components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { SearchX } from "lucide-react";
import { useEffect, useState } from "react";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setDisplayDownload: (display: boolean) => void;
  setItensSelected: (itens: any) => void;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  setDisplayDownload,
  setItensSelected,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: (itens) => {
      setRowSelection(itens);
    },
    state: {
      sorting,
      rowSelection,
    },
  });

  useEffect(() => {
    setItensSelected(table.getFilteredSelectedRowModel().rows);
    if (table.getFilteredSelectedRowModel().rows.length > 0) {
      setDisplayDownload(true);
    } else {
      setDisplayDownload(false);
    }
  }, [rowSelection]);

  return (
    <div className="rounded-md border-0">
      <Table
        containerClassName="overflow-y-hidden w-full p-4 max-h-[78vh]"
        className="w-full"
      >
        <TableHeader className="block w-full text-xl font-bold tracking-tight">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="w-full">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    data-file={header.id == "file"}
                    className="rounded-sm border-y-2 border-neutral-500 text-center text-neutral-800 odd:pl-0 data-[file=true]:w-full"
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
        <TableBody className="block max-h-[78vh] text-lg">
          <ScrollArea className="h-[70vh]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="last:rounded-b-lg hover:bg-slate-200 data-[state=selected]:shadow-inner data-[state=selected]:shadow-black/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      data-file={cell.column.id}
                      className="rounded-sm text-center text-neutral-800 odd:pl-0 data-[file=file]:w-full"
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
                  className="w-full text-center"
                >
                  <div className="flex h-96 flex-col items-center justify-center">
                    <SearchX className="size-40 text-red-650" />
                    <span className="text-3xl text-red-650">
                      Nenhum arquivo encontrado
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </ScrollArea>
        </TableBody>
      </Table>
    </div>
  );
}
