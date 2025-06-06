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

import { ServiciosService } from "@/modules/company/servicios/services/servicios-service";
import { useServicios } from "@/modules/company/servicios/hooks/useServicios";
import { useCategories } from "@/modules/company/servicios/category/hooks/useCategory";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@meetzen/ui/src/components/select";

const schema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  price: z.coerce.number().min(0, {
    message: "El precio debe ser mayor a 0.",
  }),
  duration: z.coerce.number().min(1, {
    message: "La duración debe ser mayor a 0.",
  }),
  categoryId: z.string().optional()
});

export function ServicioCreateForm() {
  const { refetch } = useServicios();
  const { data: categories } = useCategories();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      duration: 0,
      categoryId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setIsLoading(true);
      await ServiciosService.createService(values);
      await refetch();
      await form.reset();
      toast.success("El servicio fue creado", {
        description: "Ahora puedes verlo en la tabla de servicios",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Hubo un error al crear el servicio", {
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
                  <FormLabel>Nombre del servicio
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del servicio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field: { value, onChange, ...restField } }) => (
                <FormItem>
                  <FormLabel>Precio
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...restField}
                      value={value === 0 ? "" : value}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        onChange(
                          inputValue === "" ? 0 : parseFloat(inputValue)
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
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duración en minutos
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Duración" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Categoria
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.data?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          {isLoading ? "Subiendo servicio..." : "Crear servicio"}
        </Button>
      </form>
    </Form>
  );
}