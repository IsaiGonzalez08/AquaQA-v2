"use client";

import Image from "next/image";
import { infoCards } from "./data";

export function InitCard() {
  return (
    <div className="bg-background mx-20 flex h-64 flex-row justify-center rounded-xl px-20 shadow-2xl">
      <div className="flex flex-row gap-20">
        {infoCards.map((item, index) => (
          <div className="flex flex-row items-center gap-4" key={index}>
            <Image src={item.icon} alt="Logo" width={64} height={64} className="relative z-10 rounded-3xl" />
            <div>
              <h1 className="text-foreground text-3xl font-bold">{item.title}</h1>
              <h3 className="text-foreground text-base font-medium">{item.subtitle}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
