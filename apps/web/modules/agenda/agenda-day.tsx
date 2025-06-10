"use client";

import { useAgendaAvailability } from "@/modules/agenda/hooks/useAgenda";
import { useParams } from "next/navigation";
import { Temporal } from "temporal-polyfill";
import { Card, CardHeader, CardContent } from "@meetzen/ui/src/components/card";
import { GlobalStepper } from "@/modules/agenda/config/stepper.config";
import { Badge } from "@meetzen/ui/src/components/badge";
import { Button } from "@meetzen/ui/src/components/button";
import { ArrowLeft } from "lucide-react";
import { useAgendaStore } from "@/modules/agenda/state/useAgendaStore";

export function AgendaDay() {
  const methods = GlobalStepper.useStepper();
  const nameId = useParams().id;
  const { selectedDay, setSelectedDay } = useAgendaStore();

  const { data, isLoading, isError } = useAgendaAvailability({
    companyNameId: nameId as string,
  });
  const availableDays = data?.availableDays || [];

  if (isLoading) return <div className="p-4">Cargando...</div>;
  if (isError) return <div className="p-4">Error al cargar los datos</div>;

  const formatDate = (dateString: string) => {
    const date = Temporal.PlainDate.from(dateString);
    const dayNumber = date.day;
    const monthName = date.toLocaleString("es-ES", { month: "short" });
    const weekDayName = date.toLocaleString("es-ES", { weekday: "short" });

    return {
      dayNumber,
      monthName,
      weekDayName: weekDayName.charAt(0).toUpperCase() + weekDayName.slice(1),
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant={"outline"} size={"icon"} onClick={() => methods.prev()}>
          <ArrowLeft />
        </Button>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{methods.current.title}</h2>
          <p className="text-sm text-muted-foreground">
            {methods.current.description}
          </p>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-4">
        {availableDays.map((day) => (
          <Card key={day.date} className="w-full cursor-pointer" onClick={() => {setSelectedDay(new Date(day.date)); methods.next()}}>
            <CardHeader className="flex justify-between items-center">
              <p>
                {formatDate(day.date).weekDayName}{" "}
                {formatDate(day.date).dayNumber}{" "}
                {formatDate(day.date).monthName}
              </p>
              <Badge variant={"secondary"}>Disponible</Badge>
            </CardHeader>
            <CardContent className="flex gap-2">
              <p className="font-semibold">Emplados: </p>
              <div className="flex flex-wrap gap-2">
                {
                  day.employees.map((employee) => (
                    <Badge key={employee.id}>{employee.name}</Badge>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
