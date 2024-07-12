import { Separator } from "@/_components/ui/separator";
import logo from "@/assets/imgs/Logo.png";
import { FileTextIcon, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavLinkContador from "./NavLinkContador";

type SideBarProps = {
  className?: string;
};

export default function SideBar({ className, ...props }: SideBarProps) {
  return (
    <nav className={className}>
      <Link className="w-full" href={"/"}>
        <Image className="p-4" src={logo} alt={"logo.png"} />
      </Link>
      <Separator
        orientation="horizontal"
        className="w-full my-4 bg-neutral-700"
      />
      <div className="flex flex-col flex-wrap w-full">
        <h1 className="text-2xl px-4 text-red-650 mb-4 w-full max-lg:text-lg">
          Documentos
        </h1>
        <NavLinkContador
          href={"/contador"}
          prefix={
            <FileTextIcon className="text-red-650 size-7 max-lg:size-5" />
          }
        >
          Arquivos Fiscais
        </NavLinkContador>
        <NavLinkContador
          href={"/contador/certificados"}
          prefix={
            <FileTextIcon className="text-red-650 size-7 max-lg:size-5" />
          }
        >
          Certificados
        </NavLinkContador>
        <NavLinkContador
          href={"/contador/speds"}
          prefix={
            <FileTextIcon className="text-red-650 size-7 max-lg:size-5" />
          }
        >
          SPED's Fiscais
        </NavLinkContador>
      </div>
      <Separator
        orientation="horizontal"
        className="w-full my-4 bg-neutral-700"
      />
      <NavLinkContador
        href={"/logout"}
        prefix={<LogOut className="max-lg:size-5" />}
      >
        Sair
      </NavLinkContador>
    </nav>
  );
}
