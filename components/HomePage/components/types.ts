import { TForm } from "@/types";

export interface ITypedText {
  typedText: string;
}

export interface IButtonEnterMobile {
  setShowForm: (showForm: boolean) => void;
}

export interface IStepInput {
  step: "email" | "phone" | "name";
  formData: TForm;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
