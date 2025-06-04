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
  Clock,
  DollarSign,
  Calendar,
  Briefcase,
  Blocks,
} from "lucide-react";
import { ServiciosFilters } from "@/modules/company/servicios/servicios-filter";

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  createdAt: string;
  lastWorkedAt?: string;
}

// Datos de ejemplo
const initialServices: Service[] = [
  {
    id: "1",
    name: "Manicure",
    duration: 60,
    price: 100,
    createdAt: "2024-01-15",
    lastWorkedAt: "2024-01-20",
  },
  {
    id: "2",
    name: "Peluqueria",
    duration: 40,
    price: 100,
    createdAt: "2024-01-10",
    lastWorkedAt: "2024-01-19",
  },
  {
    id: "3",
    name: "Cejas",
    duration: 30,
    price: 50,
    createdAt: "2024-01-05",
    lastWorkedAt: "2024-01-18",
  },
  {
    id: "4",
    name: "Decoloración",
    duration: 120,
    price: 250,
    createdAt: "2024-01-20",
  },
  {
    id: "5",
    name: "Barba",
    duration: 30,
    price: 100,
    createdAt: "2024-01-12",
    lastWorkedAt: "2024-01-21",
  },
];

export function ServiciosTable() {
  return (
    <Card
      className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs"
      data-slot="card"
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
          <Users2 />
          Servicios ({initialServices.length})
        </CardTitle>
        <CardDescription>
          Busca y filtra servicios por nombre, duración o precio
        </CardDescription>
        <ServiciosFilters />
      </CardHeader>
      <CardContent>
        {/* Vista Desktop - Tabla */}
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead>Último Trabajo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialServices.map((service) => (
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
                      <span className="font-medium">${service.price}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{service.createdAt}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {service.lastWorkedAt ? (
                      <Badge variant="secondary" className="text-xs">
                        {service.lastWorkedAt}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Vista Mobile - Cards */}
        <div className="lg:hidden space-y-4">
          {initialServices.map((service) => (
            <Card
              key={service.id}
              className="shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              data-slot="card"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="h-5 w-5 text-primary" />
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
                          <span>${service.price}</span>
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
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
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
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Creado: {service.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Último trabajo:
                    </span>
                    {service.lastWorkedAt ? (
                      <Badge variant="secondary" className="text-xs h-5">
                        {service.lastWorkedAt}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs h-5">
                        Nunca
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {initialServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron servicios
            </h4>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Intenta ajustar los filtros o crear un nuevo servicio para
              comenzar.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
