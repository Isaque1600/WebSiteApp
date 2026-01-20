import { useSystem } from "@/hooks/Systems/useSystem";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import DeleteDialog from "./Dialogs/DeleteDialog";

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
    cell: ({ cell }: CellContext<Systems, unknown>) => (
      <div className="flex h-16 justify-center bg-zinc-750 p-4 text-lg text-neutral-100">
        {cell.getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <div className="flex h-full w-full min-w-96 items-center justify-center bg-zinc-775 text-lg text-neutral-100">
        <span className="capitalize">{column.id}</span>
      </div>
    ),
    cell: ({ cell }: CellContext<Systems, unknown>) => (
      <div className="flex h-16 items-center justify-center bg-zinc-750 px-4 py-2 text-lg text-neutral-100">
        {cell.getValue() as string}
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
    cell: ({ row }: CellContext<Systems, unknown>) => {
      const system = row.original;

      const { remove } = useSystem();
      const { mutateAsync: deleteSystem, isPending } = remove;

      return (
        <div className="flex h-16 items-center justify-center gap-2 bg-zinc-750 p-2 text-lg text-neutral-100">
          {/* <UpdateDialog ></UpdateDialog> */}
          <DeleteDialog
            deleteCallback={() => deleteSystem(system.id)}
            loadingState={isPending}
          />
        </div>
      );
    },
  },
];
