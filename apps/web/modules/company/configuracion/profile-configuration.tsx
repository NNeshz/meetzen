"use client";

import type React from "react";

import { Button } from "@meetzen/ui/src/components/button";
import { Input } from "@meetzen/ui/src/components/input";
import { Textarea } from "@meetzen/ui/src/components/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@meetzen/ui/src/components/form";
import { toast } from "sonner";

import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCompany } from "@/modules/company/configuracion/hooks/useCompany";
import { CompanyService } from "@/modules/company/configuracion/services/company-service";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  companyDescription: z.string().min(20, {
    message: "La descripción debe tener al menos 20 caracteres.",
  }),
  image: z.instanceof(File, {
    message: "Debe seleccionar una imagen.",
  }).optional(),
});

export function ProfileConfiguration() {
  const { data: company, refetch, isLoading: isLoadingCompany } = useCompany();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<{
    name: string;
    companyDescription: string;
    image: string | null;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyDescription: "",
    },
  });

  useEffect(() => {
    if (company?.success && company.data) {
      const companyData = {
        name: company.data.name || "",
        companyDescription: company.data.companyDescription || "",
        image: company.data.image || null,
      };
      
      // Establecer los datos originales
      setOriginalData(companyData);
      
      // Establecer los valores del formulario
      form.setValue("name", companyData.name);
      form.setValue("companyDescription", companyData.companyDescription);
      
      if (companyData.image) {
        setPreviewImage(companyData.image);
      }
    }
  }, [company, form]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  }

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  function handleCancel() {
    if (originalData) {
      form.setValue("name", originalData.name);
      form.setValue("companyDescription", originalData.companyDescription);
      form.setValue("image", undefined);
      
      // Resetear preview de imagen
      setPreviewImage(originalData.image);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await CompanyService.createBasicInformation(values);
      await refetch();
      toast.success("Información guardada exitosamente");
    } catch (error) {
      toast.error("Error al guardar la información");
    } finally {
      setIsLoading(false);
    }
  }

  // Mostrar spinner de carga mientras se cargan los datos de la empresa
  if (isLoadingCompany) {
    return (
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base/7 font-semibold">Perfil de la empresa</h2>
          <p className="mt-1 text-sm/6 text-muted-foreground">
            Esta información será mostrada públicamente, por lo que ten cuidado al
            compartir.
          </p>
        </div>

        <div className="bg-gradient-to-t from-primary/5 to-card dark:bg-card border shadow-xs ring-1 ring-gray-900/5 rounded-xl lg:col-span-2">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-sm text-muted-foreground">Cargando información de la empresa...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base/7 font-semibold">Perfil de la empresa</h2>
        <p className="mt-1 text-sm/6 text-muted-foreground">
          Esta información será mostrada públicamente, por lo que ten cuidado al
          compartir.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-gradient-to-t from-primary/5 to-card dark:bg-card border shadow-xs ring-1 ring-gray-900/5 rounded-xl lg:col-span-2"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la empresa<span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa el nombre de tu empresa"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="companyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción de la empresa<span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Describe brevemente tu empresa..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Describe brevemente tu empresa.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Logo de la empresa<span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div
                          className="relative w-full aspect-square max-w-xs border-2 border-dashed border-input rounded-lg overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                          onClick={handleImageClick}
                        >
                          {previewImage ? (
                            <Image
                              src={previewImage}
                              alt="Vista previa del logo"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                              <Camera className="w-12 h-12 mb-2" />
                              <p className="text-sm text-center px-2">
                                Haz clic para subir el logo
                              </p>
                              <p className="text-xs text-center px-2 mt-1">
                                PNG, JPG hasta 10MB
                              </p>
                            </div>
                          )}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg, image/jpg, image/png"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Sube el logo de tu empresa. Se mostrará en tu perfil
                        público.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-2 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}