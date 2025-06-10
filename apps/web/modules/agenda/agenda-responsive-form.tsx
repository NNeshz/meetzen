"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@meetzen/ui/src/components/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@meetzen/ui/src/components/drawer"
import { Button } from "@meetzen/ui/src/components/button"
import { AgendaCreateForm } from "./agenda-create-form"
import { useIsMobile } from "@meetzen/ui/src/hooks/use-mobile"

export function AgendaResponsiveForm({
  children,
  serviceId,
  companyNameId,
}: { children: React.ReactNode; serviceId: string; companyNameId: string }) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  const DesktopDialog = () => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-2">
          <DialogTitle>Crear una cita</DialogTitle>
          <DialogDescription>Rellena el formulario para crear una cita.</DialogDescription>
        </DialogHeader>
        <AgendaCreateForm serviceId={serviceId} companyNameId={companyNameId} />
      </DialogContent>
    </Dialog>
  )

  const MobileDrawer = () => (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="pb-2">
          <DrawerTitle>Crear una cita</DrawerTitle>
          <DrawerDescription>Rellena el formulario para crear una cita.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-8">
          <AgendaCreateForm serviceId={serviceId} companyNameId={companyNameId} />
        </div>
        <DrawerFooter className="pt-0">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )

  return isMobile ? <MobileDrawer /> : <DesktopDialog />
}
