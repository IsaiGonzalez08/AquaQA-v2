"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function Mission() {
  return (
    <div id="mission" className="relative flex flex-row gap-5 px-5 py-10 sm:px-0 sm:pl-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="z-50 sm:w-1/2"
      >
        <h2 className="text-primary text-2xl font-bold text-center sm:text-left">¿Por que elegirnos?</h2>
        <h1 className="text-grayDark w-fit text-2xl font-bold text-center sm:text-left">Resultados confiables, vidas saludables</h1>
        <p className="text-foreground mt-4 font-medium text-center sm:text-left">
          Nuestra misión es garantizar que todos tengan acceso a agua de calidad, protegiendo la salud y promoviendo un
          entorno sostenible.
        </p>
        <p className="text-foreground mt-6 font-medium text-center hidden sm:block sm:text-left">
          Nos distinguimos por nuestra experiencia y trayectoria en el campo de la calidad del agua. Contamos con años
          de experiencia en la industria y hemos trabajado con una amplia gama de clientes, incluyendo hogares,
          empresas, instituciones educativas y entidades gubernamentales.
        </p>
        <div className="mt-10 grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-3 gap-6">
          <div className="flex flex-row gap-3 sm:col-start-1 sm:col-end-3 ">
            <h2 className="text-primary text-5xl font-bold">2000+</h2>
            <p className="text-foreground font-medium">
              Clientes <br /> satisfechos
            </p>
          </div>
          <div className="flex flex-row gap-3 sm:col-start-3">
            <h2 className="text-primary text-5xl font-bold">10+</h2>
            <p className="text-foreground font-medium">
              Estados en <br /> todo Mexico
            </p>
          </div>
          <div className="flex flex-row gap-3 sm:col-start-2">
            <h2 className="text-primary text-5xl font-bold">80+</h2>
            <p className="text-foreground font-medium">
              Zonas <br /> Siembra
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="z-50 hidden w-1/2 sm:flex sm:justify-end"
      >
        <Image width={550} height={550} src="/Images/mission.png" alt="mission" className="rounded-2xl" />
      </motion.div>
    </div>
  );
}
