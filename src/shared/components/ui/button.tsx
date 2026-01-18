import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex justify-center items-center px-5 py-2 gap-2 whitespace-nowrap rounded-4xl font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 cursor-pointer hover:scale-105 border",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary text-background",
        secondary: "border-primary bg-background text-primary",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: string;
  iconSize?: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, icon, iconSize = 24, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, className }))} {...props}>
        {children}
        {icon && <Image src={icon} alt="icon" width={iconSize} height={iconSize} />}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
