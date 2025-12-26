"use client";

import Image from "next/image";

export function InitCard() {
  const infoCard = [
    {
      title: "Certificación",
      subtitle: "Lorem ipsum dolor sit amet consectetur.",
      icon: "/certificate.svg",
    },
    {
      title: "Precio",
      subtitle: "Lorem ipsum dolor sit amet consectetur.",
      icon: "/price.svg",
    },
    {
      title: "Amigable",
      subtitle: "Lorem ipsum dolor sit amet consectetur.",
      icon: "/friendly.svg",
    },
  ];

  return (
    <div className="bg-background mx-20 flex h-64 flex-row justify-center rounded-xl px-20 shadow-2xl">
      <div className="flex flex-row gap-20">
        {infoCard.map((item, index) => (
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
