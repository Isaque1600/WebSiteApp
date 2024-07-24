import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

export type Sistems = {
  id: number;
  name: string;
};

export const columnsSchema: ColumnDef<Sistems>[] = [
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
          <Dialog>
            <DialogTrigger className="rounded-md bg-emerald-400 p-2 px-4 hover:bg-emerald-500">
              <Edit />
            </DialogTrigger>
            <DialogContent className="border-zinc-750 bg-zinc-750 text-neutral-100">
              <DialogHeader>
                <DialogTitle> Informações </DialogTitle>
                <DialogDescription className="text-neutral-400">
                  Test
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="rounded-md bg-red-500 p-2 px-4 hover:bg-red-600">
              <Trash2 />
            </DialogTrigger>
            <DialogContent className="border-zinc-750 bg-zinc-750 text-neutral-100">
              <DialogHeader>
                <DialogTitle>
                  Você tem certeza que deseja deletar esse registro?
                </DialogTitle>
                <DialogDescription className="text-neutral-400">
                  Essa ação é irreversível, não pode ser desfeita!
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={() => {
                    console.log(user);
                  }}
                  type="submit"
                  variant={"destructive"}
                >
                  Deletar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
