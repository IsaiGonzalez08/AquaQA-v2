export function Mission() {
    return (
        <div className="relative flex flex-row bg-white px-20 py-28 gap-5">
            <img src="/Images/box-background-2.png" alt="box" className="absolute top-0 right-0 z-0" />
            <div className="w-1/2 z-50">
                <h2 className="text-primary text-3xl font-medium">¿Por que  elegirnos?</h2>
                <h1 className="text-grayDark text-4xl font-bold leading-14">Resultados confiables, <br />vidas saludables</h1>
                <p className="text-foreground font-medium mt-2">Nuestra misión es garantizar que todos tengan acceso a agua de calidad, protegiendo la salud y promoviendo un entorno sostenible.</p>
                <p className="text-foreground font-medium mt-6">Nos distinguimos por nuestra experiencia y trayectoria en el campo de la calidad del agua. Contamos con años de experiencia en la industria y hemos trabajado con una amplia gama de clientes, incluyendo hogares, empresas, instituciones educativas y entidades gubernamentales. Nuestro compromiso con la excelencia nos ha convertido en líderes confiables en el sector.</p>
                <div className="flex flex-row justify-around mt-7">
                    <div className="flex flex-row gap-3">
                        <h2 className="text-primary font-bold text-5xl">2000+</h2>
                        <p className="text-foreground font-medium">Clientes <br /> satisfechos</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <h2 className="text-primary font-bold text-5xl">10+</h2>
                        <p className="text-foreground font-medium">Estados en <br /> todo Mexico</p>
                    </div>
                </div>
                <div className="flex flex-row justify-center mt-7 gap-3">
                    <h2 className="text-primary font-bold text-5xl">80+</h2>
                    <p className="text-foreground font-medium">Zonas <br /> Siembra</p>
                </div>
            </div>
            <div className="w-1/2 z-50 flex justify-end">
                <img src="/Images/mission.png" alt="mission" className="rounded-2xl" />
            </div>
        </div>
    )
}