import { SectionCards } from "@/modules/company/home/section-card";
import { ChartAreaInteractive } from "@/modules/company/home/chart-area-interactive";

export default function CompanyPage() {
    return (<div className="flex flex-1 flex-col">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4">
        <SectionCards />
        <ChartAreaInteractive />
        <ChartAreaInteractive />
      </div>
    </div>
  </div>);
}