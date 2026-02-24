"use client";

import { useAuth } from "@/hooks/useAuth";
import { Loader2, SearchX } from "lucide-react";
import { createContext, ReactNode, useEffect, useState } from "react";

export type ContadorContextType = {
  selectedContadorId: number | null;
  setSelectedContadorId: (contadorId: number | null) => void;
};

export const ContadorContext = createContext<ContadorContextType>({
  selectedContadorId: null,
  setSelectedContadorId: () => {},
});

export const ContadorProvider = ({ children }: { children: ReactNode }) => {
  const { me } = useAuth();
  const { data: user, isLoading, isError, error } = me();

  const [selectedContadorId, setSelectedContadorId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (!user) return;

    if (user.type === "contador") setSelectedContadorId(user.id);
  }, [user]);

  useEffect(() => {
    if (isError) {
      setSelectedContadorId(null);
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="flex items-center gap-2 text-neutral-500">
          <Loader2 className="animate-spin" />
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="flex items-center gap-2 text-neutral-500">
          <SearchX />
          Erro ao carregar dados do contador.
        </span>
      </div>
    );
  }

  return (
    <ContadorContext.Provider
      value={{ selectedContadorId, setSelectedContadorId }}
    >
      {children}
    </ContadorContext.Provider>
  );
};
