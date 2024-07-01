import { useLocation } from "react-router-dom";
import logo from "../assets/imgs/contact_info.png";
import { NavLink } from "./NavLink";

export function Header() {
  const location = useLocation();

  return (
    <header className="flex flex-col justify-between h-auto w-auto pr-10 pl-10 pt-[5px] mr-[22.5px] ml-[22.5px] gap-y-4">
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="max-w-[80%]" />
      </div>
      <nav className="flex flex-row flex-wrap gap-8 h-fit w-full justify-center content-start ">
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
      </nav>
    </header>
  );
}
