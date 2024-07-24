"use client";

import { Section } from "@/_components/adm/section/Section";
import { columnsSchema } from "@/_components/adm/table/SistemsColumn";
import { columns } from "@/_components/contador/files/Columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SquarePlus } from "lucide-react";
import Link from "next/link";

export default function Sistemas() {
  const table = useReactTable({
    data: [{ id: 1, name: "Sistemas" }],
    columns: columnsSchema,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Section.Root>
      <div className="mb-3 flex items-center justify-between">
        <Section.Title>Listar</Section.Title>
        <Link
          className="flex items-center gap-2 rounded-xl bg-red-650 p-4 text-lg font-semibold text-neutral-100 hover:bg-red-700"
          href={"/admin/sistemas/cadastrar"}
        >
          <SquarePlus />
          <span>Cadastrar</span>
        </Link>
      </div>
      <div>
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
    </Section.Root>
  );
}
