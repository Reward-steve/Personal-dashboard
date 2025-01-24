import * as React from "react";
import style from "../../styles/styledComponent.module.css"; // Import the CSS module for styling
import { imageObj } from "../../types/backgroundImg";
import { useBackground } from "../../hooks/useBackground";

const BackgroundPicker: React.FC = () => {
  const { setBackgroundImage } = useBackground();
  // const [image, setImage] = React.useState<string>(imageObj[0].imgSrc);
  return (
    <main
      className={style.background}
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
    >
      <p>Background Picker</p>
      <div className={style.imageholder}>
        {imageObj.map((img, id) => (
          <img
            key={id}
            className={style.backgroundimage}
            src={img.imgSrc}
            alt={img.alt}
            onClick={() => setBackgroundImage(img.imgSrc)}
          />
        ))}
      </div>
    </main>
  );
};

export default BackgroundPicker;
