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

export interface ImageProps {
  imgSrc: string;
  alt: string;
}

// Define the Router interface with props
export interface Router {
  to: string;
  name: string;
  icon: IconType;
  background: string;
}

// Define the router object with components and props
const navLinkRouter: Router[] = [
  {
    to: "/",
    name: "Home",
    icon: IoHome,
    background: img1,
  },
  {
    to: "/Analytics",
    name: "Analytics",
    icon: SiGoogleanalytics,
    background: img2,
  },
  {
    to: "/Profile",
    name: "Profile",
    icon: FaUser,
    background: img3,
  },
  {
    to: "/Signup",
    name: "Signup",
    icon: FaSignInAlt,
    background: img4,
  },
  {
    to: "/Settings",
    name: "Settings",
    icon: IoSettingsSharp,
    background: img5,
  },
];

export default navLinkRouter;
