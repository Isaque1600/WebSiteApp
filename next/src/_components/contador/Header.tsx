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
        "flex flex-row rounded-lg p-5 px-6 items-center bg-neutral-100 shadow-neutral-400 shadow-md",
        className
      )}
    >
      <h1 className="text-lg">Arquivos Fiscais - {"user".toUpperCase()}</h1>
      {children}
    </header>
  );
}
