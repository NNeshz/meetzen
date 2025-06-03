"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@meetzen/ui/src/components/form";
import { Input } from "@meetzen/ui/src/components/input";
import { LogoUpload } from "../logo-upload";
import type { FormData } from "../form-schema";

interface BasicInfoStepProps {
  form: UseFormReturn<FormData>;
}

export function BasicInfoStep({ form }: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="logo"
        render={({ field }) => (
          <FormItem className="flex flex-col items-center justify-center space-y-4">
            <FormLabel className="text-center">Logo de la Empresa</FormLabel>
            <FormControl>
              <LogoUpload onChange={field.onChange} value={field.value} />
            </FormControl>
            <FormDescription>
              Haga clic para subir el logo de su empresa
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre de la Empresa</FormLabel>
            <FormControl>
              <Input placeholder="Ingrese el nombre de su empresa" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="Ej: +57 300 123 4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="empresa@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sitio Web (Opcional)</FormLabel>
            <FormControl>
              <Input placeholder="https://www.ejemplo.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
