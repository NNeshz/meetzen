import { prisma } from "@meetzen/api/src/modules/prisma";
import { ImageService } from "@meetzen/api/src/modules/s3";

export class CompanyService {
  private imageService: ImageService;

  constructor() {
    this.imageService = new ImageService();
  }

  async createCompany(
    body: {
      name: string;
      image?: File;
      companyDescription: string;
      availableDays: string[];
      phoneNumber: string;
      mapsLocation: string;
      startTime: string;
      endTime: string;
      pmamStart: string;
      pmamEnd: string;
    },
    userId: string
  ) {
    try {
      // Verificar que el usuario existe y no tiene compañía asignada
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, companyId: true, role: true },
      });

      if (!existingUser) {
        throw new Error("Usuario no encontrado");
      }

      if (existingUser.companyId) {
        throw new Error("El usuario ya pertenece a una compañía");
      }

      if (!body.image) {
        throw new Error("Debe seleccionar una imagen");
      }

      // Verificar que no existe una compañía con el mismo nombre
      const existingCompany = await prisma.company.findUnique({
        where: { name: body.name },
      });

      if (existingCompany) {
        throw new Error("Ya existe una compañía con ese nombre");
      }

      // Subir imagen antes de la transacción
      const imageUrl = await this.imageService.createImage(
        body.image,
        userId,
        "company"
      );

      // Usar transacción para crear la compañía y actualizar el usuario
      const result = await prisma.$transaction(async (tx) => {
        // Crear la compañía
        const company = await tx.company.create({
          data: {
            name: body.name,
            image: imageUrl,
            companyDescription: body.companyDescription,
            availableDays: body.availableDays,
            phoneNumber: body.phoneNumber,
            mapsLocation: body.mapsLocation,
            startTime: body.startTime,
            endTime: body.endTime,
            pmamStart: body.pmamStart,
            pmamEnd: body.pmamEnd,
          },
        });

        // Actualizar el usuario para asociarlo a la compañía y cambiar su rol
        const updatedUser = await tx.user.update({
          where: { id: userId, role: "company" },
          data: {
            companyId: company.id,
            updatedAt: new Date(),
          },
        });

        return {
          company,
          user: updatedUser,
        };
      });

      return {
        success: true,
        message: "Compañía creada exitosamente",
        data: result,
      };
    } catch (error) {
      console.log(error);
      // Si hay error después de subir la imagen, idealmente deberías eliminarla
      // await this.imageService.deleteImage(imageUrl);

      throw new Error(
        error instanceof Error ? error.message : "Error al crear la compañía"
      );
    }
  }

  async getUserCompany(userId: string) {
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

      const company = await prisma.company.findUnique({
        where: { id: user.companyId },
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
        throw new Error("Usuario no encontrado");
      }

      // Convertir la URL interna a URL pública si existe una imagen
      const publicImageUrl = company.image
        ? ImageService.getPublicImageUrl(company.image)
        : company.image;

      return {
        success: true,
        message: "Compañía obtenida exitosamente",
        data: {
          ...company,
          image: publicImageUrl,
        },
      };
    } catch (error) {
      console.log(error);
      throw new Error(
        error instanceof Error ? error.message : "Error al obtener la compañía"
      );
    }
  }

  async updateCompany(
    companyId: string,
    userId: string,
    data: {
      name?: string;
      image?: File;
      companyDescription?: string;
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
      email?: string;
      mapsLocation?: string;
    }
  ) {
    try {
      // Verificar que el usuario pertenece a la compañía
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { companyId: true, role: true },
      });

      if (!user || user.companyId !== companyId) {
        throw new Error("No tienes permisos para actualizar esta compañía");
      }

      if (user.role !== "COMPANY") {
        throw new Error(
          "Solo los administradores de la compañía pueden actualizarla"
        );
      }

      let imageUrl: string | undefined;

      // Si hay nueva imagen, subirla
      if (data.image) {
        imageUrl = await this.imageService.createImage(
          data.image,
          userId,
          "company"
        );
      }

      const updateData: any = {
        ...data,
        updatedAt: new Date(),
      };

      if (imageUrl) {
        updateData.image = imageUrl;
      }

      // Remover la imagen del objeto de actualización ya que se maneja por separado
      delete updateData.image;

      const updatedCompany = await prisma.company.update({
        where: { id: companyId },
        data: {
          ...updateData,
          ...(imageUrl && { image: imageUrl }),
        },
        include: {
          employees: true,
          services: true,
          users: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      });

      return {
        success: true,
        message: "Compañía actualizada exitosamente",
        data: updatedCompany,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Error al actualizar la compañía"
      );
    }
  }
}
