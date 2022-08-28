import { PerspectiveCamera, RenderTexture, Text, Image } from "@react-three/drei";
import gsap from "gsap";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useAppStore } from "../contexts/appState";
import useImagesTextures from "../hooks/useImagesTextures";

function CameraScreen({ ...props }, ref) {
  const finishedZoom = useAppStore((state) => state.finishedZoom);
  const currentPictureSet = useAppStore((state) => state.currentPictureSet);
  const currentPicture = useAppStore((state) => state.currentPicture);
  const textures = useImagesTextures();

  const screenColor = useRef();
  const imageRef = useRef();

  const [colorFaded, setColorFaded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const nextImage = () => {
    gsap.to(imageRef.current.position, {
      x: 7,
      duration: 0.5,
      onComplete: () => {
        console.log(textures[imageIndex].image);
        setImageIndex((imageIndex) => (imageIndex + 1) % textures.length);
        currentPictureSet((currentPicture + 1) % textures.length);
        gsap.fromTo(imageRef.current.position, { x: -7 }, { x: 0, duration: 0.5, });
      }
    })
  }

  const previousImage = () => {
    gsap.to(imageRef.current.position, {
      x: -7,
      duration: 0.5,
      onComplete: () => {
        setImageIndex((imageIndex) => (imageIndex - 1 + textures.length) % textures.length);
        currentPictureSet((currentPicture - 1 + textures.length) % textures.length);
        gsap.fromTo(imageRef.current.position, { x: 7 }, { x: 0, duration: 0.5, });
      }
    })
  };

  useImperativeHandle(ref, () => ({
    previousImage,
    nextImage,
  }))

  useEffect(() => {
    if (finishedZoom === true) {
      gsap.to(screenColor.current, { r: 1, g: 1, b: 1, duration: 1, onComplete: () => {
        setColorFaded(true);
        if (imageRef.current !== undefined) {
          gsap.to(imageRef.current.position, { x: 0, y: 0, z: 0, duration: 1.5 });
        }
      } });
    }
  }, [finishedZoom]);

  return (
    <meshStandardMaterial>
      <RenderTexture attach="map" anisotropy={16} width={1000}>
        <Image name="oueouestpmarche" ref={imageRef} position={[0, 7, 0]} scale={[5, 5, 5]} transparent opacity={1} texture={textures[imageIndex]} />
        <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 7]} />
        <color attach="background" args={[0, 0, 0]} ref={screenColor} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Text fontSize={0.4} color="#000" position={[-2.3, -3.1, 0]}>
          {colorFaded ? "cameraOs" : ""}
        </Text>
      </RenderTexture>
    </meshStandardMaterial>
  );
}

export default forwardRef(CameraScreen);