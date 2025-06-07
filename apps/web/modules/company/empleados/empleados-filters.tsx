import { Input } from "@meetzen/ui/src/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@meetzen/ui/src/components/select";
import { Search } from "lucide-react";

export function EmpleadosFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Buscar por nombre o email..." className="pl-10" />
      </div>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filtrar por rol" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los roles</SelectItem>
          <SelectItem value="admin">Administrador</SelectItem>
          <SelectItem value="moderator">Moderador</SelectItem>
          <SelectItem value="user">Usuario</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filtrar por estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="active">Activo</SelectItem>
          <SelectItem value="inactive">Inactivo</SelectItem>
          <SelectItem value="pending">Pendiente</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
