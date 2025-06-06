"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@meetzen/ui/src/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@meetzen/ui/src/components/table";
import { Badge } from "@meetzen/ui/src/components/badge";
import { Button } from "@meetzen/ui/src/components/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@meetzen/ui/src/components/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@meetzen/ui/src/components/dropdown-menu";

import {
  MoreHorizontal,
  Trash2,
  Edit,
  Users2,
  Clock,
  DollarSign,
  Calendar,
  Blocks,
  Loader,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { ServiciosFilters } from "@/modules/company/servicios/servicios-filter";
import { formatDate } from "@/utils/format-date";
import { useServicios } from "@/modules/company/servicios/hooks/useServicios";
import { cn } from "@meetzen/ui/src/lib/utils";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  createdAt: Date;
  lastUse: Date | null;
  serviceCategory: {
    id: string;
    name: string;
  } | null;
}

const getBadgeColorAndLabel = (category: string | null) => {
  if (!category) {
    return {
      variant: "secondary" as const,
      label: "Sin categoría",
    };
  }

  return {
    variant: "default" as const,
    label: category,
  };
}

// Componente de Loading
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
    <p className="text-sm text-muted-foreground">Cargando servicios...</p>
  </div>
);

// Componente de Error
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

// Componente de Estado Vacío
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

// Componente de Fila de Servicio (Desktop)
const ServiceTableRow = ({ service }: { service: Service }) => {
  const categoryBadge = getBadgeColorAndLabel(service.serviceCategory?.name || null);
  
  return (
    <TableRow key={service.id}>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Blocks className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium">{service.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{service.duration} min</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="font-medium">{service.price}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Badge variant={categoryBadge.variant} className="text-xs">
            {categoryBadge.label}
          </Badge>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <span>{formatDate(service.createdAt)}</span>
        </div>
      </TableCell>
      <TableCell>
        {service.lastUse ? (
          <Badge variant="secondary" className="text-xs">
            {formatDate(service.lastUse)}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs">
            Nunca
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará permanentemente
                    el servicio {service.name}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

// Componente de Card de Servicio (Mobile)
const ServiceCard = ({ service }: { service: Service }) => {
  const categoryBadge = getBadgeColorAndLabel(service.serviceCategory?.name || null);
  
  return (
    <Card
      key={service.id}
      className="shadow-sm border border-border/50 hover:shadow-md transition-shadow"
      data-slot="card"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Blocks className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base text-foreground truncate">
                {service.name}
              </h3>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                  <DollarSign className="h-3 w-3" />
                  <span>{service.price}</span>
                </div>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Se eliminará
                      permanentemente el servicio {service.name}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Eliminar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Categoría:</span>
            <Badge variant={categoryBadge.variant} className="text-xs h-5">
              {categoryBadge.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Último trabajo:</span>
            {service.lastUse ? (
              <Badge variant="secondary" className="text-xs h-5">
                {formatDate(service.lastUse)}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs h-5">
                Nunca
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
          <Calendar className="h-3 w-3" />
          <span>Creado: {formatDate(service.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export function ServiciosTable() {
  const { data, isLoading, isError, refetch } = useServicios();
  const services: Service[] = data?.data || [];

  console.log(data);

  const handleRetry = () => {
    if (refetch) {
      refetch();
    }
  };

  return (
    <Card
      className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs"
      data-slot="card"
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
          <Users2 />
          Servicios ({isLoading ? "..." : services.length})
        </CardTitle>
        <CardDescription>
          Busca y filtra servicios por nombre, duración o precio
        </CardDescription>
        <ServiciosFilters />
      </CardHeader>
      <CardContent>
        {/* Estado de Carga */}
        {isLoading && <LoadingState />}

        {/* Estado de Error */}
        {isError && !isLoading && <ErrorState onRetry={handleRetry} />}

        {/* Estado de Datos Cargados */}
        {!isLoading && !isError && (
          <>
            {/* Estado Vacío */}
            {services.length === 0 && <EmptyState />}

            {/* Vista Desktop - Tabla */}
            {services.length > 0 && (
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Duración</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                      <TableHead>Último Trabajo</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <ServiceTableRow key={service.id} service={service} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Vista Mobile - Cards */}
            {services.length > 0 && (
              <div className="lg:hidden space-y-4">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}