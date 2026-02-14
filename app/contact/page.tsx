"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const subject = `[웰메이드 문의] ${formData.name}님의 문의`;
        const body = `
이름: ${formData.name}
이메일: ${formData.email}
전화번호: ${formData.phone}

문의 내용:
${formData.message}
        `.trim();

        const mailtoLink = `mailto:k2nkim@hanmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
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
            <main className="min-h-screen bg-stone-900 text-stone-100 pt-32">
                <SectionWrapper className="py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-serif mb-8">
                                <TextReveal>Contact Us</TextReveal>
                            </h1>
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
                                    <a href="mailto:k2nkim@hanmail.com" className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-colors">
                                            <span>📧</span>
                                        </div>
                                        <span className="text-lg">k2nkim@hanmail.com</span>
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
                                    <label className="block text-sm font-medium text-stone-400 mb-2">첨부파일</label>
                                    <input
                                        type="file"
                                        multiple
                                        className="w-full bg-stone-900 border border-stone-700 rounded p-3 focus:border-white focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-white file:text-stone-900 hover:file:bg-stone-200 file:cursor-pointer"
                                    />
                                    <p className="text-xs text-stone-500 mt-2">참고 이미지나 도면을 첨부해주세요 (선택사항)</p>
                                </div>

                                <Button type="submit" variant="primary" className="w-full bg-white text-black hover:bg-stone-200 py-4 font-bold text-lg">
                                    문의 보내기
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
