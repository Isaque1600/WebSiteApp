import { ColumnDef } from "@tanstack/react-table";
import DeleteDialog from "./Dialogs/DeleteDialog";
import UpdateDialog from "./Dialogs/UpdateDialog";

export type Systems = {
  id: number;
  name: string;
};

export const columnsSchema: ColumnDef<Systems>[] = [
  {
    accessorKey: "id",
    header: ({ column }: any) => (
      <div className="flex h-full w-full min-w-96 items-center justify-center bg-zinc-775 text-lg text-neutral-100">
        <span className="capitalize">{column.id}</span>
      </div>
    ),
    cell: ({ cell }: any) => (
      <div className="bg-zinc-750 p-4 text-lg text-neutral-100">
        {cell.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex h-full w-full min-w-96 items-center justify-center bg-zinc-775 text-lg text-neutral-100">
        <span className="capitalize">{column.id}</span>
      </div>
    ),
    cell: ({ cell }: any) => (
      <div className="flex h-16 items-center justify-center bg-zinc-750 px-4 text-lg text-neutral-100">
        {cell.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <div className="flex h-full w-full min-w-96 items-center justify-center bg-zinc-775 text-lg text-neutral-100">
        <span className="capitalize">{column.id}</span>
      </div>
    ),
    cell: ({ cell }: any) => {
      const user = cell.row.original;

      return (
        <div className="flex h-16 items-center justify-center gap-2 bg-zinc-750 p-2 text-lg text-neutral-100">
          <UpdateDialog user={user} />
          <DeleteDialog user={user} />
        </div>
      );
    },
  },
];
