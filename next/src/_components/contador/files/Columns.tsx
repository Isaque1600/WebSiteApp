import { Button } from "@/_components/ui/button";
import { Checkbox } from "@/_components/ui/checkbox";
import { Separator } from "@/_components/ui/separator";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { File } from "lucide-react";
import { toast } from "sonner";

export type Files = {
  filename: string;
  size: number;
  lastModified: string;
  url: string;
  year: string;
  month: string;
};

export const columns: ColumnDef<Files>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex w-16 items-center justify-center space-x-6">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          disabled={table.getRowCount() == 0}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar tudo"
          className="data-[state=checked]:bg-transparent data-[state=checked]:text-red-550"
        />
        <Separator
          orientation="vertical"
          className="h-6 w-[2px] bg-neutral-500"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex w-16 items-center justify-center space-x-6">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar"
          className="data-[state=checked]:bg-transparent data-[state=checked]:text-red-550"
        />
        <Separator
          orientation="vertical"
          className="h-6 w-[2px] bg-neutral-500"
        />
      </div>
    ),
  },
  {
    accessorKey: "filename",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex w-full min-w-96 cursor-pointer items-center justify-center"
      >
        <Button
          variant={"ghost"}
          className="flex w-full cursor-pointer flex-row items-center justify-center text-lg hover:bg-transparent"
        >
          Arquivo{" "}
          {column.getIsSorted() == "asc" ? <CaretUpIcon /> : <CaretDownIcon />}
        </Button>
        <Separator
          orientation="vertical"
          className="h-6 w-[2px] bg-neutral-500"
        />
      </div>
    ),
    cell: ({ row, table }) => (
      <div className="flex h-10 min-w-96 items-center">
        <Button
          className="flex h-full w-full items-center justify-start gap-2 py-0 align-middle text-base underline hover:bg-transparent"
          variant={"ghost"}
          onClick={(e) => {
            e.preventDefault();
            const meta = table.options.meta as {
              onFilenameClick?: (row: Files) => void;
            };
            meta?.onFilenameClick?.(row.original);
            toast.info("Iniciando download...", {
              id: `downloading-${row.original.url}`,
            });
          }}
        >
          <File className="!size-6" />
          <span className="text-blue-700">{row.getValue("filename")}</span>
        </Button>
        <Separator
          orientation="vertical"
          className="h-6 w-[2px] bg-neutral-500"
        />
      </div>
    ),
  },
  {
    accessorKey: "size",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        className="flex w-28 items-center justify-center"
      >
        <Button
          variant={"ghost"}
          className="flex w-full cursor-pointer flex-row items-center justify-center px-0 text-lg hover:bg-transparent"
        >
          Tamanho{" "}
          {column.getIsSorted() == "asc" ? <CaretUpIcon /> : <CaretDownIcon />}
        </Button>
        <Separator
          orientation="vertical"
          className="h-6 w-[2px] bg-neutral-500"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex w-28 items-center justify-center">
        <div className="w-full items-center pr-1">
          {row.getValue("size")} KB
        </div>
        <Separator
          orientation="vertical"
          className="h-6 w-[2px] bg-neutral-500"
        />
      </div>
    ),
  },
  {
    accessorKey: "lastModified",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        className="flex w-52 items-center justify-center"
      >
        <Button
          variant={"ghost"}
          className="flex w-full cursor-pointer flex-row items-center justify-center text-lg hover:bg-transparent"
        >
          Data de Modificação{" "}
          {column.getIsSorted() == "asc" ? <CaretUpIcon /> : <CaretDownIcon />}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex w-52 items-center justify-center">
        <div className="w-full text-center">{row.getValue("lastModified")}</div>
      </div>
    ),
  },
];
