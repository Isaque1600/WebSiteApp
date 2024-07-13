"use client";

import { usePathname } from "next/navigation";
import { MusicPlayer } from "../MusicPlayer";
import { NavLink } from "../NavLink";

export function NavBar() {
  const location = usePathname();

  return (
    <nav className="sticky left-0 top-0 z-10 flex h-fit w-full flex-row flex-wrap content-start items-center justify-center gap-16 bg-neutral-950 p-4 text-base max-md:gap-8 max-md:text-sm">
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
