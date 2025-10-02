import { IButtonEnterMobile } from "./types";

export const ButtonEnterMobile = ({ setShowForm }: IButtonEnterMobile) => {
  return (
    <button
      className="mt-4 uppercase text-sm px-7 py-3 bg-primary text-black rounded transition-all duration-300
    hover:[filter:brightness(1.1)]
    hover:[transform:translateY(-1px)]
    hover:[box-shadow:0_8px_25px_rgba(0,255,156,0.2)] cursor-pointer block md:hidden"
      onClick={() => setShowForm(true)}
    >
      Enter
    </button>
  );
};
