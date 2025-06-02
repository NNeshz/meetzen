import { Input } from "@meetzen/ui/src/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@meetzen/ui/src/components/select";
import { Search } from "lucide-react";

export function PasadasFilters() {
    return (
      <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por nombre, numero de telefono o servicio..."
          className="pl-10"
        />
      </div>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filtrar por fecha" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todo el tiempo</SelectItem>
          <SelectItem value="months">Ultimos 3 meses</SelectItem>
          <SelectItem value="month">Ultimo mes</SelectItem>
          <SelectItem value="week">Ultima semana</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filtrar por estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="completed">Completado</SelectItem>
          <SelectItem value="cancelled">Cancelado</SelectItem>
          <SelectItem value="incomplete">Incompleto</SelectItem>
        </SelectContent>
      </Select>
    </div>
    )
}