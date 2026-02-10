"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import Logo from "@/components/ui/Logo";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between px-6 py-4">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Logo className="w-28 md:w-36 h-auto text-foreground" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-8 text-sm font-medium tracking-wide uppercase text-stone-600 dark:text-stone-400">
                        <li>
                            <Link href="/" className="hover:text-foreground transition-colors">
                                홈
                            </Link>
                        </li>
                        <li>
                            <Link href="/work" className="hover:text-foreground transition-colors">
                                작품
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-foreground transition-colors">
                                소개
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden p-2 text-foreground focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-5 relative flex flex-col justify-between">
                        <span className={clsx("w-full h-0.5 bg-current transition-all duration-300", isMenuOpen ? "rotate-45 translate-y-2" : "")} />
                        <span className={clsx("w-full h-0.5 bg-current transition-all duration-300", isMenuOpen ? "opacity-0" : "opacity-100")} />
                        <span className={clsx("w-full h-0.5 bg-current transition-all duration-300", isMenuOpen ? "-rotate-45 -translate-y-2.5" : "")} />
                    </div>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={clsx(
                "md:hidden absolute top-full left-0 right-0 bg-background border-b border-stone-200 dark:border-stone-800 shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
                isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            )}>
                <nav className="flex flex-col p-6 space-y-4 text-center">
                    <Link href="/" className="text-lg font-medium uppercase tracking-widest hover:text-stone-500" onClick={() => setIsMenuOpen(false)}>
                        홈
                    </Link>
                    <Link href="/work" className="text-lg font-medium uppercase tracking-widest hover:text-stone-500" onClick={() => setIsMenuOpen(false)}>
                        작품
                    </Link>
                    <Link href="/about" className="text-lg font-medium uppercase tracking-widest hover:text-stone-500" onClick={() => setIsMenuOpen(false)}>
                        소개
                    </Link>
                </nav>
            </div>
        </header>
    );
}
