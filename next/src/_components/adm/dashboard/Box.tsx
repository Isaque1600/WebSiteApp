import { twJoin } from "tailwind-merge";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function Box({ children, className }: Props) {
  return (
    <div
      className={twJoin(
        "flex rounded-md p-8 text-lg capitalize text-neutral-100 shadow-md shadow-neutral-800",
        className,
      )}
    >
      {children}
    </div>
  );
}
