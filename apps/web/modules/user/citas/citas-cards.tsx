import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@meetzen/ui/src/components/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@meetzen/ui/src/components/card"
import { Button } from "@meetzen/ui/src/components/button"

const citasData = [
    {
        service: "Corte de Cabello",
        price: 100,
        date: "2025-06-01",
        time: "10:00 AM",
        status: "Completada",
        companyName: "Barbería Pingüino",
    },
    {
        service: "Servicio de Motor",
        price: 500,
        date: "2025-05-31",
        time: "12:00 PM",
        status: "Completada",
        companyName: "AutoMecánica",
    },
    {
        service: "Limpieza Bucal",
        price: 250,
        date: "2025-05-30",
        time: "10:00 AM",
        status: "Completada",
        companyName: "Dental Clínica",
    },
    {
        service: "Cita Médica",
        price: 400,
        date: "2025-05-25",
        time: "03:00 PM",
        status: "Cancelada",
        companyName: "Clinica Médica",
    },
]


export function CitasCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {
        citasData.map((cita, index) => (
          <Card className="@container/card" key={index}>
            <CardHeader>
              <CardDescription>{cita.service}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                $ {(cita.price).toFixed(2)}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {cita.status}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Negocio: {cita.companyName}
              </div>
              <div className="text-muted-foreground">
                Fecha: {cita.date}
              </div>
              <div className="text-muted-foreground">
                Hora: {cita.time}
              </div>
              <Button
                size="sm"
                className="w-full"
              >
                Ver detalles
              </Button>
            </CardFooter>
          </Card>
        ))
      }
    </div>
  )
}
