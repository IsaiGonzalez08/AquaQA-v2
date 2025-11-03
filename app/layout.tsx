import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
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
        <main className="max-w-[2000px] mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
