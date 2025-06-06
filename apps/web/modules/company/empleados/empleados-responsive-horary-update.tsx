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
import { Clock } from "lucide-react";
import { Employee } from "@/modules/company/empleados/empleados-table";
import { EmpleadosUpdateHoraryForm } from "@/modules/company/empleados/empleados-update-horary-form";

export function EmpleadosResponsiveHoraryUpdate({
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
          <Clock className="h-4 w-4 text-muted-foreground" />
          Actualizar horario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] max-h-[calc(100vh-10rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <DialogHeader>
          <DialogTitle>Actualizar horario</DialogTitle>
          <DialogDescription>
            Rellena el formulario para actualizar el horario del empleado.
          </DialogDescription>
        </DialogHeader>
        <EmpleadosUpdateHoraryForm employee={employee} />
      </DialogContent>  
    </Dialog>
  );

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="flex items-center justify-start gap-2 w-full" size="sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Actualizar horario
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Actualizar horario</DrawerTitle>
          <DrawerDescription>
            Rellena el formulario para actualizar el horario del empleado.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto">
          <EmpleadosUpdateHoraryForm employee={employee} />
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
