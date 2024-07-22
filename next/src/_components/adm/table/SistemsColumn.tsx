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
      <div className="flex h-full w-full min-w-96 cursor-pointer items-center justify-center bg-zinc-775 text-lg text-neutral-100">
        <span className="capitalize">{column.id}</span>
      </div>
    ),
    cell: ({ cell }: any) => (
      <div className="bg-zinc-750 p-5 text-lg text-neutral-100">
        {cell.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex h-full w-full min-w-96 cursor-pointer items-center justify-center bg-zinc-775 text-lg text-neutral-100">
        <span className="capitalize">{column.id}</span>
      </div>
    ),
    cell: ({ cell }: any) => (
      <div className="bg-zinc-750 p-5 text-lg text-neutral-100">
        {cell.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <div className="flex h-full w-full min-w-96 cursor-pointer items-center justify-center bg-zinc-775 text-lg text-neutral-100">
        <span className="capitalize">{column.id}</span>
      </div>
    ),
    cell: ({ cell }: any) => {
      const user = cell.row.original;

      return (
        <div className="flex h-full justify-center gap-2 bg-zinc-750 p-4 text-lg text-neutral-100">
          <Dialog>
            <DialogTrigger>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <Edit />
              </Button>
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
            <DialogTrigger>
              <Button variant={"destructive"}>
                <Trash2 />
              </Button>
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
