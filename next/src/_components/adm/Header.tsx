import logo from "@/assets/imgs/Logo.png";
import { LogOut, Menu, Settings, UserCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
  sideBar: boolean;
  setSideBar: (sideBar: boolean) => void;
};

export default function Header({ sideBar, setSideBar }: Props) {
  return (
    <header className="sticky top-0 z-50 flex h-28 w-full select-none flex-row items-center justify-between bg-neutral-950 p-5 px-9 shadow shadow-neutral-950">
      <div className="flex flex-row items-center gap-8">
        <Menu
          className="size-12 cursor-pointer text-neutral-50"
          onClick={() => setSideBar(!sideBar)}
        />
        <Link href={"/"}>
          <Image src={logo} alt="logo" className="h-16 w-28" />
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="size-fit rounded-full outline-none">
          <UserCircle2 className="size-16 text-neutral-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-fit border-neutral-900 bg-neutral-800 text-neutral-100"
        >
          <DropdownMenuItem className="p-0 text-lg focus:bg-neutral-700 focus:text-neutral-100">
            <Link
              href={"/config"}
              className="flex w-full flex-row items-center justify-between gap-2 p-2"
            >
              <Settings /> Configurações
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0 text-lg focus:bg-neutral-700 focus:text-neutral-100">
            <Link
              href={"/logout"}
              className="flex w-full flex-row items-center justify-between gap-2 p-2"
            >
              <LogOut />
              Sair
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
