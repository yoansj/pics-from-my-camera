import gsap from "gsap";
import { useEffect } from "react";
import ClickAwayListener from "react-click-away-listener";
import { useMediaQuery } from "react-responsive";
import create from "zustand";
import { useAppStore } from "../contexts/appState";

export const sideModalControl = create((set, get) => ({
  isOpen: false,
  isAnimating: false,
  isTabletOrMobile: false,
  setIsTabletOrMobile: (v) => set({ isTabletOrMobile: v }),
  open: () => {
    if (get().isAnimating) return;
    set({ isAnimating: true });
    if (get().isTabletOrMobile) {
      gsap.to(".bottomModal", {
        scaleY: 1,
        duration: 1,
        onComplete: () => set({ isAnimating: false, isOpen: true }),
      });
    } else {
      gsap.to(".sideModal", {
        scaleX: 1,
        duration: 1,
        onComplete: () => set({ isAnimating: false, isOpen: true }),
      });
    }
  },
  close: () => {
    if (get().isAnimating) return;
    if (!get().isOpen) return;
    if (get().isTabletOrMobile) {
      gsap.to(".bottomModal", {
        scaleY: 0,
        duration: 1.5,
        onComplete: () => set({ isAnimating: false, isOpen: false }),
      });
    } else {
      gsap.to(".sideModal", {
        scaleX: 0,
        duration: 1.5,
        onComplete: () => set({ isAnimating: false, isOpen: false }),
      });
    }
    set({ isAnimating: true });
  },
}));

export default function SideModal() {
  const close = sideModalControl((state) => state.close);
  const currentPicture = useAppStore((state) => state.currentPicture);
  const pictures = useAppStore((state) => state.pictures);
  const setIsTabletOrMobile = sideModalControl(
    (state) => state.setIsTabletOrMobile
  );
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    setIsTabletOrMobile(isTabletOrMobile);
  }, [isTabletOrMobile, setIsTabletOrMobile]);

  if (pictures.length === 0) return null;

  if (isTabletOrMobile) {
    return (
      <div className="bottomModal w-[100vw] h-[80vh] z-30 bg-black/80 text-white absolute p-4 bottom-0 flex flex-col origin-bottom overflow-y-auto scale-y-0">
        <div className="flex justify-between mb-8">
          <a
            href={pictures[currentPicture].links.html}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Original link
          </a>
          <p
            onClick={close}
            className="cursor-pointer underline underline-offset-2"
          >
            close
          </p>
        </div>
        <div className="space-y-4 mb-8">
          <div className="space-y-1">
            <p>
              Likes: {pictures[currentPicture].likes} Downloads:{" "}
              {pictures[currentPicture].downloads}
            </p>
            <p>ISO {pictures[currentPicture].exif.iso}</p>
            <p>F {pictures[currentPicture].exif.aperture}</p>
            <p>{pictures[currentPicture].exif.exposure_time}</p>
            <p>{pictures[currentPicture].exif.focal_length + "mm"}</p>
            <p>{pictures[currentPicture].exif.name}</p>
            <p>{pictures[currentPicture].created_at}</p>
            <p>{pictures[currentPicture].location.name}</p>
          </div>
        </div>
        <p>
          {pictures[currentPicture].description.slice(0, 500) +
            (pictures[currentPicture].description.length >= 500 ? "..." : "")}
        </p>
        <a
          className="mt-8"
          href={pictures[currentPicture].user.links.html}
          target="_blank"
          rel="noreferrer"
        >
          This picture like all the other pictures were taken by myself and can
          be found on my Unsplash profile by clicking on this paragraph.
        </a>
      </div>
    );
  }

  return (
    <ClickAwayListener onClickAway={close}>
      <div className="sideModal w-[35vw] h-[100vh] bg-black/80 z-50 text-white absolute p-4 scale-x-0 right-0 flex flex-col origin-top-right">
        <div className="flex justify-between mb-8">
          <a
            href={pictures[currentPicture].links.html}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Original link
          </a>
          <p
            onClick={close}
            className="cursor-pointer underline underline-offset-2"
          >
            close
          </p>
        </div>
        <div className="space-y-4 mb-8">
          <div className="space-y-1">
            <p>
              Likes: {pictures[currentPicture].likes} Downloads:{" "}
              {pictures[currentPicture].downloads}
            </p>
            <p>ISO {pictures[currentPicture].exif.iso}</p>
            <p>F {pictures[currentPicture].exif.aperture}</p>
            <p>{pictures[currentPicture].exif.exposure_time}</p>
            <p>{pictures[currentPicture].exif.focal_length + "mm"}</p>
            <p>{pictures[currentPicture].exif.name}</p>
            <p>{pictures[currentPicture].created_at}</p>
            <p>{pictures[currentPicture].location.name}</p>
          </div>
        </div>
        <p>
          {pictures[currentPicture].description.slice(0, 500) +
            (pictures[currentPicture].description.length >= 500 ? "..." : "")}
        </p>
        <a
          className="mt-8"
          href={pictures[currentPicture].user.links.html}
          target="_blank"
          rel="noreferrer"
        >
          This picture like all the other pictures were taken by myself and can
          be found on my Unsplash profile by clicking on this paragraph.
        </a>
      </div>
    </ClickAwayListener>
  );
}
