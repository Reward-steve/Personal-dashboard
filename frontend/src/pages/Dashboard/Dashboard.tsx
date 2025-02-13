import * as React from "react";
import { ComponentProps } from "../../router/mainRoutes";
import styles from "./../../styles/styledComponent.module.css";
import PageTitle from "../../components/StyleComponent/PageTitle";
import { IoHome } from "react-icons/io5";
import SideComponent from "../../components/StyleComponent/SideComponent";
import MainComponent from "../../components/StyleComponent/MainComponent";
const Dashboard: React.FC<ComponentProps> = () => {
  return (
    <>
      <PageTitle Title={"Dashboard"} Icon={<IoHome />} />
      <div className={styles.container}>
        <main className={styles.mainHolder}>
          <MainComponent>
            <h1>Welcome to Our Website</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              urna ipsum. Donec quis lectus vel neque efficitur bibendum.
            </p>
          </MainComponent>
        </main>
        <aside>
          <SideComponent>
            <h2>Sidebar</h2>
            <p>Some content goes here</p>
          </SideComponent>
        </aside>
      </div>
    </>
  );
};
export default Dashboard;
