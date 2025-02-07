import * as React from "react";
import style from "../../styles/styledComponent.module.css"; // Import the CSS module for styling

interface BackgroundPickerProps {
  title: string;
  content: React.ReactNode; // Content can be any React component or text
}

const BackgroundPicker: React.FC<BackgroundPickerProps> = ({
  title,
  content,
}) => {
  return (
    <main className={style.background}>
      <p>{title}</p>
      <div className={style.imageholder}>{content}</div>
    </main>
  );
};

export default React.memo(BackgroundPicker);
