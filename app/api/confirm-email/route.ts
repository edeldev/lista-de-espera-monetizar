import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const name = searchParams.get("name");

  if (!email) {
    return NextResponse.json({ error: "Correo inválido" }, { status: 400 });
  }

  const gift =
    "https://www.notion.so/Gu-a-MONETIZACI-N-en-FACEBOOK-28162bafe4b380478d1ce1e75d342d0d?source=copy_link";

  const msg = {
    to: email,
    from: "EdelDev <edeldev25@gmail.com>",
    subject: "Aqui tienes tu regalo",
    html: `
     <div style="font-family:Arial, sans-serif; color:rgb(109, 109, 109); font-size:16px; line-height:1.6; max-width:600px; margin:0 auto; padding:20px;">
      <p>Si estás leyendo esto, es porque se ha confirmado tu email, ${name}!</p>

      <p>Tu regalo consiste en...</p>

      <p>• Una guía de estrategias probadas que te ayudaran a conseguir la monetización de Facebook más rápido</p>

      <p>• Errores comunes que impiden conseguir monetización en Facebook.</p>

      <p>• Y una lista de paises en los cuales esta permitida la monetización en Facebook.</p>

      <p>Pulsa el botón gigante que tienes abajo para obtener tu regalo.</p>
      
       <div style="text-align:center; margin:0 auto;">
        <a href="${gift}"
          style="display:inline-block; background:#00c853; color:#fff; font-weight:bold; font-size:16px; padding:15px 30px; border-radius:4px; text-decoration:none;">
          Obtener regalo
        </a>
      </div>
      <p>Si no puedes hacer clic, copia y pega este enlace en tu navegador: <br/> ${gift}</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (err) {
    console.error("Error enviando segundo correo:", err);
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/aceptado`);
}
