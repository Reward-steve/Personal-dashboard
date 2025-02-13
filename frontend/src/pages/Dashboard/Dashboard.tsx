import * as React from "react";
import { PersistentDatePicker } from "../../components/StyleComponent/PersistentDatePicker";
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
import GrayBg from "../../components/StyleComponent/GrayBg";
import AppointmentTable from "../../components/StyleComponent/Table";
const Dashboard: React.FC<ComponentProps> = () => {
  return (
    <>
      <PageTitle Title={"Dashboard"} Icon={<IoHome />} />
      <div className={styles.containerHolder}>
        <GrayBg width="70%">
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
                cl="#008bff"
                Result="12"
                Details="reviews"
                Icon={FaStar}
              />
              <DailyOverview
                cl="#961dff"
                Result="13"
                Details="appointments"
                Icon={FaComments}
              />
              <DailyOverview
                cl="red"
                Result="1"
                Details="surgery"
                Icon={MdMonitorHeart}
              />
            </aside>
          </div>

          <SectionName Name={"Schedule"} />
          <main className={styles.mainHolder}>
            <MainComponent>
              <ul>
                <li>Maria</li>
                <li>Patrick</li>
                <li>Norris</li>
              </ul>
            </MainComponent>
          </main>

          <SectionName Name={"Upcoming Appointments"} />
          <main className={styles.mainHolder}>
            <MainComponent>
              <AppointmentTable />
            </MainComponent>
          </main>
        </GrayBg>
        <div
          style={{
            width: "30%",
            rowGap: "15px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            // height: "100vh",
          }}
        >
          <GrayBg width="100%">
            <SectionName Name={"Calender 🗓️"} />
            <MainComponent>
              <PersistentDatePicker />
            </MainComponent>
          </GrayBg>
          <GrayBg width="100%">
            <SectionName Name={"Notifications"} />
            <MainComponent>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                urna ipsum. Donec quis lectus vel neque efficitur bibendum.
              </p>
            </MainComponent>
          </GrayBg>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
