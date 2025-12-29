"use client";

import { ServicesCard } from "./ServicesCard";
import { motion } from "framer-motion";
import { services } from "./data";

export function Services() {
  return (
    <div id="services" className="bg-light-green px-20 py-28">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-primary text-3xl font-medium">Nuestros Servicios</h2>
        <h1 className="text-grayDark text-4xl font-bold">Cuida tu agua, Inicia con nosotros</h1>
        <p className="text-foreground text-base font-medium">
          Nos comprometemos a ofrecer resultados confiables y a proporcionar un servicio excepcional a nuestros clientes
        </p>
      </div>
      <motion.div
        className="mt-20 grid grid-cols-3 justify-items-center gap-4 gap-y-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <ServicesCard key={index} title={service.title} description={service.description} img={service.img} />
        ))}
      </motion.div>
    </div>
  );
}
