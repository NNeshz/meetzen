import { t } from "elysia";

export const createAppointmentSchema = t.Object({
  summary: t.String({
    minLength: 3,
    error: "El título debe tener al menos 3 caracteres.",
  }),
  description: t.Optional(
    t.String()
  ),
  startTime: t.String({
    format: "date-time",
    error: "La fecha de inicio debe tener un formato ISO 8601 válido.",
  }),
  endTime: t.String({
    format: "date-time",
    error: "La fecha de fin debe tener un formato ISO 8601 válido.",
  }),
});