"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { animatePageOut } from "../utils/animation";
import AquaQAButton from "./AquaQAButton";

export function Header() {
  const router = useRouter();
  const pathName = usePathname();

  const handleClick = (href: string) => {
    if (pathName !== href) {
      animatePageOut(router, href);
    }
  };

  return (
    <header className="mx-auto flex h-32 w-full max-w-[2000px] items-center justify-between px-20">
      <Image src="/aquaQA.svg" alt="Logo" width={40} height={40} />
      <div className="text-text flex flex-row gap-10 font-medium">
        <Link href="/">Inicio</Link>
        <Link href="/contact">Servicios</Link>
        <Link href="/about">Nosotros</Link>
      </div>
      <AquaQAButton
        variant="secondary"
        text="Comenzar"
        width="w-32"
        height="h-9"
        onClick={() => handleClick("/login")}
      />
    </header>
  );
}
