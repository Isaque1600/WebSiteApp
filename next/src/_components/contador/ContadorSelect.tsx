"use client";

import { usePerson } from "@/hooks/Person/usePerson";
import { useAuth } from "@/hooks/useAuth";
import { Person } from "@/types/Person";
import { AxiosError } from "axios";
import { SearchX } from "lucide-react";
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

type ContadorSelectProps = {
  onContadorChange?: (contadorId: number | null) => void;
  className?: string;
};

export function ContadorSelect({
  onContadorChange,
  className,
}: ContadorSelectProps) {
  const { me } = useAuth();
  const { data: user } = me();
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
    if (!contadores?.data || !user) return;

    if (user.type === "admin") {
      const firstContador = contadores.data[0];
      if (firstContador && onContadorChange) {
        onContadorChange(Number(firstContador.user_id));
      }
    } else if (user.type === "contador") {
      if (onContadorChange) {
        onContadorChange(user.id);
      }
    }
  }, [contadores, user]);

  const handleContadorChange = (contadorId: string) => {
    const selectedId = contadorId === "" ? null : Number(contadorId);
    if (onContadorChange) {
      onContadorChange(selectedId);
    }
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
        <span className="text-lg text-red-600">
          {user?.login.toUpperCase()}
        </span>
        <span className="text-red-600">(Erro ao carregar contadores)</span>
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

  // If there are no contadores available
  if (!contadores?.data || contadores.data.length === 0) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-lg">{user?.login.toUpperCase()}</span>
        <span className="text-gray-500">(Nenhum contador disponível)</span>
      </div>
    );
  }

  // For admin users, show select dropdown
  if (user?.type === "admin") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Select
          onValueChange={handleContadorChange}
          defaultValue={contadores.data[0]?.user_id}
        >
          <SelectTrigger className="w-64 rounded-none rounded-t-md border-0 border-b-2 border-gray-800 text-lg capitalize shadow-none outline-none hover:bg-zinc-200 hover:shadow-inner">
            <SelectValue placeholder="Selecione um contador" />
          </SelectTrigger>
          <SelectContent className="capitalize">
            {contadores.data.map((contador: Person) => (
              <SelectItem
                key={contador.user_id}
                value={String(contador.user_id!)}
              >
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

  // For contador users, just show their name (non-selectable)
  if (user?.type === "contador") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-lg">- {user?.login.toUpperCase()}</span>
      </div>
    );
  }
}
