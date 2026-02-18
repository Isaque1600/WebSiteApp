"use client";

import { Main } from "@/_components/main/Main";
import { useFile } from "@/hooks/Files/useFiles";

export default function Index() {
  const { downloadPublicFile } = useFile();
  const { mutate: downloadPublic } = downloadPublicFile;

  return (
    <Main className="flex-row items-start justify-around max-md:flex-col max-md:items-center max-md:gap-6">
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-xl font-medium">Acesso Remoto</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <button
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-800"
            onClick={() => downloadPublic("team_viewer_13.exe")}
          >
            Team Viewer 13
          </button>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-800"
            download={true}
            href="https://download.anydesk.com/AnyDesk.exe?_ga=2.262674572.1672810916.1632159673-207056723.1631725810"
          >
            Anydesk
          </a>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-xl font-medium">Sites NF-e / NFC-e</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-800"
            href="http://www.nfe.fazenda.gov.br/portal/consultaRecaptcha.aspx?tipoConsulta=completa&tipoConteudo=XbSeqxE8pl8="
            target="_blank"
          >
            Portal NF-e
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-800"
            href="https://www.fsist.com.br/"
            target="_blank"
          >
            Baixar XML (fsist)
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-800"
            target="_blank"
            href="https://dfe-portal.svrs.rs.gov.br/NFCESSL/DownloadXMLDFe"
          >
            Baixar XML NFC-e
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-800"
            target="_blank"
            href="https://dfe-portal.svrs.rs.gov.br/Nfce/Inutilizacao"
          >
            Consultar Inutilização NFC-e
          </a>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-xl font-medium">Outros Sites</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-800"
            target="_blank"
            href="http://www.sintegra.gov.br/"
          >
            SINTEGRA
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-800"
            target="_blank"
            href="http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/cnpjreva_solicitacao2.asp"
          >
            Consulta CNPJ
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-800"
            target="_blank"
            href="https://www.sefaz.pb.gov.br/"
          >
            Receita da Paraíba
          </a>
          <a
            className="w-full text-nowrap rounded-md bg-red-650 p-2 hover:text-neutral-800"
            target="_blank"
            href="https://www.certisign.com.br/atendimento-suporte/downloads"
          >
            Certificados Digitais
          </a>
        </div>
      </div>
    </Main>
  );
}
