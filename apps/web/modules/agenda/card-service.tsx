import { Button } from "@meetzen/ui/src/components/button";
import { Card, CardContent } from "@meetzen/ui/src/components/card";
import { Badge } from "@meetzen/ui/src/components/badge";
import { Clock, Calendar } from "lucide-react";

export default function CardService() {
  
  
  const services = [
    {
      id: 1,
      name: "Corte de Cabello Premium",
      description:
        "Corte personalizado con lavado, peinado y acabado profesional",
      duration: "45 min",
      price: "$25.000",
      category: "Cabello",
    },
  ];

 return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6 ">

      {services.map((service) => (
        <Card key={service.id} className="w-full overflow-hidden border-0 shadow-lg bg-black">
          <CardContent className="p-0">
            {/* Vista Desktop */}
            <div className="hidden lg:flex lg:items-center">
              <div className="flex-1 p-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                      <Badge
                        variant="outline"
                        className="text-xs font-semibold text-black border-1 border-white bg-gray-400"
                      >
                        {service.category}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{service.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 p-8 border-l border-white bg-black">
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-500">{service.price}</p>
                  <p className="text-sm text-gray-400">por sesión</p>
                </div>
                <Button className="px-8 py-3 text-base font-medium bg-white hover:bg-gray-100 text-black">
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar
                </Button>
              </div>
            </div>

            {/* Vista Mobile */}
            <div className="lg:hidden">
              
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold text-white leading-tight flex-1">{service.name}</h3>
                  <Badge className="text-xs font-semibold text-black border-1 border-white bg-gray-400 shrink-0">
                    {service.category}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{service.duration}</span>
                </div>
              </div>

              <div className="bg-black p-6 flex items-center justify-between border-t border-gray-800">
                <div>
                  <p className="text-2xl font-bold text-green-500">{service.price}</p>
                  <p className="text-sm text-gray-400">por sesión</p>
                </div>
                <Button className="bg-white hover:bg-gray-100 text-black px-6 py-2.5 font-medium">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
