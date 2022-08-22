import { useTexture } from "@react-three/drei";
import imageList from "../assets/imageList";

export default function useImagesTextures() {
  const textures = useTexture([imageList[0].src, imageList[5].src, imageList[7].src]);

  return textures;
}
