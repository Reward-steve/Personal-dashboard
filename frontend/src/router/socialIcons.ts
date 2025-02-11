import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import { IconType } from "react-icons";

export interface SocialIcon {
  icon: IconType;
  color: string;
}

const SocialIcons: SocialIcon[] = [
  { icon: FaFacebook, color: "#3b5998" },
  { icon: FaGoogle, color: "red" },
  { icon: FaTwitter, color: "#1da1f2" },
];

export default SocialIcons;
