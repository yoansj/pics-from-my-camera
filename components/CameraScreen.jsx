import { PerspectiveCamera, RenderTexture, Text, Image } from "@react-three/drei";
import gsap from "gsap";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import imageList from "../assets/imageList";
import { useAppStore } from "../contexts/appState";
import { CameraOsContext } from "../contexts/CameraOs";
import useImagesTextures from "../hooks/useImagesTextures";

export default function CameraScreen({ ...props }) {
  const finishedZoom = useAppStore((state) => state.finishedZoom);
  const textures = useImagesTextures();

  const screenColor = useRef();
  const imageRef = useRef();
  const cameraOsContext = useContext(CameraOsContext);

  const [colorFaded, setColorFaded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const exitTween = useMemo(() => {
    if (imageRef.current) {
      console.log(imageRef.current.position);
      return gsap.to(imageRef.current.position, {
        x: 10,
        duration: 0.5,
        paused: true,
        onStart: () => {
          console.log("onStart");
        },
      });
    }
  }, [imageRef]);

  // cameraOsContext.setExitTween(exitTween);

  // useEffect(() => {
  //   if (exitTween) {
  //     cameraOsContext.setExitTween(exitTween);
  //   }
  // }, [exitTween, cameraOsContext]);

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
        <Image ref={imageRef} position={[0, 0, 0]} scale={[5, 5, 5]} texture={textures[0]} />
      </RenderTexture>
    </meshStandardMaterial>
  );
}
