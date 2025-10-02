"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TStep } from "@/types";
import { StepInput } from "./StepInput";

const stepLabels: Record<string, string> = {
  email: "Ingresa tu correo",
  phone: "¿Cuál es tu teléfono?",
  name: "¿Cómo te llamas?",
};

export const FormSteps = () => {
  const [step, setStep] = useState<TStep>("email");
  const [formData, setFormData] = useState({ email: "", phone: "", name: "" });
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setError("");

    if (step === "email") {
      if (!formData.email.includes("@")) {
        setError("Ingresa un correo válido");
        return;
      }
      setStep("phone");
    } else if (step === "phone") {
      if (!formData.phone || formData.phone.length < 5) {
        setError("Ingresa un número válido");
        return;
      }
      setStep("name");
    } else if (step === "name") {
      if (!formData.name.trim()) {
        setError("Ingresa tu nombre");
        return;
      }
      router.push(`/confirmado?name=${encodeURIComponent(formData.name)}`);
    }
  };

  const goBack = () => {
    setError("");
    if (step === "phone") setStep("email");
    else if (step === "name") setStep("phone");
  };

  return (
    <div>
      <h2 className="text-sm font-semibold mb-2">{stepLabels[step]}</h2>

      <div className="mb-4">
        <StepInput step={step} value={formData[step]} onChange={handleChange} />
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <div className="flex gap-4 justify-between">
        {step !== "email" && (
          <button
            type="button"
            onClick={goBack}
            className="px-4 py-2 bg-gray-50 rounded hover:bg-gray-50/80 hover:[transform:translateY(-1px)] text-black transition-all cursor-pointer"
          >
            Atrás
          </button>
        )}

        <button
          type="button"
          onClick={nextStep}
          className="px-4 py-2 bg-primary text-black rounded transition-all duration-300
          hover:[filter:brightness(1.1)]
          hover:[transform:translateY(-1px)]
          hover:[box-shadow:0_8px_25px_rgba(0,255,156,0.2)] w-full cursor-pointer"
        >
          {step === "name" ? "Finalizar" : "Continuar"}
        </button>
      </div>
    </div>
  );
};
