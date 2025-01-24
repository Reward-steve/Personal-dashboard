import React from "react";
import { ComponentProps } from "../../router/mainRoutes";
import { imageObj } from "../../types/backgroundImg";
import { useBackground } from "../../hooks/useBackground";
import PageIntro from "../../components/StyleComponent/PageIntroComponent";
import BackgroundPicker from "../../components/StyleComponent/BackgroundPicker";
import style from "../../styles/styledComponent.module.css"; // Import the CSS module for styling

const Profile: React.FC<ComponentProps> = ({ name }) => {
  const { setBgImage } = useBackground();
  return (
    <>
      <PageIntro
        title={name}
        description="
        This is where you can make the experience truly yours.
        Customize the background image to reflect your personality or mood,
        and fine-tune the text color to ensure everything feels just right.
        Explore the options and create a look that’s uniquely you!"
      />
      <BackgroundPicker
        title={"Background Picker"}
        content={imageObj.map((img, id) => (
          <img
            key={id}
            className={style.backgroundimage}
            src={img.imgSrc}
            alt={img.alt}
            onClick={() => setBgImage(img.imgSrc)}
          />
        ))}
      />
    </>
  );
};
export default Profile;
