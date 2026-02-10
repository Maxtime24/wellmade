import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost";
    href?: string;
    className?: string;
}

export default function Button({
    children,
    variant = "primary",
    href,
    className,
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-foreground text-background hover:bg-stone-800 dark:hover:bg-stone-200 shadow-md hover:shadow-lg",
        outline:
            "border border-foreground text-foreground hover:bg-foreground hover:text-background",
        ghost: "text-foreground hover:bg-stone-200 dark:hover:bg-stone-800",
    };

    const combinedClassName = clsx(baseStyles, variants[variant], className);

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
}
