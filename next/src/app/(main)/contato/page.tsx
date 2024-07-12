"use client";

import { Main } from "@/_components/main/Main";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Contato() {
  const [loading, setLoading] = useState(true);

  return (
    <Main className="flex-row gap-6 mx-4 justify-between max-lg:items-center max-lg:flex-col">
      <div className="flex flex-col w-full items-center max-md:w-full">
        <h1 className="text-3xl text-red-650 font-semibold">Contate-nos</h1>
        <a
          className="h-fit w-fit p-4 bg-transparent hover:bg-transparent"
          href="https://wa.me/+5583999105652"
          target="_blank"
        >
          <WhatsAppIcon className="text-green-600 text-7xl" />
        </a>
        <div className="flex gap-1 text-lg my-4">
          <h3 className="text-red-750 font-medium">Endereço: </h3>
          <p>
            R. Maria Severina de Jesus Medeiros, 21 - Nossa Sra. de Fátima,
            Santa Luzia - PB, 58600-000
          </p>
        </div>
        <div>
          {loading && (
            <Loader2 className="text-neutral-800 w-[600px] h-auto max-md:h-auto max-md:w-full animate-spin" />
          )}
          <iframe
            onLoad={() => {
              setLoading(false);
            }}
            className="border-0 w-auto h-auto min-w-[600px] min-h-[450px] max-md:min-h-auto max-md:min-w-full max-md:px-4"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed/v1/place?q=VALE%20DA%20TECNOLOGIA%20-%20Rua%20Maria%20Severina%20de%20Jesus%20Medeiros%20-%20Nossa%20Senhora%20de%20F%C3%A1tima%2C%20Santa%20Luzia%20-%20State%20of%20Para%C3%ADba%2C%20Brazil&key=AIzaSyBD3BxjBeswG0Htikyjb55DVCGKvjPz4zA"
          ></iframe>
        </div>
      </div>
    </Main>
  );
}
