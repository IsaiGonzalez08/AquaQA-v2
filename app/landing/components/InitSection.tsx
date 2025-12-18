"use client";

import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import Image from "next/image";

export function InitSection() {
  let dividerInfo = [
    {
      quantity: "80+",
      text: "Zonas",
    },
    {
      quantity: "2000+",
      text: "Personas",
    },
    {
      quantity: "10+",
      text: "Estados",
    },
  ];

  return (
    <div className="flex w-full flex-row items-center px-20">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.35, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex w-1/2 justify-start 2xl:justify-center"
      >
        <div>
          <h1 className="text-primary w-fit text-6xl leading-20 font-bold">
            Agua limpia, <br />
            <span className="text-secondary">futuro brillante</span>
          </h1>
          <h3 className="text-foreground mt-2 w-fit text-2xl font-medium">
            Invirtamos en calidad para un mundo radiante
          </h3>
          <div className="mt-10 ml-4 flex w-fit gap-5">
            <Button variant="primary" icon="/start.svg" iconSize={25} className="h-14 w-48 text-xl">
              Iniciar
            </Button>
            <Button variant="secondary" icon="/add.svg" iconSize={25} className="h-14 w-48 text-xl">
              Saber más
            </Button>
          </div>
          <div className="mt-10 ml-4 flex w-fit flex-row">
            {dividerInfo.map((item, index) => (
              <div key={index} className="flex flex-row items-center">
                <div className="flex flex-col items-center">
                  <h1 className="text-primary text-3xl font-bold">{item.quantity}</h1>
                  <h3 className="text-secondary text-center text-lg font-medium">{item.text}</h3>
                </div>
                {index < dividerInfo.length - 1 && <div className="bg-grayLight mx-12 h-20 w-0.5" />}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative flex w-1/2 flex-row items-center justify-start gap-4 2xl:justify-center pb-20"
      >
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at center 52%, #3CC0C933 0%, transparent 60%)",
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
