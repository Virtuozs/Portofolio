import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const CameraScrollAnimation = () => {
  const { camera, scene } = useThree();
  const scroll = useScroll();


  useFrame(() => {
    const offset = scroll.offset; // normalized 0 - 1

    camera.position.z = THREE.MathUtils.lerp(6, 80, offset);
    camera.position.y = THREE.MathUtils.lerp(0, 1.2, offset);
    camera.lookAt(6, 0.8, 0);



    const earth = scene.getObjectByName('Earth');
    if (earth) {
      earth.position.z = THREE.MathUtils.lerp(0, -10, offset);
      earth.scale.setScalar(THREE.MathUtils.lerp(1, 0.3, offset));
    }

    const mars = scene.getObjectByName('Mars');
    if (mars) {
        mars.position.z = THREE.MathUtils.lerp(60, -15, offset);
        mars.position.y = THREE.MathUtils.lerp(55, -20, offset);
        mars.position.x = THREE.MathUtils.lerp(10, -10, offset);
        mars.scale.setScalar(THREE.MathUtils.lerp(-15, -15.0, offset));
    }

  });

  return null;
};

export default CameraScrollAnimation;