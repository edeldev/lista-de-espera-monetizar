"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TypingText } from "@/components/HomePage/components";
import { useTypingEffect } from "@/hooks";

const ConfirmadoPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name");

  const fullText = `¡Hola ${name} 🎉

TU SOLICITUD HA SIDO APROBADA. ¡Bienvenid@!

👉 Paso 1: En menos de 1 minuto recibirás un email.

Ábrelo y haz clic en el enlace que contiene.
Ese clic confirmará que tu dirección de correo es válida.

⚠️ Importante: Tienes solo 5 minutos para hacerlo o tu acceso caducará.

(No olvides revisar también tu carpeta de spam o promociones, por si se esconde ahí).

👉 Paso 2: Una vez confirmes tu email, recibirás de inmediato otro correo con tu regalo especial.

(Revisa también tu carpeta de spam o promociones).
`;

  useEffect(() => {
    if (!name || !name.trim()) {
      router.replace("/");
    }
  }, [name, router]);

  const { typedText, typingRef } = useTypingEffect({
    text: fullText,
    speed: 70,
  });

  if (!name || !name.trim()) return null;

  return (
    <main className="min-h-screen bg-transparent text-green-400 font-mono p-8 flex">
      <div ref={typingRef} className="flex flex-col w-full">
        <TypingText typedText={typedText} />
      </div>
    </main>
  );
};

export default ConfirmadoPage;
