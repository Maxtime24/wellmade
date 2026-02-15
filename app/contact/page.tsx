"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import TextReveal from "@/components/ui/TextReveal";
import CloudinaryUploadWidget from "@/components/ui/CloudinaryUploadWidget";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string }>>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null | "success" | "error">(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

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

            if (!response.ok) {
                throw new Error("메일 전송 실패");
            }

            setStatus("success");
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
            setUploadedFiles([]);

        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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

                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-stone-900 border border-stone-700 rounded p-3"
                                    placeholder="이름"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-stone-900 border border-stone-700 rounded p-3"
                                    placeholder="이메일"
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-stone-900 border border-stone-700 rounded p-3"
                                    placeholder="전화번호"
                                />

                                <textarea
                                    rows={6}
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-stone-900 border border-stone-700 rounded p-3 resize-none"
                                    placeholder="문의 내용을 입력하세요"
                                />

                                <CloudinaryUploadWidget onUploadSuccess={setUploadedFiles} />

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full bg-white text-black py-4 font-bold text-lg"
                                    disabled={loading}
                                >
                                    {loading ? "전송 중..." : "문의 보내기"}
                                </Button>

                                {status === "success" && (
                                    <p className="text-green-400 text-sm">
                                        문의가 정상적으로 전송되었습니다.
                                    </p>
                                )}

                                {status === "error" && (
                                    <p className="text-red-400 text-sm">
                                        메일 전송에 실패했습니다. 다시 시도해주세요.
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
