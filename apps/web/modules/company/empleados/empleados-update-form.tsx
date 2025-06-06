"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@meetzen/ui/src/components/button";
import { Input } from "@meetzen/ui/src/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@meetzen/ui/src/components/form";
import { toast } from "sonner";

import { EmpleadosService } from "@/modules/company/empleados/services/empleados-service";
import { useEmpleados } from "@/modules/company/empleados/hooks/useEmpleados";
import { Employee } from "@/modules/company/empleados/empleados-table";

const schema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  phoneNumber: z.string().min(10, {
    message: "El número debe tener al menos 10 caracteres.",
  }),
  address: z.string().min(2, {
    message: "La dirección debe tener al menos 2 caracteres.",
  }),
});

export function EmpleadosUpdateForm({ employee }: { employee: Employee }) {
  const { refetch } = useEmpleados();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: employee,
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setIsLoading(true);
      await EmpleadosService.updateEmployee(employee.id, values);
      await refetch();
      await form.reset();
      toast("El empleado fue actualizado", {
        description: "Ahora puedes verlo en la tabla de empleados",
        duration: 3000,
      });
    } catch (error) {
      toast("Hubo un error al actualizar el empleado", {
        description: "Intentalo de nuevo más tarde",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 grid-cols-1 items-start">
          {/* Inputs del lado derecho */}
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del empleado
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del empleado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de teléfono
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        field.onChange(
                          inputValue === "" ? "" : inputValue
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Subiendo empleado..." : "Crear empleado"}
        </Button>
      </form>
    </Form>
  );
}