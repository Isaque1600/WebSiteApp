import Box from "@/_components/adm/dashboard/Box";
import Section from "@/_components/adm/Section";
import { Monitor } from "lucide-react";

type Props = {};

export default function Admin({}: Props) {
  return (
    <>
      <Section>
        <h1 className="text-center text-2xl font-bold text-neutral-100">
          Sistemas
        </h1>
        <div className="flex flex-row gap-2 max-md:flex-col">
          <Box className="flex flex-grow flex-col items-center bg-amber-500">
            <Monitor className="size-10" />
            <span>{"0"}</span>
            <span>{"gdoor slim"}</span>
          </Box>
          <Box className="flex flex-grow flex-col items-center bg-green-500">
            <Monitor className="size-10" />
            <span>{"0"}</span>
            <span>{"gdoor slim"}</span>
          </Box>
          <Box className="flex flex-grow flex-col items-center bg-blue-600">
            <Monitor className="size-10" />
            <span>{"0"}</span>
            <span>{"gdoor slim"}</span>
          </Box>
          <Box className="flex flex-grow flex-col items-center bg-red-700">
            <Monitor className="size-10" />
            <span>{"0"}</span>
            <span>{"gdoor slim"}</span>
          </Box>
        </div>
      </Section>
      <Section>
        <h1 className="text-center text-2xl font-bold text-neutral-100">
          Usuários
        </h1>
        <div className="flex flex-row gap-2 max-md:flex-col">
          <Box className="flex flex-grow flex-col items-center bg-indigo-500">
            <Monitor className="size-10" />
            <span>{"0"}</span>
            <span>{"Clientes"}</span>
          </Box>
          <Box className="flex flex-grow flex-col items-center bg-cyan-500">
            <Monitor className="size-10" />
            <span>{"0"}</span>
            <span>{"Contadores"}</span>
          </Box>
        </div>
      </Section>
    </>
  );
}
