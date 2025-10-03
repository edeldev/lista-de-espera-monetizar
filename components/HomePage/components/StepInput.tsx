import { phonePrefixes } from "@/utils";
import { IStepInput } from "./types";

export const StepInput = ({ step, formData, onChange }: IStepInput) => {
  const placeholders: Record<string, string> = {
    email: "ejemplo@correo.com",
    phone: "812 456 7890",
    name: "Tu nombre completo",
  };

  const types: Record<string, string> = {
    email: "email",
    phone: "tel",
    name: "text",
  };

  if (step === "phone") {
    return (
      <div className="flex flex-col gap-2">
        <select
          name="prefix"
          value={formData.prefix}
          onChange={onChange}
          className="p-3 border rounded bg-black text-green-400 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {phonePrefixes.map(({ country, code, flag }) => (
            <option key={country} value={code}>
              {flag} {country} ({code})
            </option>
          ))}
        </select>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder={placeholders[step]}
          className="w-full p-3 bg-input-neon border-neon text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    );
  }

  return (
    <input
      type={types[step]}
      name={step}
      value={formData[step]}
      onChange={onChange}
      placeholder={placeholders[step]}
      className="w-full p-3 bg-input-neon border-neon text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
};
