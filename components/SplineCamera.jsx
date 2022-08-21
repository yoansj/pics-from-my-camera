import useSpline from "@splinetool/r3f-spline";
import { PerspectiveCamera, RenderTexture, Text } from "@react-three/drei";
import { MathUtils, Group } from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useAppStore } from "../contexts/appState";
import CameraScreen from "./CameraScreen";

export default function SplineCamera({ ...props }) {
  const { nodes, materials } = useSpline("https://prod.spline.design/erd3L7Tl6g7REq9t/scene.splinecode");
  const clickedOnCamera = useAppStore((state) => state.clickedOnCamera);

  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      if (clickedOnCamera === true) {
        group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, 0, 0.1);

        group.current.position.y = MathUtils.lerp(group.current.position.y, (0.1 + Math.sin(t) / 3) / 2, 0.1);
        return;
      }
      group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, group.current.rotation.y + 0.05, 0.1);
      group.current.position.y = MathUtils.lerp(group.current.position.y, (2 + Math.sin(t)) / 3, 0.1);
    }
  });

  return (
    <>
      <group {...props} dispose={null} ref={group}>
        <group name="Camera 3d" position={[0, 0, 0]} scale={0.01}>
          <mesh
            name="Camera screen"
            geometry={nodes["Camera screen"].geometry}
            castShadow
            receiveShadow
            position={[1, -16.09, -178.85]}
          >
            <CameraScreen />
          </mesh>
          <mesh
            name="Camera body"
            geometry={nodes["Camera body"].geometry}
            castShadow
            receiveShadow
            position={[0, -33.44, -64.97]}
          >
            <meshStandardMaterial attach="material" color="#252327" />
          </mesh>
          <mesh
            name="Objective body"
            geometry={nodes["Objective body"].geometry}
            castShadow
            receiveShadow
            position={[0, -35.44, 29.4]}
            rotation={[1.59, 0, 0]}
          >
            <meshStandardMaterial attach="material" color="#3F4347" />
          </mesh>
          <mesh
            name="Inner objective"
            geometry={nodes["Inner objective"].geometry}
            castShadow
            receiveShadow
            position={[-2, -32.99, 81.89]}
            rotation={[1.59, 0, 0]}
          >
            <meshStandardMaterial attach="material" color="#9D5336" />
          </mesh>
          <mesh
            name="Objective lense"
            geometry={nodes["Objective lense"].geometry}
            material={materials["Objective lense Material"]}
            castShadow
            receiveShadow
            position={[1.5, -34.44, 135.39]}
          />
          <group name="Flash" position={[-76.5, 134.94, -56.38]}>
            <mesh
              name="Flash body"
              geometry={nodes["Flash body"].geometry}
              material={materials["Flash body Material"]}
              castShadow
              receiveShadow
              position={[0, 0, -8.59]}
            />
            <mesh
              name="Flash light"
              geometry={nodes["Flash light"].geometry}
              material={materials["Flash light Material"]}
              castShadow
              receiveShadow
              position={[0, 5.34, 13.59]}
            />
          </group>
          <mesh
            name="Shutter"
            geometry={nodes.Shutter.geometry}
            castShadow
            receiveShadow
            position={[104, 101.78, -62.97]}
          >
            <meshStandardMaterial attach="material" color="#9D5336" />
          </mesh>
        </group>
      </group>
    </>
  );
}
