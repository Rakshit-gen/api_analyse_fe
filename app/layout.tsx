import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from "@/components/ThemeProvider";
import { dark } from '@clerk/themes'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "API Integration Debugger",
  description: "AI-powered multi-agent system to diagnose and fix API integration issues",
  icons: {
    icon: "/terminal.png",
    shortcut: "/terminal.png",
    apple: "/terminal.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{theme: dark}}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}