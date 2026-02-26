import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer 트랜스포터 생성 (더 안정적인 설정을 위해 explicit host/port 사용)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // 587 포트는 false (STARTTLS)
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    // 환경 변수 검증 (Vercel 설정 확인용)
    const { GMAIL_USER, GMAIL_APP_PASSWORD, EMAIL_TO } = process.env;

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !EMAIL_TO) {
      console.error("CRITICAL ERROR: Missing environment variables for email.");
      return NextResponse.json(
        {
          error: "서버 설정 오류 (환경 변수 누락)",
          detail: "Vercel 대시보드에서 GMAIL_USER, GMAIL_APP_PASSWORD, EMAIL_TO를 설정했는지 확인해주세요."
        },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { name, email, phone, message, files } = body;

    // 1️⃣ 기본 검증
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "필수 값 누락" },
        { status: 400 }
      );
    }

    // 2️⃣ 첨부파일 HTML 구성
    let filesHtml = "";
    if (files && Array.isArray(files) && files.length > 0) {
      filesHtml = `
        <h3>첨부파일</h3>
        ${files
          .map(
            (file: any, index: number) =>
              `<p>${index + 1}. <a href="${file.url}" target="_blank">${file.name}</a></p>`
          )
          .join("")}
      `;
    }

    // 3️⃣ 이메일 HTML 템플릿
    const htmlContent = `
      <h2>새 문의가 도착했습니다</h2>
      <p><strong>이름:</strong> ${name}</p>
      <p><strong>이메일:</strong> ${email}</p>
      <p><strong>전화번호:</strong> ${phone}</p>
      <hr />
      <p><strong>문의 내용:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
      <hr />
      ${filesHtml}
    `;

    // 4️⃣ 이메일 옵션 설정
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `[웰메이드 문의] ${name}님의 문의`,
      html: htmlContent,
      replyTo: email,
    };

    // 5️⃣ 발송
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    // Vercel 로그에서 상세 에러를 볼 수 있도록 전체 에러 객체 출력
    console.error("FULL MAIL ERROR:", error);

    return NextResponse.json(
      {
        error: "메일 전송 실패",
        detail: error.message || "Unknown error",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
