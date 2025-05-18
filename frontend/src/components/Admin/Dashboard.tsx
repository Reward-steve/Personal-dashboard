import * as React from "react";
import { ComponentProps } from "./AdminData";
import { useState, useEffect } from "react";
import styles from "./../../styles/styledComponent.module.css";
import styleNotification from "./../../styles/Header.module.css";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { MdMonitorHeart } from "react-icons/md";
import PageTitle from "../StyleComponent/PageTitle";
import SectionName from "../StyleComponent/SectionName";
import MainComponent from "../StyleComponent/MainComponent";
import DailyOverview from "../StyleComponent/DailyOverview";
import GrayBg from "../StyleComponent/GrayBg";
import AppointmentTable from "../StyleComponent/Table";
import Notification from "../StyleComponent/Notification";
import { FaBell } from "react-icons/fa";
import img1 from "../../assets/img/home.jpg";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";

interface typeObj {
  data: object;
  message: string;
  stats: object;
  status: string;
}

const Dashboard: React.FC<ComponentProps> = () => {
  const [stat, setStats] = useState<{
    patients: number;
    doctors: number;
    appointments: number;
  }>({
    patients: 0,
    doctors: 0,
    appointments: 0,
  });
  const [notification, setNotification] = useState<typeObj | null>(null);
  const [name, setName] = useState("");

  const { api } = useApi();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setName(user.username);
    }
  }, [user]);

  const getStatistics = async () => {
    try {
      const url = await api("GET", "admin/users");

      setStats(
        (url?.stats as {
          patients: number;
          doctors: number;
          appointments: number;
        }) || { patients: 0, doctors: 0, appointments: 0 }
      );
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const getNotification = async () => {
    try {
      const url = await api("GET", `notification`);
      setNotification(url || null);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    getStatistics();
    getNotification();
  }, []);

  return (
    <>
      <PageTitle
        Title={`Dashboard ${name || " Loading..."}`}
        Icon={<IoHome />}
      />
      <div className={styles.containerHolder}>
        <GrayBg width="70%" height="auto">
          <SectionName Name={"Daily overview"} />
          <div className={styles.flexContainer}>
            <aside className={styles.flex}>
              <DailyOverview
                cl="skyblue"
                Result={`${stat.patients}`}
                Details="patients"
                Icon={FaUsers}
              />
              <DailyOverview
                cl="skyblue"
                Result={`${stat.doctors}`}
                Details="doctors"
                Icon={FaHandshake}
              />
              <DailyOverview
                cl="skyblue"
                Result={`${stat.appointments}`}
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

          <SectionName Name={"Pending Appointments"} />
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

        {/* Notifications */}
        <div
          style={{
            width: "25%",
            rowGap: "15px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <GrayBg width="100%" height="400px">
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                className={styleNotification.icon}
                style={{ color: "#1e3a5f" }}
              >
                <div className={styleNotification.notification}>1</div>
                <FaBell size={25} />
              </div>
              <SectionName Name={"Notifications"} />
            </div>
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
                {notification?.data ? (
                  (notification.data as { message: string }[]).map(
                    (n, index) => {
                      return (
                        <Notification
                          key={index}
                          image={img1}
                          altImg="img"
                          message={n.message}
                        />
                      );
                    }
                  )
                ) : (
                  <p>No notification found</p>
                )}
              </MainComponent>
            </div>
          </GrayBg>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
