import * as THREE from 'three';
import React, { useMemo } from 'react';

const MarsAtmosphereMesh: React.FC = () => {
  const material = useMemo(() => {
    const vertexShader = `
      varying vec3 vNormal;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec3 vNormal;

      void main() {
        float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 0.85)), 9.0);
        gl_FragColor = vec4(0.8, 0.3, 0.2, 1.0) * intensity; // Mars red hue
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
  }, []);

  return (
    <mesh scale={1.1}>
      <icosahedronGeometry args={[1.07, 128]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

export default MarsAtmosphereMesh;
