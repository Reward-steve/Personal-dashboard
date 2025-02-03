import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";

export interface SocialIcon {
  icon: IconType;
  color: string;
}

const SocialIcons: SocialIcon[] = [
  { icon: FaFacebook, color: "#3b5998" },
  { icon: FaTwitter, color: "#1da1f2" },
  { icon: FaInstagram, color: "red" },
  { icon: FaLinkedin, color: "#0077b5" },
];

export default SocialIcons;
