"use client";

import { ServicesCard } from "./ServicesCard";
import { motion } from "framer-motion";
import { services } from "./data";

export function Services() {
  return (
    <div id="services" className="bg-light-green py-10 px-5 sm:mt-20">
      <div className="flex flex-col text-center">
        <h2 className="text-primary text-2xl font-semibold">Nuestros Servicios</h2>
        <h1 className="text-grayDark text-2xl font-bold">Cuida tu agua con nosotros</h1>
        <p className="text-foreground text-base font-medium">
          Nos comprometemos a ofrecer resultados confiables y a proporcionar un servicio excepcional a nuestros clientes
        </p>
      </div>
      <motion.div
        className="grid grid-cols-1 justify-items-center mt-5 sm:mt-0 sm:grid-cols-2 lg:grid-cols-3"
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
