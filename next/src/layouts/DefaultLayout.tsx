import { Footer } from "@/_components/main/Footer";
import { Header } from "@/_components/main/Header";
import { NavBar } from "@/_components/main/NavBar";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
      <NavBar />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
