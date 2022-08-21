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
}));
