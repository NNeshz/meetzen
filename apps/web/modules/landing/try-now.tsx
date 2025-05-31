import { Button } from "@meetzen/ui/components/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export function TryNow() {
    return (
        <div className="min-h-[100dvh] p-4 w-full mx-auto flex items-center justify-center">
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    
                    {/* Sección de contenido */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                        <div className="space-y-6">
                            {/* Badge decorativo */}
                            <div className="flex items-center justify-center lg:justify-start gap-2 text-primary">
                                <Sparkles className="w-5 h-5" />
                                <span className="text-sm font-medium uppercase tracking-wider">
                                    Prueba gratuita
                                </span>
                            </div>
                            
                            {/* Título principal */}
                            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-none">
                                Prueba Meetzen
                                <span className="block text-primary">Gratis.</span>
                            </h2>
                            
                            {/* Descripción */}
                            <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed">
                                Descubre el poder de nuestra plataforma sin compromisos. 
                                Comienza tu experiencia hoy mismo.
                            </p>
                        </div>
                        
                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <Button 
                                size="lg" 
                                className="text-lg px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                Intentar ahora
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                            
                            <Button 
                                variant="outline" 
                                size="lg"
                                className="text-lg px-8 py-6 rounded-xl font-semibold"
                            >
                                Ver demo
                            </Button>
                        </div>
                        
                        {/* Información adicional */}
                        <div className="flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground pt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Sin tarjeta de crédito
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                Configuración en 2 minutos
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                Soporte 24/7
                            </div>
                        </div>
                    </div>

                    {/* Sección de imagen */}
                    <div className="order-first lg:order-last flex items-center justify-center">
                        <div className="relative aspect-square w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/assets/gradient-hero.avif"
                                alt="Interfaz de Meetzen mostrando funcionalidades principales con gradientes modernos"
                                fill
                                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 45vw"
                                className="object-cover"
                                priority
                            />
                            
                            {/* Overlay con textura */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div 
                                    className="w-full h-full opacity-5 mix-blend-multiply"
                                    style={{
                                        backgroundImage: "url('/assets/noise.png')",
                                        backgroundRepeat: "repeat",
                                        backgroundSize: "150px 150px"
                                    }}
                                />
                            </div>
                            
                            {/* Elemento decorativo flotante */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}