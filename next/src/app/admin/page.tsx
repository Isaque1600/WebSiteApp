"use client";

import { Box } from "@/_components/adm/dashboard/Box";
import { SystemCard } from "@/_components/adm/dashboard/Cards/SystemCard";
import { Section } from "@/_components/adm/section/Section";
import { usePerson } from "@/hooks/Person/usePerson";
import { useSystem } from "@/hooks/Systems/useSystem";
import { System } from "@/types/System";
import { Skeleton } from "@mui/material";
import { Users } from "lucide-react";

export default function Admin() {
  const { get: getSystems } = useSystem();
  const { data: systemsReturn, isLoading: isSystemsLoading } = getSystems();
  const systemsData = systemsReturn?.data;

  const { get: getUsers } = usePerson();
  const { data: usersAccountantReturn, isLoading: isUsersAccountantLoading } =
    getUsers({ type: "contador", status: "ativo" });
  const { data: usersClientReturn, isLoading: isUsersClientLoading } = getUsers(
    { type: "cliente", status: "ativo" },
  );
  const isUsersLoading = isUsersAccountantLoading || isUsersClientLoading;
  const usersData = {
    accountants: usersAccountantReturn,
    clients: usersClientReturn,
  };

  const colors = [
    "bg-red-600",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-indigo-700",
    "bg-cyan-600",
    "bg-violet-700",
    "bg-fuchsia-700",
  ];

  return (
    <>
      <Section.Root className="mb-3">
        <Section.Title>Sistemas</Section.Title>
        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {isSystemsLoading ? (
            <>
              <Skeleton variant="rounded" className="flex-grow" height={160} />
              <Skeleton variant="rounded" className="flex-grow" height={160} />
              <Skeleton variant="rounded" className="flex-grow" height={160} />
              <Skeleton variant="rounded" className="flex-grow" height={160} />
            </>
          ) : (
            systemsData?.map((system: System, index: number) => (
              <SystemCard
                key={system.id}
                system={system}
                color={colors[index % colors.length]}
              />
            ))
          )}
        </div>
      </Section.Root>
      <Section.Root>
        <Section.Title>Usuários</Section.Title>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
          {isUsersLoading ? (
            <>
              <Skeleton variant="rounded" className="flex-grow" height={160} />
              <Skeleton variant="rounded" className="flex-grow" height={160} />
            </>
          ) : (
            <>
              <Box
                className="flex-grow bg-blue-600"
                icon={<Users />}
                label="Contadores"
                quantity={usersData.accountants!.meta.total as number}
              />
              <Box
                className="flex-grow bg-emerald-600"
                icon={<Users />}
                label="Clientes"
                quantity={usersData.clients!.meta.total as number}
              />
            </>
          )}
        </div>
      </Section.Root>
    </>
  );
}
