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

import { MoreHorizontal, Users, Trash2, Edit, Users2 } from "lucide-react";
import { PasadasFilters } from "@/modules/company/pasadas/pasadas-filter";

interface Appointment {
  id: string;
  name: string;
  servicio: string;
  status: "completed" | "incompleted" | "cancelled";
  avatar?: string;
  day: string;
  time: string;
}

// Datos de ejemplo
const initialUsers: Appointment[] = [
  {
    id: "1",
    name: "Ana García",
    servicio: "Limpieza General",
    status: "completed",
    avatar: "",
    day: "2024-01-15",
    time: "10:00 AM",
  },
  {
    id: "2",
    name: "Carlos López",
    servicio: "Brackets",
    status: "incompleted",
    day: "2024-01-10",
    time: "12:00 PM",
  },
  {
    id: "3",
    name: "María Rodríguez",
    servicio: "Reposición de coronas",
    status: "cancelled",
    avatar: "",
    day: "2024-01-05",
    time: "10:00 AM",
  },
  {
    id: "4",
    name: "Juan Martínez",
    servicio: "Revisión de radiografías",
    status: "completed",
    day: "2024-01-20",
    time: "03:00 PM",
  },
  {
    id: "5",
    name: "Laura Sánchez",
    servicio: "Blanqueamiento",
    status: "completed",
    avatar: "",
    day: "2024-01-12",
    time: "07:00 PM",
  },
];

export function PasadasTable() {
  // Obtener color del badge según el estado
  const getStatusBadgeVariant = (status: Appointment["status"]) => {
    switch (status) {
      case "completed":
        return "default";
      case "incompleted":
        return "secondary";
      case "cancelled":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs" data-slot="card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
          <Users2 />
          Citas pasadas ({initialUsers.length})
        </CardTitle>
        <CardDescription>
          Busca y filtra citas pasadas por nombre, numero de telefono o estado
        </CardDescription>
        <PasadasFilters />
      </CardHeader>
      <CardContent>

        {/* Vista Desktop - Tabla */}
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Día</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.avatar}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.servicio}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(user.status)}>
                      {user.status === "completed"
                        ? "Completado"
                        : user.status === "incompleted"
                          ? "Incompleto"
                          : "Cancelado"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.day}</TableCell>
                  <TableCell>{user.time}</TableCell>
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
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Trash2 className="h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                ¿Estás seguro?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará
                                permanentemente el usuario {user.name}.
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
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Vista Mobile - Cards */}
        <div className="lg:hidden space-y-4">
            {initialUsers.map((user) => (
              <Card key={user.id} className="shadow-xs" data-slot="card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{user.name}</div>
                        <div className="text-sm text-muted-foreground truncate">{user.servicio}</div>
                        <div className="flex gap-2 mt-2">
                          <Badge variant={getStatusBadgeVariant(user.status)} className="text-xs">
                            {user.status === "completed"
                              ? "Completado"
                              : user.status === "incompleted"
                                ? "Incompleto"
                                : "Cancelado"}
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
                                Esta acción no se puede deshacer. Se eliminará permanentemente el usuario {user.name}.
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
                    <div>Registrado: {user.day}</div>
                    <div>Último Trabajo: {user.time}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {initialUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h4 className="mt-2 text-sm font-semibold">No se encontraron citas pasadas</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Intenta ajustar los filtros o crear una nueva cita.
              </p>
            </div>
          )}
      </CardContent>
    </Card>
  );
}