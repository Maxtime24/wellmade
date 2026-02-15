import { NextResponse } from "next/server";
import {
  SESClient,
  SendEmailCommand,
} from "@aws-sdk/client-ses";

// SES 클라이언트 생성
const client = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
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

    // 4️⃣ SES 명령 생성
    const command = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL!,
      Destination: {
        ToAddresses: [process.env.SES_TO_EMAIL!],
      },
      Message: {
        Subject: {
          Data: `[웰메이드 문의] ${name}님의 문의`,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: htmlContent,
            Charset: "UTF-8",
          },
        },
      },
      ReplyToAddresses: [email],
    });

    // 5️⃣ 발송
    await client.send(command);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("SES ERROR:", error);

    return NextResponse.json(
      {
        error: "메일 전송 실패",
        detail: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
