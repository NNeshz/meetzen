import { Button } from "@meetzen/ui/src/components/button";
import { Input } from "@meetzen/ui/src/components/input";
import { Label } from "@meetzen/ui/src/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@meetzen/ui/src/components/select";

export function PersonalConfiguration() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 lg:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base/7 font-semibold">Información de Contacto</h2>
        <p className="mt-1 text-sm/6 text-muted-foreground">
          Esta información se utiliza para contactarte en caso de que sea
          necesario. Asegúrate de que sea precisa y esté actualizada.
        </p>
      </div>

      <form className="bg-gradient-to-t from-primary/5 to-card dark:bg-card border sm:rounded-xl lg:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Label
                htmlFor="first-name"
                className="block text-sm/6 font-medium"
              >
                Número de Teléfono
              </Label>
              <div className="mt-2">
                <Input
                  id="first-name"
                  name="first-name"
                  type="number"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <Label
                htmlFor="last-name"
                className="block text-sm/6 font-medium"
              >
                Correo Electrónico
              </Label>
              <div className="mt-2">
                <Input
                  id="last-name"
                  name="last-name"
                  type="email"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <Label htmlFor="email" className="block text-sm/6 font-medium">
                Página Web (Opcional)
              </Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 space-y-2">
              <Label htmlFor="country" className="block text-sm/6 font-medium">
                País
              </Label>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">México</SelectItem>
                  <SelectItem value="dark">Estados Unidos</SelectItem>
                  <SelectItem value="system">Canadá</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-full">
              <Label
                htmlFor="street-address"
                className="block text-sm/6 font-medium"
              >
                Dirección
              </Label>
              <div className="mt-2">
                <Input
                  id="street-address"
                  name="street-address"
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <Label htmlFor="city" className="block text-sm/6 font-medium">
                Ciudad
              </Label>
              <div className="mt-2">
                <Input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="region" className="block text-sm/6 font-medium">
                Estado/Provincia
              </Label>
              <div className="mt-2">
                <Input
                  id="region"
                  name="region"
                  type="text"
                  autoComplete="address-level1"
                  className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label
                htmlFor="postal-code"
                className="block text-sm/6 font-medium"
              >
                ZIP / Postal code
              </Label>
              <div className="mt-2">
                <Input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  autoComplete="postal-code"
                  className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6"
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
