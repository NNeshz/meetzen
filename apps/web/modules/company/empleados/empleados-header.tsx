import { EmployeeResponsiveCreate } from "@/modules/company/empleados/empleados-responsive-create";

export function EmpleadosHeader() {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex flex-col">
        <h4 className="text-2xl font-bold">Gestión de Empleados</h4>
        <p className="text-muted-foreground">
          Administra los empleados de tu empresa
        </p>
      </div>
      <EmployeeResponsiveCreate />
    </div>
  );
}
