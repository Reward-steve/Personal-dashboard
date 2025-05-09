import { IconType } from "react-icons";
import { RiDashboardFill } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
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
    to: "/dashboard",
    name: "Dashboard",
    icon: RiDashboardFill,
  },
  {
    to: "/calender",
    name: "Calender",
    icon: SlCalender,
  },
  {
    to: "/patients",
    name: "Patients",
    icon: FaUsers,
  },
  {
    to: "/staffschedule",
    name: "Staff Schedule",
    icon: SiApachedolphinscheduler,
  },
  {
    to: "/doctors",
    name: "Doctors",
    icon: FaHandshake,
  },
  {
    to: "/departments",
    name: "Departments",
    icon: FaBuilding,
  },
  {
    to: "/stock",
    name: "Stock",
    icon: FaDonate,
  },
  {
    to: "/settings",
    name: "Settings",
    icon: IoSettingsSharp,
  },
  {
    to: "/helpcenter",
    name: "Help Center",
    icon: IoHelpCircleOutline,
  },
  {
    to: "/logout",
    name: "Logout",
    icon: CiLogout,
  },
];

export default navLinkRouter;
