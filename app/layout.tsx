import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Header } from "./components/Header";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AquaQA",
  description: "Agencia de calidad del agua",
  icons: {
    icon: "/aquaQA.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
