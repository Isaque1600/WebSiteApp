import { Dialog } from "@/_components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";

type Props = {
  children: React.ReactNode;
} & DialogProps;

export default function CustomDialogRoot({ children, ...props }: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange} {...props}>
      {children}
    </Dialog>
  );
}
