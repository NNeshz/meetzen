'use client'

import Link from "next/link";
import { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@meetzen/ui/src/components/tabs";
import { 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Heart,
  Sun,
  Moon,
  Monitor
} from "lucide-react";

const productLinks = [
  {
    name: "Features",
    href: "/features",
    description: "Conoce todas las funcionalidades"
  },
  {
    name: "Demo",
    href: "/demo",
    description: "Prueba nuestra plataforma"
  },
  {
    name: "Contacto",
    href: "/contacto",
    description: "Habla con nuestro equipo"
  },
];

const legalLinks = [
  {
    name: "Términos",
    href: "/terminos",
    description: "Condiciones de uso"
  },
  {
    name: "Privacidad",
    href: "/privacidad",
    description: "Política de privacidad"
  },
  {
    name: "Seguridad",
    href: "/seguridad",
    description: "Cómo protegemos tus datos"
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/meetzen",
    icon: Instagram,
    color: "hover:text-pink-500"
  },
  {
    name: "Facebook",
    href: "https://facebook.com/meetzen",
    icon: Facebook,
    color: "hover:text-blue-600"
  },
  {
    name: "Twitter",
    href: "https://twitter.com/meetzen",
    icon: Twitter,
    color: "hover:text-sky-500"
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/meetzen",
    icon: Linkedin,
    color: "hover:text-blue-700"
  },
];

export function Footer() {
  const [currentTheme, setCurrentTheme] = useState("system");

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    // Aquí iría la lógica real de cambio de tema
    console.log(`Tema cambiado a: ${theme}`);
  };

  return (
    <footer className="mt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Sección principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Información de contacto y redes sociales */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Conecta con nosotros
              </h3>
              
              {/* Email de contacto */}
              <Link 
                href="mailto:hi@meetzen.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">hi@meetzen.com</span>
              </Link>
            </div>

            {/* Redes sociales */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Síguenos
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg bg-muted/50 text-muted-foreground transition-all duration-300 hover:bg-muted ${social.color} hover:scale-110`}
                      aria-label={`Seguir en ${social.name}`}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Producto */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Producto
            </h3>
            <nav className="space-y-4">
              {productLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block group"
                >
                  <div className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                    <p className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </p>
                    <p className="text-sm mt-1 opacity-70">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Legal
            </h3>
            <nav className="space-y-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block group"
                >
                  <div className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                    <p className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </p>
                    <p className="text-sm mt-1 opacity-70">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Tema */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Apariencia
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Personaliza tu experiencia visual
              </p>
              
              <Tabs 
                value={currentTheme} 
                onValueChange={handleThemeChange}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                  <TabsTrigger 
                    value="system" 
                    className="flex items-center gap-2 text-xs"
                  >
                    <Monitor className="w-4 h-4" />
                    Sistema
                  </TabsTrigger>
                  <TabsTrigger 
                    value="light"
                    className="flex items-center gap-2 text-xs"
                  >
                    <Sun className="w-4 h-4" />
                    Claro
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dark"
                    className="flex items-center gap-2 text-xs"
                  >
                    <Moon className="w-4 h-4" />
                    Oscuro
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-border"></div>

        {/* Footer bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>© 2025 Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>por Meetzen</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Versión 2.1.0</span>
            <span>•</span>
            <span>Tlaxcala, México</span>
          </div>
        </div>
      </div>
    </footer>
  );
}