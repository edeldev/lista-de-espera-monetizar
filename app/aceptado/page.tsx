"use client";
import { TypingText } from "@/components/HomePage/components";
import { useTypingEffect } from "@/hooks";

const fullText = `¡Hola! 🎉

Acceso confirmado.
En menos de un minuto recibirás tu regalo especial en tu bandeja de entrada.

💰 Prepárate, porque pronto empezarás a monetizar como un verdadero profesional.

⚠️ Tip: Revisa también tu carpeta de spam o promociones, por si el correo llega allí.
`;

const AceptadoPage = () => {
  const { typedText, typingRef } = useTypingEffect({
    text: fullText,
    speed: 70,
  });

  return (
    <main className="min-h-screen bg-transparent text-green-400 font-mono p-8 flex">
      <div ref={typingRef} className="flex flex-col w-full">
        <TypingText typedText={typedText} />
      </div>
    </main>
  );
};

export default AceptadoPage;
