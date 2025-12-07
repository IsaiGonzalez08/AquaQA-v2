import { Poppins } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./globals.css";
import type { Metadata, Viewport } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AquaQA",
  description: "Agencia de calidad del agua",
  openGraph: {
    title: "AquaQA",
    description: "Agencia de calidad del agua",
  },
  icons: {
    icon: "/aquaQA.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex min-h-screen flex-col overflow-x-hidden`}>
        <main className="mx-auto w-full max-w-[2000px] grow">{children}</main>
      </body>
    </html>
  );
}
