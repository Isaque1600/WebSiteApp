import { Button } from "@/_components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

export type Users = {
  id?: string;
  nome?: string;
  situacao?: string;
  email?: string;
};

const columnsSelected = ["id", "nome", "situacao"];

export const columnsSchema: ColumnDef<Users>[] = columnsSelected.map(
  (element) => {
    return {
      accessorKey: element,
      header: ({ column }: any) => (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex w-full min-w-96 cursor-pointer items-center justify-center bg-zinc-775"
        >
          <Button
            variant={"ghost"}
            className="flex w-full cursor-pointer flex-row items-center justify-center text-lg text-neutral-100 hover:bg-transparent hover:text-neutral-100"
          >
            <span className="capitalize">{column.id}</span>
            {column.getIsSorted() == "asc" ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      ),
      cell: ({ cell }: any) => (
        <div className="bg-zinc-750 text-lg text-neutral-100">
          {cell.getValue()}
        </div>
      ),
    };
  },
);
