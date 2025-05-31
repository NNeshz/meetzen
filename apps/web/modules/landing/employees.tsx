import Image from "next/image";

export function Employees() {
  return (
    <div className="p-4 max-w-8xl mx-auto flex items-center justify-center md:mt-24">
      <div className="flex flex-col items-center justify-center text-center max-w-7xl">
        <h2 className="text-3xl md:text-6xl font-bold tracking-tighter">
          Gestiona tus empleados
        </h2>
        <p className="text-muted-foreground max-w-3xl mt-4 tracking-tighter">
          Gestiona tus empleados de manera eficiente y cómoda.
        </p>
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
