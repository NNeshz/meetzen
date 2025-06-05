import { prisma } from "@meetzen/api/src/modules/prisma";

export class AgendaService {
    async getCompany(companyNameId: string) {
        const company = await prisma.company.findFirst({
            where: {
                nameId: companyNameId
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
}
