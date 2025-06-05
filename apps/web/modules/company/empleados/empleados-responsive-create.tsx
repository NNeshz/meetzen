"use client";

import { useState, useEffect } from "react";

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
import { IconUserPlus } from "@tabler/icons-react";

import { EmpleadosCreateForm } from "@/modules/company/empleados/empleados-create-form";


export function EmployeeResponsiveCreate() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  });

  const DesktopDialog = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <IconUserPlus />
          Agregar empleado
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear un nuevo empleado</DialogTitle>
          <DialogDescription>
            Rellena el formulario para crear un nuevo empleado.
          </DialogDescription>
        </DialogHeader>
        <EmpleadosCreateForm />
      </DialogContent>
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>
          <IconUserPlus />
          Agregar empleado
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Crear nuevo empleado</DrawerTitle>
          <DrawerDescription>
            Rellena el formulario para crear un nuevo empleado.
          </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <EmpleadosCreateForm />
          </div>
        <DrawerFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return isMobile ? <MobileDrawer /> : <DesktopDialog />;
}