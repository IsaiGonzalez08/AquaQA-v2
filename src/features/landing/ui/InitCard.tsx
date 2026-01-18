"use client";

import Image from "next/image";
import { infoCards } from "./data";
import { motion } from "framer-motion";

export function InitCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.35, ease: "easeOut" }}
      className="bg-background mx-5 mt-4 rounded-xl p-5 shadow-2xl sm:mt-0 md:mx-10 md:py-20"
    >
      <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 md:grid-cols-3">
        {infoCards.map((item, index) => (
          <div className="flex flex-row items-center gap-5" key={index}>
            <Image src={item.icon} alt="Logo" width={30} height={30} className="z-10 rounded-3xl sm:h-12 sm:w-12" />
            <div>
              <h1 className="text-foreground text-xl font-bold sm:text-2xl">{item.title}</h1>
              <h3 className="text-foreground text-xs font-medium sm:text-sm">{item.subtitle}</h3>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
