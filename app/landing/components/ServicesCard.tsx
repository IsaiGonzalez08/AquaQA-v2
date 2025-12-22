import Image from "next/image";

export function ServicesCard({ title, description, img }: { title: string; description: string; img: string }) {
  return (
    <div className="max-w-80 rounded-2xl hover:scale-105 transition-all duration-300">
      <Image width={330} height={280} src={img} alt="service-card" className="w-full object-cover" />
      <div className="bg-service-card px-6 py-4 text-center">
        <h2 className="text-grayDark text-2xl font-semibold">{title}</h2>
        <p className="text-foreground text-sm font-medium">{description}</p>
      </div>
    </div>
  );
}
