"use client";
import { useState } from "react";
import styles from "./EmailForm.module.css";

export const EmailForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sentMessage, setSentMessage] = useState(false);

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

  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch("/api/contact", {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        // console.log("falling over");
        throw new Error(`response status: ${response.status}`);
      }
      const responseData = await response.json();
      // console.log(responseData["message"]);
      setFormData({ name: "", email: "", message: "" });
      setSentMessage(true);
    } catch (err) {
      console.error(err);
      alert("Error, please try resubmitting the form");
    }
  }

  return (
    <form
      id="contact-form"
      className={styles.emailForm}
      onSubmit={handleSubmit}
    >
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
      <div className={styles.horizontalContainer}>
        <button type="submit">SUBMIT</button>
        {sentMessage && (
          <p className={styles.sentMessageLabel}>Your message was sent</p>
        )}
      </div>
    </form>
  );
};
