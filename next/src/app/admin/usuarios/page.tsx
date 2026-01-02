"use client";

import { Section } from "@/_components/adm/section/Section";
import { DataTable } from "@/_components/adm/table/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { Skeleton } from "@/_components/ui/skeleton";
import { usePerson } from "@/hooks/Person/usePerson";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Props = {};

export default function Usuarios({}: Props) {
  const [type, setType] = useState<"cliente" | "contador">("cliente");
  const [status, setStatus] = useState<"ativo" | "inativo">("ativo");
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "nome";
  const perPage = searchParams.get("per_page") || "25";

  const { get, prefetchNextPage } = usePerson();
  const { data, isLoading } = get({
    type,
    status,
    page,
    per_page: perPage,
    search_by: filter,
    search,
  });
  prefetchNextPage({
    page,
    per_page: perPage,
    search_by: filter,
    search,
    type,
    status,
  });

  //-TODO - SS Pagination
  //-TODO - Search
  //-TODO - Per page content
  //-TODO - Select Type
  //-TODO - Select Status
  // TODO - Toggle column SS (SS not made yet)
  //-TODO - Update actual column rendering method

  return (
    <Section.Root>
      <div className="mb-3 flex items-center justify-between">
        <Section.Title>Listar</Section.Title>
        <Link
          className="flex gap-2 rounded-xl bg-red-650 p-4 text-lg font-semibold text-neutral-100"
          href={"/admin/usuarios/cadastrar"}
        >
          <UserPlus />
          <span>Cadastrar</span>
        </Link>
      </div>
      <div>
        <div className="flex w-fit gap-4">
          <Select
            defaultValue={type}
            onValueChange={(e) => setType(e as "cliente" | "contador")}
          >
            <SelectTrigger className="w-32 border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:text-neutral-400">
              <SelectValue placeholder={type} />
            </SelectTrigger>
            <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
              <SelectItem value="cliente">Cliente</SelectItem>
              <SelectItem value="contador">Contador</SelectItem>
            </SelectContent>
          </Select>
          <Select
            defaultValue={status}
            onValueChange={(e) => setStatus(e as "ativo" | "inativo")}
          >
            <SelectTrigger className="w-32 border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:text-neutral-400">
              <SelectValue placeholder={status} />
            </SelectTrigger>
            <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
              <SelectItem value="null">Todos</SelectItem>
              <SelectItem value="ativo">Ativos</SelectItem>
              <SelectItem value="inativo">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isLoading ? (
          <Skeleton></Skeleton>
        ) : (
          <DataTable
            data={data.data}
            page={parseInt(page)}
            pages={Array.from({ length: data.meta.last_page }, (_, i) => i + 1)}
            search={search}
            searchColumns={["nome"]}
            filter={filter}
            per_page={parseInt(perPage)}
          />
        )}
      </div>
    </Section.Root>
  );
}
