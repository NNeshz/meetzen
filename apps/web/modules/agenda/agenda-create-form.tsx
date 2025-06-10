"use client"

import { useCompanyAvailability } from "@/modules/agenda/hooks/useAgenda"

export function AgendaCreateForm({ companyNameId, serviceId }: { companyNameId: string, serviceId: string }) {
    
    const { data } = useCompanyAvailability({companyNameId, serviceId})

    console.log(data)

    return (
        <div>
            <h1>Agenda Create Form</h1>
        </div>
    )
}