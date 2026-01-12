import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import { usePerson } from "@/hooks/Person/usePerson";
import { Person } from "@/types/Person";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import DeleteDialog from "./Dialogs/DeleteDialog";
import UsersUpdateDialog from "./Dialogs/UsersDialogs/UpdateDialog";
import UserVisualizeDialog from "./Dialogs/UsersDialogs/VisualizeDialog";

export const columnsAvailable = [
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

export const columnsSchema: ColumnDef<Person>[] = columnsAvailable.map(
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
            className="flex h-full w-full min-w-96 items-center justify-center bg-zinc-775"
          >
            <span className="text-lg capitalize text-neutral-100">
              {column.id}
            </span>
          </div>
        ),
        cell: ({ cell }) => {
          const user = cell.row.original;

          const { remove } = usePerson();
          const { mutateAsync: removeUser, isPending } = remove();

          return (
            <div className="flex h-full items-center justify-center gap-2 bg-zinc-750 p-4 text-lg text-neutral-100">
              <UserVisualizeDialog user={user} />
              <UsersUpdateDialog user={user} />
              <DeleteDialog
                deleteCallback={() => removeUser(user.cod_pes!)}
                loadingState={isPending}
              />
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
