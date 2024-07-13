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
      className="flex h-16 flex-row items-center justify-end p-4 shadow-neutral-400 data-[downloadbtn=true]:justify-between"
    >
      {downloadBtn && (
        <Button
          onClick={onClick}
          className="h-fit w-fit space-x-1 bg-transparent p-3 py-2 shadow-none hover:bg-zinc-200 hover:shadow-inner"
        >
          <Download className="size-7 text-neutral-800" />
          <span className="text-lg text-neutral-800">Baixar</span>
        </Button>
      )}
      <div className="capitalize">
        <span className="mx-2 text-lg text-neutral-800">
          {selectedItens} itens selecionados
        </span>
        <span className="mx-2 text-lg text-neutral-800">
          Exibindo {pageItems} itens
        </span>
      </div>
    </section>
  );
}
