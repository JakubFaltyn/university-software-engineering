import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
    addon?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, addon, ...props }, ref) => {
    if (addon) {
        return (
            <div className="group flex border-radius-md items-center rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-lime">
                <div className="shrink-0 select-none text-slate-700 bg-slate-100 px-4 py-3 text-lg/5 font-bold rounded-l-md group-focus-within:bg-lime group-focus-within:text-slate-900">{addon}</div>
                <input
                    type={type}
                    className={cn("block min-w-0 grow text-lg/5 font-bold text-slate-900 placeholder:text-slate-400 focus:outline focus:outline-0 px-4 py-3", className)}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }

    return (
        <input
            type={type}
            className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
