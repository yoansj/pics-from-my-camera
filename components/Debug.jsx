import { GizmoHelper, GizmoViewport, Stats } from "@react-three/drei";

export default function Debug() {
  return (
    <>
      <axesHelper args={[50]} />
      <gridHelper args={[100, 100, 100]} />
      <Stats />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="black" />
      </GizmoHelper>
    </>
  );
}
