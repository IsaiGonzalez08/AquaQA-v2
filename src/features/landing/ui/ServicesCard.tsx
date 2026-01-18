import Image from "next/image";

export function ServicesCard({ title, description, img }: { title: string; description: string; img: string }) {
  return (
    <div className="rounded-2xl transition-all duration-300 hover:scale-105 ">
      <Image width={330} height={280} src={img} alt="service-card" className="w-full object-cover" />
      <div className="bg-service-card text-center px-4 py-4">
        <h2 className="text-grayDark text-2xl font-semibold">{title}</h2>
        <p className="text-foreground text-sm font-medium">{description}</p>
      </div>
    </div>
  );
}
