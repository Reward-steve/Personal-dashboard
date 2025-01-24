import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/artistic-blurry-colorful-wallpaper-background.jpg";
import img4 from "../assets/images/codioful-formerly-gradienta-OzfD79w8ptA-unsplash.jpg";
import img5 from "../assets/images/gradient-grainy-texture/5479108.jpg";
import img6 from "../assets/images/starry-night-background-design/O7OFWS0.jpg";
import img7 from "../assets/images/3d-render-tree-landscape-against-fictional-planet-night-sky.jpg";
import img8 from "../assets/images/orchid-flower-against-blue-background.jpg";
import img9 from "../assets/images/botanical-leaves.jpg";
import img10 from "../assets/images/selective-focus-shot-from-pathway-water-with-mountains-distance.jpg";
import img11 from "../assets/images/cold-melancholic-scene.jpg";
import img12 from "../assets/images/luxury-blue-golden-background/6877205.jpg";

export interface ImageProps {
  imgSrc: string;
  alt: string;
}

console.log(img1);

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
