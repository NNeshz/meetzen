import { Button } from "@meetzen/ui/src/components/button";
import { Badge } from "@meetzen/ui/src/components/badge";
import { ScanHeart } from "lucide-react";
import Image from "next/image";

export function Demo() {
  return (
    <div className="p-4 w-full mx-auto flex items-center justify-center md:mt-24">
      <div className="w-full max-w-7xl bg-card rounded-xl p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          
          {/* Sección de contenido */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit">
                Demo
              </Badge>
              
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
                ¿Quieres más información?
              </h3>
              
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl tracking-tight leading-relaxed">
                En Meetzen creemos en el valor de la transparencia y la confianza.
                Por eso te invitamos a que te pongas en contacto con nosotros para
                que puedas conocer más sobre nuestro producto.
              </p>
              
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contacto
              </Button>
            </div>

            {/* Firma */}
            <div className="flex items-center gap-3 text-muted-foreground pt-8 border-t border-border/50">
              <ScanHeart className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">Con Amor, Meetzen.</span>
            </div>
          </div>

          {/* Sección de imagen */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/gradient-hero.avif"
                alt="Visualización del producto Meetzen con gradientes coloridos"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority
              />
              
              {/* Overlay de textura */}
              <div className="absolute inset-0 pointer-events-none">
                <div 
                  className="w-full h-full opacity-10 mix-blend-multiply"
                  style={{
                    backgroundImage: "url('/assets/noise.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "200px 200px"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}