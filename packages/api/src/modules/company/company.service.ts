import { prisma } from "@meetzen/api/src/modules/prisma";
import { ImageService } from "@meetzen/api/src/modules/s3";

export class CompanyService {

    private imageService: ImageService;

    constructor(imageService: ImageService) {
        this.imageService = imageService;
    }

    async createCompany(companyData: {
        name: string;
        logo?: File;
    }) {
        const company = await prisma.company.create({
            data: {
                name: companyData.name,
                ownerId: "",
            },
        });

        if (companyData.logo) {
            const logoUrl = await this.imageService.createImage(
                companyData.logo,
                company.id,
                "company"
            );
            await prisma.company.update({
                where: { id: company.id },
                data: { image: logoUrl },
            });
        }

        return company;
    }
}
