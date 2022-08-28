import { useTexture } from "@react-three/drei";
import imageList from "../assets/imageList";

export const usedImages = [
  imageList[0].src,
  imageList[5].src,
  imageList[7].src,
];

export default function useImagesTextures() {
  const textures = useTexture([...usedImages]);
  return textures;
}
