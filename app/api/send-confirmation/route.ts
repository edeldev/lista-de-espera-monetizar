import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  const data = await req.json();
  const { email, name } = data;

  if (!email) {
    return NextResponse.json({ error: "Correo inválido" }, { status: 400 });
  }

  const confirmUrl = `${
    process.env.NEXT_PUBLIC_APP_URL
  }/api/confirm-email?email=${encodeURIComponent(
    email
  )}&name=${encodeURIComponent(name)}`;

  const msg = {
    to: email,
    from: "EdelDev <edeldev25@gmail.com>",
    subject: "Confirma tu correo para unirte",
    html: `
    <div style="font-family:Arial, sans-serif; color:rgb(109, 109, 109); font-size:16px; line-height:1.6; max-width:600px; margin:0 auto; padding:20px;">
      <p>Hola <strong>${name}</strong>,</p>
      <p>Estas a un solo paso.</p>

      <p>Únete a la revolución de monetizadores de Facebook de <span style="background-color:#fff3b0; padding:2px 4px; border-radius:3px;">EdelDev</span></p>

      <p>Pulsa el botón gigante que tienes abajo.</p>

      <div style="text-align:center; margin:0 auto;">
        <a href="${confirmUrl}"
          style="display:inline-block; background:#00c853; color:#fff; font-weight:bold; font-size:16px; padding:15px 30px; border-radius:4px; text-decoration:none;">
          Confirma aquí tu email
        </a>
      </div>

     <p>Si no puedes hacer clic, copia y pega este enlace en tu navegador: <br/> ${confirmUrl}</p>
    </div>
    `,
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ message: "Correo de confirmación enviado" });
  } catch (err) {
    console.error("Error enviando primer correo:", err);
    return NextResponse.json(
      { error: "No se pudo enviar el correo" },
      { status: 500 }
    );
  }
}
