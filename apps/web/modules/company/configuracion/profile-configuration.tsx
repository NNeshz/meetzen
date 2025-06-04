"use client"

import type React from "react"

import { Button } from "@meetzen/ui/src/components/button"
import { Input } from "@meetzen/ui/src/components/input"
import { Textarea } from "@meetzen/ui/src/components/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@meetzen/ui/src/components/form"
import { toast } from "sonner"

import { Camera, Loader2 } from "lucide-react"
import Image from "next/image"

import { useState, useRef, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useCompany } from "@/modules/company/configuracion/hooks/useCompany"
import { CompanyService } from "@/modules/company/configuracion/services/company-service"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@meetzen/ui/src/components/select"
import { Checkbox } from "@meetzen/ui/src/components/checkbox"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  companyDescription: z.string().min(20, {
    message: "La descripción debe tener al menos 20 caracteres.",
  }),
  image: z
    .instanceof(File, {
      message: "Debe seleccionar una imagen.",
    })
    .optional(),
  phoneNumber: z.string().min(10, {
    message: "El número telefónico debe tener al menos 10 dígitos.",
  }),
  mapsLocation: z.string().min(2, {
    message: "La ubicación es requerida.",
  }),
  availableDays: z.array(z.string()).min(1, {
    message: "Selecciona al menos un día disponible.",
  }),
  startTime: z.string().min(1, {
    message: "La hora de inicio es requerida.",
  }),
  endTime: z.string().min(1, {
    message: "La hora de cierre es requerida.",
  }),
  pmamStart: z.string().min(1, {
    message: "Selecciona AM o PM para la hora de inicio.",
  }),
  pmamEnd: z.string().min(1, {
    message: "Selecciona AM o PM para la hora de cierre.",
  }),
})

export function ProfileConfiguration() {
  const { data: company, refetch, isLoading: isLoadingCompany } = useCompany()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [originalData, setOriginalData] = useState<{
    name: string
    companyDescription: string
    image: string | null
    phoneNumber: string
    mapsLocation: string
    availableDays: string[]
    startTime: string
    endTime: string
    pmamStart: string
    pmamEnd: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyDescription: "",
      phoneNumber: "",
      mapsLocation: "",
      availableDays: [],
      startTime: "",
      endTime: "",
      pmamStart: "AM",
      pmamEnd: "PM",
    },
  })

  useEffect(() => {
    if (company?.success && company.data) {
      const companyData = {
        name: company.data.name || "",
        companyDescription: company.data.companyDescription || "",
        image: company.data.image || null,
        phoneNumber: company.data.phoneNumber || "",
        mapsLocation: company.data.mapsLocation || "",
        availableDays: company.data.availableDays || [],
        startTime: company.data.startTime || "",
        endTime: company.data.endTime || "",
        pmamStart: company.data.pmamStart || "AM",
        pmamEnd: company.data.pmamEnd || "PM",
      }

      // Establecer los datos originales
      setOriginalData(companyData)

      // Establecer los valores del formulario
      form.setValue("name", companyData.name)
      form.setValue("companyDescription", companyData.companyDescription)
      form.setValue("phoneNumber", companyData.phoneNumber)
      form.setValue("mapsLocation", companyData.mapsLocation)
      form.setValue("availableDays", companyData.availableDays)
      form.setValue("startTime", companyData.startTime)
      form.setValue("endTime", companyData.endTime)
      form.setValue("pmamStart", companyData.pmamStart)
      form.setValue("pmamEnd", companyData.pmamEnd)

      if (companyData.image) {
        setPreviewImage(companyData.image)
      }
    }
  }, [company, form])

  console.log(company)

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue("image", file)
    }
  }

  function handleImageClick() {
    fileInputRef.current?.click()
  }

  function handleCancel() {
    if (originalData) {
      form.setValue("name", originalData.name)
      form.setValue("companyDescription", originalData.companyDescription)
      form.setValue("image", undefined)
      form.setValue("phoneNumber", originalData.phoneNumber)
      form.setValue("mapsLocation", originalData.mapsLocation)
      form.setValue("availableDays", originalData.availableDays)
      form.setValue("startTime", originalData.startTime)
      form.setValue("endTime", originalData.endTime)
      form.setValue("pmamStart", originalData.pmamStart)
      form.setValue("pmamEnd", originalData.pmamEnd)

      // Resetear preview de imagen
      setPreviewImage(originalData.image)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await CompanyService.createBasicInformation(values)
      await refetch()
      toast.success("Información guardada exitosamente")
    } catch (error) {
      toast.error("Error al guardar la información")
    } finally {
      setIsLoading(false)
    }
  }

  // Mostrar spinner de carga mientras se cargan los datos de la empresa
  if (isLoadingCompany) {
    return (
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base/7 font-semibold">Perfil de la empresa</h2>
          <p className="mt-1 text-sm/6 text-muted-foreground">
            Esta información será mostrada públicamente, por lo que ten cuidado al compartir.
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
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base/7 font-semibold">Perfil de la empresa</h2>
        <p className="mt-1 text-sm/6 text-muted-foreground">
          Esta información será mostrada públicamente, por lo que ten cuidado al compartir.
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
                      <FormLabel>
                        Nombre de la empresa<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresa el nombre de tu empresa" {...field} />
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
                      <FormLabel>
                        Descripción de la empresa<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="Describe brevemente tu empresa..." {...field} />
                      </FormControl>
                      <FormDescription>Describe brevemente tu empresa.</FormDescription>
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
                      <FormLabel>
                        Logo de la empresa<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div
                          className="relative w-full aspect-square max-w-xs border-2 border-dashed border-input rounded-lg overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                          onClick={handleImageClick}
                        >
                          {previewImage ? (
                            <Image
                              src={previewImage || "/placeholder.svg"}
                              alt="Vista previa del logo"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                              <Camera className="w-12 h-12 mb-2" />
                              <p className="text-sm text-center px-2">Haz clic para subir el logo</p>
                              <p className="text-xs text-center px-2 mt-1">PNG, JPG hasta 10MB</p>
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
                      <FormDescription>Sube el logo de tu empresa. Se mostrará en tu perfil público.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Número telefónico<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresa el número telefónico" {...field} />
                      </FormControl>
                      <FormDescription>Número de contacto para tus clientes.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="mapsLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Ubicación<span className="text-red-500">*</span>
                      </FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresa la ubicación de tu empresa" {...field} />
                        </FormControl>            
                      <FormDescription>Ubicación de tu empresa en Google Maps.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="availableDays"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>
                          Días disponibles<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormDescription>Selecciona los días en que tu empresa está abierta.</FormDescription>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                          <FormField
                            key={day}
                            control={form.control}
                            name="availableDays"
                            render={({ field }) => {
                              return (
                                <FormItem key={day} className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(day)}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || []
                                        return checked
                                          ? field.onChange([...currentValue, day])
                                          : field.onChange(currentValue.filter((value) => value !== day))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{day}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-6 col-span-full">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Hora de apertura<span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="flex space-x-2">
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Hora" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                <SelectItem key={hour} value={hour.toString()}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormField
                            control={form.control}
                            name="pmamStart"
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="AM/PM" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="AM">AM</SelectItem>
                                    <SelectItem value="PM">PM</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Hora de cierre<span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="flex space-x-2">
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Hora" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                <SelectItem key={hour} value={hour.toString()}>
                                  {hour}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormField
                            control={form.control}
                            name="pmamEnd"
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="AM/PM" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="AM">AM</SelectItem>
                                    <SelectItem value="PM">PM</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
  )
}