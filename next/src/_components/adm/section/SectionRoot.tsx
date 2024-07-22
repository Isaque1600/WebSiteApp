import { twMerge } from "tailwind-merge";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function SectionRoot({ children, className }: Props) {
  return (
    <section
      className={twMerge(
        "w-full overflow-hidden rounded-md bg-zinc-650 p-4 shadow shadow-stone-700",
        className,
      )}
    >
      {children}
    </section>
  );
}
