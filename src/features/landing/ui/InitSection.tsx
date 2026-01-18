"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/button";
import Image from "next/image";
import { dividers } from "./data";

export function InitSection() {
  return (
    <div className="flex w-full flex-row items-center justify-around gap-10 px-5 sm:px-10">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.35, ease: "easeOut" }}
        className="flex flex-col"
      >
        <span className="text-center text-4xl leading-[1.2] font-bold sm:text-5xl xl:text-center xl:text-7xl">
          <span className="text-primary">Agua limpia,</span>
          <br />
          <span className="text-secondary">futuro brillante</span>
        </span>
        <h3 className="mt-3 text-foreground text-center text-base font-medium sm:text-xl lg:text-center">
          Invirtamos en calidad para un mundo radiante
        </h3>
        <div className="mt-3 flex flex-row justify-center gap-4">
          <Button variant="primary" icon="/start.svg" iconSize={25} className="px-10">
            Iniciar
          </Button>
          <Button variant="secondary" icon="/add.svg" iconSize={25}>
            Saber más
          </Button>
        </div>
        <div className="flex w-full flex-row justify-around mt-5 sm:justify-center sm:gap-10">
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
        className="relative hidden flex-row items-center justify-center gap-4 lg:flex"
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
