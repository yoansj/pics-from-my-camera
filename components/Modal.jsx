import gsap from "gsap";
import { useAppStore } from "../contexts/appState";
import { usedImages } from "../hooks/useImagesTextures";

export default function Modal() {
  const currentPicture = useAppStore((state) => state.currentPicture);

  return (
    <div
      className="modal w-[100vw] h-[100vh] bg-black/50 absolute flex justify-center p-12 align-middle items-center opacity-0"
      onClick={() => {
        gsap.to(".modal", { opacity: 0, zIndex: -1, duration: 0.5 });
      }}
    >
      <img src={usedImages[currentPicture]} className="w-[80%]" />
    </div>
  );
}