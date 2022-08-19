import { useSpring } from "@react-spring/three";
import { OrbitControls, Sky } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import Box from "./Box";
import Debug from "./Debug";
import SplineCamera from "./SplineCamera";

export default function Scene() {
  const { camera } = useThree();

  const [{ debug, orbitControls }] = useControls(() => ({
    debug: false,
    orbitControls: false,
  }));

  // const props = useSpring({
  //   to: { position: [4.2, 6.6, 11.2] },
  //   from: { position: [80, 62, 77] },
  //   config: { duration: 3000, easing: easings.easeInOutSine },
  //   onChange: () => {
  //     camera.lookAt(0, 1, 0);
  //   },
  //   // onRest: () => setIntroDone(true),
  //   reset: false,
  //   reverse: false,
  // });

  return (
    <>
      {debug && <Debug />}
      <Sky sunPosition={[500, 150, -1000]} turbidity={0.1} />
      <OrbitControls enabled={orbitControls} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <SplineCamera />
    </>
  );
}
