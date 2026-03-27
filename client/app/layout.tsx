import Header from "@/components/shared/Header";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const latoSans = Lato({
  variable: "--font-sans",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});
const latoMono = Lato({
  variable: "--font-mono",
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
      <html
        lang="en"
        className={`${latoSans.variable} ${latoMono.variable}  h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
