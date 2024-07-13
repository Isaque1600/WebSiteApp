import { Main } from "@/_components/main/Main";

export default function Index() {
  return (
    <Main className="flex-row items-start justify-around max-md:flex-col max-md:items-center max-md:gap-6">
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-xl font-medium">Acesso Remoto</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Team Viewer 13
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Anydesk
          </a>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-xl font-medium">Sites NF-e / NFC-e</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Portal NF-e
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Baixar XML (fsist)
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Baixar XML NFC-e
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Consultar Inutilização NFC-e
          </a>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-xl font-medium">Outros Sites</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            SINTEGRA
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Consulta CNPJ
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Receita da Paraíba
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Certificados Digitais
          </a>
        </div>
      </div>
    </Main>
  );
}
