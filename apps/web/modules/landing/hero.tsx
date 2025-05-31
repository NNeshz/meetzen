import { Button } from "@meetzen/ui/src/components/button";
import Image from "next/image";

export function Hero() {
  return (
    <div className="h-[100dvh] p-4 max-w-8xl mx-auto flex items-center justify-center md:mt-38">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl text-center">
          <p className="text-lg font-medium tracking-tighter">meetzen.</p>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tighter">
            Controla tus citas con completa facilidad.
          </h1>
          <p className="text-muted-foreground mt-4 tracking-tighter">
            Plataforma para gestionar citas de manera automática. Todo el
            tiempo, desde cualquier lugar. 15 min te ahorrarán horas de trabajo.
          </p>
        </div>
        <Button className="mt-4" size="lg">
          Comenzar
        </Button>
        <div className="relative w-full rounded-xl mt-4 overflow-hidden shadow-2xl">
          <Image
            src="/assets/gradient-hero.avif"
            alt="Hero"
            width={1920}
            height={1080}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 pointer-events-none bg-[url('/assets/noise.png')] bg-repeat bg-[length:500px_500px] opacity-10 mix-blend-multiply" />
        </div>
      </div>
    </div>
  );
}
