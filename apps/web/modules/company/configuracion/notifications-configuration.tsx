import { Button } from "@meetzen/ui/src/components/button";
import { Input } from "@meetzen/ui/src/components/input";
import { Label } from "@meetzen/ui/src/components/label";
import { Facebook, Instagram } from "lucide-react";

import { FaTiktok } from "react-icons/fa6";

export function NotificationsConfiguration() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base/7 font-semibold">
          Redes Sociales de la Empresa
        </h2>
        <p className="mt-1 text-sm/6 text-muted-foreground">
          Aquí puedes configurar las redes sociales de tu empresa. Asegúrate de
          que la información sea precisa y esté actualizada.
        </p>
      </div>

      <form className="bg-gradient-to-t from-primary/5 to-card dark:bg-card border sm:rounded-xl lg:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Label
                htmlFor="first-name"
                className="block text-sm/6 font-medium flex items-center gap-1"
              >
                <Facebook className="size-4 text-blue-600" /> Facebook
              </Label>
              <div className="mt-2">
                <Input
                  placeholder="https://www.facebook.com/tuempresa"
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <Label
                htmlFor="last-name"
                className="block text-sm/6 font-medium flex items-center gap-1"
              >
                <Instagram className="size-4 text-pink-600" /> Instagram
              </Label>
              <div className="mt-2">
                <Input
                  placeholder="https://www.instagram.com/tuempresa"
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <Label
                htmlFor="last-name"
                className="block text-sm/6 font-medium flex items-center gap-1"
              >
                <FaTiktok className="size-4 text-white" /> TikTok
              </Label>
              <div className="mt-2">
                <Input
                  placeholder="https://www.tiktok.com/@tuempresa"
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-2 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </div>
  );
}
