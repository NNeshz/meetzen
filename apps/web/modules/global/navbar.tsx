'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@meetzen/ui/src/components/button"
import Link from "next/link"

const links = [
  {
    name: "Features",
    href: "/features",
  },
  {
    name: "Demo",
    href: "/demo",
  },
  {
    name: "Contacto",
    href: "/contacto",
  }
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-4 z-50 w-full flex justify-center px-4">
        <nav className="w-full max-w-7xl p-4 flex items-center shadow-lg justify-between bg-background backdrop-blur-md rounded-lg">
          {/* Logo */}
          <div className="text-xl font-medium tracking-tighter">meetzen.</div>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-8 text-muted-foreground font-medium tracking-tighter">
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-foreground transition">{link.name}</Link>
              </li>
            ))}
          </ul>

          {/* Sign in button */}
          <div className="hidden md:block">
            <Button variant="default">Iniciar sesión</Button>
          </div>

          {/* Mobile Menu Button with Icon Animation */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Menu with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background text-white flex flex-col justify-between px-6 py-10"
          >
            {/* Top bar */}
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">meetzen.</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(false)}
                className="relative overflow-hidden"
              >
                <motion.div
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <X className="h-6 w-6 text-white" />
                </motion.div>
              </Button>
            </div>

            {/* Links */}
            <ul className="flex flex-col gap-6 text-3xl font-semibold mt-5">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Bottom buttons */}
            <div className="flex gap-4 mt-10">
              <Button className="w-full">
                Iniciar sesión
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}