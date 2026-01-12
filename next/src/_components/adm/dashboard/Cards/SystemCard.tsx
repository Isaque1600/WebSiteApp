import { Skeleton } from "@/_components/ui/skeleton";
import { useSystem } from "@/hooks/Systems/useSystem";
import { System } from "@/types/System";
import { Monitor } from "lucide-react";
import { Box } from "../Box";

const colorMap: Record<string, string> = {
  red: "bg-red-800",
  blue: "bg-blue-800",
  green: "bg-green-800",
  yellow: "bg-yellow-800",
  purple: "bg-purple-800",
  pink: "bg-pink-800",
  indigo: "bg-indigo-800",
  gray: "bg-gray-800",
  orange: "bg-orange-800",
  teal: "bg-teal-800",
};

type Props = {
  system: System;
  color: string;
};

export function SystemCard({ system, color }: Props) {
  const { getUsersQuantityBySystemId } = useSystem();
  const { data: usersQuantity, isLoading } = getUsersQuantityBySystemId(
    system.id,
  );

  if (isLoading) {
    return <Skeleton className="h-24 w-48" />;
  }

  return (
    <Box
      className={`${color} flex-grow`}
      icon={<Monitor className="size-10" />}
      label={system.nome}
      quantity={usersQuantity ?? 0}
    />
  );
}
