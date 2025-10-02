"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ButtonEnterMobile, FormSteps, TypingText } from "./components";
import { useTypingEffect } from "@/hooks";

export const HomePage = () => {
  const [showForm, setShowForm] = useState(false);

  const fullText = `Hola, te habla @soymausoto.
El tiempo es limitado.

Estás a un paso de unirte a una auténtica revolución de monetizadores en Facebook.

Hoy voy a compartir contigo los secretos mejor guardados para...

Monetizar tus páginas de Facebook.
Multiplicar los ingresos.
Atraer seguidores reales.
Dominar el algoritmo.

Somos quienes no se detienen hasta alcanzar el éxito.

¿Quieres ver lo que se oculta detrás de este movimiento?.
Pulsa Enter
`;

  const { typedText, done, typingRef } = useTypingEffect({
    text: fullText,
    speed: 70,
  });

  useEffect(() => {
    if (!done) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setShowForm(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [done]);

  return (
    <main className="min-h-screen bg-transparent text-green-400 font-mono p-8 flex">
      {!showForm && (
        <div ref={typingRef} className="flex flex-col w-full">
          <TypingText typedText={typedText} />
          {done && <ButtonEnterMobile setShowForm={setShowForm} />}
        </div>
      )}

      {showForm && (
        <section className="w-full flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm bg-neon p-8 box-shadow-neon border-neon"
          >
            <FormSteps />
          </motion.div>
        </section>
      )}
    </main>
  );
};
