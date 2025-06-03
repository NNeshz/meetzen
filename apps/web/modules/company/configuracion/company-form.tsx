"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@meetzen/ui/src/components/card"
import { Button } from "@meetzen/ui/src/components/button"
import { Input } from "@meetzen/ui/src/components/input"
import { Label } from "@meetzen/ui/src/components/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@meetzen/ui/src/components/select"
import { Textarea } from "@meetzen/ui/src/components/textarea"
import { Upload, Facebook, Instagram, Twitter, Linkedin, Youtube, Music } from "lucide-react"
import Image from "next/image"

const formSchema = z.object({
  logo: z.string().optional(),
  companyName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(7, "El teléfono debe tener al menos 7 dígitos"),
  email: z.string().email("Ingrese un email válido"),
  website: z.string().optional(),
  country: z.string().min(1, "Seleccione un país"),
  city: z.string().min(2, "Ingrese una ciudad válida"),
  zipCode: z.string().min(3, "Ingrese un código postal válido"),
  address: z.string().min(5, "Ingrese una dirección válida"),
  industry: z.string().min(1, "Seleccione un sector"),
  description: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const countries = [
  { label: "Argentina", value: "AR" },
  { label: "Bolivia", value: "BO" },
  { label: "Chile", value: "CL" },
  { label: "Colombia", value: "CO" },
  { label: "Costa Rica", value: "CR" },
  { label: "Ecuador", value: "EC" },
  { label: "España", value: "ES" },
  { label: "México", value: "MX" },
  { label: "Perú", value: "PE" },
  { label: "Venezuela", value: "VE" },
]

export function CompanyRegistrationForm() {
  const [step, setStep] = useState(1)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const totalSteps = 4

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      phone: "",
      email: "",
      website: "",
      country: "",
      city: "",
      zipCode: "",
      address: "",
      industry: "",
      description: "",
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      youtube: "",
      tiktok: "",
    },
  })

  const watchedCountry = watch("country")
  const watchedIndustry = watch("industry")

  function onSubmit(values: FormData) {
    console.log(values)
    alert("Formulario enviado con éxito!")
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setLogoPreview(result)
        setValue("logo", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const ProgressIndicator = () => (
    <div className="flex justify-center items-center mt-4 space-x-2">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all ${step > i ? "bg-blue-600 w-8" : "bg-gray-300 w-6"}`}
        />
      ))}
    </div>
  )

  const BasicInfoStep = () => (
    <div className="space-y-6">
      {/* Logo Upload */}
      <div className="flex flex-col items-center space-y-4">
        <Label className="text-center">Logo de la Empresa</Label>
        <div className="relative h-32 w-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
          {logoPreview ? (
            <Image src={logoPreview || "/placeholder.svg"} alt="Logo preview" fill className="object-cover" />
          ) : (
            <Upload className="h-10 w-10 text-gray-400" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-sm text-foreground">Haga clic para subir el logo</p>
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName">Nombre de la Empresa</Label>
        <Input id="companyName" placeholder="Ingrese el nombre de su empresa" {...register("companyName")} />
        {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}
      </div>

      {/* Phone and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" placeholder="Ej: +57 300 123 4567" {...register("phone")} />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input id="email" type="email" placeholder="empresa@ejemplo.com" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Sitio Web (Opcional)</Label>
        <Input id="website" placeholder="https://www.ejemplo.com" {...register("website")} />
      </div>
    </div>
  )

  const LocationStep = () => (
    <div className="space-y-6">
      {/* Country */}
      <div className="space-y-2">
        <Label>País</Label>
        <Select onValueChange={(value) => setValue("country", value)} value={watchedCountry}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un país" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
      </div>

      {/* City and Zip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input id="city" placeholder="Ingrese su ciudad" {...register("city")} />
          {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">Código Postal</Label>
          <Input id="zipCode" placeholder="Ej: 110111" {...register("zipCode")} />
          {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode.message}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Input id="address" placeholder="Ingrese la dirección de su empresa" {...register("address")} />
        {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
      </div>
    </div>
  )

  const SocialMediaStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Redes Sociales</CardTitle>
          <CardDescription>Agregue los enlaces a las redes sociales de su empresa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook
              </Label>
              <Input placeholder="https://facebook.com/tu-empresa" {...register("facebook")} />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-600" />
                Instagram
              </Label>
              <Input placeholder="https://instagram.com/tu-empresa" {...register("instagram")} />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Twitter className="h-4 w-4 text-sky-500" />
                Twitter / X
              </Label>
              <Input placeholder="https://twitter.com/tu-empresa" {...register("twitter")} />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-blue-700" />
                LinkedIn
              </Label>
              <Input placeholder="https://linkedin.com/company/tu-empresa" {...register("linkedin")} />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Youtube className="h-4 w-4 text-red-600" />
                YouTube
              </Label>
              <Input placeholder="https://youtube.com/@tu-empresa" {...register("youtube")} />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Music className="h-4 w-4 text-black" />
                TikTok
              </Label>
              <Input placeholder="https://tiktok.com/@tu-empresa" {...register("tiktok")} />
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">Todos los campos son opcionales</p>
        </CardContent>
      </Card>
    </div>
  )

  const AdditionalInfoStep = () => (
    <div className="space-y-6">
      {/* Industry */}
      <div className="space-y-2">
        <Label>Sector Industrial</Label>
        <Select onValueChange={(value) => setValue("industry", value)} value={watchedIndustry}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un sector" />
          </SelectTrigger>
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
        {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Descripción de la Empresa (Opcional)</Label>
        <Textarea
          id="description"
          placeholder="Describa brevemente su empresa y sus actividades principales"
          className="min-h-[120px]"
          {...register("description")}
        />
        <p className="text-sm text-gray-500">Máximo 500 caracteres</p>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <BasicInfoStep />
      case 2:
        return <LocationStep />
      case 3:
        return <SocialMediaStep />
      case 4:
        return <AdditionalInfoStep />
      default:
        return <BasicInfoStep />
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Registro de Empresa</CardTitle>
        <CardDescription>Complete el formulario para registrar su empresa</CardDescription>
        <ProgressIndicator />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {renderCurrentStep()}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={step === 1}>
          Anterior
        </Button>
        <div className="flex space-x-2">
          {step < totalSteps ? (
            <Button onClick={nextStep}>Siguiente</Button>
          ) : (
            <Button onClick={handleSubmit(onSubmit)} type="submit">
              Registrar Empresa
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
