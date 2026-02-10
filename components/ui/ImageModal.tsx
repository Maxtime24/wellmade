"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

interface ImageModalProps {
    selectedImage: { src: string; alt: string; layoutId: string } | null;
    onClose: () => void;
}

export default function ImageModal({ selectedImage, onClose }: ImageModalProps) {
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedImage]);

    return (
        <AnimatePresence>
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
                >
                    <motion.div
                        layoutId={selectedImage.layoutId}
                        className="relative w-full h-full max-w-7xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </motion.div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-stone-300 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
