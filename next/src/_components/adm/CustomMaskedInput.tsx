"use client";

import ReactInputMask from "react-input-mask";
import { twMerge } from "tailwind-merge";
import { FormControl, FormLabel } from "../ui/form";
import { InputProps } from "../ui/input";

type Props = {
  text?: string;
  className?: string;
  field: any;
  required?: boolean;
  mask: string;
  alwaysShowMask?: boolean;
  maskChar?: string;
  formatChars?: { [key: string]: string };
  beforeMaskedValueChange?: (
    newState: {
      value: string;
      selection: { start: number; end: number } | null;
    },
    oldState: {
      value: string;
      selection: { start: number; end: number } | null;
    },
    userInput: string,
    maskOptions?: any,
  ) => { value: string; selection: { start: number; end: number } | null };
} & InputProps;

export function CustomMaskedInput({
  text,
  required = false,
  className,
  field,
  mask,
  maskChar,
  alwaysShowMask = false,
  formatChars,
  beforeMaskedValueChange,
  ...props
}: Props) {
  return (
    <div className="relative">
      <FormControl id={text} className="relative flex flex-col">
        <ReactInputMask
          {...props}
          {...field}
          id={field.name}
          mask={mask}
          alwaysShowMask={alwaysShowMask}
          className={twMerge(
            "peer relative flex h-9 w-full text-clip rounded-none border border-x-0 border-t-0 border-input bg-transparent px-3 py-1 text-lg text-neutral-100 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          placeholder=" "
          maskChar={maskChar}
          formatChars={formatChars}
          beforeMaskedValueChange={beforeMaskedValueChange}
        />
      </FormControl>
      <FormLabel
        htmlFor={field.name}
        data-required={required}
        className="absolute -top-3.5 left-0 p-1 pl-2 text-sm text-neutral-100 transition-all ease-in-out before:text-red-550 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-focus:-top-3.5 peer-focus:left-0 peer-focus:text-sm peer-focus:text-neutral-100 data-[required=true]:before:content-['*']"
      >
        {text}
      </FormLabel>
    </div>
  );
}
