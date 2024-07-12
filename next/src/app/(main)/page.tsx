import { Main } from "@/_components/main/Main";

export default function Index() {
  return (
    <Main className="flex-row justify-around items-start max-md:flex-col max-md:items-center max-md:gap-6">
      <div className="flex flex-col w-1/3 gap-1 justify-center items-center text-center">
        <h1 className="text-xl font-medium title">Acesso Remoto</h1>
        <div className="flex flex-col w-1/2 min-w-[250px] gap-2 text-lg links">
          <a
            className="bg-red-650 w-full text-nowrap p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Team Viewer 13
          </a>
          <a
            className="bg-red-650 w-full text-nowrap p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Anydesk
          </a>
        </div>
      </div>
      <div className="flex flex-col w-1/3 gap-1 justify-center items-center text-center">
        <h1 className="text-xl font-medium title">Sites NF-e / NFC-e</h1>
        <div className="flex flex-col w-1/2 min-w-[250px] gap-2 text-lg links">
          <a
            className="bg-red-650 w-full text-nowrap p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Portal NF-e
          </a>
          <a
            className="bg-red-650 w-full text-nowrap p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Baixar XML (fsist)
          </a>
          <a
            className="bg-red-650 w-full text-nowrap p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Baixar XML NFC-e
          </a>
          <a
            className="bg-red-650 w-full text-nowrap p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Consultar Inutilização NFC-e
          </a>
        </div>
      </div>
      <div className="flex flex-col w-1/3 gap-1 justify-center items-center text-center">
        <h1 className="text-xl font-medium title">Outros Sites</h1>
        <div className="flex flex-col w-1/2 min-w-[250px] gap-2 text-lg links">
          <a
            className="bg-red-650 w-full text-nowrap p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            SINTEGRA
          </a>
          <a
            className="bg-red-650 w-full text-nowrap p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Consulta CNPJ
          </a>
          <a
            className="bg-red-650 w-full text-nowrap p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Receita da Paraíba
          </a>
          <a
            className="bg-red-650 w-full text-nowrap p-2 rounded-md hover:text-neutral-400"
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
