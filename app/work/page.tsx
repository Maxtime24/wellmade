"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";
import MasonryGrid from "@/components/ui/MasonryGrid";
import ImageModal from "@/components/ui/ImageModal";
import { WORKS } from "@/lib/data";

export default function WorkPage() {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; layoutId: string } | null>(null);

    // 카테고리별로 작품 그룹화
    const categories = [
        { name: "금속", works: WORKS.filter(work => work.category === "금속") },
        { name: "FRP", works: WORKS.filter(work => work.category === "FRP") },
        { name: "스티로폼", works: WORKS.filter(work => work.category === "스티로폼") },
        { name: "기타", works: WORKS.filter(work => work.category === "기타") },
    ];

    return (
        <>
            <Header />
            <main className="pt-24 min-h-screen bg-white dark:bg-black">
                <SectionWrapper>
                    <ScrollReveal>
                        <div className="mb-16 text-center">
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-4">
                                Our Collection
                            </h1>
                            <p className="text-stone-500 max-w-xl mx-auto">
                                웰메이드가 선사하는 최고의 조각과 설치 작품들을 만나보세요.
                            </p>
                        </div>
                    </ScrollReveal>

                    {categories.map((category, categoryIndex) => (
                        <div key={category.name} className="mb-20">
                            <ScrollReveal>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-8 border-b-2 border-stone-200 dark:border-stone-800 pb-4">
                                    {category.name}
                                </h2>
                            </ScrollReveal>

                            <div className="pt-8">
                                <MasonryGrid>
                                    {category.works.map((work, index) => (
                                        <ScrollReveal key={work.id} delay={index * 0.05}>
                                            <Card
                                                title={work.title}
                                                category={work.category}
                                                imageSrc={work.imageSrc}
                                                href={`#`}
                                                priority={categoryIndex === 0 && index < 6}
                                                onClick={() => setSelectedImage({ src: work.imageSrc, alt: work.title, layoutId: `work-${work.id}` })}
                                                layoutId={`work-${work.id}`}
                                                hideTitle={true}
                                            />
                                        </ScrollReveal>
                                    ))}
                                </MasonryGrid>
                            </div>
                        </div>
                    ))}
                </SectionWrapper>
            </main>
            <Footer />
            <ImageModal selectedImage={selectedImage} onClose={() => setSelectedImage(null)} />
        </>
    );
}
