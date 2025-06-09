"use client";

import { AgendaHeader } from "@/modules/agenda/agenda-header";
import { GlobalStepper } from "@/modules/agenda/config/stepper.config";
import { AgendaDay } from "@/modules/agenda/agenda-day";
import { AgendaServices } from "@/modules/agenda/agenda-services";
import { AgendaEmployee } from "@/modules/agenda/agenda-employee";
import { AgendaHorary } from "@/modules/agenda/agenda-horary";

export default function Page() {
  return (
    <div className="h-screen p-4">
      <div className="h-full">
        <GlobalStepper.Scoped>
          <InnerStepperPage />
        </GlobalStepper.Scoped>
      </div>
    </div>
  );
}

function InnerStepperPage() {
  const methods = GlobalStepper.useStepper();

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <AgendaHeader />
      {methods.switch({
        first: () => <AgendaServices />,
        second: () => <AgendaDay />,
        third: () => <AgendaEmployee />,
        fourth: () => <AgendaHorary />,
      })}
    </div>
  );
}
