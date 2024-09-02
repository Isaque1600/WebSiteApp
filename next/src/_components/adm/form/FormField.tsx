import { FormField } from "@/_components/ui/form";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<any>;
  children?: React.ReactNode;
  name: string;
  render: ({}: { field: ControllerRenderProps }) => React.ReactElement;
} & React.ComponentProps<typeof FormField>;

export default function FormElement({
  form,
  children,
  name,
  render,
  ...props
}: Props) {
  return (
    <FormField control={form.control} name={name} render={render} {...props} />
  );
}
