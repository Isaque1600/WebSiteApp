import { Button, ButtonProps } from "@/_components/ui/button";

type Props = ButtonProps;

export default function CustomDialogCustomCloseBtn({
  className,
  ...props
}: Props) {
  return (
    <Button type="submit" className={className} {...props}>
      {props.children}
    </Button>
  );
}
