import { twMerge } from "tailwind-merge";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function Section({ children, className }: Props) {
  return (
    <section
      className={twMerge(
        "rounded-md bg-zinc-650 p-4 shadow shadow-stone-700",
        className,
      )}
    >
      {children}
    </section>
  );
}
