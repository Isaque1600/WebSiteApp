import { Footer } from "@/_components/Footer";
import { Header } from "@/_components/Header";
import { NavBar } from "@/_components/NavBar";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <NavBar />
      <Header />
      {children}
      <Footer />
    </>
  );
}
