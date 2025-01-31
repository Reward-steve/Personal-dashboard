import { BackgroundContext } from "./CreateBackground";
import React, { useState, useEffect } from "react";
import defaultImage from "../assets/img/home.jpg";

// Context Interface
export interface BackgroundContextProps {
  bgImage: string;
  setBgImage: (image: string) => void;
}

// Provider Component
export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bgImage, setBgImage] = useState<string>(defaultImage);

  useEffect(() => {
    // Apply background image styles
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }, []); // Only update when bgImage changes

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setBgImage(
        isMobile ? "/path/to/mobile-image.webp" : "/path/to/desktop-image.webp"
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BackgroundContext.Provider value={{ bgImage, setBgImage }}>
      {children}
    </BackgroundContext.Provider>
  );
};
