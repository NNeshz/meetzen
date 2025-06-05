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
import { Blocks, CirclePlus } from "lucide-react";

import { ServicioCreateForm } from "@/modules/company/servicios/servicio-create-form"


export function ServicioResponsiveCreate() {
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
          <Blocks />
          Crear servicio
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear un nuevo servicio</DialogTitle>
          <DialogDescription>
            Rellena el formulario para crear un nuevo servicio.
          </DialogDescription>
        </DialogHeader>
        <ServicioCreateForm />
      </DialogContent>
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Blocks />
          Crear servicio
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Crear nuevo servicio</DrawerTitle>
          <DrawerDescription>
            Rellena el formulario para crear un nuevo servicio.
          </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <ServicioCreateForm />
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