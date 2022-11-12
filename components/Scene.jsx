import { Cloud, Environment, OrbitControls, Sky } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useControls } from "leva";
import { useEffect, useMemo } from "react";
import { useAppStore } from "../contexts/appState";
import Debug from "./Debug";
import SplineCamera from "./SplineCamera";
import { EffectComposer, Bloom, Selection } from "@react-three/postprocessing";
import { useMediaQuery } from "react-responsive";

export default function Scene() {
  const cameraIntroDone = useAppStore((state) => state.cameraIntroDone);
  const cameraIntroSet = useAppStore((state) => state.cameraIntroSet);
  const clickedOnCameraSet = useAppStore((state) => state.clickedOnCameraSet);
  const clickedOnCamera = useAppStore((state) => state.clickedOnCamera);
  const finishedZoomSet = useAppStore((state) => state.finishedZoomSet);
  const finishedZoom = useAppStore((state) => state.finishedZoom);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const { camera } = useThree();

  const clickOnCameraAnimation = useMemo(() => {
    return gsap.fromTo(
      ".clickOnCamera",
      { opacity: 0 },
      { opacity: 1, duration: 1, repeat: -1, yoyo: true, paused: true }
    );
  }, []);

  const [{ debug, orbitControls }] = useControls(() => ({
    debug: false,
    orbitControls: false,
  }));

  useEffect(() => {
    gsap.to(camera.position, {
      x: 4.2,
      y: 6.6,
      z: 11.2,
      duration: 5,
      onUpdate: () => {
        camera.lookAt(0, 1, 0);
      },
      onComplete: () => {
        cameraIntroSet(true);
        clickOnCameraAnimation.play();
      },
    });
  }, [camera]);

  const handleZoomAnimation = () => {
    if (
      cameraIntroDone &&
      finishedZoom === false &&
      clickedOnCamera === false
    ) {
      clickedOnCameraSet(true);
      gsap.to(camera.position, {
        x: 0,
        y: 2,
        z: isTabletOrMobile ? -7.5 : -4.5,
        duration: 2,
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
        onComplete: () => {
          gsap.to(camera.position, {
            y: 0,
            duration: 1,
            onUpdate: () => {
              camera.lookAt(0, 0, 0);
            },
            onComplete: () => {
              gsap.to(".title", { opacity: 1, top: 3, duration: 1 });
              clickOnCameraAnimation.pause(1);
              gsap.to(".clickOnCamera", { opacity: 0, duration: 1 });
              finishedZoomSet(true);
            },
          });
        },
      });
    }
  };

  return (
    <>
      {debug && <Debug />}
      {!isTabletOrMobile && (
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.45}
            luminanceSmoothing={0.8}
            height={300}
          />
        </EffectComposer>
      )}
      <Sky sunPosition={[500, 150, -1000]} turbidity={0.1} />
      {orbitControls && <OrbitControls enabled />}
      <ambientLight color="#fff1db" intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Selection>
        <SplineCamera
          clicked={false}
          onClick={(e) => {
            e.stopPropagation();
            handleZoomAnimation();
          }}
        />
      </Selection>
      <Environment preset="city" />
      <Cloud
        opacity={1}
        speed={0.4}
        width={isTabletOrMobile ? 200 : 400}
        depth={1.5}
        segments={isTabletOrMobile ? 200 : 400}
        position={[0, 62, 0]}
      />
    </>
  );
}
