import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ConditionalChatFab } from "@/components/chat/ConditionalChatFab";
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });

export const metadata: Metadata = {
  title: "WildGuide",
  description: "WildGuide - Your AI guide for exploring the wilderness.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={raleway.variable}>
      <body className="min-h-screen bg-white text-slate-900 antialiased font-raleway">
        <Navbar />
  {children}
  <Footer />
  <ConditionalChatFab />
      </body>
    </html>
  );
}
