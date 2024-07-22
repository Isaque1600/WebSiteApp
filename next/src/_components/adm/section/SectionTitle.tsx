import { twMerge } from "tailwind-merge";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function SectionTitle({ children, className }: Props) {
  return (
    <h1
      className={twMerge(
        "text-center text-lg font-bold tracking-wider text-neutral-100",
        className,
      )}
    >
      {children}
    </h1>
  );
}
