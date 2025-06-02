import { Button } from "@meetzen/ui/src/components/button";
import { IconCalendarPlus } from "@tabler/icons-react";

export function CitasHeader() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex flex-col">
        <h4 className="text-2xl font-bold">Gestión de Citas</h4>
        <p className="text-muted-foreground">
          Administra las citas de tu empresa
        </p>
      </div>
      <Button variant="default">
        <IconCalendarPlus />
        Agregar Cita
      </Button>
    </div>
  );
}
