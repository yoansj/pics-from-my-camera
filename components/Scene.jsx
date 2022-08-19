import { useSpring, a, easings } from "@react-spring/three";
import { Cloud, OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useState } from "react";
import Box from "./Box";
import Debug from "./Debug";
import SplineCamera from "./SplineCamera";

const Camera = a(PerspectiveCamera);

export default function Scene() {
  const [introDone, setIntroDone] = useState(false);
  const { camera } = useThree();

  const [{ debug, orbitControls, cameraPosition }, set] = useControls(() => ({
    debug: false,
    orbitControls: false,
    cameraPosition: { x: 0, y: 0, z: 0 },
  }));

  useFrame((state) => {
    set({ cameraPosition: { x: state.camera.position.x, y: state.camera.position.y, z: state.camera.position.z } });
  });

  const introAnimation = useSpring({
    to: { position: [4.2, 6.6, 11.2] },
    from: { position: [80, 62, 77] },
    config: { duration: 3000, easing: easings.easeInOutSine, precision: 0.0001 },
    onChange: () => {
      camera.lookAt(0, 1, 0);
    },
    onRest: () => setIntroDone(true),
    reset: false,
    reverse: false,
  });

  return (
    <>
      {debug && <Debug />}
      <Sky sunPosition={[500, 150, -1000]} turbidity={0.1} />
      <OrbitControls enabled={orbitControls} />
      <Camera {...introAnimation} makeDefault />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <SplineCamera />
      <Cloud opacity={1} speed={0.6} width={400} depth={1.5} segments={400} position={[0, 62, 0]} />
    </>
  );
}
