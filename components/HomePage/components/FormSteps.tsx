"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TStep } from "@/types";
import { StepInput } from "./StepInput";
import { emailRegex, phoneRegex } from "@/utils";

const stepLabels: Record<string, string> = {
  email: "Ingresa tu correo",
  phone: "¿Cuál es tu teléfono?",
  name: "¿Cómo te llamas?",
};

export const FormSteps = () => {
  const [step, setStep] = useState<TStep>("email");
  const [formData, setFormData] = useState({
    email: "",
    prefix: "+49",
    phone: "",
    name: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setError("");

    if (step === "email") {
      if (!emailRegex.test(formData.email)) {
        setError("Ingresa un correo válido");
        return;
      }
      setStep("phone");
    } else if (step === "phone") {
      if (!formData.phone || !phoneRegex.test(formData.phone)) {
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
        <StepInput step={step} formData={formData} onChange={handleChange} />
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between">
        {step !== "email" && (
          <button
            type="button"
            onClick={goBack}
            className="w-full md:w-fit px-4 py-2 bg-gray-50 rounded hover:bg-gray-50/80 hover:[transform:translateY(-1px)] text-black transition-all cursor-pointer"
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
