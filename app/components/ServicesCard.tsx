export function ServicesCard({title, description, img}: {title: string, description: string, img: string}) {
    
    return (
        <div className="rounded-2xl max-w-80">
            <img src={img} alt="service-card" className="w-full object-cover" />
            <div className="bg-white text-center px-6 py-4">
                <h2 className="text-grayDark font-semibold text-2xl">{title}</h2>
                <p className="text-foreground font-medium text-sm">{description}</p>
            </div>
        </div>
    );
}