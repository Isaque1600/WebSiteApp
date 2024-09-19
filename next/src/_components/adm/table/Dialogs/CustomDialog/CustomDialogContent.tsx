import { DialogContent } from "@/_components/ui/dialog";
import { DialogContentProps } from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

type Props = DialogContentProps;

export default function CustomDialogContent({
  children,
  className,
  ...props
}: Props) {
  return (
    <DialogContent
      className={twMerge(
        "max-h-fit max-w-fit border-zinc-750 bg-zinc-750 text-neutral-100",
        className,
      )}
      {...props}
    >
      {children}
    </DialogContent>
  );
}
