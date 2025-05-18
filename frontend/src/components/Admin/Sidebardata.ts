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
    to: "/admin/dashboard",
    name: "Dashboard",
    icon: RiDashboardFill,
  },
  {
    to: "/admin/calender",
    name: "Calender",
    icon: SlCalender,
  },
  {
    to: "/admin/patients",
    name: "Patients",
    icon: FaUsers,
  },
  {
    to: "/admin/staffschedule",
    name: "Staff Schedule",
    icon: SiApachedolphinscheduler,
  },
  {
    to: "/admin/doctors",
    name: "Doctors",
    icon: FaHandshake,
  },
  {
    to: "/admin/departments",
    name: "Departments",
    icon: FaBuilding,
  },
  {
    to: "/admin/stock",
    name: "Stock",
    icon: FaDonate,
  },
  {
    to: "/admin/settings",
    name: "Settings",
    icon: IoSettingsSharp,
  },
  {
    to: "/admin/helpcenter",
    name: "Help Center",
    icon: IoHelpCircleOutline,
  },
  {
    to: "/auth/logout",
    name: "Logout",
    icon: CiLogout,
  },
];

export default navLinkRouter;
