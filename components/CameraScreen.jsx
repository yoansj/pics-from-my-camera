import { PerspectiveCamera, RenderTexture, Text } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../contexts/appState";

export default function CameraScreen({ ...props }) {
  const screenColor = useRef();
  const finishedZoom = useAppStore((state) => state.finishedZoom);

  const [colorFaded, setColorFaded] = useState(false);

  useEffect(() => {
    if (finishedZoom === true) {
      gsap.to(screenColor.current, { r: 1, g: 1, b: 1, duration: 1, onComplete: () => setColorFaded(true) });
    }
  }, [finishedZoom]);

  return (
    <meshStandardMaterial>
      <RenderTexture attach="map" anisotropy={16} width={1000}>
        <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 7]} />
        <color attach="background" args={[0, 0, 0]} ref={screenColor} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Text fontSize={0.4} color="#555">
          {colorFaded ? "cameraOs" : ""}
        </Text>
      </RenderTexture>
    </meshStandardMaterial>
  );
}
