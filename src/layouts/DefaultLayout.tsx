import { NavBar } from "@/components/NavBar";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export function DefaultLayout() {
  return (
    <>
      <NavBar />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
