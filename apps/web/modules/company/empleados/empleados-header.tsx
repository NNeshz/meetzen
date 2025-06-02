import { Button } from "@meetzen/ui/src/components/button";
import { IconUserPlus } from "@tabler/icons-react";

export function EmpleadosHeader() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex flex-col">
        <h4 className="text-2xl font-bold">Gestión de Empleados</h4>
        <p className="text-muted-foreground">
          Administra los empleados de tu empresa
        </p>
      </div>
      <Button variant="default">
        <IconUserPlus />
        Agregar Empleado
      </Button>
    </div>
  );
}
