import gsap from "gsap";
import { useEffect } from "react";

export default function CameraAnimation({ camera }) {
  useEffect(() => {
    console.log("camera", camera);
    if (camera) {
      // camera.position.set(80, 62, 77);
      gsap.fromTo(
        camera.position,
        { x: camera.position.x, y: camera.position.y, z: camera.position.z },
        {
          x: 4.2,
          y: 6.6,
          z: 11.2,
          duration: 3000,
          onComplete: () => {
            // setIntroDone(true);
          },
          onUpdate: () => {
            camera.lookAt(0, 1, 0);
          },
        }
      );
    }
  }, [camera]);

  return <></>;
}
