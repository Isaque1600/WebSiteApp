import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOff } from "lucide-react";

export interface InputToggleProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputToggle = React.forwardRef<HTMLInputElement, InputToggleProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {showPassword ? (
          <EyeIcon
            onClick={() => setShowPassword(false)}
            className="absolute w-9 h-9 p-2 right-0 top-0 text-slate-800 cursor-pointer"
          />
        ) : (
          <EyeOff
            onClick={() => setShowPassword(true)}
            className="absolute w-9 h-9 p-2 right-0 top-0 text-slate-800 cursor-pointer"
          />
        )}
      </div>
    );
  }
);
InputToggle.displayName = "InputToggle";

export { InputToggle };
