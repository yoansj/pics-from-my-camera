import gsap from "gsap";
import { useAppStore } from "../contexts/appState";

export default function Modal() {
  const pictures = useAppStore((state) => state.pictures);
  const currentPicture = useAppStore((state) => state.currentPicture);

  return (
    <div
      className="modal w-[100vw] h-[100vh] bg-black/80 absolute flex justify-center p-12 align-middle items-center opacity-0"
      onClick={() => {
        gsap.to(".modal", { opacity: 0, zIndex: -1, duration: 0.5 });
      }}
    >
      {pictures.length > 0 && (
        <img
          src={pictures[currentPicture].urls.regular}
          className="w-[100%] lg:w-[80%]"
          alt="full sized picture"
        />
      )}
    </div>
  );
}