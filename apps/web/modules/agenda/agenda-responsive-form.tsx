"use client"

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
import { useIsMobile } from "@meetzen/ui/src/hooks/use-mobile";
import { useState } from "react";
import { AgendaCreateForm } from "./agenda-create-form";

export function AgendaResponsiveForm({ children, serviceId, companyNameId }: { children: React.ReactNode, serviceId: string, companyNameId: string }) {
    const isMobile = useIsMobile()
    const [isOpen, setIsOpen] = useState(false);

    const DesktopDialog = () => (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="cursor-pointer">
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear una cita</DialogTitle>
                    <DialogDescription>
                        Rellena el formulario para crear una cita.
                    </DialogDescription>
                </DialogHeader>
                <AgendaCreateForm serviceId={serviceId} companyNameId={companyNameId} />
            </DialogContent>
        </Dialog>
    );

    const MobileDrawer = () => (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild className="cursor-pointer">
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Crear una cita</DrawerTitle>
                    <DrawerDescription>
                        Rellena el formulario para crear una cita.
                    </DrawerDescription>
                </DrawerHeader>
                <AgendaCreateForm serviceId={serviceId} companyNameId={companyNameId} />
            </DrawerContent>
        </Drawer>
    );
    
    return (
        isMobile ? <MobileDrawer /> : <DesktopDialog />
    )
}