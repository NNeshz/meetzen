import { prisma } from "@meetzen/api/src/modules/prisma";
import { Temporal } from "temporal-polyfill";
import { WeekDay } from "@meetzen/database";

export class EmployeeService {
  async createEmployee(
    body: {
      name: string;
      phoneNumber: string;
      address: string;
    },
    userId: string
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { companyId: true },
      });

      if (!user?.companyId) {
        throw new Error("El usuario no tiene una compañía asignada");
      }

      const company = await prisma.company.findUnique({
        where: { id: user.companyId },
        select: {
          availableDays: true,
          startTime: true,
          endTime: true,
        },
      });

      if (!company) {
        throw new Error("Compañía no encontrada");
      }

      const employee = await prisma.employees.create({
        data: {
          name: body.name,
          phoneNumber: body.phoneNumber,
          address: body.address,
          companyId: user.companyId,
        },
      });

      const today = Temporal.Now.plainDateISO();
      const availabilities = [];

      const weekDayNames = Object.values(WeekDay);

      for (let i = 0; i < 7; i++) {
        const date = today.add({ days: i });
        const dayIndex = date.dayOfWeek - 1;
        const currentDayName = weekDayNames[dayIndex];

        if (!currentDayName) {
          throw new Error("Día no encontrado");
        }

        if (company.availableDays.includes(currentDayName)) {
          availabilities.push({
            date: new Date(date.toString()),
            available: true,
            startTime: company.startTime,
            endTime: company.endTime,
            employeeId: employee.id,
          });
        }
      }

      if (availabilities.length > 0) {
        await prisma.employeeAvailability.createMany({
          data: availabilities,
        });
      }

      return {
        success: true,
        message: "Empleado creado exitosamente con disponibilidad inicial",
        data: employee,
      };
    } catch (error) {
      console.error(error);
      throw new Error(
        error instanceof Error ? error.message : "Error al crear el empleado"
      );
    }
  }

  async getEmployee(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { companyId: true },
      });

      if (!user?.companyId) {
        throw new Error("El usuario no tiene una compañía asignada");
      }

      const employee = await prisma.employees.findMany({
        where: { companyId: user.companyId },
        select: {
          id: true,
          name: true,
          phoneNumber: true,
          status: true,
          companyId: true,
          createdAt: true,
          updatedAt: true,
          address: true,
          availability: {
            select: {
              id: true,
              date: true,
              available: true,
              startTime: true,
              endTime: true,
            }
          }
        }
      });

      return {
        success: true,
        message: "Empleado obtenido exitosamente",
        data: employee,
      };
    } catch (error) {
      console.error(error);
      throw new Error(
        error instanceof Error ? error.message : "Error al obtener el empleado"
      );
    }
  }
}
