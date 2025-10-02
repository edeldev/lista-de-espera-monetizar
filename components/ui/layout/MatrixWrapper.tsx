"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CanvaMatrix } from "../CanvaMatrix";

export const MatrixWrapper = ({ children }: { children: React.ReactNode }) => {
  const [fadeOutMatrix, setFadeOutMatrix] = useState(false);
  const [startContent, setStartContent] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      const timeout1 = setTimeout(() => setFadeOutMatrix(true), 5000);
      const timeout2 = setTimeout(() => setStartContent(true), 6000);
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    } else {
      setFadeOutMatrix(true);
      setStartContent(true);
    }
  }, [pathname]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1500 ${
          fadeOutMatrix ? "opacity-30" : "opacity-100"
        }`}
      >
        <CanvaMatrix />
      </div>

      {startContent && (
        <div className="relative z-10 opacity-100">{children}</div>
      )}
    </div>
  );
};
