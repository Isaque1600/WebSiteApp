"use client";

import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/_components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { useUserColumns } from "@/hooks/UserColumns/useUserColumn";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  Updater,
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
import { columnsAvailable, columnsSchema } from "./UsersColumn";

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
  const { me } = useAuth();
  const { data: user } = me();

  const { getById, update } = useUserColumns();
  const { data: userColumnsData, isLoading } = getById({
    id: String(user?.id),
    options: { enabled: true },
  });

  const { mutateAsync: updateUserColumns } = update;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, _setColumnVisibility] = useState<VisibilityState>(
    {},
  );

  useEffect(() => {
    if (!isLoading && userColumnsData) {
      const splittedColumns =
        userColumnsData.data.columns.length > 0
          ? userColumnsData.data.columns.split(";")
          : [];

      const filteredColumns = splittedColumns.filter((column: string) =>
        columnsAvailable.includes(column),
      );

      _setColumnVisibility(() => {
        const visibility: VisibilityState = {};
        columnsAvailable.forEach((column) => {
          visibility[column] = !filteredColumns.includes(column);
        });
        return visibility;
      });
    }
  }, [userColumnsData, isLoading]);

  const setColumnVisibility = (updaterOrValue: Updater<VisibilityState>) => {
    const newVisibility =
      typeof updaterOrValue === "function"
        ? updaterOrValue(columnVisibility)
        : updaterOrValue;

    _setColumnVisibility(newVisibility);

    const hiddenColumns = Object.entries(newVisibility)
      .filter(([_, isVisible]) => !isVisible)
      .map(([columnId]) => columnId);

    console.log(hiddenColumns);

    updateUserColumns({
      id: String(user?.id),
      columns: hiddenColumns,
    });
  };

  const columns = columnsSchema as ColumnDef<TData>[];
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
                .map((column) => (
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
                ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full">
        <ScrollArea>
          {data.length > 0 ? (
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
                {table.getRowModel().rows.map((row) => (
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
                ))}
              </TableBody>
            </Table>
          ) : (
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
                <TableRow className="border-none hover:bg-transparent">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 p-0.5 text-center text-neutral-400"
                  >
                    <div className="my-16 flex w-full items-center justify-start px-24">
                      Nenhum dado encontrado.
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <Pagination pages={pages} page={page} />
    </div>
  );
}
