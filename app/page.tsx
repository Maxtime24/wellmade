"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HorizontalScrollGallery from "@/components/HorizontalScrollGallery";
import TextReveal from "@/components/ui/TextReveal";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Parallax Hero Section */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <motion.div
              style={{ y, scale: 1.1 }}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src="/hero.png"
                alt="Classical Sculpture Detail"
                fill
                className="object-cover object-center grayscale brightness-50 contrast-125"
                priority
              />
            </motion.div>
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <motion.div style={{ y: textY }}>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tighter mb-6 text-shadow-sm"
              >
                WELL MADE
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-lg md:text-xl font-light tracking-widest uppercase mb-10 opacity-90"
              >
                공간에 예술의 가치를 더하다
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <Button href="/work" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  포트폴리오 보기
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <SectionWrapper className="bg-stone-100 dark:bg-stone-900 text-center z-10 relative py-24">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-8 text-stone-800 dark:text-stone-200">
              인사말
            </h2>
            <div className="space-y-6 text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-3xl mx-auto">
              <p>
                <strong>웰메이드</strong>는 아름답고 따뜻한 세상을 만들어간다는 도전과 열정을 바탕으로<br className="hidden md:block" />
                최고의 장인정신을 추구하는 토탈 조형 기업입니다.
              </p>
              <p>
                전시 모형부터 실내외 조형물, 놀이시설물 보수에 이르기까지<br className="hidden md:block" />
                조형예술의 전 영역을 아우르며, 고객의 상상을 현실로 구현합니다.
              </p>
              <p>
                기획, 디자인, 제작, 시공에 이르는 전 과정에 걸쳐<br className="hidden md:block" />
                섬세한 조각 기법과 고도의 기술력으로 최고의 감동을 선사하겠습니다.
              </p>
            </div>
          </ScrollReveal>
        </SectionWrapper>

        {/* Process Section */}
        <SectionWrapper className="bg-white dark:bg-black py-24">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Our Process</h2>
              <p className="text-stone-500">최고의 결과물을 위한 체계적인 제작 공정</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "상담 및 기획", desc: "고객의 니즈를 파악하고 현장 분석을 통해 최적의 컨셉을 도출합니다." },
              { step: "02", title: "디자인 및 설계", desc: "3D 모델링과 도면 작업을 통해 구체적인 형태와 구조를 시각화합니다." },
              { step: "03", title: "제작 및 가공", desc: "엄선된 재료와 숙련된 장인의 기술로 정교하게 작품을 제작합니다." },
              { step: "04", title: "운송 및 설치", desc: "안전하게 현장으로 운송하고 완벽하게 설치하여 마무리를 짓습니다." }
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="group p-6 border border-stone-200 dark:border-stone-800 hover:border-stone-400 transition-colors h-full">
                  <span className="text-4xl font-serif font-bold text-stone-200 dark:text-stone-800 mb-4 block group-hover:text-stone-400 transition-colors">{item.step}</span>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </SectionWrapper>

        {/* Horizontal Scroll Gallery */}
        <HorizontalScrollGallery />

        {/* Start Project CTA */}
        <section className="py-32 bg-stone-900 text-stone-100 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src="/hero.png" alt="Background" fill className="object-cover" />
          </div>
          <div className="relative z-10 container mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">
                Ready to create something timeless?
              </h2>
              <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
                여러분의 상상력을 현실로 만들어드립니다.<br />
                지금 바로 프로젝트를 시작해보세요.
              </p>
              <Button href="/about" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
                문의하기
              </Button>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
