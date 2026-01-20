"use client";

import { useFile } from "@/hooks/Files/useFiles";
import { usePerson } from "@/hooks/Person/usePerson";
import { useAuth } from "@/hooks/useAuth";
import { Person } from "@/types/Person";
import { useEffect } from "react";
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
  const { me } = useAuth();
  const { data: user } = me();

  const { getYears } = useFile();
  const { getClients } = usePerson();
  const {
    data: clients,
    isLoading: isClientsLoading,
    isError: isClientsError,
    error: clientsError,
  } = getClients();

  const {
    data: years,
    isLoading: isYearsLoading,
    isError: isYearsError,
    error: yearsError,
  } = getYears();

  useEffect(() => {
    if (isClientsError) {
      toast.error("Erro ao carregar clientes.");
      console.error("Error fetching clients:", clientsError);
    }

    if (isYearsError) {
      toast.error("Erro ao carregar anos.");
      console.error("Error fetching years:", yearsError);
    }
  }, [isClientsError, isYearsError, clientsError, yearsError]);

  if (isClientsError || isYearsError) {
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
      <Select defaultValue="all" onValueChange={setMonth}>
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
      <Select defaultValue="all" onValueChange={setYear}>
        <SelectTrigger className="w-36 rounded-none rounded-t-md border-0 border-b-2 border-gray-800 text-lg capitalize shadow-none outline-none hover:bg-zinc-200 hover:shadow-inner">
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          <SelectItem value="all">Todos</SelectItem>
          {years.data.map((year: string, i: number) => (
            <SelectItem key={i} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="null" onValueChange={setName}>
        <SelectTrigger className="w-fit min-w-96 space-x-2 rounded-none rounded-t-md border-0 border-b-2 border-gray-800 text-lg capitalize shadow-none outline-none hover:bg-zinc-200 hover:shadow-inner">
          <SelectValue placeholder="Todos" />
        </SelectTrigger>
        <SelectContent className="capitalize">
          <SelectItem value="null">Todos</SelectItem>
          {clients.data.map((client: Person, i: number) => (
            <SelectItem key={i} value={client.nome || client.razao!}>
              {client.nome || client.razao!}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
