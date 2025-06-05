import { Input } from "@meetzen/ui/src/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@meetzen/ui/src/components/select";
import { Search } from "lucide-react";

export function ServiciosFilters() {
    return (
      <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por nombre..."
          className="pl-10"
        />
      </div>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filtrar por precios" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todo el rango</SelectItem>
          <SelectItem value="low">Bajo</SelectItem>
          <SelectItem value="medium">Mediano</SelectItem>
          <SelectItem value="high">Alto</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filtrar por duracion" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todo el rango</SelectItem>
          <SelectItem value="short">Corto</SelectItem>
          <SelectItem value="medium">Mediano</SelectItem>
          <SelectItem value="long">Largo</SelectItem>
        </SelectContent>
      </Select>
    </div>
    )
}