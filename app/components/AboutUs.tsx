import Image from "next/image";

export function AboutUs() {
    const features = [
        "Instalación de dispositivos",
        "Materiales de calidad",
        "Garantía de servicio",
        "Garantía de materiales",
    ];

    return (
        <div className="w-full flex flex-row justify-between items-start py-32 mt-10 relative px-20 gap-16">
            <img src="/Images/box-background.png" alt="box" className="absolute bottom-0 left-0 z-0" />
            <div className="w-1/2 z-50">
                <img
                    src="/Images/about-us.png"
                    alt="about-us"
                />
            </div>

            <div className="w-1/2 flex flex-col">
                <h2 className="text-primary font-semibold text-2xl">Sobre nosotros</h2>
                <h1 className="text-foreground font-bold text-4xl leading-tight">
                    Somos empresa dedicada a la revisión y garantía de la calidad del agua
                </h1>
                <p className="text-foreground text-base font-medium mt-3">
                    Utilizamos tecnología de vanguardia y métodos científicos rigurosos para llevar a cabo pruebas y análisis exhaustivos en muestras de agua.
                </p>

                <div className="flex flex-row gap-10 mt-10">
                    <div className="flex flex-col gap-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-row items-center gap-3">
                                <img src="/check.svg" alt="check" />
                                <span className="text-foreground font-bold text-base">{feature}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row items-center gap-4">
                        <div className="relative w-28 h-28">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 112 112">
                                <circle
                                    cx="56"
                                    cy="56"
                                    r="48"
                                    stroke="#E5E7EB"
                                    strokeWidth="16"
                                    fill="none"
                                />
                                <circle
                                    cx="56"
                                    cy="56"
                                    r="48"
                                    stroke="#3CC0C9"
                                    strokeWidth="16"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 48 * 0.9} ${2 * Math.PI * 48}`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-primary font-bold text-2xl">90%</span>
                            </div>
                        </div>
                        <span className="text-foreground font-bold text-base">Clientes <br /> Satisfechos</span>
                    </div>
                </div>

            </div>
        </div>
    );
}