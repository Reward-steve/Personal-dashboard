import img1 from "../assets/img/home.jpg";
import img2 from "../assets/img/analytics.jpg";
import img3 from "../assets/img/userprofile.jpg";
import img4 from "../assets/img/signin.jpg";
import img5 from "../assets/img/setting.jpg";

export interface ImageProps {
  imgSrc: string;
  alt: string;
}

export const imageObj: ImageProps[] = [
  { imgSrc: img1, alt: "Image 1" },
  { imgSrc: img2, alt: "Image 2" },
  { imgSrc: img3, alt: "Image 3" },
  { imgSrc: img4, alt: "Image 4" },
  { imgSrc: img5, alt: "Image 5" },
];
