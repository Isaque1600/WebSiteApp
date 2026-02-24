"use client";

import { useFile } from "@/hooks/Files/useFiles";
import { usePerson } from "@/hooks/Person/usePerson";
import { ContadorContext } from "@/providers/ContadorProvider";
import { Person } from "@/types/Person";
import { AxiosError } from "axios";
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

type TableParametersProps = {
  setYear: (year: string) => void;
  setMonth: (month: string) => void;
  setName: (name: string) => void;
};

export function TableParameters({
  setYear,
  setMonth,
  setName,
}: TableParametersProps) {
  const { selectedContadorId } = useContext(ContadorContext);

  const { getYears } = useFile();
  const { getClients } = usePerson();
  const {
    data: clients,
    isLoading: isClientsLoading,
    isError: isClientsError,
    error: clientsError,
  } = getClients({
    userId: selectedContadorId ? `${selectedContadorId}` : "0",
    search_by: "razao",
  });

  const {
    data: years,
    isLoading: isYearsLoading,
    isError: isYearsError,
    error: yearsError,
  } = getYears();

  useEffect(() => {
    if (!isClientsError) {
      return;
    }

    if (clientsError instanceof AxiosError) {
      if (clientsError.response?.status === 404) {
        toast.error("Nenhum cliente encontrado.");
        return;
      }
    }

    toast.error("Erro ao carregar clientes.");
  }, [isClientsError, clientsError]);

  useEffect(() => {
    if (!isYearsError) {
      return;
    }
    toast.error("Erro ao carregar anos.");
  }, [isYearsError, yearsError]);

  const now = new Date();
  const previousDate = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate(),
  );

  console.log(
    previousDate.getMonth().toString(),
    previousDate.getFullYear().toString(),
  );

  if (isClientsError || isYearsError) {
    if (clientsError instanceof AxiosError) {
      if (clientsError.response?.status === 404) {
        return (
          <div className="flex flex-row items-center justify-center gap-2">
            <span className="text-red-600">Nenhum cliente encontrado.</span>
          </div>
        );
      }
    }

    return (
      <div className="flex flex-row items-center justify-center gap-2">
        <span className="text-red-600">Erro ao carregar parâmetros.</span>
      </div>
    );
  }

  if (isClientsLoading || isYearsLoading) {
    return (
      <div className="flex flex-row items-center justify-center gap-2">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-96" />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Select
        defaultValue={(previousDate.getMonth() + 1).toString()}
        onValueChange={setMonth}
      >
        <SelectTrigger className="w-36 rounded-none rounded-t-md border-0 border-b-2 border-gray-800 text-lg capitalize shadow-none outline-none hover:bg-zinc-200 hover:shadow-inner">
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          <SelectItem value="all">Todos</SelectItem>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <SelectItem key={i} value={(i + 1).toString()}>
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={previousDate.getFullYear().toString() || "all"}
        onValueChange={setYear}
      >
        <SelectTrigger className="w-36 rounded-none rounded-t-md border-0 border-b-2 border-gray-800 text-lg capitalize shadow-none outline-none hover:bg-zinc-200 hover:shadow-inner">
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          <SelectItem value="all">Todos</SelectItem>
          {years.data.map((year: string, i: number) => {
            if (!year) return;

            return (
              <SelectItem key={i} value={year}>
                {year}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Select
        defaultValue="null"
        onValueChange={setName}
        disabled={clients.data.length === 0}
      >
        <SelectTrigger
          className="w-fit min-w-96 space-x-2 rounded-none rounded-t-md border-0 border-b-2 border-gray-800 text-lg capitalize shadow-none outline-none hover:bg-zinc-200 hover:shadow-inner"
          disabled={clients.data.length === 0}
        >
          <SelectValue
            placeholder={
              clients.data.length === 0
                ? "Nenhum cliente disponível"
                : "Selecione um cliente"
            }
          />
        </SelectTrigger>
        <SelectContent className="capitalize">
          <SelectItem value="null">Todos</SelectItem>
          {clients.data.map((client: Person, i: number) => (
            <SelectItem key={i} value={client.razao!}>
              {client.razao!}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
