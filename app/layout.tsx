import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "웰메이드 (WELL MADE) | 조형, 조각, 공간 예술의 가치",
  description: "웰메이드는 최고의 장인정신으로 전시 모형, 실내외 조형물, 문화유산 복원 등 조형 예술의 전 영역을 아우르는 토탈 조형 기업입니다. 공간에 예술의 가치를 더합니다.",
  keywords: ["웰메이드", "WELL MADE", "조형", "조각", "조형물 제작", "전시 모형", "문화유산 복원", "예술 조형"],
  authors: [{ name: "WELL MADE" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "웰메이드 (WELL MADE) | 조형, 조각, 공간 예술의 가치",
    description: "공간에 예술의 가치를 더하는 토탈 조형 기업 웰메이드입니다. 전시 모형, 조형물 제작, 문화유산 복원 전문.",
    url: "https://wellmade-art.co.kr", // Placeholder, adjust if real URL is known
    siteName: "웰메이드",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "웰메이드 (WELL MADE) | 조형, 조각, 공간 예술의 가치",
    description: "공간에 예술의 가치를 더하는 토탈 조형 기업 웰메이드입니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-stone-100 text-stone-900`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
