"use client";

import { AgendaHeader } from "@/modules/agenda/agenda-header";
import { useAgenda } from "@/modules/agenda/hooks/useAgenda";
import { useParams } from "next/navigation";
import {
  Blocks,
  Loader,
  AlertCircle,
  RefreshCw,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Camera,
  Play,
} from "lucide-react";
import { Button } from "@meetzen/ui/src/components/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@meetzen/ui/src/components/avatar";

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

  if (days.length === 7) return "Todos los días";
  return days.map((day) => dayTranslations[day] || day).join(", ");
};

const formatTime = (hour: string, period: string) => {
  return `${hour}:00 ${period}`;
};

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
    <div className="relative mx-auto max-w-7xl mt-24 sm:mt-28 px-2 px-4 sm:px-6 lg:px-8 mx-4">
      {/* Hero Background */}
      <div className="absolute -inset-x-2 top-0 -z-10 h-64 sm:h-80 md:h-96 lg:-inset-x-4 lg:h-128 overflow-hidden rounded-2xl">
        <img
          alt={`Imagen de ${company.name}`}
          src={company.image}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        <div className="absolute inset-0 rounded-t-2xl outline-1 -outline-offset-1 outline-gray-950/10 dark:outline-white/10" />

        <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 md:h-44 lg:h-52 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl px-2 sm:px-0">
        <div className="relative">
          <div className="px-2 pt-36 pb-8 sm:px-4 sm:pt-48 sm:pb-12 lg:py-24">
            {/* Company Logo/Icon */}
            <div className="flex flex-col items-center gap-3 mb-6 sm:flex-row sm:justify-start sm:items-center">
              <Avatar>
                <AvatarImage
                  src={company.image}
                  className="size-16 sm:size-12 object-cover"
                />
                <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center sm:text-left">
                {company.name}
              </h1>
            </div>

            {/* Company Description */}
            <p className="mt-5 sm:mt-7 max-w-full sm:max-w-lg text-sm sm:text-base/7 text-pretty text-gray-200 text-center sm:text-left">
              {company.companyDescription}
            </p>

            {/* Company Info */}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap items-center sm:items-center gap-x-4 gap-y-3 text-xs sm:text-sm/7 font-semibold text-white justify-center sm:justify-start">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 stroke-white/60" />
                {formatTime(company.startTime, company.pmamStart)} -{" "}
                {formatTime(company.endTime, company.pmamEnd)}
              </div>
              <span className="hidden text-white/25 sm:inline">&middot;</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 stroke-white/60" />
                {formatAvailableDays(company.availableDays)}
              </div>
              <span className="hidden text-white/25 sm:inline">&middot;</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 stroke-white/60" />
                {company.mapsLocation}
              </div>
              {company.phoneNumber && (
                <>
                  <span className="hidden text-white/25 sm:inline">
                    &middot;
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 stroke-white/60" />
                    {company.phoneNumber}
                  </div>
                </>
              )}
            </div>

            {/* Call to Action */}
            <div className="mt-8 sm:mt-10 flex justify-center sm:justify-start">
              <Button className="inline-flex items-center gap-x-2 rounded-full bg-white text-gray-900 hover:bg-gray-100 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold transition-colors w-full sm:w-auto">
                <Play className="h-4 w-4 fill-current" />
                Agendar Cita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
