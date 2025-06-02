import { PasadasHeader } from "@/modules/company/pasadas/pasadas-header";
import { PasadasTable } from "@/modules/company/pasadas/pasadas-table";

export default function CitasPasadasPage() {
    return (
        <div className="space-y-4">
            <PasadasHeader />
            <PasadasTable />
        </div>
    );
}