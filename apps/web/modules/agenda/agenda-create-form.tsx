"use client"

import { useCompanyAvailability } from "@/modules/agenda/hooks/useAgenda"
import { Button } from "@meetzen/ui/src/components/button"
import { Card, CardContent } from "@meetzen/ui/src/components/card"
import { Badge } from "@meetzen/ui/src/components/badge"
import { Skeleton } from "@meetzen/ui/src/components/skeleton"
import { Calendar, Clock, User, Loader2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

interface Employee {
  id: string
  name: string
  availableSlots: string[]
}

interface AvailabilityData {
  date: string
  weekDay: string
  employees: Employee[]
}

export function AgendaCreateForm({ companyNameId, serviceId }: { companyNameId: string; serviceId: string }) {
  const { data, isLoading } = useCompanyAvailability({ companyNameId, serviceId })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const employeesRef = useRef<HTMLDivElement>(null)
  const timeSlotsRef = useRef<HTMLDivElement>(null)
  const confirmButtonRef = useRef<HTMLButtonElement>(null)

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("es-ES", options)
  }

  // Función para obtener el nombre corto del día
  const getShortWeekDay = (weekDay: string) => {
    const days: { [key: string]: string } = {
      MONDAY: "Lun",
      TUESDAY: "Mar",
      WEDNESDAY: "Mié",
      THURSDAY: "Jue",
      FRIDAY: "Vie",
      SATURDAY: "Sáb",
      SUNDAY: "Dom",
    }
    return days[weekDay] || weekDay
  }

  // Animación para mostrar empleados
  useEffect(() => {
    if (selectedDate && employeesRef.current) {
      gsap.fromTo(
        employeesRef.current,
        { opacity: 0, y: 20, height: 0 },
        { opacity: 1, y: 0, height: "auto", duration: 0.5, ease: "power2.out" },
      )
    }
  }, [selectedDate])

  // Animación para mostrar horarios
  useEffect(() => {
    if (selectedEmployee && timeSlotsRef.current) {
      gsap.fromTo(
        timeSlotsRef.current,
        { opacity: 0, y: 20, height: 0 },
        { opacity: 1, y: 0, height: "auto", duration: 0.5, ease: "power2.out" },
      )
    }
  }, [selectedEmployee])

  // Animación para mostrar botón de confirmación
  useEffect(() => {
    if (selectedTime && confirmButtonRef.current) {
      gsap.fromTo(
        confirmButtonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" },
      )
    }
  }, [selectedTime])

  // Resetear selecciones cuando cambia el día
  const handleDateSelect = (date: string) => {
    if (selectedEmployee) {
      gsap.to([timeSlotsRef.current, confirmButtonRef.current], {
        opacity: 0,
        y: -10,
        duration: 0.2,
        onComplete: () => {
          setSelectedEmployee(null)
          setSelectedTime(null)
        },
      })
    }
    setSelectedDate(date)
  }

  // Resetear horario cuando cambia el empleado
  const handleEmployeeSelect = (employee: Employee) => {
    if (selectedTime && confirmButtonRef.current) {
      gsap.to(confirmButtonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        onComplete: () => setSelectedTime(null),
      })
    }
    setSelectedEmployee(employee)
  }

  const handleConfirm = async () => {
    if (selectedDate && selectedEmployee && selectedTime) {
      setIsSubmitting(true)
      try {
        // Simular una petición a la API
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log("Cita confirmada:", {
          date: selectedDate,
          employee: selectedEmployee,
          time: selectedTime,
        })
        // Aquí puedes agregar la lógica para crear la cita
      } catch (error) {
        console.error("Error al crear la cita:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 max-h-[70vh] overflow-y-auto">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Cargando fechas disponibles...
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!data || data.availableDays.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 max-h-[70vh]">
        <div className="text-center">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No hay fechas disponibles</p>
        </div>
      </div>
    )
  }

  const selectedDateData = data.availableDays.find((d) => d.date === selectedDate)
  const availableEmployees = selectedDateData?.employees || []

  return (
    <div className="space-y-6 p-4 max-h-[70vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Selección de Fecha */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Selecciona una fecha
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {data.availableDays.map((availability: AvailabilityData) => (
            <Card
              key={availability.date}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedDate === availability.date ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
              }`}
              onClick={() => handleDateSelect(availability.date)}
            >
              <CardContent className="p-3 text-center">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  {getShortWeekDay(availability.weekDay)}
                </div>
                <div className="text-sm font-semibold">{new Date(availability.date).getDate()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(availability.date).toLocaleDateString("es-ES", { month: "short" })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {selectedDate && (
          <div className="text-sm text-muted-foreground">
            Fecha seleccionada: <span className="font-medium">{formatDate(selectedDate)}</span>
          </div>
        )}
      </div>

      {/* Selección de Empleado */}
      {selectedDate && (
        <div ref={employeesRef} className="space-y-3 overflow-hidden">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <User className="h-4 w-4" />
            Selecciona un profesional
          </div>
          <div className="space-y-2 p-1">
            {availableEmployees.map((employee: Employee) => (
              <Card
                key={employee.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedEmployee?.id === employee.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => handleEmployeeSelect(employee)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {employee.availableSlots.length} horarios disponibles
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{employee.availableSlots.length}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Selección de Horario */}
      {selectedEmployee && (
        <div ref={timeSlotsRef} className="space-y-3 overflow-hidden">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock className="h-4 w-4" />
            Selecciona un horario
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {selectedEmployee.availableSlots.map((slot: string) => (
              <Button
                key={slot}
                variant={selectedTime === slot ? "default" : "outline"}
                size="sm"
                className="h-10"
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Botón de Confirmación */}
      {selectedTime && (
        <div ref={confirmButtonRef as unknown as React.RefObject<HTMLDivElement>} className="pt-4 border-t">
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium">Resumen de la cita</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>📅 {formatDate(selectedDate!)}</div>
                <div>👤 {selectedEmployee!.name}</div>
                <div>🕐 {selectedTime}</div>
              </div>
            </div>
            <Button onClick={handleConfirm} className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Confirmando...
                </>
              ) : (
                "Confirmar Cita"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
