import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { generateStars } from './generateStars';
import StarfieldMaterial from './StarFieldMaterial';

const NUM_STARS = 2000;

const StarField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const geometry = generateStars(NUM_STARS);
    const material = StarfieldMaterial();
    return { geometry, material };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} material={material} />
  );
};

export default StarField;
