"use client";

import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import Card from "@/components/ui/Card";

import { SELECTED_WORKS } from "@/lib/selected_data";

export default function HorizontalScrollGallery() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-stone-900">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-6 md:px-16">
                    <div className="flex flex-col justify-center min-w-[70vw] md:min-w-[30vw] text-stone-100">
                        <h2 className="text-3xl md:text-6xl font-serif font-bold mb-4">
                            작품 미리보기
                        </h2>
                        <p className="text-stone-400 max-w-sm text-sm md:text-base">
                            스크롤하여 웰메이드의<br className="md:hidden" /> 정교한 작품들을 감상하세요
                        </p>
                    </div>
                    {SELECTED_WORKS.slice(0, 6).map((work) => (
                        <div key={work.id} className="relative h-[50vh] md:h-[60vh] w-[70vw] md:w-[23vw] shrink-0">
                            <Card
                                title={work.title}
                                category=""
                                imageSrc={work.imageSrc}
                                href="/work"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
