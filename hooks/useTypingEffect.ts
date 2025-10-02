"use client";
import { useEffect, useRef, useState } from "react";
import { TUseTypingEffect } from "./types";

export const useTypingEffect = ({
  text,
  speed = 70,
  instantChars = [" ", "\n", "\t"],
  onDone,
}: TUseTypingEffect) => {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const typingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(
        () => {
          const char = text[index];
          setTypedText((prev) => prev + char);
          setIndex((prev) => prev + 1);

          if (typingRef.current) {
            typingRef.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }
        },
        instantChars.includes(text[index]) ? 0 : speed
      );

      return () => clearTimeout(timeout);
    } else if (!done) {
      setDone(true);
      onDone?.();
    }
  }, [index, text, speed, instantChars, done, onDone]);

  return { typedText, done, typingRef };
};
