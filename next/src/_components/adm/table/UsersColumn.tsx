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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Edit, Eye, Trash2 } from "lucide-react";

export type Users = {
  cod_pes?: string;
  nome?: string;
  razao?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  uf?: string;
  ie?: string;
  contato?: string;
  sistema?: string;
  serial?: string;
  obs?: string;
  ven_cert?: string;
  email?: string;
  situacao?: string;
  tef?: string;
  nfe?: string;
  sped?: string;
  contador?: string;
  email_backup?: string;
  senha_backup?: string;
  tipo?: string;
};

const columnsSelected = [
  "cod_pes",
  "nome",
  "razao",
  "logradouro",
  "numero",
  "bairro",
  "cidade",
  "cep",
  "uf",
  "ie",
  "contato",
  "sistema",
  "serial",
  "obs",
  "ven_cert",
  "email",
  "situacao",
  "tef",
  "nfe",
  "sped",
  "contador",
  "email_backup",
  "senha_backup",
  "tipo",
  "senha",
  "ações",
];

export const columnsSchema: ColumnDef<Users>[] = columnsSelected.map(
  (element) => {
    if (element == "cod_pes") {
      return {
        accessorKey: element,
        header: ({ column }: any) => (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex h-full w-full min-w-96 cursor-pointer items-center justify-center bg-zinc-775"
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
          <div className="h-full bg-zinc-750 p-5 text-lg text-neutral-100">
            {cell.getValue()}
          </div>
        ),
        enableHiding: false,
      };
    }

    if (element == "senha" || element == "senha_backup") {
      return {
        accessorKey: element,
        header: ({ column }: any) => (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex h-full w-full min-w-96 cursor-pointer items-center justify-center bg-zinc-775"
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
          <div className="h-full bg-zinc-750 p-5 text-lg text-neutral-100">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {cell.getValue() ? "********" : ""}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none bg-neutral-600 shadow">
                <DropdownMenuItem
                  className="cursor-pointer capitalize text-neutral-100"
                  onClick={() => navigator.clipboard.writeText(cell.getValue())}
                >
                  Copiar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      };
    }

    if (element == "ações") {
      return {
        accessorKey: element,
        header: ({ column }: any) => (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex h-full w-full min-w-96 cursor-pointer items-center justify-center bg-zinc-775"
          >
            <span className="text-lg capitalize text-neutral-100">
              {column.id}
            </span>
          </div>
        ),
        cell: ({ cell }: any) => {
          const user = cell.row.original;

          return (
            <div className="flex h-full justify-center gap-2 bg-zinc-750 p-4 text-lg text-neutral-100">
              <Dialog>
                <DialogTrigger>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Eye />
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
        enableSorting: false,
      };
    }

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
        <div className="h-full bg-zinc-750 p-5 text-lg text-neutral-100">
          <DropdownMenu>
            <DropdownMenuTrigger>{cell.getValue()}</DropdownMenuTrigger>
            <DropdownMenuContent className="border-none bg-neutral-600 shadow">
              <DropdownMenuItem
                className="cursor-pointer capitalize text-neutral-100"
                onClick={() => navigator.clipboard.writeText(cell.getValue())}
              >
                Copiar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    };
  },
);
