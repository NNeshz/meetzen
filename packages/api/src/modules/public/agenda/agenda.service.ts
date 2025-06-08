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

  async getCompanyAvailability(companyNameId: string) {

    const now = Temporal.Now.zonedDateTimeISO("UTC"); // Puedes cambiar 'UTC' por tu zona real
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
      },
    });

    if (!company) {
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

    // Generar disponibilidad por día
    const availableDays: {
      date: string;
      weekDay: WeekDay;
      employees: { id: string; name: string }[];
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

      if (!company.availableDays.includes(enumDay)) continue;

      const availableEmployees = employees.filter((employee) =>
        employee.availability.some((a) => a.day === enumDay && a.available)
      );

      if (availableEmployees.length > 0) {
        availableDays.push({
          date: day.toString(),
          weekDay: enumDay,
          employees: availableEmployees.map((e) => ({
            id: e.id,
            name: e.name,
          })),
        });
      }
    }

    return {
      availableDays,
    };
  }

  async getCompanySchedules(body: {
    companyNameId: string;
    serviceId: string;
    date: string;
  }) {}
}
