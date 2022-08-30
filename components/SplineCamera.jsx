import useSpline from "@splinetool/r3f-spline";
import { MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useAppStore } from "../contexts/appState";
import CameraScreen from "./CameraScreen";
import useImagesTextures from "../hooks/useImagesTextures";
import gsap from "gsap";
import { sideModalControl } from "./SideModal";

export default function SplineCamera({ ...props }) {
  const { nodes, materials } = useSpline(
    "https://prod.spline.design/erd3L7Tl6g7REq9t/scene.splinecode"
  );
  const imageRef = useRef();

  const clickedOnCamera = useAppStore((state) => state.clickedOnCamera);
  const setSideModalOpen = useAppStore((state) => state.setSideModalOpen);

  const open = sideModalControl((state) => state.open);

  const textures = useImagesTextures();

  const group = useRef();
  const cameraScreenRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      if (clickedOnCamera === true) {
        group.current.rotation.y = MathUtils.lerp(
          group.current.rotation.y,
          0,
          0.1
        );

        group.current.position.y = MathUtils.lerp(
          group.current.position.y,
          (0.1 + Math.sin(t) / 3) / 2,
          0.1
        );
        return;
      }
      group.current.rotation.y = MathUtils.lerp(
        group.current.rotation.y,
        group.current.rotation.y + 0.05,
        0.1
      );
      group.current.position.y = MathUtils.lerp(
        group.current.position.y,
        (2 + Math.sin(t)) / 3,
        0.1
      );
    }
  });

  const growImage = () => {
    gsap.set(".modal", { zIndex: 51 });
    gsap.to(".modal", { opacity: 1, zIndex: 51, duration: 0.5 });
  };

  const openSideModal = (e) => {
    e.stopPropagation();
    open();
  };

  return (
    <group {...props} dispose={null} ref={group}>
      <group name="Camera" position={[0, 0, 0]} scale={0.01}>
        <mesh
          name="Camera screen"
          geometry={nodes["Camera screen"].geometry}
          castShadow
          receiveShadow
          position={[1, -16.09, -178.85]}
        >
          <CameraScreen ref={cameraScreenRef} />
        </mesh>
        <mesh
          name="Camera body"
          geometry={nodes["Camera body"].geometry}
          material={materials["Camera body Material"]}
          castShadow
          receiveShadow
          position={[0, -33.44, -64.97]}
        />
        <mesh
          name="Objective body"
          geometry={nodes["Objective body"].geometry}
          material={materials["Objective body Material"]}
          castShadow
          receiveShadow
          position={[0, -35.44, 29.4]}
          rotation={[1.59, 0, 0]}
        />
        <mesh
          name="Inner objective"
          geometry={nodes["Inner objective"].geometry}
          material={materials["Inner objective Material"]}
          castShadow
          receiveShadow
          position={[-2, -32.99, 81.89]}
          rotation={[1.59, 0, 0]}
        />
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
          name="Grow Button"
          geometry={nodes["Grow Button"].geometry}
          material={materials["Grow Button Material"]}
          castShadow
          receiveShadow
          position={[25.91, -132.07, -164.58]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
          onClick={growImage}
        >
          <group
            name="Grow button text"
            position={[-2.54, 47.72, 19.78]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={20}
          >
            <mesh
              name="+"
              geometry={nodes["+"].geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-1.18, -2.2, -0.94]}
            />
          </group>
        </mesh>
        <mesh
          name="Information Button"
          geometry={nodes["Information Button"].geometry}
          material={materials["Information Button Material"]}
          castShadow
          receiveShadow
          position={[-25.07, -132.07, -164.72]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
          onClick={openSideModal}
        >
          <group
            name="Information button text"
            position={[-2.54, 47.72, -5.11]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={20}
          >
            <mesh
              name="i"
              geometry={nodes.i.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-0.35, -0.7, -0.94]}
            />
            <mesh
              name="i1"
              geometry={nodes.i1.geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-0.35, -0.7, -0.94]}
            />
          </group>
        </mesh>
        <mesh
          name="Right Button"
          geometry={nodes["Right Button"].geometry}
          material={materials["Right Button Material"]}
          castShadow
          receiveShadow
          position={[79, -132.07, -165.27]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
          onClick={(e) => {
            if (cameraScreenRef.current !== undefined) {
              e.stopPropagation();
              cameraScreenRef.current.nextImage();
            }
          }}
        >
          <group
            name="Right button text"
            position={[-2.54, 47.72, 19.78]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={20}
          >
            <mesh
              name=">"
              geometry={nodes[">"].geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-1.09, -2.2, -0.94]}
            />
          </group>
        </mesh>
        <mesh
          name="Left Button"
          geometry={nodes["Left Button"].geometry}
          material={materials["Left Button Material"]}
          castShadow
          receiveShadow
          position={[129.41, -132.07, -167.39]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
          onClick={(e) => {
            if (cameraScreenRef.current !== undefined) {
              e.stopPropagation();
              cameraScreenRef.current.previousImage();
            }
          }}
        >
          <group
            name="Left button text"
            position={[4.61, 47.72, -22.02]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={20}
          >
            <mesh
              name=">1"
              geometry={nodes[">1"].geometry}
              material={materials["My Text Material"]}
              castShadow
              receiveShadow
              position={[-1.09, -2.2, -0.94]}
            />
          </group>
        </mesh>
        <mesh
          name="Shutter"
          geometry={nodes.Shutter.geometry}
          material={materials["Shutter Material"]}
          castShadow
          receiveShadow
          position={[104, 101.78, -62.97]}
        />
      </group>
    </group>
  );
}