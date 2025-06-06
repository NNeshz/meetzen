"use client";

import { useIsMobile } from "@meetzen/ui/src/hooks/use-mobile";
import { useState } from "react";

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
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@meetzen/ui/src/components/drawer";
import { Button } from "@meetzen/ui/src/components/button";
import { Edit } from "lucide-react";
import { Employee } from "@/modules/company/empleados/empleados-table";
import { EmpleadosUpdateForm } from "@/modules/company/empleados/empleados-update-form";

export function EmpleadosResponsiveUpdate({
  employee,
}: {
  employee: Employee;
}) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const DesktopDialog = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center justify-start gap-2 w-full"  size="sm">
          <Edit className="h-4 w-4 text-muted-foreground" />
          Actualizar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar</DialogTitle>
          <DialogDescription>
            Rellena el formulario para actualizar el empleado.
          </DialogDescription>
        </DialogHeader>
        <EmpleadosUpdateForm employee={employee} />
      </DialogContent>  
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="flex items-center justify-start gap-2 w-full" size="sm">
          <Edit className="h-4 w-4 text-muted-foreground" />
          Actualizar
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Actualizar</DrawerTitle>
          <DrawerDescription>
            Rellena el formulario para actualizar el empleado.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto">
          <EmpleadosUpdateForm employee={employee} />
        </div>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return isMobile ? <MobileDrawer /> : <DesktopDialog />;
}
