import { AquaQAButton } from "./AquaQAButton";

export function InitSection() {
    let dividerInfo = [
        {
            quantity: "80+",
            text: "Zonas",
        },
        {
            quantity: "2000+",
            text: "Personas",
        },
        {
            quantity: "10+",
            text: "Estados",
        },
    ]

    return (
        <div className="w-full flex flex-row items-center">
            <div className="w-1/2">
                <h1 className="text-primary font-bold text-6xl leading-20">Agua limpia, <br /><span className="text-secondary">futuro brillante</span></h1>
                <h3 className="text-foreground text-2xl font-medium mt-2">Invirtamos en calidad para un mundo radiante</h3>
                <div className="flex gap-5 ml-4 mt-10">
                    <AquaQAButton variant="primary" text="Iniciar" icon="/start.svg" iconSize={25} width="w-48" height="h-14" fontSize="text-xl" />
                    <AquaQAButton variant="secondary" text="Saber más" icon="/add.svg" iconSize={25} width="w-48" height="h-14" fontSize="text-xl" />
                </div>
                <div className="flex flex-row ml-4 mt-10">
                    {dividerInfo.map((item, index) => (
                        <div key={index} className="flex flex-row items-center">
                            <div className="flex flex-col items-center">
                                <h1 className="text-primary font-bold text-3xl">{item.quantity}</h1>
                                <h3 className="text-secondary text-lg font-medium text-center">{item.text}</h3>
                            </div>
                            {index < dividerInfo.length - 1 && (
                                <div className="w-0.5 h-20 bg-grayLight mx-12"/>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-1/2 flex flex-row justify-center items-center gap-5 relative">
                <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at center 80%, #3CC0C933 0%, transparent 50%)',
                    }}
                />
                <img src="/Images/init1.png" alt="Logo" className="rounded-3xl max-h-[550px] relative z-10" />
                <img src="/Images/init2.png" alt="Logo" className="rounded-3xl max-h-[550px] mt-26 relative z-10" />
                <img src="/Images/init3.png" alt="Logo" className="rounded-3xl max-h-[550px] relative z-10" />
            </div>
        </div>
    )
}   