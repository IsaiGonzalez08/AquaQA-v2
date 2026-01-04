import { Poppins } from "next/font/google";
import Providers from "./providers";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} h-svh`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
