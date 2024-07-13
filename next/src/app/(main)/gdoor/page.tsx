import { Main } from "@/_components/main/Main";

export default function Gdoor() {
  return (
    <Main className="flex-row items-start justify-around gap-y-6 max-xl:flex-wrap max-md:items-center max-md:gap-6">
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-xl font-medium uppercase">gdoor pro</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Pack Pro
          </a>
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Pro Completo
          </a>
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Gdoor Arquivos
          </a>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-lg font-medium uppercase">gdoor slim</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Pack slim
          </a>
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Slim Completo
          </a>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-lg font-medium uppercase">gdoor mei</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Pack Mei
          </a>
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Mei Completo
          </a>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-1 text-center">
        <h1 className="title text-lg font-medium uppercase">gdoor ct-e</h1>
        <div className="links flex w-1/2 min-w-[250px] flex-col gap-2 text-lg">
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            Pack CT-e
          </a>
          <a
            className="w-full rounded-md bg-red-650 p-2 hover:text-neutral-400"
            download={true}
            href="#"
          >
            CT-e Completo
          </a>
        </div>
      </div>
    </Main>
  );
}
