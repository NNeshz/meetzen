"use client";

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
import { CirclePlus } from "lucide-react";

import { CategoryCreateForm } from "@/modules/company/servicios/category/category-create-form"
import { useIsMobile } from "@meetzen/ui/src/hooks/use-mobile";


export function CategoryResponsiveCreate() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const DesktopDialog = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear una nueva categoria</DialogTitle>
          <DialogDescription>
            Rellena el formulario para crear una nueva categoria.
          </DialogDescription>
        </DialogHeader>
        <CategoryCreateForm />
      </DialogContent>
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="icon">
          <CirclePlus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Crear nueva categoria</DrawerTitle>
          <DrawerDescription>
            Rellena el formulario para crear una nueva categoria.
          </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <CategoryCreateForm />
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