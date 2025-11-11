import { NextResponse, NextRequest } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const captcha = formData.get("g-recaptcha-response");

  // --- STEP 1: Verify CAPTCHA ---
  if (!captcha) {
    return NextResponse.json(
      { error: "Missing reCAPTCHA token" },
      { status: 400 }
    );
  }

  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const captchaRes = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${captcha}`,
    });

    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      console.error("Captcha verification failed:", captchaData);
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Error verifying captcha:", err);
    return NextResponse.json(
      { error: "Captcha verification error" },
      { status: 500 }
    );
  }

  // --- STEP 2: Send email if captcha is valid ---
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_SENDER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      to: process.env.GMAIL_RECEIVER,
      subject: "New message from a visitor",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // ✅ Email address validation with @sparser before sending
    // const parser = await import("@sparser/email-address-parser");
    // const { EmailAddress } = parser.default;
    // const parsed = EmailAddress.parse(mailOptions.to!);

    // if (!parsed) {
    //   console.error("Invalid email address:", mailOptions.to);
    //   return NextResponse.json(
    //     { error: "Invalid recipient email address" },
    //     { status: 400 }
    //   );
    // }

    // console.log("Parsed email:", {
    //   address: `${parsed.localPart}@${parsed.domain}`,
    //   local: parsed.localPart,
    //   domain: parsed.domain,
    // });

    // ✅ Await instead of using callback
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);

    // ✅ Always return a response
    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Could not send message" },
      { status: 500 }
    );
  }
}
