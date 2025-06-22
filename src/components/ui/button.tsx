import { Slot } from "@radix-ui/react-slot";

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { mergeClass } from "../../libs/utils";
import { buttonVariants } from "./button_variant";
import type { VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: ReactNode;
}

const addClassNameRecursively = (
  children: ReactNode,
  className: string
): ReactNode => {
return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    const typedChild = child as ReactElement<{ className?: string; children?: ReactNode }>;

    const existingClassName =
      typeof typedChild.props.className === "string"
        ? typedChild.props.className
        : "";

    return cloneElement(typedChild, {
      ...typedChild.props,
      className: `${existingClassName} ${className}`.trim(),
      children: addClassNameRecursively(
        typedChild.props.children as ReactNode,
        className
      ),
    });
  });
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={mergeClass(
          buttonVariants({ variant, size, className }),
          "cursor-can-hover"
        )}
        ref={ref}
        {...props}
      >
        {addClassNameRecursively(children, "pointer-events-none")}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
