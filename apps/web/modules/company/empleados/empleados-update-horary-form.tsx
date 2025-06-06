"use client"

import { useState } from "react"
import { WeekDay } from "@meetzen/database"
import type { Employee } from "@/modules/company/empleados/empleados-table"

import { Button } from "@meetzen/ui/src/components/button"
import { Switch } from "@meetzen/ui/src/components/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@meetzen/ui/src/components/select"
import { Card } from "@meetzen/ui/src/components/card"
import { Label } from "@meetzen/ui/src/components/label"
import { toast } from "sonner"

// Configuración de días de la semana
const weekDays = [
  { value: WeekDay.MONDAY, label: "Lunes" },
  { value: WeekDay.TUESDAY, label: "Martes" },
  { value: WeekDay.WEDNESDAY, label: "Miércoles" },
  { value: WeekDay.THURSDAY, label: "Jueves" },
  { value: WeekDay.FRIDAY, label: "Viernes" },
  { value: WeekDay.SATURDAY, label: "Sábado" },
  { value: WeekDay.SUNDAY, label: "Domingo" },
]

type DaySchedule = {
  available: boolean
  startTime: string
  endTime: string
  ampmStart: string
  ampmEnd: string
}

type Schedule = Record<WeekDay, DaySchedule>

export function EmpleadosUpdateHoraryForm({ employee }: { employee: Employee }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [schedule, setSchedule] = useState<Schedule>(() => {
    const initialSchedule = {} as Schedule
    
    weekDays.forEach(({ value: day }) => {
      const availability = employee.availability?.find(a => a.day === day)
      initialSchedule[day] = {
        available: availability?.available || false,
        startTime: availability?.startTime || "9",
        endTime: availability?.endTime || "5",
        ampmStart: availability?.ampmStart || "AM",
        ampmEnd: availability?.ampmEnd || "PM",
      }
    })
    
    return initialSchedule
  })

  const updateDaySchedule = (day: WeekDay, field: keyof DaySchedule, value: boolean | string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Validación simple: al menos un día debe estar disponible
      const hasAvailableDay = Object.values(schedule).some(day => day.available)
      if (!hasAvailableDay) {
        toast.error("Debe seleccionar al menos un día como disponible")
        return
      }

      // Transformar datos para envío
      const scheduleData = Object.entries(schedule).map(([day, data]) => ({
        day,
        available: data.available,
        startTime: data.available ? data.startTime : null,
        endTime: data.available ? data.endTime : null,
        ampmStart: data.available ? data.ampmStart : null,
        ampmEnd: data.available ? data.ampmEnd : null,
      }))

      console.log("Datos a enviar:", scheduleData)
      // await updateEmployeeSchedule(employee.id, scheduleData)
      
    } catch (error) {
      toast.error("Error al actualizar horario")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 rounded-lg">
            {weekDays.map(({ value: day, label }) => (
              <Card key={day} className="px-4 bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs"
              data-slot="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">{label}</h3>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`${day}-available`}>Disponible</Label>
                    <Switch
                      id={`${day}-available`}
                      checked={schedule[day].available}
                      onCheckedChange={(checked) => updateDaySchedule(day, 'available', checked)}
                    />
                  </div>
                </div>

                {schedule[day].available && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Hora de inicio 
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex space-x-2">
                        <Select
                          value={schedule[day].startTime}
                          onValueChange={(value) => updateDaySchedule(day, 'startTime', value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                              <SelectItem key={hour} value={hour.toString()}>
                                {hour.toString().padStart(2, '0')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={schedule[day].ampmStart}
                          onValueChange={(value) => updateDaySchedule(day, 'ampmStart', value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Hora de cierre 
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex space-x-2">
                        <Select
                          value={schedule[day].endTime}
                          onValueChange={(value) => updateDaySchedule(day, 'endTime', value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                              <SelectItem key={hour} value={hour.toString()}>
                                {hour.toString().padStart(2, '0')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={schedule[day].ampmEnd}
                          onValueChange={(value) => updateDaySchedule(day, 'ampmEnd', value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="flex">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Guardando..." : "Guardar horario"}
            </Button>
          </div>
        </form>
  )
}