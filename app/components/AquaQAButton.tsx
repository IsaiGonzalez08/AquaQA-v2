import Image from "next/image";

export function AquaQAButton({
    variant = "primary",
    width = "",
    height = "",
    text,
    icon = "",
    iconSize = 40,
    fontSize = "text-base",
}: {
    variant: string;
    text: string;
    width?: string;
    height?: string;
    icon?: string;
    iconSize?: number;
    fontSize?: string;
}) {
    let className = "";

    switch (variant) {
        case "primary":
            className = "border-primary bg-primary text-background";
            break;
        case "secondary":
            className = "border-primary bg-background text-primary";
            break;
        default:
            className = "border-primary bg-primary text-background";
            break;
    }

    return (
        <button className={`flex flex-row items-center justify-center font-medium gap-2 rounded-4xl border-2 cursor-pointer hover:scale-105 transition-all duration-300 ${width} ${height} ${className} ${fontSize}`}>
            {text}
            {icon && <Image src={icon} alt="Logo" width={iconSize} height={iconSize} />}
        </button>
    );
}
