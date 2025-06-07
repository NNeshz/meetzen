"use client";

import { AgendaHeader } from "@/modules/agenda/agenda-header";
import { AgendaServices } from "@/modules/agenda/agenda-services";

export default function Page() {
  return (
    <div className="px-8 mt-24 sm:mt-28">
      <AgendaHeader />
      <AgendaServices />
    </div>
  );
}
