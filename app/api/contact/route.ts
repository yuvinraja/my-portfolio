// app/api/contact/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "yuvinrajav@gmail.com",
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #e63946;">📬 New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <div style="margin-top: 10px; padding: 10px; background: #f9f9f9; border-left: 4px solid #e63946;">
        ${message.replace(/\n/g, "<br />")}
      </div>
      <hr style="margin-top: 20px;" />
      <p style="font-size: 0.9em; color: #666;">Sent from your portfolio contact form</p>
    </div>
  `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend error", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
