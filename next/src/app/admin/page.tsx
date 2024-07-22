import { Box } from "@/_components/adm/dashboard/Box";
import { Section } from "@/_components/adm/section/Section";
import { Monitor } from "lucide-react";

type Props = {};

export default function Admin({}: Props) {
  return (
    <>
      <Section.Root className="mb-3">
        <Section.Title>Sistemas</Section.Title>
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
      </Section.Root>
      <Section.Root>
        <Section.Title>Usuários</Section.Title>
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
      </Section.Root>
    </>
  );
}
