export function AquaQAButton({ text }: { text: string }) {
    return (
        <button className="bg-background text-primary border-2 border-primary rounded-4xl px-6 py-1">
            {text}
        </button>
    )
}