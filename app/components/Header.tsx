import Link from "next/link";
import { AquaQAButton } from "./AquaQAButton";
import Image from "next/image";

export function Header() {
    return (
        <header className="flex justify-between items-center h-32 w-full px-28">
            <Image src="/aquaQA.svg" alt="Logo" width={40} height={40} />
            <div className="flex flex-row gap-10 font-medium text-text">
                <Link href="/">Inicio</Link>
                <Link href="/contact">Servicios</Link>
                <Link href="/about">Nosotros</Link>
            </div>
            <AquaQAButton variant="secondary" text="Comenzar" width="w-32" height="h-9" />
        </header>
    )
}