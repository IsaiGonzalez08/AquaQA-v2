import Image from "next/image";

export default function AquaQAButton({
  onClick,
  variant = "primary",
  text,
  icon = "",
  iconSize = 40,
  className = "",
}: {
  onClick?: () => void;
  variant: string;
  text: string;
  icon?: string;
  iconSize?: number;
  className?: string;
}) {
  let variantClassName = "";

  switch (variant) {
    case "primary":
      variantClassName = "border-primary bg-primary text-background";
      break;
    case "secondary":
      variantClassName = "border-primary bg-background text-primary";
      break;
    default:
      variantClassName = "border-primary bg-primary text-background";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer flex-row items-center justify-center gap-2 rounded-4xl border-2 font-medium transition-all duration-300 hover:scale-105 ${variantClassName} ${className}`}
    >
      {text}
      {icon && <Image src={icon} alt="Logo" width={iconSize} height={iconSize} />}
    </button>
  );
}
