"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@meetzen/ui/src/components/form";
import { Button } from "@meetzen/ui/src/components/button";
import { Input } from "@meetzen/ui/src/components/input";

import { toast } from "sonner";

import { CategoryService } from "@/modules/company/servicios/category/services/category-service";
import { useCategories } from "@/modules/company/servicios/category/hooks/useCategory";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
});

export function CategoryCreateForm() {

    const { data: categories, refetch } = useCategories();
    const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setIsLoading(true);
      await CategoryService.createCategory(data);
      await refetch();
      await form.reset();
      toast.success("La categoria fue creada exitosamente")
    } catch (error) {
      toast.error("Hubo un error al crear la categoria")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">{
          isLoading ? (
            "Guardando..."
        ) : (
            "Guardar"
          )
        }</Button>
      </form>
    </Form>
  );
}
