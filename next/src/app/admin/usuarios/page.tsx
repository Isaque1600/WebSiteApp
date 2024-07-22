"use client";

import { Section } from "@/_components/adm/section/Section";
import { Users } from "@/_components/adm/table/UsersColumn";
import { DataTable } from "@/_components/adm/table/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

const data: Users[] = [
  {
    cod_pes: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    cod_pes: "2",
    nome: "João",
    situacao: "Ativo",
  },
  {
    cod_pes: "3",
    nome: "João",
    situacao: "Ativo",
  },
  {
    cod_pes: "4",
    nome: "João",
    situacao: "Ativo",
  },
  {
    cod_pes: "5",
    nome: "João",
    situacao: "Ativo",
  },
  {
    cod_pes: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    cod_pes: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    cod_pes: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    cod_pes: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    cod_pes: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    cod_pes: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    cod_pes: "1",
    nome: "João",
    situacao: "Ativo",
  },
];

export default function Usuarios({}: Props) {
  const [type, setType] = useState("cliente");
  const [status, setStatus] = useState("ativo");
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "nome";
  const perPage = searchParams.get("per_page") || "25";

  useEffect(() => {
    const url = `api/admin/usuarios/${type}?page=${page}&search=${search}&filter=${filter}&per_page=${perPage}&status=${status}`;

    console.log("data fetched");

    return;
  }, [type, status, page, search, filter, perPage]);

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
          <Select onValueChange={(e) => setType(e)}>
            <SelectTrigger className="w-32 border-none bg-neutral-600 capitalize text-neutral-100 shadow placeholder:text-neutral-400">
              <SelectValue placeholder={type} />
            </SelectTrigger>
            <SelectContent className="border-none bg-neutral-600 text-neutral-100 shadow-md">
              <SelectItem value="cliente">Cliente</SelectItem>
              <SelectItem value="contador">Contador</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(e) => setStatus(e)}>
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
        <DataTable
          data={data}
          page={parseInt(page)}
          pages={[1, 2, 3]}
          search={search}
          searchColumns={["nome"]}
          filter={filter}
          per_page={parseInt(perPage)}
        />
      </div>
    </Section.Root>
  );
}
