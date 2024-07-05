import Link, { LinkProps } from "next/link";

export type NavLinkProps = LinkProps & {
  children: React.ReactNode;
  thisPage?: boolean;
};

export function NavLink({ thisPage, children, ...props }: NavLinkProps) {
  return (
    <Link
      data-thispage={thisPage}
      className="font-bold uppercase text-slate-50 max-h-6 w-auto hover:text-red-750 data-[thisPage=true]:text-red-600 text-nowrap"
      {...props}
    >
      {children}
    </Link>
  );
}
