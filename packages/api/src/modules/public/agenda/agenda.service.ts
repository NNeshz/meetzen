import { prisma } from "@meetzen/api/src/modules/prisma";
import { WeekDay } from "@meetzen/database";
import { Temporal } from "temporal-polyfill";

export class AgendaService {
  async getCompany(companyNameId: string) {
    const company = await prisma.company.findFirst({
      where: {
        nameId: companyNameId,
      },
      select: {
        name: true,
        image: true,
        companyDescription: true,
        availableDays: true,
        phoneNumber: true,
        mapsLocation: true,
        startTime: true,
        endTime: true,
        pmamStart: true,
        pmamEnd: true,
      },
    });

    if (!company) {
      throw new Error("Compañía no encontrada");
    }

    return {
      success: true,
      message: "Agenda obtenida exitosamente",
      company,
    };
  }

  async getCompanyServices(companyNameId: string) {
    const company = await prisma.company.findFirst({
      where: {
        nameId: companyNameId,
      },
      select: {
        services: {
          select: {
            id: true,
            name: true,
            price: true,
            duration: true,
            serviceCategory: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!company) {
      throw new Error("Compañía no encontrada");
    }

    return {
      success: true,
      message: "Servicios obtenidos exitosamente",
      company,
    };
  }

  async getCompanyAvailability(companyNameId: string, serviceId: string) {
    const now = Temporal.Now.zonedDateTimeISO("UTC");
    const today = now.toPlainDate();
  
    // Generar los próximos 7 días
    const next7Days: Temporal.PlainDate[] = Array.from({ length: 7 }).map(
      (_, i) => today.add({ days: i })
    );
  
    // Obtener la empresa
    const company = await prisma.company.findFirst({
      where: {
        isDeleted: false,
        nameId: companyNameId,
      },
      select: {
        id: true,
        availableDays: true,
        startTime: true,
        endTime: true,
        pmamStart: true,
        pmamEnd: true,
      },
    });
  
    if (!company) {
      return { availableDays: [] };
    }
  
    // Obtener información del servicio
    const service = await prisma.services.findFirst({
      where: {
        id: serviceId,
        companyId: company.id,
        isDeleted: false,
      },
      select: {
        duration: true,
      },
    });
  
    if (!service) {
      return { availableDays: [] };
    }
  
    // Obtener empleados activos con disponibilidad
    const employees = await prisma.employees.findMany({
      where: {
        companyId: company.id,
        status: "ACTIVE",
        isDeleted: false,
        availability: {
          some: {
            available: true,
          },
        },
      },
      select: {
        id: true,
        name: true,
        availability: true,
      },
    });
  
    // Buffer de 5 minutos
    const BUFFER_MINUTES = 5;
    const serviceDurationWithBuffer = service.duration + BUFFER_MINUTES;
  
    // Función auxiliar para convertir tiempo a minutos
    const timeToMinutes = (time: string, ampm?: string): number => {
      const timeParts = time.split(':').map(Number);
      const hours = timeParts[0] ?? 0;
      const minutes = timeParts[1] ?? 0;
      
      let totalMinutes = hours * 60 + minutes;
      
      if (ampm) {
        if (ampm.toUpperCase() === 'PM' && hours !== 12) {
          totalMinutes += 12 * 60;
        } else if (ampm.toUpperCase() === 'AM' && hours === 12) {
          totalMinutes = minutes;
        }
      }
      
      return totalMinutes;
    };
  
    // Función auxiliar para convertir minutos a tiempo
    const minutesToTime = (minutes: number): string => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };
  
    // Función para obtener citas existentes de un empleado en un día específico
    const getEmployeeAppointments = async (employeeId: string, date: Temporal.PlainDate) => {
      const startOfDay = date.toZonedDateTime("UTC").toInstant().toString();
      const endOfDay = date.add({ days: 1 }).toZonedDateTime("UTC").toInstant().toString();
  
      return await prisma.appointment.findMany({
        where: {
          employeeId,
          day: {
            gte: new Date(startOfDay),
            lt: new Date(endOfDay),
          },
          status: {
            not: "CANCELLED",
          },
          isDeleted: false,
        },
        select: {
          day: true,
          endTime: true,
          duration: true,
        },
        orderBy: {
          day: 'asc',
        },
      });
    };
  
    // Función para calcular horarios disponibles
    const calculateAvailableSlots = async (
      employee: any,
      date: Temporal.PlainDate,
      enumDay: WeekDay
    ) => {
      // Obtener disponibilidad del empleado para este día
      const employeeAvailability = employee.availability.find(
        (a: any) => a.day === enumDay && a.available
      );
  
      if (!employeeAvailability) return [];
  
      // Determinar horario de trabajo (usar el del empleado si existe, sino el de la empresa)
      const workStartTime = employeeAvailability.startTime || company.startTime;
      const workEndTime = employeeAvailability.endTime || company.endTime;
      const workStartAmPm = employeeAvailability.ampmStart || company.pmamStart;
      const workEndAmPm = employeeAvailability.ampmEnd || company.pmamEnd;
  
      const workStartMinutes = timeToMinutes(workStartTime, workStartAmPm);
      const workEndMinutes = timeToMinutes(workEndTime, workEndAmPm);
  
      // Obtener citas existentes
      const existingAppointments = await getEmployeeAppointments(employee.id, date);
  
      // Convertir citas a intervalos ocupados (en minutos desde medianoche)
      const occupiedSlots: { start: number; end: number }[] = existingAppointments.map(apt => {
        const startTime = new Date(apt.day);
        const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
        const endMinutes = apt.endTime 
          ? new Date(apt.endTime).getHours() * 60 + new Date(apt.endTime).getMinutes()
          : startMinutes + apt.duration + BUFFER_MINUTES;
        
        return { start: startMinutes, end: endMinutes };
      });
  
      // Ordenar intervalos ocupados
      occupiedSlots.sort((a, b) => a.start - b.start);
  
      // Encontrar espacios libres
      const availableSlots: string[] = [];
      let currentTime = workStartMinutes;
  
      // Si es hoy, no permitir citas en el pasado
      const isToday = date.equals(today);
      if (isToday) {
        const currentMinutes = now.hour * 60 + now.minute;
        currentTime = Math.max(currentTime, currentMinutes);
      }
  
      for (const occupied of occupiedSlots) {
        // Verificar si hay espacio antes de esta cita ocupada
        if (currentTime + serviceDurationWithBuffer <= occupied.start) {
          // Generar slots cada 15 minutos en este espacio libre
          let slotStart = currentTime;
          while (slotStart + serviceDurationWithBuffer <= occupied.start) {
            if (slotStart + serviceDurationWithBuffer <= workEndMinutes) {
              availableSlots.push(minutesToTime(slotStart));
            }
            slotStart += 15; // Incrementar en intervalos de 15 minutos
          }
        }
        currentTime = Math.max(currentTime, occupied.end);
      }
  
      // Verificar espacio después de la última cita hasta el final del día laboral
      if (currentTime + serviceDurationWithBuffer <= workEndMinutes) {
        let slotStart = currentTime;
        while (slotStart + serviceDurationWithBuffer <= workEndMinutes) {
          availableSlots.push(minutesToTime(slotStart));
          slotStart += 15;
        }
      }
  
      return availableSlots;
    };
  
    // Generar disponibilidad por día
    const availableDays: {
      date: string;
      weekDay: WeekDay;
      employees: {
        id: string;
        name: string;
        availableSlots: string[];
      }[];
    }[] = [];
  
    const daysOfWeek: WeekDay[] = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
  
    for (const day of next7Days) {
      const jsDay = day.dayOfWeek % 7;
      const enumDay = daysOfWeek[jsDay] as WeekDay;
  
      // Verificar si la empresa trabaja este día
      if (!company.availableDays.includes(enumDay)) continue;
  
      // Obtener empleados disponibles para este día específico
      const dayEmployeesWithSlots: {
        id: string;
        name: string;
        availableSlots: string[];
      }[] = [];
  
      for (const employee of employees) {
        const employeeAvailability = employee.availability.find(
          (a: any) => a.day === enumDay && a.available
        );
  
        if (employeeAvailability) {
          const availableSlots = await calculateAvailableSlots(employee, day, enumDay);
          
          if (availableSlots.length > 0) {
            dayEmployeesWithSlots.push({
              id: employee.id,
              name: employee.name,
              availableSlots,
            });
          }
        }
      }
  
      // Solo agregar el día si hay al menos un empleado con horarios disponibles
      if (dayEmployeesWithSlots.length > 0) {
        availableDays.push({
          date: day.toString(),
          weekDay: enumDay,
          employees: dayEmployeesWithSlots,
        });
      }
    }
  
    return {
      availableDays,
    };
  }
}
