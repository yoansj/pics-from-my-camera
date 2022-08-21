import { useSpring, a, easings } from "@react-spring/three";
import { Cloud, OrbitControls, PerspectiveCamera, Sky, useProgress } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useControls } from "leva";
import { useEffect, useMemo, useRef, useState } from "react";
import Box from "./Box";
import CameraAnimation from "./CameraAnimation";
import Debug from "./Debug";
import SplineCamera from "./SplineCamera";

export default function Scene() {
  const [introDone, setIntroDone] = useState(false);
  const [click, setClick] = useState(false);

  const { camera } = useThree();
  const orbitControlsRef = useRef();

  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  const [{ debug, orbitControls, cameraPosition }, set] = useControls(() => ({
    debug: false,
    orbitControls: false,
    cameraPosition: { x: 0, y: 0, z: 0 },
  }));

  useEffect(() => {
    camera.lookAt(0, 1, 0);
    gsap.to(camera.position, {
      x: 4.2,
      y: 6.6,
      z: 11.2,
      duration: 5,
      onUpdate: () => {
        camera.lookAt(0, 1, 0);
      },
      onComplete: () => {
        setIntroDone(true);
      },
    });
  }, [camera]);

  const handleZoomAnimation = () => {
    if (introDone) {
      setClick(true);
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: -4.5,
        duration: 3,
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
      });
    }
  };

  useFrame((state) => {
    set({ cameraPosition: { x: state.camera.position.x, y: state.camera.position.y, z: state.camera.position.z } });
  });

  return (
    <>
      {debug && <Debug />}
      <Sky sunPosition={[500, 150, -1000]} turbidity={0.1} />
      {orbitControls && <OrbitControls enabled />}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <SplineCamera clicked={click} onClick={handleZoomAnimation} />
      <Cloud opacity={1} speed={0.6} width={400} depth={1.5} segments={400} position={[0, 62, 0]} />
    </>
  );
}
