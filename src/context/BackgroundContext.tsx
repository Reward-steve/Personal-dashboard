import { BackgroundContext } from "./CreateBackground";
import React, { useState } from "react";
// Context Interface
export interface BackgroundContextProps {
  bgImage: string;
  setBgImage: (image: string) => void;
}

// Provider Component
export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bgImage, setBgImage] = useState<string>("");

  // Apply background image dynamically
  React.useEffect(() => {
    document.body.style.backgroundImage = bgImage ? `url(${bgImage})` : "";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }, [bgImage]);

  return (
    <BackgroundContext.Provider value={{ bgImage, setBgImage }}>
      {children}
    </BackgroundContext.Provider>
  );
};
