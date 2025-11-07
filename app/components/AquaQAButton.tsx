import Image from "next/image";

export default function AquaQAButton({
  onClick,
  variant = "primary",
  width = "",
  height = "",
  text,
  icon = "",
  iconSize = 40,
  fontSize = "text-base",
}: {
  onClick?: () => void;
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
    <button
      onClick={onClick}
      className={`flex cursor-pointer flex-row items-center justify-center gap-2 rounded-4xl border-2 font-medium transition-all duration-300 hover:scale-105 ${width} ${height} ${className} ${fontSize}`}
    >
      {text}
      {icon && <Image src={icon} alt="Logo" width={iconSize} height={iconSize} />}
    </button>
  );
}
