import React from "react";
import { twJoin } from "tailwind-merge";

type HeaderProps = {
  children?: React.ReactNode;
  className?: string;
};

export function Header({ children, className }: HeaderProps) {
  return (
    <header
      className={twJoin(
        "flex flex-row items-center rounded-lg bg-neutral-100 p-5 px-6 shadow-md shadow-neutral-400",
        className,
      )}
    >
      <h1 className="text-lg">Arquivos Fiscais - {"user".toUpperCase()}</h1>
      {children}
    </header>
  );
}
