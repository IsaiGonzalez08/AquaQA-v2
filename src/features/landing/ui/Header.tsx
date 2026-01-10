"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/button";

export function Header() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="mx-auto flex w-full max-w-[2000px] items-center justify-between px-5 py-10 sm:px-10">
      <Image src="/aquaQA.svg" alt="Logo" width={40} height={40} />
      <nav className="hidden md:flex font-medium gap-10">
        <Link href="/">Inicio</Link>
        <Link href="#about-us" onClick={(e) => handleSmoothScroll(e, "about-us")}>
          Nosotros
        </Link>
        <Link href="#services" onClick={(e) => handleSmoothScroll(e, "services")}>
          Servicios
        </Link>
        <Link href="#mission" onClick={(e) => handleSmoothScroll(e, "mission")}>
          Misión
        </Link>
      </nav>
      <Link href="/auth/login">
        <Button variant="secondary" iconSize={40} className="h-9 w-36 text-base">
          Comenzar
        </Button>
      </Link>
    </header>
  );
}
