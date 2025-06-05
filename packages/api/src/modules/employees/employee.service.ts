import { prisma } from "@meetzen/api/src/modules/prisma";
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

      // Crear el empleado
      const employee = await prisma.employees.create({
        data: {
          name: body.name,
          phoneNumber: body.phoneNumber,
          address: body.address,
          companyId: user.companyId,
        },
      });

      // Crear disponibilidad semanal basada en los días de la compañía
      await this.createWeeklyAvailability(employee.id, company);

      return {
        success: true,
        message: "Empleado creado exitosamente con disponibilidad semanal",
        data: employee,
      };
    } catch (error) {
      console.error(error);
      throw new Error(
        error instanceof Error ? error.message : "Error al crear el empleado"
      );
    }
  }

  private async createWeeklyAvailability(
    employeeId: string, 
    company: { availableDays: WeekDay[], startTime: string, endTime: string }
  ): Promise<void> {
    type AvailabilityData = {
      day: WeekDay;
      available: boolean;
      startTime: string | null;
      endTime: string | null;
      employeeId: string;
    };

    const availabilities: AvailabilityData[] = [];
    
    // Todos los días de la semana
    const allWeekDays: WeekDay[] = [
      WeekDay.MONDAY,
      WeekDay.TUESDAY,
      WeekDay.WEDNESDAY,
      WeekDay.THURSDAY,
      WeekDay.FRIDAY,
      WeekDay.SATURDAY,
      WeekDay.SUNDAY
    ];

    // Crear disponibilidad para cada día de la semana
    allWeekDays.forEach((weekDay: WeekDay) => {
      const isAvailable: boolean = company.availableDays.includes(weekDay);

      availabilities.push({
        day: weekDay,
        available: isAvailable,
        startTime: isAvailable ? company.startTime : null,
        endTime: isAvailable ? company.endTime : null,
        employeeId: employeeId,
      });
    });

    // Insertar todas las disponibilidades (7 registros)
    await prisma.employeeAvailability.createMany({
      data: availabilities,
      skipDuplicates: true,
    });
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

      const employees = await prisma.employees.findMany({
        where: { 
          companyId: user.companyId,
          isDeleted: false // Excluir empleados eliminados
        },
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
              day: true,
              available: true,
              startTime: true,
              endTime: true,
            },
            orderBy: {
              day: 'asc'
            }
          }
        }
      });

      return {
        success: true,
        message: "Empleados obtenidos exitosamente",
        data: employees,
      };
    } catch (error) {
      console.error(error);
      throw new Error(
        error instanceof Error ? error.message : "Error al obtener los empleados"
      );
    }
  }
}