import { DialogHeader } from "@/_components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  text: string;
};

export default function CustomDialogHeader({ className, text }: Props) {
  return (
    <DialogHeader>
      <DialogTitle className={twMerge("mb-4", className)}>{text}</DialogTitle>
    </DialogHeader>
  );
}
