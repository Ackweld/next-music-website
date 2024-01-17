import { NextResponse, NextRequest } from "next/server";
const nodemailer = require("nodemailer");

// Handles POST requests to /api

export async function POST(request: NextResponse) {
  const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
  const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
  const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;

  console.log("dealing with request");
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // create transporter object
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
    text: `Name: ${name} \n Email: ${email} \n \n Message: \n \n ${message}`,
  };

  try {
    const mail = await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Success: email was sent" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Could not send message" },
      { status: 500 }
    );
  }
}
