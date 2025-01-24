import { BackgroundContext } from "./CreateBackground";
import React, { useState } from "react";
// Context Interface
export interface BackgroundContextProps {
  backgroundImage: string;
  setBackgroundImage: (image: string) => void;
}

// Provider Component
export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  // Apply background image dynamically
  React.useEffect(() => {
    document.body.style.backgroundImage = backgroundImage
      ? `url(${backgroundImage})`
      : "";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }, [backgroundImage]);

  return (
    <BackgroundContext.Provider value={{ backgroundImage, setBackgroundImage }}>
      {children}
    </BackgroundContext.Provider>
  );
};
