"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";

const HISTORY = [
    { year: "2010", title: "시작", description: "고전적 정신을 현대적 형태로 재해석하겠다는 비전으로 작은 스튜디오에서 시작했습니다." },
    { year: "2015", title: "확장", description: "대규모 설치 작업을 위해 더 넓은 시설로 확장 이전했습니다." },
    { year: "2020", title: "Global Reach", description: "파리에서 첫 해외 커미션 작업을 성공적으로 완수했습니다." },
    { year: "2025", title: "새로운 시대", description: "전통 조각 방식에 디지털 기술을 접목하여 새로운 가능성을 열어가고 있습니다." },
];

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    return (
        <>
            <Header />
            <main className="min-h-screen bg-stone-50 dark:bg-stone-900 overflow-hidden" ref={containerRef}>

                {/* Intro Section */}
                <SectionWrapper className="pt-32 pb-20">
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-12">
                        <TextReveal>About Well Made</TextReveal>
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6 text-xl leading-relaxed text-stone-600 dark:text-stone-300">
                            <TextReveal delay={0.3}>
                                우리는 단순한 조각가가 아닙니다. 우리는 3차원 공간에서 이야기를 만들어내는 스토리텔러입니다.
                                모든 곡선, 질감, 그리고 그림자는 감정을 불러일으키기 위한 의도적인 선택입니다.
                            </TextReveal>
                            <TextReveal delay={0.6}>
                                우리의 철학은 예술이 단순히 보여지는 것이 아니라, 느껴져야 한다는 믿음에 뿌리를 두고 있습니다.
                            </TextReveal>
                        </div>
                        <div className="aspect-square md:aspect-[4/5] w-full">
                            <ParallaxImage src="/hero.png" alt="Studio Shot" className="w-full h-full" />
                        </div>
                    </div>
                </SectionWrapper>

                {/* Timeline Section */}
                <section className="py-24 relative">
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-stone-300 dark:bg-stone-700 transform -translate-x-1/2" />
                    <div className="container mx-auto px-6 max-w-5xl">
                        {HISTORY.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-20%" }}
                                transition={{ duration: 0.8 }}
                                className={`relative flex items-center mb-24 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                            >
                                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                                    <span className="text-6xl font-serif font-bold text-stone-200 dark:text-stone-800 absolute -top-10 left-12 md:static block z-0">
                                        {item.year}
                                    </span>
                                    <div className="relative z-10 bg-white dark:bg-stone-800 p-6 shadow-xl border-l-4 border-stone-900 dark:border-stone-100">
                                        <h3 className="text-2xl font-serif font-bold mb-2">{item.title}</h3>
                                        <p className="text-stone-600 dark:text-stone-400">{item.description}</p>
                                    </div>
                                </div>
                                {/* Dot on timeline */}
                                <div className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 bg-stone-900 dark:bg-stone-100 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <SectionWrapper className="bg-stone-900 text-stone-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-serif mb-8">
                                <TextReveal>Start a Project</TextReveal>
                            </h2>
                            <p className="text-xl text-stone-400 mb-8 max-w-md">
                                당신의 비전을 현실로 만들 준비가 되셨나요? 다음 걸작에 대해 이야기해 봅시다.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-colors">
                                        <span>📧</span>
                                    </div>
                                    <span className="text-lg">hello@wellmade.com</span>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-colors">
                                        <span>📞</span>
                                    </div>
                                    <span className="text-lg">+82 10-1234-5678</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-stone-800 p-8 md:p-12">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-stone-400 mb-1">이름</label>
                                    <input type="text" className="w-full bg-stone-900 border-b border-stone-700 px-0 py-2 focus:border-white focus:outline-none transition-colors" placeholder="홍길동" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-400 mb-1">이메일</label>
                                    <input type="email" className="w-full bg-stone-900 border-b border-stone-700 px-0 py-2 focus:border-white focus:outline-none transition-colors" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-400 mb-1">문의 내용</label>
                                    <textarea rows={4} className="w-full bg-stone-900 border-b border-stone-700 px-0 py-2 focus:border-white focus:outline-none transition-colors" placeholder="프로젝트에 대해 알려주세요"></textarea>
                                </div>
                                <Button type="submit" variant="outline" className="w-full text-white border-white hover:bg-white hover:text-black">
                                    메시지 보내기
                                </Button>
                            </form>
                        </div>
                    </div>
                </SectionWrapper>
            </main>
            <Footer />
        </>
    );
}
