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
  const [isMoving, setIsMoving] = useState(false);

  const nextImage = () => {
    if (isMoving) return;
    gsap.to(imageRef.current.position, {
      x: 7,
      duration: 0.5,
      onStart: () => setIsMoving(true),
      onComplete: () => {
        console.log(imageIndex, currentPicture);
        if (imageIndex + 1 > textures.length - 1) {
          setImageIndex(0);
          currentPictureSet(0);
        } else {
          setImageIndex((i) => i + 1);
          currentPictureSet(imageIndex + 1);
        }
        gsap.fromTo(
          imageRef.current.position,
          { x: -7 },
          { x: 0, duration: 0.5, onComplete: () => setIsMoving(false) }
        );
      },
    });
  };

  const previousImage = () => {
    gsap.to(imageRef.current.position, {
      x: -7,
      duration: 0.5,
      onStart: () => setIsMoving(true),
      onComplete: () => {
        if (imageIndex - 1 < 0) {
          setImageIndex(textures.length - 1);
          currentPictureSet(textures.length - 1);
        } else {
          setImageIndex((imageIndex) => imageIndex - 1);
          currentPictureSet(imageIndex - 1);
        }
        console.log(imageIndex, currentPicture);
        gsap.fromTo(
          imageRef.current.position,
          { x: 7 },
          { x: 0, duration: 0.5, onComplete: () => setIsMoving(false) }
        );
      },
    });
  };

  useImperativeHandle(ref, () => ({
    previousImage,
    nextImage,
  }));

  useEffect(() => {
    if (finishedZoom === true) {
      gsap.to(screenColor.current, {
        r: 1,
        g: 1,
        b: 1,
        duration: 1,
        onComplete: () => {
          setColorFaded(true);
          if (imageRef.current !== undefined) {
            gsap.to(imageRef.current.position, {
              x: 0,
              y: 0,
              z: 0,
              duration: 1.5,
            });
          }
        },
      });
    }
  }, [finishedZoom]);

  return (
    <meshStandardMaterial>
      <RenderTexture attach="map" anisotropy={16} width={1000}>
        <Image
          ref={imageRef}
          position={[0, 7, 0]}
          scale={[5, 5, 5]}
          transparent
          opacity={1}
          texture={textures[imageIndex]}
          toneMapped={false}
        />
        <PerspectiveCamera
          makeDefault
          manual
          aspect={1 / 1}
          position={[0, 0, 7]}
        />
        <color attach="background" args={[0, 0, 0]} ref={screenColor} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Text fontSize={0.4} color="#000" position={[-2.8, 3.1, 0]}>
          {colorFaded && imageIndex + 1 + " / 3"}
        </Text>
        <Text fontSize={0.4} color="#000" position={[-2.3, -3.1, 0]}>
          {colorFaded ? "cameraOs" : ""}
        </Text>
      </RenderTexture>
    </meshStandardMaterial>
  );
}

export default forwardRef(CameraScreen);