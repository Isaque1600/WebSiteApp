import { DialogTrigger } from "@/_components/ui/dialog";
import { DialogTriggerProps } from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

type Props = DialogTriggerProps;

export default function CustomDialogTrigger({
  children,
  className,
  ...props
}: Props) {
  return (
    <DialogTrigger
      className={twMerge(
        "flex rounded-md bg-red-500 px-4 hover:bg-red-600",
        className,
      )}
      {...props}
    >
      {children}
    </DialogTrigger>
  );
}
