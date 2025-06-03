import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@meetzen/ui/src/components/button";
import { Input } from "@meetzen/ui/src/components/input";
import { Textarea } from "@meetzen/ui/src/components/textarea";

export function ProfileConfiguration() {
    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base/7 font-semibold">Perfil de la empresa</h2>
          <p className="mt-1 text-sm/6 text-muted-foreground">
            Esta información será mostrada públicamente, por lo que ten cuidado al compartir.
          </p>
        </div>

        <form className="bg-gradient-to-t from-primary/5 to-card dark:bg-card border shadow-xs ring-1 ring-gray-900/5 rounded-xl lg:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm/6 font-medium">
                  Nombre de la empresa
                </label>
                <div className="mt-2">
                  <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="janesmith"
                    />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm/6 font-medium">
                  Descripción de la empresa
                </label>
                <div className="mt-2">
                  <Textarea
                    id="about"
                    name="about"
                    rows={3}
                    defaultValue={''}
                  />
                </div>
                <p className="mt-3 text-sm/6 text-muted-foreground">Escribe un par de frases sobre tu negocio.</p>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm/6 font-medium">
                  Logo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden"
                      >
                        <span>Subir archivo</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">o arrastrar y soltar</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-2 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button
              type="submit"
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
    )
}