"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import CloudinaryUploadWidget from "@/components/ui/CloudinaryUploadWidget";

const HISTORY = [
    { year: "2008", title: "시작", description: "고전적 정신을 현대적 형태로 재해석하겠다는 비전으로 작은 스튜디오에서 시작했습니다." },
    { year: "2011", title: "확장", description: "대규모 설치 작업을 위해 더 넓은 시설로 확장 이전했습니다." },
    { year: "2022", title: "지평을 넓혀", description: "조각을 넘어 문화유산 복원으로 영역을 확장하여, 유산의 역사적 가치를 현대적 조형예술로 재탄생 시키고 있습니다." },
    { year: "2026", title: "새로운 시대", description: "전통 조각의 장인정신과 AI기술의 만남, 새로운 지평을 여는 웰메이드 의 공식 홈페이지가 새롭게 단장하였습니다." },
];

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string }>>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error" | null, message?: string }>({ type: null });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    files: uploadedFiles,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.detail || result.error || "메일 전송 실패");
            }

            setStatus({ type: "success" });
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
            setUploadedFiles([]);

        } catch (error: any) {
            console.error(error);
            setStatus({ type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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
                            <ParallaxImage src="/hero.jpg" alt="Studio Shot" className="w-full h-full" />
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
                <SectionWrapper className="bg-stone-900 text-stone-100 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-serif mb-8">
                                <TextReveal>문의하기</TextReveal>
                            </h2>
                            <p className="text-xl text-stone-400 mb-12 max-w-md leading-relaxed">
                                당신의 비전을 현실로 만들 준비가 되셨나요?<br />
                                프로젝트에 대해 이야기해 봅시다.
                            </p>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">Office</h3>
                                    <p className="text-stone-400">
                                        경기도 파주시 장명산길 175 가동(웰메이드)
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <a href="mailto:k2nkim@daum.net" className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-colors">
                                            <span>📧</span>
                                        </div>
                                        <span className="text-lg">k2nkim@daum.net</span>
                                    </a>
                                    <a href="tel:010-7742-5234" className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-colors">
                                            <span>📞</span>
                                        </div>
                                        <span className="text-lg">010-7742-5234</span>
                                    </a>
                                    <a href="tel:031-947-2587" className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-colors">
                                            <span>📞</span>
                                        </div>
                                        <span className="text-lg">031-947-2587</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-stone-800 p-8 md:p-12 rounded-lg shadow-2xl">
                            <h2 className="text-2xl font-serif font-bold mb-6">문의하기</h2>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-stone-400 mb-2">이름 *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-stone-900 border border-stone-700 rounded p-3 focus:border-white focus:outline-none transition-colors"
                                        placeholder="홍길동"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-400 mb-2">이메일 *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-stone-900 border border-stone-700 rounded p-3 focus:border-white focus:outline-none transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-400 mb-2">전화번호 *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-stone-900 border border-stone-700 rounded p-3 focus:border-white focus:outline-none transition-colors"
                                        placeholder="010-0000-0000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-400 mb-2">문의 내용 *</label>
                                    <textarea
                                        rows={6}
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-stone-900 border border-stone-700 rounded p-3 focus:border-white focus:outline-none transition-colors resize-none"
                                        placeholder="프로젝트의 예산, 일정, 규모 등에 대해 자세히 알려주세요."
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-400 mb-2">첨부파일 (대용량 파일 가능)</label>
                                    <CloudinaryUploadWidget onUploadSuccess={setUploadedFiles} />
                                    <p className="text-xs text-stone-500 mt-2">참고 이미지나 도면을 첨부해주세요 (최대 100MB, 5개까지)</p>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full bg-white text-black hover:bg-stone-200 py-4 font-bold text-lg"
                                    disabled={loading}
                                >
                                    {loading ? "전송 중..." : "문의 보내기"}
                                </Button>

                                {status.type === "success" && (
                                    <p className="text-green-400 text-sm">
                                        문의가 정상적으로 전송되었습니다.
                                    </p>
                                )}

                                {status.type === "error" && (
                                    <p className="text-red-400 text-sm">
                                        {status.message || "메일 전송에 실패했습니다. 다시 시도해주세요."}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </SectionWrapper>
            </main>
            <Footer />
        </>
    );
}
