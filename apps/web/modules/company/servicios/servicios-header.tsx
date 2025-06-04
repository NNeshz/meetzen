import { ServicioResponsiveCreate } from "@/modules/company/servicios/servicio-responsive-create";

export function ServiciosHeader() {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center md:justify-between gap-2 items-center">
      <div className="flex flex-col items-center md:items-start">
        <h4 className="text-2xl font-bold">Gestión de Servicios</h4>
        <p className="text-muted-foreground">
          Administra los servicios de tu empresa
        </p>
      </div>
      <ServicioResponsiveCreate />
    </div>
  );
}
