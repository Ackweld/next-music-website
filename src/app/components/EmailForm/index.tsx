"use client";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha"; // 🔹 Import reCAPTCHA
import styles from "./EmailForm.module.css";

export const EmailForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sentMessage, setSentMessage] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null); // 🔹

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnFocus = () => {
    setSentMessage(false);
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  async function handleSubmit(event: any) {
    event.preventDefault();

    // 🔹 Ensure captcha was completed
    if (!captchaValue) {
      alert("Please verify that you're not a robot.");
      return;
    }

    const formDataToSend = new FormData(event.target);
    formDataToSend.append("g-recaptcha-response", captchaValue); // 🔹 send captcha token to backend

    try {
      const response = await fetch("/api/contact", {
        method: "post",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`response status: ${response.status}`);
      }

      await response.json();
      setFormData({ name: "", email: "", message: "" });
      setCaptchaValue(null); // 🔹 reset captcha
      setSentMessage(true);
    } catch (err) {
      console.error(err);
      alert("Error, please try resubmitting the form");
    }
  }

  return (
    <form id="contact-form" className={styles.emailForm} onSubmit={handleSubmit}>
      <p className={styles.contact}>Contact me</p>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={handleOnFocus}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={handleOnFocus}
          required
        />
      </label>
      <label>
        Message:
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={handleOnFocus}
          required
        />
      </label>

      {/* 🔹 Add CAPTCHA before submit button */}
      <div className={styles.captchaContainer}>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={handleCaptchaChange}
        />
      </div>

      <div className={styles.horizontalContainer}>
        <button type="submit">SUBMIT</button>
        {sentMessage && (
          <p className={styles.sentMessageLabel}>Your message was sent</p>
        )}
      </div>
    </form>
  );
};
