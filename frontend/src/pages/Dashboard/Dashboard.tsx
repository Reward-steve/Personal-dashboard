import * as React from "react";
import { ComponentProps } from "../../router/mainRoutes";
import styles from "./../../styles/styledComponent.module.css";
import PageTitle from "../../components/StyleComponent/PageTitle";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { MdMonitorHeart } from "react-icons/md";
import SectionName from "../../components/StyleComponent/SectionName";
import MainComponent from "../../components/StyleComponent/MainComponent";
import DailyOverview from "../../components/StyleComponent/DailyOverview";
const Dashboard: React.FC<ComponentProps> = () => {
  return (
    <>
      <PageTitle Title={"Dashboard"} Icon={<IoHome />} />
      <div className={styles.container}>
        <SectionName Name={"Daily overview"} />
        <div className={styles.flexContainer}>
          <aside className={styles.flex}>
            <DailyOverview
              cl="skyblue"
              Result="78"
              Details="patients"
              Icon={FaUsers}
            />
            <DailyOverview
              cl="skyblue"
              Result="12"
              Details="reviews"
              Icon={FaStar}
            />
            <DailyOverview
              cl="skyblue"
              Result="13"
              Details="appointments"
              Icon={FaComments}
            />
            <DailyOverview
              cl="skyblue"
              Result="1"
              Details="surgery"
              Icon={MdMonitorHeart}
            />
          </aside>
        </div>
        <SectionName Name={"Schedule"} />

        <main className={styles.mainHolder}>
          <MainComponent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              urna ipsum. Donec quis lectus vel neque efficitur bibendum.
            </p>
          </MainComponent>
        </main>
      </div>
    </>
  );
};
export default Dashboard;
