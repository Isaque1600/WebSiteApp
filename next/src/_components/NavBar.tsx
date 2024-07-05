"use client";

import { usePathname } from "next/navigation";
import { MusicPlayer } from "./MusicPlayer";
import { NavLink } from "./NavLink";

export function NavBar() {
  const location = usePathname();

  return (
    <nav className="sticky top-0 left-0 bg-neutral-950 p-4 z-10 flex flex-row flex-wrap gap-16 h-fit w-full justify-center content-start items-center text-base max-md:text-sm max-md:gap-8">
      <NavLink thisPage={location === "/"} href="/">
        pag. inicial
      </NavLink>
      <NavLink thisPage={location === "/contato"} href="/contato">
        contato
      </NavLink>
      <NavLink thisPage={location === "/login"} href="/login">
        login
      </NavLink>
      <NavLink thisPage={location === "/gdoor"} href="/gdoor">
        gdoor
      </NavLink>
      <MusicPlayer />
    </nav>
  );
}
