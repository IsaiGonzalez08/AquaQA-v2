export function InitCard() {
    let infoCard = [
        {
            title: "Certificación",
            subtitle: "Lorem ipsum dolor sit amet consectetur.",
            icon: "/certificate.svg",
        },
        {
            title: "Precio",
            subtitle: "Lorem ipsum dolor sit amet consectetur.",
            icon: "/price.svg",
        },
        {
            title: "Amigable",
            subtitle: "Lorem ipsum dolor sit amet consectetur.",
            icon: "/friendly.svg",
        },
    ]

    return (
        <div className="bg-background shadow-2xl rounded-xl flex flex-row justify-center h-64 px-20">
            <div className="flex flex-row gap-5">
                {infoCard.map((item, index) => (
                    <div className="flex flex-row items-center gap-4" key={index}>
                        <img src={item.icon} alt="Logo" className="rounded-3xl max-h-[550px] relative z-10" />
                        <div>
                            <h1 className="text-foreground font-bold text-3xl">{item.title}</h1>
                            <h3 className="text-foreground text-lg font-medium">{item.subtitle}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}