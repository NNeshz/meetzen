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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@meetzen/ui/src/components/avatar";
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
  Users,
  Trash2,
  Edit,
  Users2,
  AlertCircle,
  RefreshCw,
  Loader,
} from "lucide-react";
import { EmpleadosFilters } from "@/modules/company/empleados/empleados-filters";
import { useEmpleados } from "@/modules/company/empleados/hooks/useEmpleados";
import { formatDate } from "@/utils/format-date";

interface Employee {
  id: string;
  name: string;
  phoneNumber: string;
  status: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  availability: Availability[];
}

interface Availability {
  id: string;
  date: Date;
  available: boolean;
  startTime: string | null;
  endTime: string | null;
}

const getStatusBadgeVariant = (status: Employee["status"]) => {
  switch (status) {
    case "ACTIVE":
      return "default";
    case "INACTIVE":
      return "outline";
    default:
      return "secondary";
  }
};

// Componente de Loading
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
    <p className="text-sm text-muted-foreground">Cargando empleados...</p>
  </div>
);

// Componente de Error
const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-4">
      <AlertCircle className="h-8 w-8 text-destructive" />
    </div>
    <h4 className="text-lg font-semibold text-foreground mb-2">
      Error al cargar empleados
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
      <Users className="h-8 w-8 text-muted-foreground" />
    </div>
    <h4 className="text-lg font-semibold text-foreground mb-2">
      No se encontraron empleados
    </h4>
    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
      Intenta ajustar los filtros o crear un nuevo empleado para comenzar.
    </p>
  </div>
);

const EmployeeTableRow = ({ employee }: { employee: Employee }) => {
  return (
    <TableRow key={employee.id}>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{employee.name}</div>
            <div className="text-sm text-muted-foreground">
              {employee.phoneNumber}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(employee.status)}>
          {employee.status === "ACTIVE"
            ? "Activo"
            : employee.status === "INACTIVE"
              ? "Inactivo"
              : "Pendiente"}
        </Badge>
      </TableCell>
      <TableCell>{employee.address}</TableCell>
      <TableCell>{formatDate(employee.createdAt)}</TableCell>
      <TableCell>{formatDate(employee.updatedAt) || "Nunca"}</TableCell>
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
                    Esta acción no se puede deshacer. Se eliminará
                    permanentemente el usuario {employee.name}.
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

const EmployeeCard = ({ employee }: { employee: Employee }) => (
  <Card key={employee.id} className="shadow-xs" data-slot="card">
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{employee.name}</div>
            <div className="text-sm text-muted-foreground truncate">
              {employee.phoneNumber}
            </div>
            <div className="flex gap-2 mt-2">
              <Badge
                variant={getStatusBadgeVariant(employee.status)}
                className="text-xs"
              >
                {employee.status === "ACTIVE"
                  ? "Activo"
                  : employee.status === "INACTIVE"
                    ? "Inactivo"
                    : "Pendiente"}
              </Badge>
            </div>
          </div>
        </div>
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
                    Esta acción no se puede deshacer. Se eliminará
                    permanentemente el usuario {employee.name}.
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
      <div className="mt-3 text-xs text-muted-foreground">
        <div>Registrado: {formatDate(employee.updatedAt)}</div>
      </div>
    </CardContent>
  </Card>
);

export function EmpleadosTable() {
  const { data, isLoading, isError, refetch } = useEmpleados();
  const empleados: Employee[] = data?.data || [];

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
          Empleados ({empleados.length})
        </CardTitle>
        <CardDescription>
          Busca y filtra empleados por nombre, numero de telefono o estado
        </CardDescription>
        <EmpleadosFilters />
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
            {empleados.length === 0 && <EmptyState />}

            {/* Vista Desktop - Tabla */}
            {empleados.length > 0 && (
              <div className="hidden lg:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Empleado</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Dirección</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                      <TableHead>Ultimo trabajo</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {empleados.map((user) => (
                      <EmployeeTableRow key={user.id} employee={user} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Vista Mobile - Cards */}
            {empleados.length > 0 && (
              <div className="lg:hidden space-y-4">
                {empleados.map((user) => (
                  <EmployeeCard key={user.id} employee={user} />
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
