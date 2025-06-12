import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const CameraScrollAnimation = () => {
  const { camera, scene } = useThree();
  const scroll = useScroll();

  useFrame(() => {
    const offset = scroll.offset; // 0 to 1

    // Camera: Zooms out and slightly upward
    camera.position.z = THREE.MathUtils.lerp(0, 50, offset);
    camera.position.y = THREE.MathUtils.lerp(0, 1.5, offset);
    camera.lookAt(0, 0, -20); // Adjust for a broader view

    // Earth: Moves far back and shrinks
    const earth = scene.getObjectByName('Earth');
    if (earth) {
      earth.position.z = THREE.MathUtils.lerp(-6, -60, offset);
      earth.scale.setScalar(THREE.MathUtils.lerp(1.2, 0.5, offset));
    }

    // Mars: Comes from behind camera into view, later
    const mars = scene.getObjectByName('Mars');
    if (mars) {
      mars.position.z = THREE.MathUtils.lerp(10, 40, offset);
      mars.scale.setScalar(THREE.MathUtils.lerp(0.3, 1.5, offset));
    }
  });

  return null;
};

export default CameraScrollAnimation;
