"use client";

import { useAgenda, useAgendaServices } from "@/modules/agenda/hooks/useAgenda";
import { useParams } from "next/navigation";
import {
  Loader,
  AlertCircle,
  RefreshCw,
  Blocks,
  DollarSign,
  Search,
  Clock,
} from "lucide-react";
import { Button } from "@meetzen/ui/src/components/button";
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
import { GlobalStepper } from "@/modules/agenda/config/stepper.config";
import { useAgendaStore } from "./state/useAgendaStore";

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

export function AgendaServices() {
  const nameId = useParams().id;
  const methods = GlobalStepper.useStepper();
  
  const { setSelectedServiceName, setSelectedServiceId } = useAgendaStore();
  const { data, isLoading, isError, refetch } = useAgendaServices({
    companyNameId: nameId as string,
  });
  
  const services = data?.company?.services;

  const handleRetry = () => {
    refetch();
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={handleRetry} />;
  if (!services) return <EmptyState />;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{methods.current.title}</h2>
        <p className="text-sm text-muted-foreground">
          {methods.current.description}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <Card
            key={service.id}
            className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs cursor-pointer"
            data-slot="card"
            onClick={() => {
              setSelectedServiceName(service.name);
              setSelectedServiceId(service.id);
              methods.next();
            }}
          >
            <CardContent className="space-y-2">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <div className="flex items-center gap-2 justify-between">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-primary" />
                    {service.price}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    {service.duration} min
                  </p>
                </div>
                <Badge>{service.serviceCategory?.name || "Sin categoría"}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
