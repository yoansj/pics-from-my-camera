import gsap from "gsap";
import { useAppStore } from "../contexts/appState";
import { usedImages } from "../hooks/useImagesTextures";

export default function Modal() {
  const textures = useAppStore((state) => state.textures);
  const currentPicture = useAppStore((state) => state.currentPicture);

  return (
    <div className="modal z-50 w-[100vw] h-[100vh] bg-black/50 absolute flex justify-center p-12 align-middle items-center scale-0" onClick={() => {
      gsap.to(".modal", { scale: 0, duration: 0.5 });
    }}>
      {textures.length !== 0 && <img src={usedImages[currentPicture]} className="w-[80%]" />}
    </div>
  )
}