export function Footer() {
    return (
        <footer className="w-full max-w-[2000px] mx-auto">
            <div className="bg-primary px-20 h-64 flex flex-row justify-center items-center text-white gap-10">
                <div className="text-4xl font-normal">
                    AQUA<span className="font-bold">QA</span>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-row items-center gap-3 mr-3">
                        <img src="/email.svg" alt="email" className="w-8 h-8" />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Envíanos un correo</span>
                            <span className="text-base font-normal">aquaQA@gmail.com</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-3 mr-3">
                        <img src="/phone.svg" alt="phone" className="w-8 h-8" />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Llamanos</span>
                            <span className="text-base font-normal">(+55) 888-223-1234</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <img src="/marker.svg" alt="marker" className="w-8 h-8" />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Ubicación</span>
                            <span className="text-base font-normal">Suchiapa-CH,MX 29150</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#F5F5F5] px-20 h-52 flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                    <img src="/vji.svg" alt="VJI Corporation" className="h-10" />
                    <span className="text-primary text-2xl font-extrabold">VJI Corporation</span>
                </div>
                <div className="text-[#A5A5A5] text-sm">
                    Copyright © 2023. AquaQA Todos los derechos reservados
                </div>
            </div>
        </footer>
    );
}
