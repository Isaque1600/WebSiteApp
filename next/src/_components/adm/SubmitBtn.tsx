import { Button, ButtonProps } from "../ui/button";

type Props = ButtonProps & {
  icon?: React.ReactNode;
};

export default function SubmitBtn({ icon, ...props }: Props) {
  return (
    <div className="flex w-full justify-center">
      <Button
        type="submit"
        className="flex gap-2 bg-red-550 py-6 text-lg hover:bg-red-700"
        {...props}
      >
        {icon}
        Cadastrar
      </Button>
    </div>
  );
}
