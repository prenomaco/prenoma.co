import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactRequest {
  name: string;
  email: string;
  company: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequest = await request.json();
    const { name, email, company, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: "prenoma.co <noreply@prenoma.co>",
      to: "company@prenoma.co",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #161415;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #333;">${message}</p>
          </div>
          <p style="color: #999; font-size: 12px;">
            Sent from prenoma.co contact form
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
