// Fix Node.js 25 localStorage bug
if (typeof globalThis !== "undefined" && !globalThis.localStorage?.getItem) {
  // @ts-ignore
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  };
}

import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  metadataBase: new URL("https://youthempowerment.community"),
  title: {
    default: "Youth Empowerment | Empowering the Next Generation of Innovators",
    template: "%s | Youth Empowerment",
  },
  description:
    "Youth Empowerment connects students, mentors, and industry professionals to learn, grow, and build impactful careers in technology.",
  keywords: ["youth empowerment","tech education","student community","mentorship","leadership development","technology","career support"],
  authors: [{ name: "Youth Empowerment Community", url: "https://youthempowerment.community" }],
  publisher: "Youth Empowerment",
  alternates: {
    canonical: "https://youthempowerment.community",
  },
  verification: {
    google: "Y_YxzlRxtPNvDMaaHBIHney3yE6dO_6z3GmC_WQLLJg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youthempowerment.community",
    siteName: "Youth Empowerment",
    title: "Youth Empowerment | Empowering the Next Generation of Innovators",
    description: "Youth Empowerment connects students, mentors, and industry professionals to learn, grow, and build impactful careers in technology.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Youth Empowerment Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Youth Empowerment | Empowering the Next Generation of Innovators",
    description: "Youth Empowerment connects students, mentors, and industry professionals to learn, grow, and build impactful careers in technology.",
    images: ["/android-chrome-512x512.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Google Verification */}
        <meta name="google-site-verification" content="Y_YxzlRxtPNvDMaaHBIHney3yE6dO_6z3GmC_WQLLJg" />

        {/* ✅ Favicon — browser tab logo */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
