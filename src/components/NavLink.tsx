import { Link, LinkProps } from "react-router-dom";

export type NavLinkProps = LinkProps & {
  thisPage?: boolean;
};

export function NavLink({ thisPage, ...props }: NavLinkProps) {
  return (
    <Link
      data-thispage={thisPage}
      className="font-bold text-base uppercase mx-4 max-h-6 w-auto hover:text-red-750 data-[thisPage=true]:text-red-600 text-nowrap"
      {...props}
    />
  );
}
