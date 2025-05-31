import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@meetzen/ui/global.css";
import { AppProviders } from "./app-providers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Meetzen",
  description: "Plataforma para gestionar citas de manera automatica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
