import { IconType } from "react-icons";
import { IoAppsOutline } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { SiApachedolphinscheduler } from "react-icons/si";
import { FaHandshake } from "react-icons/fa";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaDonate } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

export interface Router {
  to: string;
  name: string;
  icon: IconType;
}

const navLinkRouter: Router[] = [
  {
    to: "/dashboard/dashboard",
    name: "Dashboard",
    icon: IoAppsOutline,
  },
  {
    to: "/dashboard/calender",
    name: "Calender",
    icon: FaCalendarAlt,
  },
  {
    to: "/dashboard/patients",
    name: "Patients",
    icon: FaUsers,
  },
  {
    to: "/dashboard/staffschedule",
    name: "Staff Schedule",
    icon: SiApachedolphinscheduler,
  },
  {
    to: "/dashboard/doctors",
    name: "Doctors",
    icon: FaHandshake,
  },
  {
    to: "/dashboard/departments",
    name: "Departments",
    icon: FaBuilding,
  },
  {
    to: "/dashboard/stock",
    name: "Stock",
    icon: FaDonate,
  },
  {
    to: "/dashboard/settings",
    name: "Settings",
    icon: IoSettingsSharp,
  },
  {
    to: "/dashboard/helpcenter",
    name: "Help Center",
    icon: IoHelpCircleOutline,
  },
  {
    to: "/",
    name: "Logout",
    icon: CiLogout,
  },
];

export default navLinkRouter;
