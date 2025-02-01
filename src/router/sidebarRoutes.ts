import img1 from "../assets/img/home.jpg";
import img2 from "../assets/img/analytics.jpg";
import img3 from "../assets/img/userprofile.jpg";
import img4 from "../assets/img/signin.jpg";
import img5 from "../assets/img/setting.jpg";
import { IconType } from "react-icons";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";
import { FaSignInAlt } from "react-icons/fa";

export interface Router {
  to: string;
  name: string;
  icon: IconType;
  background: string;
}

const navLinkRouter: Router[] = [
  {
    to: "/dashboard/home", // ✅ Nested under /dashboard
    name: "Home",
    icon: IoHome,
    background: img1,
  },
  {
    to: "/dashboard/analytics", // ✅ Updated path
    name: "Analytics",
    icon: SiGoogleanalytics,
    background: img2,
  },
  {
    to: "/dashboard/profile", // ✅ Updated path
    name: "Profile",
    icon: FaUser,
    background: img3,
  },
  {
    to: "/dashboard/signup", // ✅ Updated path
    name: "Signup",
    icon: FaSignInAlt,
    background: img4,
  },
  {
    to: "/dashboard/settings", // ✅ Updated path
    name: "Settings",
    icon: IoSettingsSharp,
    background: img5,
  },
];

export default navLinkRouter;
