import type { Metadata } from "next";
import { Poppins, Nunito, Space_Mono, Noto_Sans_Thai } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Poppins/Nunito/Space Mono have no Thai glyphs; this site's copy is Thai, so
// pair every family with a Thai-capable fallback instead of dropping to the
// browser default serif for non-Latin text.
const notoSansThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "สบายTech — ร้านไอทีและแกดเจ็ตออนไลน์",
  description:
    "สบายTech ร้านไอทีออนไลน์ คัดสรรสมาร์ทโฟน แล็ปท็อป หูฟัง แท็บเล็ต และอุปกรณ์เสริม จัดส่งไวทั่วประเทศ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        poppins.variable,
        nunito.variable,
        spaceMono.variable,
        notoSansThai.variable
      )}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          ข้ามไปเนื้อหาหลัก
        </a>
        <Header />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
