"use client";

import Header from "@/_components/adm/Header";
import SideBar from "@/_components/adm/SideBar";
import { useState } from "react";

type Props = {
  children?: React.ReactNode;
};

export default function AdmLayout({ children }: Props) {
  const [sideBar, setSideBar] = useState(true);

  return (
    <>
      <Header sideBar={sideBar} setSideBar={setSideBar} />
      <main className="flex flex-row dark:bg-neutral-700">
        <SideBar sideBar={sideBar} />
        <div
          data-sidebar={sideBar}
          className="ml-36 min-h-[calc(100vh-7rem)] w-[calc(100vw-10rem)] flex-grow bg-zinc-750 p-4 duration-100 ease-in-out data-[sidebar=false]:ml-0 max-lg:ml-11 max-lg:data-[sidebar=true]:max-w-[100vw-2.75rem]"
        >
          {children}
        </div>
      </main>
    </>
  );
}
