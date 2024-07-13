import { Separator } from "@/_components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-950 text-slate-50">
      <div className="flex h-fit items-center justify-center space-x-4">
        <h1 className="text-4xl italic">404</h1>
        <Separator orientation="vertical" className="h-6" />
        <h1 className="text-3xl italic">Página não encontrada</h1>
      </div>
    </div>
  );
}
