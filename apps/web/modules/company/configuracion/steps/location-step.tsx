"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@meetzen/ui/src/components/form";
import { Input } from "@meetzen/ui/src/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@meetzen/ui/src/components/select";
import type { FormData } from "../form-schema";

interface LocationStepProps {
  form: UseFormReturn<FormData>;
}

const countries = [
  { label: "Argentina", value: "AR" },
  { label: "Bolivia", value: "BO" },
  { label: "Chile", value: "CL" },
  { label: "Colombia", value: "CO" },
  { label: "Costa Rica", value: "CR" },
  { label: "Cuba", value: "CU" },
  { label: "Ecuador", value: "EC" },
  { label: "El Salvador", value: "SV" },
  { label: "España", value: "ES" },
  { label: "Guatemala", value: "GT" },
  { label: "Honduras", value: "HN" },
  { label: "México", value: "MX" },
  { label: "Nicaragua", value: "NI" },
  { label: "Panamá", value: "PA" },
  { label: "Paraguay", value: "PY" },
  { label: "Perú", value: "PE" },
  { label: "Puerto Rico", value: "PR" },
  { label: "República Dominicana", value: "DO" },
  { label: "Uruguay", value: "UY" },
  { label: "Venezuela", value: "VE" },
];

export function LocationStep({ form }: LocationStepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>País</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un país" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su ciudad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código Postal</FormLabel>
              <FormControl>
                <Input placeholder="Ej: 110111" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dirección</FormLabel>
            <FormControl>
              <Input
                placeholder="Ingrese la dirección de su empresa"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
