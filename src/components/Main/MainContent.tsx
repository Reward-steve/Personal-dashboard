import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/Header/Header";
import styles from "../../styles/MainContent.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const MainContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state

  return (
    <main className={styles.mainContent}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Animated main content */}
      <motion.section
        className={styles.content}
        animate={{ marginLeft: sidebarOpen ? "5%" : "15%" }} // Adjust width
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Header />
        <Outlet />
      </motion.section>
    </main>
  );
};

export default MainContent;
