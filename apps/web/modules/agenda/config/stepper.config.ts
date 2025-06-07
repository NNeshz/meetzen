import { defineStepper } from "@stepperize/react";

export const GlobalStepper = defineStepper(
  {
    id: "first",
    title: "¿Que servicio necesitas?",
    description: "Selecciona el servicio que necesitas, ¡te vas a enamorar!",
  },
  {
    id: "second",
    title: "¿Para cuando quieres la cita?",
    description: "Selecciona una fecha para mostrarte quien esta disponible",
  },
  {
    id: "third",
    title: "¿Con quien quieres la cita?",
    description:
      "Selecciona a la persona que quieres que te atienda, ¡lo hará con gusto!",
  }
);
