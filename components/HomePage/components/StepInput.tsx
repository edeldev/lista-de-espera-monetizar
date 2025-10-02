import { IStepInput } from "./types";

const phonePrefixes = [
  { country: "Alemania", code: "+49", flag: "🇩🇪" },
  { country: "Argentina", code: "+54", flag: "🇦🇷" },
  { country: "Brasil", code: "+55", flag: "🇧🇷" },
  { country: "Colombia", code: "+57", flag: "🇨🇴" },
  { country: "España", code: "+34", flag: "🇪🇸" },
  { country: "Estados Unidos", code: "+1", flag: "🇺🇸" },
  { country: "Francia", code: "+33", flag: "🇫🇷" },
  { country: "Italia", code: "+39", flag: "🇮🇹" },
  { country: "México", code: "+52", flag: "🇲🇽" },
  { country: "Portugal", code: "+351", flag: "🇵🇹" },
  { country: "Reino Unido", code: "+44", flag: "🇬🇧" },
].sort((a, b) => a.country.localeCompare(b.country, "es"));

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
      <div className="flex flex-wrap md:flex-nowrap gap-2">
        <select
          name="prefix"
          value={formData.prefix}
          onChange={onChange}
          className="w-full md:w-fit px-3 py-2 border rounded bg-black text-green-400 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {phonePrefixes.map(({ code, flag }) => (
            <option key={code} value={code}>
              {flag} {code}
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
