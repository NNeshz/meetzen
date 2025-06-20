"use client"

import { Button } from "@meetzen/ui/src/components/button"
import Image from "next/image"
import { Badge } from "@meetzen/ui/src/components/badge"
import { motion } from "framer-motion"

export function Hero() {
  // Variantes de animación para el contenedor principal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  } as const

  // Variantes para elementos que aparecen desde abajo
  const slideUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  } as const

  // Variantes para el badge
  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: -20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.175, 0.885, 0.32, 1.275] as const
      }
    }
  } as const

  // Variantes para los botones
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  } as const

  // Variantes para la imagen del dashboard
  const imageVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  } as const

  // Variantes para los efectos de fondo de la imagen
  const backgroundEffectVariants = {
    hidden: { 
      opacity: 0,
      scale: 1.1
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  } as const

  return (
    <div className="min-h-screen w-full relative">
      <motion.div 
        className="relative z-20 max-w-7xl mx-auto px-4 xl:px-0 pt-32 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center space-y-6 mb-16">
          <motion.div variants={badgeVariants}>
            <Badge variant="outline">
              La plataforma más completa
            </Badge>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
            variants={slideUpVariants}
          >
            Controla tus citas <br />
            con completa facilidad
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={slideUpVariants}
          >
            Plataforma para gestionar citas de manera automática. Todo el tiempo, 
            desde cualquier lugar.{" "}
            <motion.span 
              className="font-semibold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              15 minutos te ahorrarán horas de trabajo.
            </motion.span>
          </motion.p>

          <motion.div 
            className="flex gap-4 justify-center items-center"
            variants={slideUpVariants}
          >
            <motion.div variants={buttonVariants}>
              <Button 
                size="lg"
                className="hover:scale-105 transition-transform duration-200"
              >
                Comenzar gratis
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Button 
                size="lg" 
                variant="outline"
                className="hover:scale-105 transition-transform duration-200"
              >
                Ver demo
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="relative mx-auto max-w-7xl"
          variants={imageVariants}
        >
          <div className="relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/20 to-white/20 blur animate-pulse" 
              variants={backgroundEffectVariants}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10 blur-2xl" 
              variants={backgroundEffectVariants}
            />
            
            <motion.div 
              className="relative bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl overflow-hidden shadow-2xl border border-border/50"
              transition={{ 
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-10 opacity-40" />
              
              <div className="relative h-auto w-full">
                <Image
                  src="/assets/demo.png"
                  alt="Dashboard de gestión de citas"
                  width={1920}
                  height={1080}
                  className="object-contain object-center"
                  priority
                />
                <div className="absolute inset-0 pointer-events-none bg-[url('/assets/noise.png')] bg-repeat bg-[length:600px_600px] opacity-10 mix-blend-multiply" />
              </div>
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                animate={{
                  x: ["-100%", "100%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: [0.42, 0, 0.58, 1]
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}