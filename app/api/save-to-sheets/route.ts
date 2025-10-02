import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const googleSheetsUrl = process.env.GOOGLE_SHEETS_URL!;

    const res = await fetch(googleSheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error enviando datos a Google Sheets:", error);
    return NextResponse.json(
      { error: "Error al guardar en Sheets" },
      { status: 500 }
    );
  }
}
