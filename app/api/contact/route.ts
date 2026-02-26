import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Nodemailer 트랜스포터 생성 (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
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
    console.error("MAIL ERROR:", error);

    return NextResponse.json(
      {
        error: "메일 전송 실패",
        detail: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
