import { Form } from "@/_components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type Props = {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  wrapperClassName?: string;
  formClassName?: string;
  children?: React.ReactNode;
};

export default function FormRoot({
  form,
  onSubmit,
  wrapperClassName,
  formClassName,
  children,
  ...props
}: Props) {
  return (
    <div className={twMerge("flex w-full", wrapperClassName)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={twMerge("w-full space-y-4", formClassName)}
        >
          {children}
        </form>
      </Form>
    </div>
  );
}
