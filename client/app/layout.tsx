import Header from "@/components/shared/Header";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";

const latoSans = Lato({
  variable: "--font-lato-sans",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyPal - Your AI Study Companion",
  description:
    "Chat with any PDF Study material and find answers based on the resource. No external information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${latoSans.variable}  h-full antialiased`}>
        <body className="min-h-full flex flex-col">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
