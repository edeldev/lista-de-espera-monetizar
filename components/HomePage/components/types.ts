export interface ITypedText {
  typedText: string;
}

export interface IButtonEnterMobile {
  setShowForm: (showForm: boolean) => void;
}

export interface IStepInput {
  step: "email" | "phone" | "name";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
