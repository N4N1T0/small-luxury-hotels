import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buttonClasses = {
  primary:
    "bg-secondary hover-200 px-6 py-3 text-base font-medium text-white no-underline hover:bg-main hover-text-background text-center transition-colors",
  ghost:
    "text-foreground hover-200 hover:border-foreground/50 flex items-center px-6 py-3 font-medium no-underline transition-colors hover:bg-main hover:text-background",
  outline:
    "border-main text-main hover:bg-main hover:text-background border px-6 py-3 font-medium transition-colors",
  outlineDark:
    "border-background text-background hover:bg-main hover:bg-secondary border px-6 py-3 font-medium transition-colors",
};
