import { PerspectiveCamera, RenderTexture, Text } from "@react-three/drei";

export default function CameraScreen({ ...props }) {
  return (
    <meshStandardMaterial>
      <RenderTexture attach="map" anisotropy={16} width={1000}>
        <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 5]} />
        <color attach="background" args={["orange"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Text fontSize={0.4} color="#555">
          Pictures from my camera
        </Text>
      </RenderTexture>
    </meshStandardMaterial>
  );
}
