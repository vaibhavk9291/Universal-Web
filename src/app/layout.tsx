import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/features/Chatbot";
import { WhatsAppButton } from "@/components/features/WhatsAppButton";
import { BookingProvider } from "@/context/BookingContext";
import { BookingModal } from "@/components/features/BookingModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premium Healthcare Platform",
  description: "Understand your treatment before you visit. Clear information about procedures, recovery, and results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased font-body text-dark-charcoal bg-primary-white">
        <BookingProvider>
          <Navbar />
          {children}
          <Footer />
          <Chatbot />
          <WhatsAppButton />
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
