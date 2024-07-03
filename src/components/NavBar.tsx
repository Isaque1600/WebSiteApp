import { useLocation } from "react-router-dom";
import { MusicPlayer } from "./MusicPlayer";
import { NavLink } from "./NavLink";

export function NavBar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 left-0 bg-neutral-950 p-4 z-10 flex flex-row flex-wrap gap-16 h-fit w-full justify-center content-start items-center text-base max-md:text-sm max-md:gap-8">
      <NavLink thisPage={location.pathname === "/"} to="/">
        pag. inicial
      </NavLink>
      <NavLink thisPage={location.pathname === "/contato"} to="/contato">
        contato
      </NavLink>
      <NavLink thisPage={location.pathname === "/login"} to="/login">
        login
      </NavLink>
      <NavLink thisPage={location.pathname === "/gdoor"} to="/gdoor">
        gdoor
      </NavLink>
      <MusicPlayer />
    </nav>
  );
}
