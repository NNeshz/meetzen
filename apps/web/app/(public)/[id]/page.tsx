"use client";

import { useAgenda } from "@/modules/agenda/hooks/useAgenda";
import { useParams } from "next/navigation";
import { Blocks, Loader, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@meetzen/ui/src/components/button";
import { AgendaHeader } from "@/modules/agenda/agenda-header";

import { Card, CardContent } from "@meetzen/ui/src/components/card";
import { Badge } from "@meetzen/ui/src/components/badge";
import { Input } from "@meetzen/ui/src/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@meetzen/ui/src/components/select";
import { Clock, Calendar, Search } from "lucide-react";

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
    <p className="text-sm text-muted-foreground">Cargando servicios...</p>
  </div>
);

const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-4">
      <AlertCircle className="h-8 w-8 text-destructive" />
    </div>
    <h4 className="text-lg font-semibold text-foreground mb-2">
      Error al cargar servicios
    </h4>
    <p className="text-sm text-muted-foreground mb-4 text-center max-w-sm">
      Hubo un problema al obtener la información. Por favor, intenta nuevamente.
    </p>
    {onRetry && (
      <Button variant="outline" onClick={onRetry} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Reintentar
      </Button>
    )}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12">
    <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
      <Blocks className="h-8 w-8 text-muted-foreground" />
    </div>
    <h4 className="text-lg font-semibold text-foreground mb-2">
      No se encontraron servicios
    </h4>
    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
      Intenta ajustar los filtros o crear un nuevo servicio para comenzar.
    </p>
  </div>
);

export default function Page() {
  const nameId = useParams().id;
  const { data, isLoading, isError } = useAgenda({
    companyNameId: nameId as string,
  });
  const company = data?.company;

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!company) return <EmptyState />;

  return (
    <div className="px-8 mt-24 sm:mt-28">
      <AgendaHeader company={company} />
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto mt-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nombre del servicio..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            <SelectItem value="1">Categoría 1</SelectItem>
            <SelectItem value="2">Categoría 2</SelectItem>
            <SelectItem value="3">Categoría 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {company.services.length > 0 ? (
        <div className="mt-8 flex flex-col gap-6 max-w-4xl mx-auto">
          {company.services.map((service) => (
            <Card
              key={service.id}
              className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs"
              data-slot="card"
            >
              <CardContent className="p-0">
                {/* Vista Desktop */}
                <div className="hidden lg:flex lg:items-center">
                  <div className="flex-1 p-8">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-2xl font-bold text-white">
                            {service.name}
                          </h3>
                          <Badge>
                            {service.serviceCategory?.name || "Sin categoría"}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          Duracion:
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">
                            {service.duration} min
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-8 border-l border-white ">
                    <div className="text-right">
                      <p className="text-3xl font-bold text-green-500">
                        $ {service.price}
                      </p>
                    </div>
                    <Button className="px-8 py-3 text-base font-medium bg-white hover:bg-gray-100 text-black">
                      <Calendar className="w-5 h-5 mr-2" />
                      Agendar
                    </Button>
                  </div>
                </div>

                {/* Vista Mobile */}
                <div className="lg:hidden">
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white leading-tight flex-1">
                        {service.name}
                      </h3>
                      <Badge>
                        {service.serviceCategory?.name || "Sin categoría"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      Duracion:
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">
                        {service.duration} min
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex items-center justify-between border-t">
                    <div>
                      <p className="text-2xl font-bold text-green-500">
                        $ {service.price}
                      </p>
                    </div>
                    <Button className="bg-white hover:bg-gray-100 text-black px-6 py-2.5 font-medium">
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <Blocks className="h-8 w-8 text-muted-foreground" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">
            No se encontraron servicios
          </h4>
        </div>
      )}
    </div>
  );
}
