import { Main } from "@/_components/main/Main";

export default function Gdoor() {
  return (
    <Main className="flex-row items-start justify-around gap-y-6 max-xl:flex-wrap max-md:items-center max-md:gap-6">
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-xl font-medium uppercase">gdoor pro</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-800"
            download={true}
            href="https://downloads.gdoor.com.br/api/pack/GDOORPRO_PACK.exe"
          >
            Pack Pro
          </a>
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-800"
            download={true}
            href="https://downloads.gdoor.com.br/api/pack/GDOORPRO_Instalacao_Completa.exe"
          >
            Pro Completo
          </a>
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-800"
            download={true}
            href="https://gdoor3.websiteseguro.com/files/Arquivos_auxiliares.rar"
          >
            Gdoor Arquivos
          </a>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-lg font-medium uppercase">gdoor slim</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-800"
            download={true}
            href="https://downloads.gdoor.com.br/api/pack/GDOORSLIM_PACK.exe"
          >
            Pack slim
          </a>
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-800"
            download={true}
            href="https://downloads.gdoor.com.br/api/pack/GDOORSLIM_Instalacao_Completa.exe"
          >
            Slim Completo
          </a>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-lg font-medium uppercase">gdoor mei</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-800"
            download={true}
            href="https://downloads.gdoor.com.br/api/pack/GDOORMEI_PACK.exe"
          >
            Pack Mei
          </a>
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-800"
            download={true}
            href="https://downloads.gdoor.com.br/api/pack/GDOORMEI_Instalacao_Completa.exe"
          >
            Mei Completo
          </a>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-lg font-medium uppercase">gdoor ct-e</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-800"
            href="https://painel.gdoor.com.br/suporte/down/100"
          >
            Pack CT-e
          </a>
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-800"
            href="https://painel.gdoor.com.br/suporte/down/99#"
          >
            CT-e Completo
          </a>
        </div>
      </div>
    </Main>
  );
}
