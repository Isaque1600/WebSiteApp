import { twJoin } from "tailwind-merge";

type Props = {
  icon?: React.ReactNode;
  className?: string;
  quantity?: string | number;
  label?: string;
};

export function Box({ icon, className, quantity, label }: Props) {
  return (
    <div
      className={twJoin(
        "flex flex-col items-center rounded-md p-8 text-center text-lg capitalize text-neutral-100 shadow-md shadow-neutral-800",
        className,
      )}
    >
      {icon}
      <span className="">{quantity}</span>
      <span>{label}</span>
    </div>
  );
}
