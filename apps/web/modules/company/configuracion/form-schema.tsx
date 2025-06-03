import { z } from "zod"

export const formSchema = z.object({
  logo: z.string().optional(),
  companyName: z.string().min(2, {
    message: "El nombre de la empresa debe tener al menos 2 caracteres.",
  }),
  phone: z.string().min(7, {
    message: "El teléfono debe tener al menos 7 dígitos.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  website: z.string().optional(),
  country: z.string({
    required_error: "Por favor seleccione un país.",
  }),
  city: z.string().min(2, {
    message: "Por favor ingrese una ciudad válida.",
  }),
  zipCode: z.string().min(3, {
    message: "Por favor ingrese un código postal válido.",
  }),
  address: z.string().min(5, {
    message: "Por favor ingrese una dirección válida.",
  }),
  industry: z.string({
    required_error: "Por favor seleccione un sector industrial.",
  }),
  description: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
})

export type FormData = z.infer<typeof formSchema>
