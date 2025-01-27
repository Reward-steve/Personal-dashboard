import { IconType } from "react-icons";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";
import { FaSignInAlt } from "react-icons/fa";

// Define the Router interface with props
export interface Router {
  to: string;
  name: string;
  icon: IconType;
}

// Define the router object with components and props
const navLinkRouter: Router[] = [
  {
    to: "/",
    name: "Home",
    icon: IoHome,
  },
  {
    to: "/Analytics",
    name: "Analytics",
    icon: SiGoogleanalytics,
  },
  {
    to: "/Profile",
    name: "Profile",
    icon: FaUser,
  },
  {
    to: "/Signup",
    name: "Signup",
    icon: FaSignInAlt,
  },
  {
    to: "/Settings",
    name: "Settings",
    icon: IoSettingsSharp,
  },
];

export default navLinkRouter;
