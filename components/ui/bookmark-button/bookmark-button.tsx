"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, type LucideIcon } from "lucide-react";
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import "./bookmark-button.css";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const bookmarkButtonVariants = cva(
  [
    "bb-shape group relative inline-flex select-none items-center justify-center",
    "font-ui disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none transition-all duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        filled: "bb-filled",
        outline: "bb-outline",
        secondary: "bb-secondary",
        ghost: "bb-ghost",
      },
      color: {
        primary: "bb-color-primary",
        neutral: "bb-color-neutral",
        success: "bb-color-success",
        danger: "bb-color-danger",
        warning: "bb-color-warning",
      },
      size: {
        sm: "bb-size-sm",
        md: "bb-size-md",
        lg: "bb-size-lg",
      },
    },
    defaultVariants: {
      variant: "filled",
      color: "primary",
      size: "md",
    },
  }
);

export interface BookmarkButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof bookmarkButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const BookmarkButton = React.forwardRef<HTMLButtonElement, BookmarkButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      asChild = false,
      loading = false,
      icon: Icon,
      iconPosition = "left",
      disabled,
      type = "button",
      children,
      ...rest
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = Boolean(disabled) || loading;

    const showSpinner = loading;
    const showLeftIcon = !loading && Icon && iconPosition === "left";
    const showRightIcon = !loading && Icon && iconPosition === "right";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(bookmarkButtonVariants({ variant, color, size }), className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        {...rest}
      >
        {/* The ribbon tail piece that sticks out on the right */}
        <span className="bb-tail" aria-hidden="true" />

        {/* Content Wrapper */}
        <span className="bb-content">
          {(showSpinner || showLeftIcon) && (
            <span className="bb-icon-slot">
              {showSpinner ? (
                <Loader2 className="bb-icon bb-icon-spin" aria-hidden="true" />
              ) : (
                Icon && <Icon className="bb-icon" aria-hidden="true" />
              )}
            </span>
          )}

          <span className="bb-label">{children}</span>

          {showRightIcon && Icon && (
            <span className="bb-icon-slot">
              <Icon className="bb-icon" aria-hidden="true" />
            </span>
          )}
        </span>
      </Comp>
    );
  }
);

BookmarkButton.displayName = "BookmarkButton";

export { BookmarkButton, bookmarkButtonVariants };