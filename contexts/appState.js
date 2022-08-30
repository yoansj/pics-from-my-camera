import create from "zustand";

export const useAppStore = create((set) => ({
  /**
   * Allows to know if the first camera intro has been done
   */
  cameraIntroDone: false,
  /**
   * Changes the value of the cameraIntroDone property
   * @param {boolean} v
   * @returns void
   */
  cameraIntroSet: (v) => set({ cameraIntroDone: v }),

  /**
   * Allows to know if the user has clicked on the camera
   */
  clickedOnCamera: false,

  /**
   * Changes the value of the clickedOnCamera property
   * @param {boolean} v
   * @returns void
   */
  clickedOnCameraSet: (v) => set({ clickedOnCamera: v }),

  /**
   * Post click animation state
   */
  finishedZoom: false,

  /**
   * Changes the value of the finishedZoom property
   * @param {boolean} v
   * @returns void
   */
  finishedZoomSet: (v) => set({ finishedZoom: v }),

  /**
   * Picture being displayed on the camera
   */
  currentPicture: 0,

  /**
   * Changes the value of the currentPicture property
   * @param {number} v
   * @returns void
   */
  currentPictureSet: (v) => set({ currentPicture: v }),

  sideModalOpen: false,

  setSideModalOpen: (v) => set({ sideModalOpen: v }),
}));
