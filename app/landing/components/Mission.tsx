"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function Mission() {
  return (
    <div id="mission" className="relative flex flex-row gap-5 px-20 py-28">
      <Image
        width={430}
        height={450}
        src="/Images/box-background-2.png"
        alt="box"
        className="absolute top-0 right-0 z-0"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="z-50 w-1/2"
      >
        <h2 className="text-primary text-3xl font-medium">¿Por que elegirnos?</h2>
        <h1 className="text-grayDark w-fit text-4xl leading-14 font-bold">Resultados confiables, vidas saludables</h1>
        <p className="text-foreground mt-2 font-medium">
          Nuestra misión es garantizar que todos tengan acceso a agua de calidad, protegiendo la salud y promoviendo un
          entorno sostenible.
        </p>
        <p className="text-foreground mt-6 font-medium">
          Nos distinguimos por nuestra experiencia y trayectoria en el campo de la calidad del agua. Contamos con años
          de experiencia en la industria y hemos trabajado con una amplia gama de clientes, incluyendo hogares,
          empresas, instituciones educativas y entidades gubernamentales. Nuestro compromiso con la excelencia nos ha
          convertido en líderes confiables en el sector.
        </p>
        <div className="mt-7 flex flex-row justify-around">
          <div className="flex flex-row gap-3">
            <h2 className="text-primary text-5xl font-bold">2000+</h2>
            <p className="text-foreground font-medium">
              Clientes <br /> satisfechos
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <h2 className="text-primary text-5xl font-bold">10+</h2>
            <p className="text-foreground font-medium">
              Estados en <br /> todo Mexico
            </p>
          </div>
        </div>
        <div className="mt-7 flex flex-row justify-center gap-3">
          <h2 className="text-primary text-5xl font-bold">80+</h2>
          <p className="text-foreground font-medium">
            Zonas <br /> Siembra
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="z-50 flex w-1/2 justify-end"
      >
        <Image width={550} height={550} src="/Images/mission.png" alt="mission" className="rounded-2xl" />
      </motion.div>
    </div>
  );
}
