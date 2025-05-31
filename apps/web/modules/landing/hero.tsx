import { Button } from "@meetzen/ui/src/components/button";
import Image from "next/image";

export function Hero() {
  return (
    <div className="h-[100dvh] p-4 max-w-8xl mx-auto flex items-center justify-center md:mt-38">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl">
          <p className="text-lg font-medium">meetzen.</p>
          <h1 className="text-4xl md:text-7xl font-bold">
            Controla tus citas con completa facilidad.
          </h1>
          <p className="text-muted-foreground max-w-3xl mt-4">
            Plataforma para gestionar citas de manera automática. Todo el
            tiempo, desde cualquier lugar.
          </p>
        </div>
        <Button className="mt-4">Comenzar</Button>
        <div className="w-full rounded-xl mt-4 overflow-hidden shadow-2xl">
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
  );
}
