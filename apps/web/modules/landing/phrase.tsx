'use client'

import { motion } from "framer-motion"

export function Phrase() {
  return (
    <div className="flex items-center justify-center py-24 max-w-4xl mx-auto text-center">
      <motion.p 
        className="text-4xl"
        initial={{ 
          opacity: 0, 
          y: 50,
          filter: "blur(10px)"
        }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)"
        }}
        viewport={{ 
          once: true, 
          amount: 0.3 
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeInOut",
          delay: 0.2
        }}
      >
        "La forma más rápida de obtener resultados, es tener una buena
        organización, y para tener una buena organización necesitas Meetzeen"
      </motion.p>
    </div>
  );
}