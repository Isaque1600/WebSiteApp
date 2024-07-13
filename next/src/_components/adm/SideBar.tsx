"use client";

import { BarChart4, Home, LogOut, Monitor, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        href={"/admin"}
        data-active={location === "/relatorio"}
        className="flex h-11 flex-row items-center justify-between px-2 py-2 hover:bg-neutral-900 hover:shadow-sm data-[active=true]:bg-neutral-700 data-[active=true]:shadow-sm"
      >
        <BarChart4 />
        <span className="max-lg:hidden">Relatório</span>
      </Link>
      <Link
        href={"/admin"}
        data-active={location === "/usuarios"}
        className="flex h-11 flex-row items-center justify-between px-2 py-2 hover:bg-neutral-900 hover:shadow-sm data-[active=true]:bg-neutral-700 data-[active=true]:shadow-sm"
      >
        <Users />
        <span className="max-lg:hidden">Usuários</span>
      </Link>
      <Link
        href={"/admin"}
        data-active={location === "/sistemas"}
        className="flex h-11 flex-row items-center justify-between px-2 py-2 hover:bg-neutral-900 hover:shadow-sm data-[active=true]:bg-neutral-700 data-[active=true]:shadow-sm"
      >
        <Monitor />
        <span className="max-lg:hidden">Sistemas</span>
      </Link>
      <Link
        href={"/admin"}
        data-active={location === "/sair"}
        className="flex h-11 flex-row items-center justify-between px-2 py-2 hover:bg-neutral-900 hover:shadow-sm data-[active=true]:bg-neutral-700 data-[active=true]:shadow-sm"
      >
        <LogOut />
        <span className="max-lg:hidden">Sair</span>
      </Link>
    </nav>
  );
}
