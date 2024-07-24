import { twMerge } from "tailwind-merge";
import { FormControl, FormLabel } from "../ui/form";
import { Input, InputProps } from "../ui/input";

type Props = {
  text?: string;
  className?: string;
  field: any;
  required?: boolean;
} & InputProps;

export default function CustomInput({
  text,
  required = false,
  className,
  field,
  ...props
}: Props) {
  return (
    <div className="relative">
      <FormControl id={text} className="relative flex flex-col">
        <Input
          className={twMerge(
            "peer relative text-clip rounded-none border-x-0 border-t-0 text-lg text-neutral-100 focus-visible:ring-0",
            className,
          )}
          {...props}
          {...field}
          placeholder=" "
        />
      </FormControl>
      <FormLabel
        htmlFor={text}
        data-required={required}
        className="absolute -top-3.5 left-0 p-1 pl-2 text-sm text-neutral-100 transition-all ease-in-out before:text-red-550 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-focus:-top-3.5 peer-focus:left-0 peer-focus:text-sm peer-focus:text-neutral-100 data-[required=true]:before:content-['*']"
      >
        {text}
      </FormLabel>
    </div>
  );
}
