import { prisma } from "@meetzen/api/src/modules/prisma";

export class ServiceService {
  async createService(
    body: {
      name: string;
      duration: number;
      price: number;
      categoryId?: string;
    },
    userId: string
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { companyId: true },
      });

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      if (!user.companyId) {
        throw new Error("Usuario no tiene una compañía asignada");
      }

      const service = await prisma.services.create({
        data: {
          name: body.name,
          duration: body.duration,
          price: body.price,
          companyId: user.companyId,
          serviceCategoryId: body.categoryId || null,
        },
      });
      return {
        success: true,
        message: "Servicio creado exitosamente",
        data: service,
      };
    } catch (error) {
      console.log(error);
      throw new Error(
        error instanceof Error ? error.message : "Error al crear el servicio"
      );
    }
  }

  async getAllServices(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { companyId: true },
      });

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      if (!user.companyId) {
        throw new Error("Usuario no tiene una compañía asignada");
      }

      const services = await prisma.services.findMany({
        where: { companyId: user.companyId, isDeleted: false },
        select: {
          id: true,
          name: true,
          duration: true,
          price: true,
          lastUse: true,
          createdAt: true,
          serviceCategory: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!services) {
        throw new Error("Usuario no encontrado");
      }

      return {
        success: true,
        message: "Servicios obtenidos exitosamente",
        data: services,
      };
    } catch (error) {
      console.log(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Error al obtener los servicios"
      );
    }
  }

  async updateService(
    body: {
      name: string;
      duration: number;
      price: number;
      categoryId?: string;
    },
    userId: string,
    serviceId: string
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { companyId: true },
      });

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      if (!user.companyId) {
        throw new Error("Usuario no tiene una compañía asignada");
      }

      const service = await prisma.services.update({
        where: { id: serviceId },
        data: {
          name: body.name,
          duration: body.duration,
          price: body.price,
          serviceCategoryId: body.categoryId,
        },
      });
      return {
        success: true,
        message: "Servicio actualizado exitosamente",
        data: service,
      };
    } catch (error) {
      console.log(error);
      throw new Error(
        error instanceof Error ? error.message : "Error al actualizar el servicio"
      );
    }
  }

  async deleteService(userId: string, serviceId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { companyId: true },
      });

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      if (!user.companyId) {
        throw new Error("Usuario no tiene una compañía asignada");
      }

      const service = await prisma.services.update({
        where: { id: serviceId },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy: userId,
        },
      });
      return {
        success: true,
        message: "Servicio eliminado exitosamente",
        data: service,
      };
    } catch (error) {
      console.log(error);
      throw new Error(
        error instanceof Error ? error.message : "Error al eliminar el servicio"
      );
    }
  }
}
