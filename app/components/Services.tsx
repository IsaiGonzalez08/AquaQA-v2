import { ServicesCard } from "./ServicesCard";

export function Services() {

    const services = [
        {
            title: "Análisis de agua",
            description: "Monitoreo de calidad de agua de los suministros de agua",
            img: "/Images/service.png"
        },
        {
            title: "Carbohidratos",
            description: "Monitoreo de carbohidratos de los suministros de agua",
            img: "/Images/service.png"
        },
        {
            title: "Conductividad",
            description: "Monitoreo de conductividad de los suministros de agua",
            img: "/Images/service.png"
        },
        {
            title: "Nivel de agua",
            description: "Monitoreo de nivel de agua de los suministros de agua",
            img: "/Images/service.png"
        },
        {
            title: "Turbidez",
            description: "Monitoreo de turbidez de los suministros de agua",
            img: "/Images/service.png"
        }
    ];

    return (
        <div className="bg-[#F1FCFC] px-20 py-28">
            <div className="flex flex-col gap-3 text-center">
                <h2 className="text-primary font-medium text-3xl">Nuestros Servicios</h2>
                <h1 className="text-grayDark font-bold text-4xl">Cuida tu agua, Inicia con nosotros</h1>
                <p className="text-foreground font-medium text-base">Nos comprometemos a ofrecer resultados confiables y a proporcionar un servicio excepcional a nuestros clientes</p>
            </div>
            <div className="grid grid-cols-3 gap-4 gap-y-20 justify-items-center mt-20">
                {services.map((service, index) => (
                    <ServicesCard key={index} title={service.title} description={service.description} img={service.img} />
                ))}
            </div>
        </div>
    );
}