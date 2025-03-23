import * as React from "react";
import { PersistentDatePicker } from "../../components/StyleComponent/PersistentDatePicker";
import { ComponentProps } from "../../router/Admin";
import styles from "./../../styles/styledComponent.module.css";
import PageTitle from "../../components/StyleComponent/PageTitle";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
// import { FaStar } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { MdMonitorHeart } from "react-icons/md";
import { useState, useEffect } from "react";
import SectionName from "../../components/StyleComponent/SectionName";
import MainComponent from "../../components/StyleComponent/MainComponent";
import DailyOverview from "../../components/StyleComponent/DailyOverview";
import GrayBg from "../../components/StyleComponent/GrayBg";
import AppointmentTable from "../../components/StyleComponent/Table";
import Notification from "../../components/StyleComponent/Notification";

import img1 from "../../assets/img/home.jpg";
import img2 from "../../assets/img/medical-record.png";
import img3 from "../../assets/img/signin.jpg";
import img4 from "../../assets/img/userprofile.jpg";
import { useApi } from "../../hooks/useApi";

const Dashboard: React.FC<ComponentProps> = () => {
  const [stat, setStats] = useState(Object);

  const { api } = useApi();

  const getStatistics = async () => {
    const url = await api("GET", "admin/users");
    console.log(url.data);
    setStats((prevStats: object) => ({ ...prevStats, ...url.stats }));

    return url.stats;
  };

  useEffect(() => {
    async function stats() {
      return await getStatistics();
    }
    stats();
  }, []);

  return (
    <>
      <PageTitle Title={"Dashboard"} Icon={<IoHome />} />

      <div className={styles.containerHolder}>
        <GrayBg width="70%" height="auto">
          <SectionName Name={"Daily overview"} />
          <div className={styles.flexContainer}>
            <aside className={styles.flex}>
              <DailyOverview
                cl="skyblue"
                Result={stat.patients}
                Details="patients"
                Icon={FaUsers}
              />
              <DailyOverview
                cl="skyblue"
                Result={stat.doctors}
                Details="doctors"
                Icon={FaHandshake}
              />
              <DailyOverview
                cl="skyblue"
                Result={stat.appointments}
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
              <div>
                <ul>
                  <li>Maria</li>
                  <li>Patrick</li>
                  <li>Norris</li>
                </ul>
              </div>
            </MainComponent>
          </main>

          <SectionName Name={"Upcoming Appointments"} />
          <main className={styles.mainHolder}>
            <MainComponent>
              <AppointmentTable
                Name="dsdsd"
                Time="dfsadf"
                Diagnosis="adsfasdf"
                Notes="-"
              />
            </MainComponent>
          </main>
        </GrayBg>
        <div
          style={{
            width: "25%",
            rowGap: "15px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <GrayBg width="100%" height="auto">
            <PersistentDatePicker />
          </GrayBg>
          <GrayBg width="100%" height="300px">
            <SectionName Name={"Notifications"} />
            <div
              style={{
                width: "100%",
                height: "80%",
                border: "1px solid gray",
                borderRadius: "10px",
                overflowY: "scroll",
                scrollBehavior: "smooth",
                transition: ".5s",
                scrollbarWidth: "thin",
              }}
            >
              <MainComponent>
                <Notification
                  image={img1}
                  altImg="img"
                  message="You have 38 appointment requests."
                />
                <Notification
                  image={img2}
                  altImg="img"
                  message="Your vacation request was denied."
                />
                <Notification
                  image={img3}
                  altImg="img"
                  message="Tom Daley cancelled his appointment."
                />
                <Notification
                  image={img4}
                  altImg="img"
                  message="Someone wants to become you patient"
                />
              </MainComponent>
            </div>
          </GrayBg>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
