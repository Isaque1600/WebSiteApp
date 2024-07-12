import Link, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

export type NavLinkProps = LinkProps & {
  children: React.ReactNode;
  thisPage?: boolean;
  className?: string;
};

export function NavLink({ thisPage, children, ...props }: NavLinkProps) {
  return (
    <Link
      data-thispage={thisPage}
      className={twMerge(
        "font-bold uppercase text-slate-50 max-h-6 w-auto hover:text-red-650 data-[thisPage=true]:text-red-650 text-nowrap",
        props.className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
