import { MainContentProps } from "./../../types/mainContent";
import styles from "./../../styles/FlexPage.module.css";

const FlexPage: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div>
      <div className={styles.flexContainer}>{children}</div>
    </div>
  );
};
export default FlexPage;
