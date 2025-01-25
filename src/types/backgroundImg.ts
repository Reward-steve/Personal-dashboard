import img1 from "../assets/img/img1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";
import img4 from "../assets/img/img4.jpg";
import img5 from "../assets/img/img5.jpg";
import img6 from "../assets/img/img6.jpg";
import img7 from "../assets/img/img7.png";
import img8 from "../assets/img/img8.png";
import img9 from "../assets/img/img9.jpg";
import img10 from "../assets/img/img10.jpg";
import img11 from "../assets/img/img11.jpg";
import img12 from "../assets/img/img12.jpg";

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
  { imgSrc: img6, alt: "Image 6" },
  { imgSrc: img7, alt: "Image 7" },
  { imgSrc: img8, alt: "Image 8" },
  { imgSrc: img9, alt: "Image 9" },
  { imgSrc: img10, alt: "Image 10" },
  { imgSrc: img11, alt: "Image 11" },
  { imgSrc: img12, alt: "Image 12" },
];
