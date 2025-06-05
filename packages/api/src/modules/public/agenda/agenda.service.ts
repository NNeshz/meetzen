import { prisma } from "@meetzen/api/src/modules/prisma";

export class AgendaService {
    async getCompany(companyNameId: string) {
        const company = await prisma.company.findFirst({
            where: {
                nameId: companyNameId
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
                services: {
                    select: {
                        name: true,
                        price: true,
                        duration: true,
                    }
                },
            }
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
}
