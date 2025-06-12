import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import StarfieldMaterial from './StarFieldMaterial';
import { generateStars } from './generateStars';

const NUM_STARS = 500;

const StarField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const geometry = generateStars(NUM_STARS);
    const material = StarfieldMaterial();
    return { geometry, material };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= 0.0002;
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} renderOrder={-1}/>;
};

export default StarField;