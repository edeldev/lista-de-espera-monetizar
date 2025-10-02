import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import { MatrixWrapper } from "@/components/ui";

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Lista de espera - Monetizar Facebook",
  description:
    "Uneté a mi lista de espera, donde podrás aprender a como monetizar facebook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${courierPrime.variable} antialiased`}>
        <MatrixWrapper>{children}</MatrixWrapper>
      </body>
    </html>
  );
}
