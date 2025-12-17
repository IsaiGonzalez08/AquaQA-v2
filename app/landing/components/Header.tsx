"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../../components/ui/button";

export function Header() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="mx-auto flex h-32 w-full max-w-[2000px] items-center justify-between px-20">
      <Image src="/aquaQA.svg" alt="Logo" width={40} height={40} />
      <nav className="text-text flex flex-row gap-10 font-medium">
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
        <Button
          variant="secondary"
          iconSize={40}
          className="h-9 w-36 text-base"
        >
          Comenzar
        </Button>
      </Link>
    </header>
  );
}
