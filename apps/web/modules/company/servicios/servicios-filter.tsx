import { Input } from "@meetzen/ui/src/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@meetzen/ui/src/components/select";
import { MoreHorizontal, Search } from "lucide-react";
import { CategoryResponsiveCreate } from "@/modules/company/servicios/category/category-responsive-create";

import { useCategories } from "@/modules/company/servicios/category/hooks/useCategory";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@meetzen/ui/src/components/dropdown-menu";
import { Button } from "@meetzen/ui/src/components/button";

export function ServiciosFilters() {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Buscar por nombre..." className="pl-10" />
      </div>
      <Select>
        <SelectTrigger className="w-full md:w-[180px]">
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
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filtrar por duracion" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todo el rango</SelectItem>
          <SelectItem value="short">Corto</SelectItem>
          <SelectItem value="medium">Mediano</SelectItem>
          <SelectItem value="long">Largo</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorias</SelectItem>
            {categories?.data?.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
                className="flex w-full items-center justify-between"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-4 w-4 p-0">
                      <MoreHorizontal className="h-2 w-2" />
                      <span className="sr-only">Toggle filters</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <p>{category.name}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CategoryResponsiveCreate />
      </div>
    </div>
  );
}
