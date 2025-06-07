"use client";

import { useAgenda } from "@/modules/agenda/hooks/useAgenda";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@meetzen/ui/src/components/avatar";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader, AlertCircle, RefreshCw, Blocks } from "lucide-react";
import { Button } from "@meetzen/ui/src/components/button";

const formatAvailableDays = (days: string[]) => {
  const dayTranslations: { [key: string]: string } = {
    MONDAY: "Lun",
    TUESDAY: "Mar",
    WEDNESDAY: "Mié",
    THURSDAY: "Jue",
    FRIDAY: "Vie",
    SATURDAY: "Sáb",
    SUNDAY: "Dom",
  };

  const sortedDays = days.sort((a, b) => {
    const order = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];
    return order.indexOf(a) - order.indexOf(b);
  });

  if (sortedDays.length === 7) return "Todos los días";
  return sortedDays.map((day) => dayTranslations[day] || day).join(", ");
};

const formatTime = (hour: string, period: string) => {
  return `${hour}:00 ${period}`;
};

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

export function AgendaHeader() {
  const nameId = useParams().id;
  const { data, isLoading, isError, refetch } = useAgenda({
    companyNameId: nameId as string,
  });
  const company = data?.company;

  const handleRetry = () => {
    refetch();
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState onRetry={handleRetry} />;
  if (!company) return <EmptyState />;

  return (
    <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {/* Hero Background with theme-aware gradient */}
      <div className="absolute -inset-x-2 top-0 -z-10 h-64 sm:h-80 md:h-96 lg:-inset-x-4 overflow-hidden rounded-2xl">
        <img
          alt={`Imagen de ${company.name}`}
          src={company.image || "/placeholder.svg"}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30 border border-background"
        />
        {/* Main gradient overlay with background color */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background/80" />

        {/* Border outline */}
        <div className="absolute inset-0 rounded-t-2xl outline-1 -outline-offset-1 outline-border" />

        {/* Bottom gradient with background color */}
        <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl px-2 sm:px-0">
        <div className="relative">
          <div className="px-2 pt-36 pb-8 sm:px-4 sm:pt-48 sm:pb-12 lg:py-24">
            {/* Company Logo/Icon */}
            <div className="flex flex-col items-center gap-3 mb-6 sm:flex-row sm:justify-start sm:items-center">
              <Avatar className="size-24">
                <AvatarImage src={company.image || "/placeholder.svg"} />
                <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center sm:text-left">
                  {company.name}
                </h1>
                <p className="max-w-full sm:max-w-lg text-sm sm:text-base/7 text-pretty text-muted-foreground text-center sm:text-left">
                  {company.companyDescription}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    Horario de Atención
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(company.startTime, company.pmamStart)} -{" "}
                    {formatTime(company.endTime, company.pmamEnd)}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    Ubicación
                  </p>

                  <Link
                    href={company.mapsLocation}
                    target="_blank"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    Google Maps
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    Días de Atención
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatAvailableDays(company.availableDays)}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    Contacto
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {company.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
