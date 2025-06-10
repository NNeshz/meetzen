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
    // --- FIX #1: Usar la zona horaria local relevante (ej. 'America/Mexico_City') en lugar de 'UTC' ---
    // Idealmente, este valor debería venir de la base de datos (ej. company.timezone)
    const companyTimezone = 'America/Mexico_City'; 
    const now = Temporal.Now.zonedDateTimeISO(companyTimezone);
    const today = now.toPlainDate();

    const next7Days: Temporal.PlainDate[] = Array.from({ length: 7 }).map(
      (_, i) => today.add({ days: i })
    );

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

    const BUFFER_MINUTES = 5;
    const serviceDuration = service.duration;

    const timeToMinutes = (time: string, ampm?: string): number => {
        const [h, m] = time.split(":").map(Number);
        let hours = h ?? 0;
        const minutes = m ?? 0;

        let total = hours * 60 + minutes;

        if (ampm?.toUpperCase() === "PM" && hours !== 12) {
            total += 12 * 60;
        } else if (ampm?.toUpperCase() === "AM" && hours === 12) {
            total -= 12 * 60;
        }

        return total;
    };

    const minutesToTime = (minutes: number): string => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    };
    
    const getEmployeeAppointments = async (employeeId: string, date: Temporal.PlainDate) => {
        // Usamos la misma zona horaria para consistencia en la consulta
        const startOfDay = date.toZonedDateTime(companyTimezone).toInstant().toString();
        const endOfDay = date.add({ days: 1 }).toZonedDateTime(companyTimezone).toInstant().toString();

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
                day: "asc",
            },
        });
    };

    const calculateAvailableSlots = async (
        employee: any,
        date: Temporal.PlainDate,
        enumDay: WeekDay
    ) => {
        const employeeAvailability = employee.availability.find(
            (a: any) => a.day === enumDay && a.available
        );

        if (!employeeAvailability) return [];

        const workStartTime = employeeAvailability.startTime || company.startTime;
        const workEndTime = employeeAvailability.endTime || company.endTime;
        const workStartAmPm = employeeAvailability.ampmStart || company.pmamStart;
        const workEndAmPm = employeeAvailability.ampmEnd || company.pmamEnd;

        const workStartMinutes = timeToMinutes(workStartTime, workStartAmPm);
        const workEndMinutes = timeToMinutes(workEndTime, workEndAmPm);

        const existingAppointments = await getEmployeeAppointments(employee.id, date);

        const occupiedSlots = existingAppointments.map(apt => {
            const aptStartDateTime = Temporal.Instant.from(apt.day.toISOString()).toZonedDateTimeISO(companyTimezone);
            const start = aptStartDateTime.hour * 60 + aptStartDateTime.minute;
            
            let end;
            if (apt.endTime) {
                const aptEndDateTime = Temporal.Instant.from(apt.endTime.toISOString()).toZonedDateTimeISO(companyTimezone);
                end = aptEndDateTime.hour * 60 + aptEndDateTime.minute;
            } else {
                end = start + apt.duration;
            }
            
            // Añadir buffer al final de cada cita
            end += BUFFER_MINUTES;

            return { start, end };
        }).sort((a, b) => a.start - b.start);

        // --- FIX #2: Simplificar la lógica de "hoy" ---
        let currentTime = workStartMinutes;
        const isToday = date.equals(today);

        if (isToday) {
            // Simplemente calcula la hora actual en minutos y la usa como el punto de partida mínimo.
            // El buffer ya no se suma aquí, se maneja después de cada cita.
            const nowMinutes = now.hour * 60 + now.minute;
            currentTime = Math.max(currentTime, nowMinutes);
        }
        
        const availableSlots: string[] = [];
        
        // Esta función ahora es la única responsable de alinear los slots
        const addSlotsInRange = (start: number, end: number) => {
            // Alineamos el tiempo de inicio al próximo intervalo de servicio disponible
            const offset = (start - workStartMinutes) % serviceDuration;
            if (offset !== 0) {
                start += serviceDuration - offset;
            }

            while (start + serviceDuration <= end) {
                const slotEnd = start + serviceDuration;
                
                const overlaps = occupiedSlots.some(occupied =>
                    (start < occupied.end && slotEnd > occupied.start)
                );

                if (!overlaps) {
                    availableSlots.push(minutesToTime(start));
                }
                
                // Avanzamos al siguiente posible slot
                start += serviceDuration; 
            }
        };

        if (occupiedSlots.length === 0) {
            addSlotsInRange(currentTime, workEndMinutes);
        } else {
            // Añadir slots desde la hora de inicio (o ahora) hasta la primera cita
            addSlotsInRange(currentTime, occupiedSlots[0]?.start);

            // Añadir slots entre las citas
            for (let i = 0; i < occupiedSlots.length - 1; i++) {
                const endOfCurrentSlot = occupiedSlots[i].end;
                const startOfNextSlot = occupiedSlots[i + 1].start;
                addSlotsInRange(endOfCurrentSlot, startOfNextSlot);
            }
            
            // Añadir slots después de la última cita hasta el final del día
            const endOfLastSlot = occupiedSlots[occupiedSlots.length - 1].end;
            addSlotsInRange(endOfLastSlot, workEndMinutes);
        }

        return availableSlots;
    };

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
        "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY",
    ];

    for (const day of next7Days) {
        // Temporal.PlainDate.dayOfWeek es 1 para Lunes y 7 para Domingo.
        // Lo ajustamos para que coincida con el índice del array (0=DOM, 1=LUN, etc.)
        const jsDay = day.dayOfWeek % 7; 
        const enumDay = daysOfWeek[jsDay];

        if (!company.availableDays.includes(enumDay)) continue;

        const dayEmployeesWithSlots: {
            id: string;
            name: string;
            availableSlots: string[];
        }[] = [];

        for (const employee of employees) {
            const availableSlots = await calculateAvailableSlots(employee, day, enumDay);
            if (availableSlots.length > 0) {
                dayEmployeesWithSlots.push({
                    id: employee.id,
                    name: employee.name,
                    availableSlots,
                });
            }
        }
        
        // Solo agregar el día si hay empleados con horarios disponibles
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
