import gsap from "gsap";
import ClickAwayListener from "react-click-away-listener";
import create from "zustand";
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
  const pictures = useAppStore((state) => state.pictures);

  if (pictures.length === 0) return null;

  return (
    <ClickAwayListener onClickAway={close}>
      <div className="sideModal w-[35vw] h-[100vh] bg-black/80 z-50 text-white absolute p-4 -right-full flex flex-col">
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
