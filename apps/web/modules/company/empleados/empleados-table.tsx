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
import { EmpleadosFilters } from "@/modules/company/empleados/empleados-filters";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  avatar?: string;
  createdAt: string;
  lastWorkedAt?: string;
}

// Datos de ejemplo
const initialUsers: User[] = [
  {
    id: "1",
    name: "Ana García",
    email: "ana.garcia@example.com",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-15",
    lastWorkedAt: "2024-01-20",
  },
  {
    id: "2",
    name: "Carlos López",
    email: "carlos.lopez@example.com",
    status: "active",
    createdAt: "2024-01-10",
    lastWorkedAt: "2024-01-19",
  },
  {
    id: "3",
    name: "María Rodríguez",
    email: "maria.rodriguez@example.com",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-05",
    lastWorkedAt: "2024-01-18",
  },
  {
    id: "4",
    name: "Juan Martínez",
    email: "juan.martinez@example.com",
    status: "pending",
    createdAt: "2024-01-20",
  },
  {
    id: "5",
    name: "Laura Sánchez",
    email: "laura.sanchez@example.com",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-12",
    lastWorkedAt: "2024-01-21",
  },
];

export function EmpleadosTable() {
  // Obtener color del badge según el estado
  const getStatusBadgeVariant = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "pending":
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
          Empleados ({initialUsers.length})
        </CardTitle>
        <CardDescription>
          Busca y filtra empleados por nombre, numero de telefono o estado
        </CardDescription>
        <EmpleadosFilters />
      </CardHeader>
      <CardContent>

        {/* Vista Desktop - Tabla */}
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead>Último Trabajo</TableHead>
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
                          src={user.avatar || "/placeholder.svg"}
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
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(user.status)}>
                      {user.status === "active"
                        ? "Activo"
                        : user.status === "inactive"
                          ? "Inactivo"
                          : "Pendiente"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>{user.lastWorkedAt || "Nunca"}</TableCell>
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
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
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
                        <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                        <div className="flex gap-2 mt-2">
                          <Badge variant={getStatusBadgeVariant(user.status)} className="text-xs">
                            {user.status === "active"
                              ? "Activo"
                              : user.status === "inactive"
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
                    <div>Registrado: {user.createdAt}</div>
                    <div>Último Trabajo: {user.lastWorkedAt || "Nunca"}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {initialUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h4 className="mt-2 text-sm font-semibold">No se encontraron empleados</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Intenta ajustar los filtros o crear un nuevo empleado.
              </p>
            </div>
          )}
      </CardContent>
    </Card>
  );
}