"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-footer mx-auto w-full max-w-[2000px]">
      <div className="bg-primary flex h-64 flex-row items-center justify-center gap-10 px-20 text-white">
        <div className="text-4xl font-normal">
          AQUA<span className="font-bold">QA</span>
        </div>
        <div className="flex flex-row">
          <div className="mr-3 flex flex-row items-center gap-3">
            <Image width={40} height={40} src="/email.svg" alt="email" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Envíanos un correo</span>
              <span className="text-base font-normal">aquaQA@gmail.com</span>
            </div>
          </div>
          <div className="mr-3 flex flex-row items-center gap-3">
            <Image width={40} height={40} src="/phone.svg" alt="phone" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Llamanos</span>
              <span className="text-base font-normal">(+55) 888-223-1234</span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-3">
            <Image width={40} height={40} src="/marker.svg" alt="marker" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Ubicación</span>
              <span className="text-base font-normal">Suchiapa-CH,MX 29150</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-52 flex-row items-center justify-between px-20">
        <div className="flex flex-row items-center gap-3">
          <Image width={40} height={40} src="/vji.svg" alt="VJI Corporation" />
          <span className="text-primary text-2xl font-extrabold">VJI Corporation</span>
        </div>
        <div className="text-sm text-[#A5A5A5]">Copyright © 2023. AquaQA Todos los derechos reservados</div>
      </div>
    </footer>
  );
}
