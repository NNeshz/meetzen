"use client";

import { useAgenda } from "@/modules/agenda/hooks/useAgenda";
import { useParams } from "next/navigation";
import {
  Blocks,
  Loader,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@meetzen/ui/src/components/button";
import { AgendaHeader } from "@/modules/agenda/agenda-header";

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
    </div>
  );
}
