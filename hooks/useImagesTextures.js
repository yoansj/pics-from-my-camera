import { useTexture } from "@react-three/drei";
import { useAppStore } from "../contexts/appState";

export default function useImagesTextures() {
  const pictures = useAppStore((state) => state.pictures);
  const picturesUrl = pictures.map((pic) => pic.urls.regular);
  const textures = useTexture(picturesUrl);
  return textures;
}
