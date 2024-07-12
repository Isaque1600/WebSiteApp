"use client";

import { Download } from "lucide-react";
import { Button } from "../ui/button";

type UtilitiesProps = {
  downloadBtn: boolean;
  onClick: () => void;
  pageItems: number;
  selectedItens: number;
};

export function Utilities({
  downloadBtn,
  onClick,
  pageItems,
  selectedItens,
}: UtilitiesProps) {
  return (
    <section
      data-downloadbtn={downloadBtn}
      className="flex flex-row h-16 items-center justify-end data-[downloadbtn=true]:justify-between shadow-neutral-400 p-4 "
    >
      {downloadBtn && (
        <Button
          onClick={onClick}
          className="p-3 py-2 w-fit h-fit bg-transparent shadow-none hover:bg-zinc-200 hover:shadow-inner space-x-1"
        >
          <Download className="text-neutral-800 size-7" />
          <span className="text-neutral-800 text-lg">Baixar</span>
        </Button>
      )}
      <div className="capitalize">
        <span className="text-neutral-800 text-lg mx-2">
          {selectedItens} itens selecionados
        </span>
        <span className="text-neutral-800 text-lg mx-2">
          Exibindo {pageItems} itens
        </span>
      </div>
    </section>
  );
}
