import { CitasHeader } from "@/modules/company/citas/citas-header";
import { CalendarDisplay } from "@/modules/company/citas/calendar-display";

export default function CitasPage() {
    return (
        <div className="space-y-4">
            <CitasHeader />
            <CalendarDisplay />
        </div>
    );
}