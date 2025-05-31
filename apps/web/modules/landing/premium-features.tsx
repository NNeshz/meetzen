
import { ShineBorder } from "@meetzen/ui/src/components/magicui/shine-border";

const features = [
    {
        title: "Gestión de citas",
        description: "Gestiona tus citas de manera eficiente y cómoda con nuestro sistema inteligente.",
        gradient: "bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500"
    },
    {
        title: "Se siente familiar",
        description: "Usamos WhatsApp para que tus clientes se sientan cómodos y conectados.",
        gradient: "bg-gradient-to-br from-blue-500 via-cyan-500 to-green-500"
    },
    {
        title: "Calendarios de Google",
        description: "Integración perfecta con Google Calendar para una gestión completa.",
        gradient: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500"
    }
];

export function PremiumFeatures() {
    return (
        <div className="p-4 max-w-8xl mx-auto flex items-center justify-center md:mt-24 bg-background min-h-screen">
            <div className="flex flex-col items-left justify-center text-left max-w-7xl">
                <h2 className="text-3xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                    Construido y pensado para ti.
                </h2>
                <p className="text-muted-foreground max-w-3xl mt-4 text-lg tracking-tighter">
                    Conozca las principales características de Meetzen. Para que pueda brindarte la mejor experiencia.
                </p>
                
                <div className="w-full max-w-7xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div 
                        key={index} 
                        className="relative aspect-[2/3] w-full overflow-hidden bg-card rounded-xl p-6 flex flex-col items-start justify-start text-left min-h-[400px] hover:scale-105 transition duration-300"
                        >
                            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                            
                            <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tighter">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-tight">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}