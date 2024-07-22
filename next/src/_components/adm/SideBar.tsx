"use client";

import {
  BarChart4,
  FilePlus,
  Home,
  List,
  LogOut,
  Monitor,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type Props = {
  sideBar: boolean;
};

export default function SideBar({ sideBar }: Props) {
  const location = usePathname();

  return (
    <nav
      data-toggled={sideBar}
      className="fixed left-0 h-[calc(100vh-7rem)] w-36 select-none bg-neutral-800 text-lg text-neutral-100 shadow shadow-neutral-950 duration-100 ease-in-out data-[toggled=false]:-left-36 data-[toggled=false]:shadow-none max-lg:w-11"
    >
      <Link
        href={"/admin"}
        data-active={location === "/admin"}
        className="flex h-11 flex-row items-center justify-between px-2 py-2 hover:bg-neutral-900 hover:shadow-sm data-[active=true]:bg-neutral-700 data-[active=true]:shadow-sm"
      >
        <Home />
        <span className="max-lg:hidden">Dashboard</span>
      </Link>
      <Link
        href={"/admin/relatorio"}
        data-active={location === "/admin/relatorio"}
        className="flex h-11 flex-row items-center justify-between px-2 py-2 hover:bg-neutral-900 hover:shadow-sm data-[active=true]:bg-neutral-700 data-[active=true]:shadow-sm"
      >
        <BarChart4 />
        <span className="max-lg:hidden">Relatório</span>
      </Link>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger
            className="flex h-11 w-full flex-row items-center justify-between px-2 py-2 text-lg font-normal hover:bg-neutral-900 hover:shadow-sm"
            chevronClassName="max-lg:hidden text-neutral-100"
          >
            <span>
              <Users />
            </span>
            <span className="max-lg:hidden">Usuários</span>
          </AccordionTrigger>
          <AccordionContent className="w-full pb-0 text-lg">
            <Link
              href={"/admin/usuarios"}
              data-active={location === "/admin/usuarios"}
              className="flex h-11 flex-row items-center justify-between px-2 py-2 hover:bg-neutral-900 hover:shadow-sm data-[active=true]:bg-neutral-700 data-[active=true]:shadow-sm"
            >
              <List />
              <span className="max-lg:hidden">Listar</span>
            </Link>
            <Link
              href={"/admin/usuarios/cadastrar"}
              data-active={location === "/admin/usuarios/cadastrar"}
              className="flex h-11 flex-row items-center justify-between px-2 py-2 hover:bg-neutral-900 hover:shadow-sm data-[active=true]:bg-neutral-700 data-[active=true]:shadow-sm"
            >
              <UserPlus />
              <span className="max-lg:hidden">Cadastrar</span>
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-none">
          <AccordionTrigger
            className="flex h-11 w-full flex-row items-center justify-between px-2 py-2 text-lg hover:bg-neutral-900 hover:shadow-sm"
            chevronClassName="max-lg:hidden text-neutral-100"
          >
            <span>
              <Monitor />
            </span>
            <span className="max-lg:hidden">Sistemas</span>
          </AccordionTrigger>
          <AccordionContent className="w-full pb-0 text-lg">
            <Link
              href={"/admin/sistemas"}
              data-active={location === "/admin/sistemas"}
              className="flex h-11 flex-row items-center justify-between px-2 py-2 hover:bg-neutral-900 hover:shadow-sm data-[active=true]:bg-neutral-700 data-[active=true]:shadow-sm"
            >
              <List />
              <span className="max-lg:hidden">Listar</span>
            </Link>
            <Link
              href={"/admin/sistemas/cadastrar"}
              data-active={location === "/admin/sistemas/cadastrar"}
              className="flex h-11 flex-row items-center justify-between px-2 py-2 hover:bg-neutral-900 hover:shadow-sm data-[active=true]:bg-neutral-700 data-[active=true]:shadow-sm"
            >
              <FilePlus />
              <span className="max-lg:hidden">Cadastrar</span>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Link
        href={"/logout"}
        className="flex h-11 flex-row items-center justify-between px-2 py-2 hover:bg-neutral-900 hover:shadow-sm"
      >
        <LogOut />
        <span className="max-lg:hidden">Sair</span>
      </Link>
    </nav>
  );
}
