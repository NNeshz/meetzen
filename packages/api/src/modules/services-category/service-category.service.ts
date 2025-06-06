import { prisma } from "@meetzen/api/src/modules/prisma";

export class ServiceCategoryService {
    async createServiceCategory(body: { name: string }, userId: string) {
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
    
            const existingServiceCategory = await prisma.serviceCategory.findUnique({
                where: { name_companyId: { name: body.name, companyId: user.companyId } },
            });
    
            if (existingServiceCategory) {
                throw new Error("Ya existe una categoría de servicio con ese nombre");
            }
    
            const serviceCategory = await prisma.serviceCategory.create({
                data: {
                    name: body.name,
                    company: {
                        connect: {
                            id: user.companyId,
                        },
                    },
                },
            });
    
            return {
                success: true,
                message: "Categoría de servicio creada exitosamente",
                data: serviceCategory,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : "Error al crear la categoría de servicio"
            );
        }
    }

    async getAllServiceCategories(userId: string) {
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
    
            const serviceCategories = await prisma.serviceCategory.findMany({
                where: { companyId: user.companyId, isDeleted: false },
            });
    
            return {
                success: true,
                message: "Categorías de servicio obtenidas exitosamente",
                data: serviceCategories,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : "Error al obtener las categorías de servicio"
            );
        }
    }

    async updateServiceCategory(userId: string, body: { name: string }, serviceCategoryId: string) {
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
    
            const serviceCategory = await prisma.serviceCategory.update({
                where: { id: serviceCategoryId },
                data: {
                    name: body.name,
                },
            });
    
            return {
                success: true,
                message: "Categoría de servicio actualizada exitosamente",
                data: serviceCategory,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : "Error al actualizar la categoría de servicio"
            );
        }
    }

    async deleteServiceCategory(userId: string, serviceCategoryId: string) {
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
    
            const serviceCategory = await prisma.serviceCategory.update({
                where: { id: serviceCategoryId },
                data: {
                    isDeleted: true,
                    deletedAt: new Date(),
                    deletedBy: userId,
                },
            });
    
            return {
                success: true,
                message: "Categoría de servicio eliminada exitosamente",
                data: serviceCategory,
            };
        } catch (error) {
            throw new Error(
                error instanceof Error ? error.message : "Error al eliminar la categoría de servicio"
            );
        }
    }
}