"use client";

import { useAuth } from "@/hooks/useAuth";
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
  const { data: user } = me();

  const [selectedContadorId, setSelectedContadorId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (!user) return;

    if (user.type === "contador") setSelectedContadorId(user.id);
  }, [user]);

  return (
    <ContadorContext.Provider
      value={{ selectedContadorId, setSelectedContadorId }}
    >
      {children}
    </ContadorContext.Provider>
  );
};
