import { ReactNode } from "react";
import styles from "../../styles/Page.module.css";

interface PageTitleProps {
  Title: string;
  Icon: ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ Title, Icon }) => {
  return (
    <>
      <div className={styles.title}>
        <span>{Icon}</span>
        <span>{Title}</span>
      </div>
    </>
  );
};

export default PageTitle;
