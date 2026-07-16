"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface CornerClipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "filled" | "outline";
}

const CLIP = "[clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,0_100%)]";

export const CornerClipButton = forwardRef<HTMLButtonElement, CornerClipButtonProps>(
  ({ href, variant = "filled", className = "", children, onClick, ...props }, ref) => {
    const base = `relative inline-flex items-center justify-center gap-2 px-6 py-2.5 font-semibold font-mono tracking-wider transition-all duration-300 ease-out ${CLIP} ${
      variant === "filled"
        ? "btn-primary text-(--btn-primary-text)! "
        : "btn-outline text-(--btn-outline-text)!"
    } ${className}`;

    if (href) {
      return (
        <Link href={href} className={base} onClick={onClick as unknown as () => void}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={base} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }
);

CornerClipButton.displayName = "CornerClipButton";