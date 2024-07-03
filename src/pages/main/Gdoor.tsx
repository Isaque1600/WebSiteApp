import { Main } from "@/components/Main";

export function Gdoor() {
  return (
    <Main className="flex-row max-xl:flex-wrap gap-y-6 justify-around items-start max-md:items-center max-md:gap-6">
      <div className="flex flex-col w-1/3 gap-1 justify-center items-center text-center">
        <h1 className="text-xl uppercase font-medium title">gdoor pro</h1>
        <div className="flex flex-col w-1/2 min-w-[250px] gap-2 text-lg links">
          <a
            className="bg-red-750 w-full p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Pack Pro
          </a>
          <a
            className="bg-red-750 w-full p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Pro Completo
          </a>
          <a
            className="bg-red-750 w-full p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Gdoor Arquivos
          </a>
        </div>
      </div>
      <div className="flex flex-col w-1/3 gap-1 justify-center items-center text-center">
        <h1 className="text-lg uppercase font-medium title">gdoor slim</h1>
        <div className="flex flex-col w-1/2 min-w-[250px] gap-2 text-lg links">
          <a
            className="bg-red-750 w-full p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Pack slim
          </a>
          <a
            className="bg-red-750 w-full p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Slim Completo
          </a>
        </div>
      </div>
      <div className="flex flex-col w-1/3 gap-1 justify-center items-center text-center">
        <h1 className="text-lg uppercase font-medium title">gdoor mei</h1>
        <div className="flex flex-col w-1/2 min-w-[250px] gap-2 text-lg links">
          <a
            className="bg-red-750 w-full p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Pack Mei
          </a>
          <a
            className="bg-red-750 w-full p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Mei Completo
          </a>
        </div>
      </div>
      <div className="flex flex-col w-1/3 gap-1 justify-center items-center text-center">
        <h1 className="text-lg uppercase font-medium title">gdoor ct-e</h1>
        <div className="flex flex-col w-1/2 min-w-[250px] gap-2 text-lg links">
          <a
            className="bg-red-750 w-full p-2 rounded-md hover:text-neutral-400"
            download={true}
            href="#"
          >
            Pack CT-e
          </a>
          <a
            className="bg-red-750 w-full p-2 rounded-md hover:text-neutral-400"
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
