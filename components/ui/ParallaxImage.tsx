"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { clsx } from "clsx";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function ParallaxImage({ src, alt, className }: ParallaxImageProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    return (
        <div ref={ref} className={clsx("relative overflow-hidden", className)}>
            <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image src={src} alt={alt} fill className="object-cover" />
            </motion.div>
        </div>
    );
}
