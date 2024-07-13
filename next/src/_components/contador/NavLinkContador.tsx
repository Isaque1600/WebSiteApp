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
        "flex h-12 flex-row items-center gap-2 rounded-md p-3 px-4 text-lg font-normal normal-case hover:bg-zinc-800 max-lg:text-sm",
        className,
      )}
      {...props}
    >
      {prefix}
      {children}
    </NavLink>
  );
}
