import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type MainProps = ComponentProps<"main">;

export function Main({ className, ...props }: MainProps) {
  return (
    <main
      className={twMerge("flex my-16 max-md:flex-col", className)}
      {...props}
    >
      {props.children}
    </main>
  );
}
