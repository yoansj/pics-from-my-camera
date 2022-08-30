import gsap from "gsap";
import ClickAwayListener from "react-click-away-listener";
import create from "zustand";
import { pictureData } from "../assets/pictureData";
import { useAppStore } from "../contexts/appState";

export const sideModalControl = create((set, get) => ({
  isOpen: false,
  isAnimating: false,
  open: () => {
    if (get().isAnimating) return;
    set({ isAnimating: true });
    gsap.to(".sideModal", {
      right: 0,
      duration: 1,
      onComplete: () => set({ isAnimating: false, isOpen: true }),
    });
  },
  close: () => {
    if (get().isAnimating) return;
    set({ isAnimating: true });
    gsap.to(".sideModal", {
      right: "-100%",
      duration: 1.5,
      onComplete: () => set({ isAnimating: false, isOpen: false }),
    });
  },
}));

export default function SideModal() {
  const close = sideModalControl((state) => state.close);
  const currentPicture = useAppStore((state) => state.currentPicture);

  return (
    <ClickAwayListener onClickAway={close}>
      <div className="sideModal w-[35vw] h-[100vh] bg-black/80 z-50 text-white absolute p-4 -right-full flex flex-col">
        <div className="flex justify-between mb-8">
          <p>{pictureData[currentPicture].title}</p>
          <p
            onClick={close}
            className="cursor-pointer underline underline-offset-2"
          >
            close
          </p>
        </div>
        <div className="space-y-4 mb-8">
          <div className="space-y-1">
            <p>{pictureData[currentPicture].fileName}</p>
            <p>ISO {pictureData[currentPicture].iso}</p>
            <p>F {pictureData[currentPicture].aperture}</p>
            <p>{pictureData[currentPicture].shutterSpeed}</p>
            <p>{pictureData[currentPicture].focalLength}</p>
            <p>{pictureData[currentPicture].camera}</p>
            <p>{pictureData[currentPicture].date}</p>
            <p>{pictureData[currentPicture].location}</p>
          </div>
        </div>
        <p>{pictureData[currentPicture].description}</p>
      </div>
    </ClickAwayListener>
  );
}
