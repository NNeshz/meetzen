import { EmpleadosHeader } from "@/modules/company/empleados/empleados-header";
import { EmpleadosTable } from "@/modules/company/empleados/empleados-table";

export default function EmpleadosPage() {
  return (
    <div className="space-y-4">
      <EmpleadosHeader />
      <EmpleadosTable />
    </div>
  );
}
