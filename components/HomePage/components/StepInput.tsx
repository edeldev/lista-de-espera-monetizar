"use client";

import { IStepInput } from "./types";

export const StepInput = ({ step, value, onChange }: IStepInput) => {
  const placeholders: Record<string, string> = {
    email: "ejemplo@correo.com",
    phone: "+52 123 456 7890",
    name: "Tu nombre completo",
  };

  const types: Record<string, string> = {
    email: "email",
    phone: "tel",
    name: "text",
  };

  return (
    <input
      type={types[step]}
      name={step}
      value={value}
      onChange={onChange}
      placeholder={placeholders[step]}
      className="w-full p-3 bg-input-neon border-neon text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
};
