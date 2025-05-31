import Image from "next/image";

export function Features() {
    return (
        <div className="p-4 max-w-7xl mx-auto flex items-center justify-center md:mt-24">
            <div className="flex flex-col items-center justify-center text-center max-w-4xl">
                <h2 className="text-3xl md:text-6xl font-bold">
                    Solo necesitas 15 min.
                </h2>
                <p className="text-muted-foreground max-w-3xl mt-4">
                    En unos minutos configuras completamente tu plataforma de citas.
                </p>
                <div className="w-full max-w-4xl rounded-xl mt-4 overflow-hidden shadow-2xl">
                    <Image 
                        src="/assets/gradient-hero.avif" 
                        alt="Hero" 
                        width={1920} 
                        height={1080}
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    )
}