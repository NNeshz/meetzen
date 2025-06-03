"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@meetzen/ui/src/components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@meetzen/ui/src/components/select";
import { Textarea } from "@meetzen/ui/src/components/textarea";
import type { FormData } from "../form-schema";

interface AdditionalInfoStepProps {
  form: UseFormReturn<FormData>;
}

export function AdditionalInfoStep({ form }: AdditionalInfoStepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sector Industrial</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un sector" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="technology">Tecnología</SelectItem>
                <SelectItem value="finance">Finanzas</SelectItem>
                <SelectItem value="healthcare">Salud</SelectItem>
                <SelectItem value="education">Educación</SelectItem>
                <SelectItem value="retail">Comercio</SelectItem>
                <SelectItem value="manufacturing">Manufactura</SelectItem>
                <SelectItem value="services">Servicios</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descripción de la Empresa (Opcional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describa brevemente su empresa y sus actividades principales"
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>Máximo 500 caracteres</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
