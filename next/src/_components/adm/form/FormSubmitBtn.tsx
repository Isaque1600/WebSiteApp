import { Button, ButtonProps } from "@/_components/ui/button";
import { twMerge } from "tailwind-merge";

type Props = ButtonProps & {
  icon?: React.ReactNode;
};

export default function FormSubmitBtn({ icon, children, ...props }: Props) {
  return (
    <div className="flex justify-center">
      <Button
        type="submit"
        className={twMerge(
          "flex gap-2 bg-red-550 py-6 text-lg hover:bg-red-700",
          props.className,
        )}
        {...props}
      >
        {icon}
        {children}
      </Button>
    </div>
  );
}
