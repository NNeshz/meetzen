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

export function AgendaEmployee() {
  const methods = GlobalStepper.useStepper();
  const nameId = useParams().id;
  const { selectedDay, setSelectedEmployeeName, setSelectedEmployeeId, selectedEmployeeId } = useAgendaStore();

  const { data, isLoading, isError } = useAgendaAvailability({
    companyNameId: nameId as string,
  });
  const availableDays = data?.availableDays || [];

  if (isLoading) return <div className="p-4">Cargando...</div>;
  if (isError) return <div className="p-4">Error al cargar los datos</div>;

  // Encontrar el día seleccionado y obtener sus empleados disponibles
  const selectedDayData = availableDays.find(day => {
    const dayDate = new Date(day.date);
    return selectedDay && 
           dayDate.getFullYear() === selectedDay.getFullYear() &&
           dayDate.getMonth() === selectedDay.getMonth() &&
           dayDate.getDate() === selectedDay.getDate();
  });

  const availableEmployees = selectedDayData?.employees || [];

  const formatDate = (date: Date) => {
    const plainDate = Temporal.PlainDate.from(date.toISOString().split('T')[0]);
    const dayNumber = plainDate.day;
    const monthName = plainDate.toLocaleString("es-ES", { month: "short" });
    const weekDayName = plainDate.toLocaleString("es-ES", { weekday: "short" });

    return {
      dayNumber,
      monthName,
      weekDayName: weekDayName.charAt(0).toUpperCase() + weekDayName.slice(1),
    };
  };

  const handleEmployeeSelect = (employee: { id: string; name: string; }) => {
    setSelectedEmployeeName(employee.name);
    setSelectedEmployeeId(employee.id);
    methods.next();
  };

  // Si no hay día seleccionado, mostrar mensaje
  if (!selectedDay) {
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
        <div className="p-4">
          <p>No hay día seleccionado. Por favor, selecciona un día primero.</p>
        </div>
      </div>
    );
  }

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

      {/* Mostrar el día seleccionado */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">
              Día seleccionado: {formatDate(selectedDay).weekDayName}{" "}
              {formatDate(selectedDay).dayNumber}{" "}
              {formatDate(selectedDay).monthName}
            </p>
            <Badge variant={"outline"}>
              {availableEmployees.length} empleado{availableEmployees.length !== 1 ? 's' : ''} disponible{availableEmployees.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de empleados disponibles */}
      <div className="w-full h-full flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Selecciona un empleado:</h3>
        {availableEmployees.length === 0 ? (
          <Card className="w-full">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                No hay empleados disponibles para este día.
              </p>
            </CardContent>
          </Card>
        ) : (
          availableEmployees.map((employee) => (
            <Card 
              key={employee.id} 
              className={`w-full cursor-pointer transition-all hover:shadow-md ${
                selectedEmployeeId === employee.id 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : ''
              }`}
              onClick={() => handleEmployeeSelect(employee)}
            >
              <CardHeader className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {employee.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">Empleado disponible</p>
                  </div>
                </div>
                <Badge variant={"secondary"}>Disponible</Badge>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}