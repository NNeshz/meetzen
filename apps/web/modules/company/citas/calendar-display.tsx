"use client";

import { Button } from "@meetzen/ui/src/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@meetzen/ui/src/components/dropdown-menu";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { CalendarPlus, Filter } from "lucide-react";
import React, { useState } from "react";

import { Temporal } from "temporal-polyfill";

const DAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const period = i < 12 ? "AM" : "PM";
  return `${hour} ${period}`;
});

function formatSpanishMonthYear(date: Temporal.ZonedDateTime): string {
  const MONTHS_ES = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const monthName = MONTHS_ES[date.month - 1] as string;
  return `${capitalize(monthName)} ${date.year}`;
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getStartOfWeek(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  const dayOffset = date.dayOfWeek % 7;
  return date.subtract({ days: dayOffset });
}

function getDates(
  start: Temporal.ZonedDateTime,
  count: number
): Temporal.ZonedDateTime[] {
  return Array.from({ length: count }, (_, i) => start.add({ days: i }));
}

export function CalendarDisplay() {
  const [view, setView] = useState<"día" | "tres días" | "semana">("semana");
  const [startDate, setStartDate] = useState(() =>
    getStartOfWeek(Temporal.Now.zonedDateTimeISO())
  );

  const columnCount = view === "día" ? 1 : view === "tres días" ? 3 : 7;
  const dates = getDates(startDate, columnCount);

  const handleToday = () => {
    const today = Temporal.Now.zonedDateTimeISO();
    if (view === "semana") {
      setStartDate(getStartOfWeek(today));
    } else {
      setStartDate(today);
    }
  };

  const handleNavigation = (direction: "left" | "right") => {
    const offset = direction === "left" ? -columnCount : columnCount;
    setStartDate(startDate.add({ days: offset }));
  };

  return (
    <div className="space-y-4 md:space-y-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <div className="flex md:flex-row flex-col items-center justify-between space-y-2 md:space-y-0">
        <h4 className="text-2xl font-bold md:mb-0">
          {formatSpanishMonthYear(startDate)}
        </h4>
        <div className="flex gap-2 items-center">
          <Button variant="outline" onClick={() => handleNavigation("left")}>
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            onClick={handleToday}
            className="hidden md:block"
          >
            Hoy
          </Button>
          <Button variant="outline" onClick={() => handleNavigation("right")}>
            <IconChevronRight />
          </Button>
          <div className="h-6 w-px bg-muted" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuRadioGroup
                  value={view}
                  onValueChange={(value) => setView(value as typeof view)}
                >
                  <DropdownMenuRadioItem value="día">Día</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="tres días">
                    Tres días
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="semana">
                    Semana
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="h-6 w-px bg-muted" />
          <Button onClick={handleToday}>
            <CalendarPlus />
            Agregar cita
          </Button>
        </div>
      </div>

      {/* Contenedor de calendario con scroll vertical */}
      <div className="rounded-xl overflow-hidden border">
        {/* Encabezado con días */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `max-content repeat(${columnCount}, 1fr)`,
          }}
        >
          <div className="bg-muted p-2 max-w-24 w-full" />
          {dates.map((date, idx) => {
            const today = Temporal.Now.zonedDateTimeISO();
            const isToday =
              date.year === today.year &&
              date.month === today.month &&
              date.day === today.day;

            return (
              <div
                key={idx}
                className={`p-2 text-center bg-muted font-semibold flex items-center justify-center gap-1 ${
                  isToday ? "text-indigo-500" : ""
                }`}
              >
                <div>{DAYS[date.dayOfWeek % 7]}</div>
                <div>{date.day}</div>
              </div>
            );
          })}
        </div>

        {/* Contenido con scroll */}
        <div
          className="grid overflow-y-scroll h-[calc(100vh-220px)] md:h-[calc(100vh-170px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          style={{
            gridTemplateColumns: `max-content repeat(${columnCount}, 1fr)`,
          }}
        >
          {HOURS.map((hour, hourIdx) => (
            <React.Fragment key={hourIdx}>
              <div className="p-2 text-sm text-right max-w-24 w-full border-b">
                {hour}
              </div>
              {Array.from({ length: columnCount }).map((_, dayIdx) => (
                <div
                  key={`${hourIdx}-${dayIdx}`}
                  className="border-l border-b h-32 transition-colors"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
