"use client";

import { usePerson } from "@/hooks/Person/usePerson";
import { ContadorContext } from "@/providers/ContadorProvider";
import { Person } from "@/types/Person";
import { AxiosError } from "axios";
import { SearchX } from "lucide-react";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";

type ContadorSelectProps = {
  className?: string;
};

export function ContadorSelect({ className }: ContadorSelectProps) {
  const { selectedContadorId, setSelectedContadorId } =
    useContext(ContadorContext);

  const { get } = usePerson();

  const {
    data: contadores,
    isLoading: isContadoresLoading,
    isError: isContadoresError,
    error: contadoresError,
  } = get({ type: "contador", status: "ativo" });

  useEffect(() => {
    if (!isContadoresError) {
      return;
    }

    if (contadoresError instanceof AxiosError) {
      if (contadoresError.response?.status === 403) {
        return;
      }
    }

    toast.error("Erro ao carregar contadores.");
    console.error("Error fetching contadores:", contadoresError);
  }, [isContadoresError, contadoresError]);

  useEffect(() => {
    if (
      contadores?.data &&
      contadores.data.length > 0 &&
      selectedContadorId === null
    ) {
      const firstContadorId = contadores.data[0].user_id;
      if (firstContadorId) {
        setSelectedContadorId(Number(firstContadorId));
      }
    }
  }, [contadores]);

  const handleContadorChange = (contadorId: string) => {
    const selectedId = contadorId === "" ? null : Number(contadorId);
    setSelectedContadorId(selectedId);
  };

  if (
    isContadoresError &&
    !(
      contadoresError instanceof AxiosError &&
      contadoresError.response?.status === 403
    )
  ) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <SearchX className="size-5 text-red-600" />
        <span className="text-red-600">Erro ao carregar contadores</span>
      </div>
    );
  }

  if (isContadoresLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Skeleton className="h-8 w-48" />
      </div>
    );
  }

  if (!contadores?.data || contadores.data.length === 0) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-gray-500">Nenhum contador disponível</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Select
        onValueChange={handleContadorChange}
        value={selectedContadorId !== null ? String(selectedContadorId) : ""}
      >
        <SelectTrigger className="w-64 rounded-none rounded-t-md border-0 border-b-2 border-gray-800 text-lg capitalize shadow-none outline-none hover:bg-zinc-200 hover:shadow-inner">
          <SelectValue placeholder="Selecione um contador" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          {contadores.data.map((contador: Person, index: number) => (
            <SelectItem key={index} value={String(contador.user_id!)}>
              {contador.nome ||
                contador.razao ||
                `Contador #${contador.user_id}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
