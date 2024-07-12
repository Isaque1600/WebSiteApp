import React from "react";
import { twMerge } from "tailwind-merge";
import { NavLink, NavLinkProps } from "../NavLink";

type Props = NavLinkProps & {
  prefix: React.ReactNode;
};

export default function NavLinkContador({
  prefix,
  children,
  className,
  ...props
}: Props) {
  return (
    <NavLink
      className={twMerge(
        "flex flex-row items-center text-lg normal-case font-normal rounded-md hover:bg-zinc-800 h-12 gap-2 p-3 px-4 max-lg:text-sm",
        className
      )}
      {...props}
    >
      {prefix}
      {children}
    </NavLink>
  );
}
