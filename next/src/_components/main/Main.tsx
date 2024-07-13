import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type MainProps = ComponentProps<"main">;

export function Main({ className, ...props }: MainProps) {
  return (
    <main
      className={twMerge("my-16 flex max-md:flex-col", className)}
      {...props}
    >
      {props.children}
    </main>
  );
}
