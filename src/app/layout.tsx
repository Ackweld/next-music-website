import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Header, ImageCarousel, Footer } from "./components";

const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wunjan - Musician | Producer",
  description:
    "Explore the creative works of Wunjan, get in touch or download audio content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ImageCarousel />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
