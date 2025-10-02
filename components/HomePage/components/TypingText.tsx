import { ITypedText } from "./types";

export const TypingText = ({ typedText }: ITypedText) => {
  return (
    <pre className="text-sm md:text-xl whitespace-pre-wrap text-shadow-neon font-light text-primary">
      {typedText}
      <span className="animate-blink">▋</span>
    </pre>
  );
};
