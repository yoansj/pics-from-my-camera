import { createContext, useState } from "react";

export const CameraOsContext = createContext();

export function CameraOsProvider({ children }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [exitTween, setExitTween] = useState(null);

  return (
    <CameraOsContext.Provider value={{ imageIndex, setImageIndex, exitTween, setExitTween }}>
      {children}
    </CameraOsContext.Provider>
  );
}
