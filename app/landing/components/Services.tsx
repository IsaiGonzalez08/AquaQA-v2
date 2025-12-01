"use client";
import { ServicesCard } from "../../components/ServicesCard";

import { motion } from "framer-motion";

export function Services() {
  const services = [
    {
      title: "Análisis de agua",
      description: "Monitoreo de calidad de agua de los suministros de agua",
      img: "/Images/service.png",
    },
    {
      title: "Carbohidratos",
      description: "Monitoreo de carbohidratos de los suministros de agua",
      img: "/Images/service.png",
    },
    {
      title: "Conductividad",
      description: "Monitoreo de conductividad de los suministros de agua",
      img: "/Images/service.png",
    },
    {
      title: "Nivel de agua",
      description: "Monitoreo de nivel de agua de los suministros de agua",
      img: "/Images/service.png",
    },
    {
      title: "Turbidez",
      description: "Monitoreo de turbidez de los suministros de agua",
      img: "/Images/service.png",
    },
  ];

  return (
    <div id="services" className="bg-[#F1FCFC] px-20 py-28">
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
