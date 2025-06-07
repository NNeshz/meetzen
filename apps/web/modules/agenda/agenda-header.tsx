"use client";

import { useAgenda } from "@/modules/agenda/hooks/useAgenda";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@meetzen/ui/src/components/avatar";
import { Card, CardContent } from "@meetzen/ui/src/components/card";
import { MapPin, Clock, Calendar, Phone, InfoIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader, AlertCircle, RefreshCw, Blocks } from "lucide-react";
import { Button } from "@meetzen/ui/src/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@meetzen/ui/src/components/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@meetzen/ui/src/components/drawer";
import { useIsMobile } from "@meetzen/ui/src/hooks/use-mobile";
import { useState } from "react";

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
  <div className="flex flex-col items-center justify-center py-8">
    <Loader className="h-6 w-6 animate-spin text-primary mb-3" />
    <p className="text-sm text-muted-foreground">Cargando servicios...</p>
  </div>
);

const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-3">
      <AlertCircle className="h-6 w-6 text-destructive" />
    </div>
    <h4 className="text-base font-semibold text-foreground mb-2">
      Error al cargar servicios
    </h4>
    <p className="text-sm text-muted-foreground mb-4 text-center max-w-sm">
      Hubo un problema al obtener la información. Por favor, intenta nuevamente.
    </p>
    {onRetry && (
      <Button variant="outline" size="sm" onClick={onRetry} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Reintentar
      </Button>
    )}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-8">
    <div className="w-12 h-12 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-3">
      <Blocks className="h-6 w-6 text-muted-foreground" />
    </div>
    <h4 className="text-base font-semibold text-foreground mb-2">
      No se encontraron servicios
    </h4>
    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
      Intenta ajustar los filtros o crear un nuevo servicio para comenzar.
    </p>
  </div>
);

export function AgendaHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
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
    <Card
      className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs flex flex-col items-center gap-2 justify-center p-4"
      data-slot="card"
    >
      <div className="flex flex-col items-center space-y-2 gap-2">
        <Avatar className="size-12 md:size-16 flex-shrink-0">
          <AvatarImage src={company.image || "/placeholder.svg"} />
          <AvatarFallback className="text-lg font-bold">
            {company.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold text-foreground truncate">
            {company.name}
          </h1>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {company.companyDescription}
          </p>
        </div>
      </div>

      {!isMobile ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="sm" className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              Ver Información</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Información</DialogTitle>
              <DialogDescription>
                Esta la información que tenemos disponible para ti.
              </DialogDescription>
            </DialogHeader>
            <CompanyInfo company={company} />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button variant="default" size="sm" className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              Ver Información</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Información</DrawerTitle>
              <DrawerDescription>
                Esta la información que tenemos disponible para ti.
              </DrawerDescription>
            </DrawerHeader>
            <CompanyInfo company={company} />
          </DrawerContent>
        </Drawer>
      )}
    </Card>
  );
}

const CompanyInfo = ({
  company,
}: {
  company: {
    availableDays: string[];
    mapsLocation: string;
    phoneNumber: string;
    startTime: string;
    pmamStart: string;
    endTime: string;
    pmamEnd: string;
  };
}) => {
  return (
    <div className="flex flex-col gap-2 px-4 md:px-0 mb-8 md:mb-0">
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Horarios</p>
        <p className="text-xs text-muted-foreground">
          {formatAvailableDays(company.availableDays)}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Ubicación</p>
        <Link
          href={company.mapsLocation}
          target="_blank"
          className="flex gap-1 items-center text-xs text-muted-foreground"
        >
          <MapPin className="h-3 w-3" />
          Ver en mapa
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Teléfono</p>
        <p className="text-xs text-muted-foreground">{company.phoneNumber}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Horario</p>
        <p className="text-xs text-muted-foreground">
          {formatTime(company.startTime, company.pmamStart)}-
          {formatTime(company.endTime, company.pmamEnd)}
        </p>
      </div>
    </div>
  );
};
