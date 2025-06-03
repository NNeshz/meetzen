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
import { Input } from "@meetzen/ui/src/components/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@meetzen/ui/src/components/card";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Music,
} from "lucide-react";
import type { FormData } from "../form-schema";

interface SocialMediaStepProps {
  form: UseFormReturn<FormData>;
}

export function SocialMediaStep({ form }: SocialMediaStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Redes Sociales</CardTitle>
          <CardDescription>
            Agregue los enlaces a las redes sociales de su empresa para mejorar
            su presencia digital.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    Facebook
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://facebook.com/tu-empresa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-pink-600" />
                    Instagram
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://instagram.com/tu-empresa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-sky-500" />
                    Twitter / X
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://twitter.com/tu-empresa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-700" />
                    LinkedIn
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/company/tu-empresa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-red-600" />
                    YouTube
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/@tu-empresa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tiktok"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Music className="h-4 w-4 text-black" />
                    TikTok
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://tiktok.com/@tu-empresa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormDescription className="text-center text-sm text-muted-foreground">
            Todos los campos de redes sociales son opcionales. Solo complete los
            que su empresa utilice activamente.
          </FormDescription>
        </CardContent>
      </Card>
    </div>
  );
}
