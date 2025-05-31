import { Button } from "@meetzen/ui/src/components/button";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Meetzen</h1>
      <p className="text-muted-foreground">
        Plataforma para gestionar citas de manera automatica.
      </p>
      <Button>Comenzar</Button>
    </div>
  );
}