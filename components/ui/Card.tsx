"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CardProps {
    title: string;
    category: string;
    imageSrc: string;
    href: string;
    priority?: boolean;
    onClick?: () => void;
    layoutId?: string;
    hideTitle?: boolean;
}

export default function Card({ title, category, imageSrc, href, priority = false, onClick, layoutId, hideTitle = false }: CardProps) {
    const Content = () => (
        <>
            <div className="relative w-full overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3">
                {layoutId ? (
                    <motion.div layoutId={layoutId} className="relative w-full h-auto">
                        <Image
                            src={imageSrc}
                            alt={title}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={priority}
                        />
                    </motion.div>
                ) : (
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={priority}
                    />
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            </div>
            {!hideTitle && (
                <div>
                    <p className="text-xs font-semibold tracking-widest text-stone-500 uppercase">
                        {category}
                    </p>
                    <h3 className="mt-1 text-lg font-serif font-medium text-foreground group-hover:underline decoration-1 underline-offset-4">
                        {title}
                    </h3>
                </div>
            )}
        </>
    );

    if (onClick) {
        return (
            <div onClick={onClick} className="group block mb-6 cursor-pointer">
                <Content />
            </div>
        );
    }

    return (
        <Link href={href} className="group block mb-6">
            <Content />
        </Link>
    );
}
