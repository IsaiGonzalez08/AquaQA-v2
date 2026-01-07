"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/button";
import Image from "next/image";
import { dividers } from "./data";

export function InitSection() {
  return (
    <div className="flex w-full flex-row items-center px-5 sm:gap-10 sm:px-10">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.35, ease: "easeOut" }}
        className="flex w-full flex-col lg:w-1/2"
      >
        <span className="flex flex-col items-center text-4xl font-bold sm:text-6xl sm:leading-[1.2] lg:items-center xl:text-7xl">
          <span className="text-primary">Agua limpia,</span>
          <span className="text-secondary">futuro brillante</span>
        </span>
        <h3 className="text-foreground mt-2 text-center text-base font-medium sm:text-xl lg:text-center">
          Invirtamos en calidad para un mundo radiante
        </h3>
        <div className="mt-5 flex flex-row justify-center gap-4 sm:mt-10 lg:px-20">
          <Button variant="primary" icon="/start.svg" iconSize={25} className="w-full">
            Iniciar
          </Button>
          <Button variant="secondary" icon="/add.svg" iconSize={25} className="w-full">
            Saber más
          </Button>
        </div>
        <div className="mt-8 flex w-full flex-row justify-around sm:my-10 sm:gap-10 sm:justify-center">
          {dividers.map((item, index) => (
            <div key={index} className="flex flex-row items-center">
              <div className="flex flex-col items-center">
                <h1 className="text-primary text-3xl font-bold">{item.quantity}</h1>
                <h3 className="text-secondary text-center text-lg font-medium">{item.text}</h3>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        className="relative hidden w-1/2 flex-row items-center justify-center gap-4 pb-20 lg:flex"
      >
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at center 50%, #3CC0C933 30%, transparent 60%)",
          }}
        />
        <Image
          src="/Images/init1.png"
          alt="Logo"
          width={190}
          height={550}
          className="relative z-10 rounded-3xl transition-all duration-300 hover:scale-105"
        />
        <Image
          src="/Images/init2.png"
          alt="Logo"
          width={190}
          height={550}
          className="relative z-10 mt-26 rounded-3xl transition-all duration-300 hover:scale-105"
        />
        <Image
          src="/Images/init3.png"
          alt="Logo"
          width={190}
          height={550}
          className="relative z-10 rounded-3xl transition-all duration-300 hover:scale-105"
        />
      </motion.div>
    </div>
  );
}
