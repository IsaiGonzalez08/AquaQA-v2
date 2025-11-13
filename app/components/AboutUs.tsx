"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AboutUs() {
  const features = [
    "Instalación de dispositivos",
    "Materiales de calidad",
    "Garantía de servicio",
    "Garantía de materiales",
  ];

  const circleRef = useRef(null);
  const isInView = useInView(circleRef, { once: true });
  const percentage = useMotionValue(0);
  const springPercentage = useSpring(percentage, { duration: 2000 });
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    if (isInView) {
      percentage.set(90);
    }
  }, [isInView, percentage]);

  useEffect(() => {
    const unsubscribe = springPercentage.on("change", (latest) => {
      setDisplayPercentage(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springPercentage]);

  return (
    <div id="about-us" className="relative mt-10 flex w-full flex-row items-start justify-between gap-16 px-20 py-32">
      <img src="/Images/box-background.png" alt="box" className="absolute bottom-0 left-0 z-0" />
      <motion.div
        className="z-50 w-1/2"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img src="/Images/about-us.png" alt="about-us" />
      </motion.div>

      <motion.div
        className="flex w-1/2 flex-col"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-primary text-2xl font-semibold">Sobre nosotros</h2>
        <h1 className="text-foreground text-4xl leading-tight font-bold">
          Somos empresa dedicada a la revisión y garantía de la calidad del agua
        </h1>
        <p className="text-foreground mt-3 text-base font-medium">
          Utilizamos tecnología de vanguardia y métodos científicos rigurosos para llevar a cabo pruebas y análisis
          exhaustivos en muestras de agua.
        </p>

        <div className="mt-10 flex flex-row gap-10">
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-row items-center gap-3">
                <img src="/check.svg" alt="check" />
                <span className="text-foreground text-base font-bold">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-row items-center gap-4">
            <div ref={circleRef} className="relative h-28 w-28">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 112 112">
                <circle cx="56" cy="56" r="48" stroke="#E5E7EB" strokeWidth="16" fill="none" />
                <motion.circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="#3CC0C9"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: `0 ${2 * Math.PI * 48}` }}
                  animate={isInView ? {
                    strokeDasharray: `${2 * Math.PI * 48 * 0.9} ${2 * Math.PI * 48}`
                  } : {}}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-primary text-2xl font-bold">
                  {displayPercentage}%
                </span>
              </div>
            </div>
            <span className="text-foreground text-base font-bold">
              Clientes <br /> Satisfechos
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
