import { AquaQAButton } from "./AquaQAButton";

export function InitView() {
    return (
        <div className="w-full flex flex-row">
            <div className="w-1/2">
                <h1 className="text-primary font-bold text-6xl">Agua limpia, <span className="text-secondary">futuro brillante</span></h1>
                <h3 className="text-foreground text-2xl font-medium">Invirtamos en calidad para un mundo radiante</h3>
                <div className="flex gap-5 mt-10">
                    <AquaQAButton text="Comenzar" />
                    <AquaQAButton text="Saber más" />
                </div>
                <div>
                    
                </div>
            </div>
            <div className="w-1/2"></div>
        </div>
    )
}