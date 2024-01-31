import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Header, ImageCarousel, Footer } from "./components";
import { ApiService } from "@/app/services/ApiService";
import { BASE_API_URL } from "./lib/constants";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!BASE_API_URL) {
    return null;
  }

  const carouselImages = await ApiService.getData("carousel");

  return (
    <html lang="en">
      <body className={poppins.className}>
        <ImageCarousel {...carouselImages} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
