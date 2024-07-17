"use client";

import Section from "@/_components/adm/Section";
import { Users } from "@/_components/adm/table/UsersColumn";
import DataTable from "@/_components/adm/table/data-table";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {};

const data: Users[] = [
  {
    id: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    id: "2",
    nome: "João",
    situacao: "Ativo",
  },
  {
    id: "3",
    nome: "João",
    situacao: "Ativo",
  },
  {
    id: "4",
    nome: "João",
    situacao: "Ativo",
  },
  {
    id: "5",
    nome: "João",
    situacao: "Ativo",
  },
  {
    id: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    id: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    id: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    id: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    id: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    id: "1",
    nome: "João",
    situacao: "Ativo",
  },
  {
    id: "1",
    nome: "João",
    situacao: "Ativo",
  },
];

export default function Usuarios({}: Props) {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const filter = searchParams.get("filter") || "nome";

  return (
    <Section>
      <div className="flex items-center justify-between">
        <h1 className="px-2 text-center text-lg font-medium tracking-wider text-neutral-100">
          Listar
        </h1>
        <Link
          className="flex gap-2 rounded-xl bg-red-650 p-4 text-lg font-semibold text-neutral-100"
          href={"/admin/usuarios/cadastrar"}
        >
          <UserPlus />
          <span>Cadastrar</span>
        </Link>
      </div>
      <div>
        <DataTable
          data={data}
          page={parseInt(page)}
          pages={[1, 2, 3]}
          search={search}
          searchColumns={["nome"]}
          filter={filter}
        />
      </div>
    </Section>
  );
}
