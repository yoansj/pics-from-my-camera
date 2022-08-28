import { useTexture } from "@react-three/drei";
import imageList from "../assets/imageList";
import { useAppStore } from "../contexts/appState";

export const usedImages = [imageList[0].src, imageList[5].src, imageList[7].src]

export default function useImagesTextures() {
  const texturesSet = useAppStore((state) => state.texturesSet);
  const textures = useTexture([...usedImages], (textures) => {
      texturesSet(textures);
      console.log(textures);
  });
  return textures;
}
