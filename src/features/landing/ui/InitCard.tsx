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
      className="bg-background mx-5 my-20 rounded-xl shadow-2xl sm:mx-10"
    >
      <div className="flex flex-col items-center gap-5 p-5 sm:flex-row sm:justify-center sm:gap-10 lg:py-10">
        {infoCards.map((item, index) => (
          <div className="flex flex-row items-center gap-5 sm:flex-col sm:gap-2 lg:flex-row" key={index}>
            <Image src={item.icon} alt="Logo" width={40} height={40} className="z-10 rounded-3xl" />
            <div className="sm:text-center lg:text-left">
              <h1 className="text-foreground text-xl font-bold sm:text-2xl">{item.title}</h1>
              <h3 className="text-foreground text-xs font-medium sm:text-sm">{item.subtitle}</h3>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
