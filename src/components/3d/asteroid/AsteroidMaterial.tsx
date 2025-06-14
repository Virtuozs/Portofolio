// components/3d/asteroid/AsteroidMaterial.tsx
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';

interface AsteroidMaterialProps {
  baseTextureUrl: string;
  sunDirection?: THREE.Vector3;
}

const AsteroidMaterial = ({ baseTextureUrl, sunDirection }: AsteroidMaterialProps) => {
  const baseTexture = useLoader(THREE.TextureLoader, baseTextureUrl);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: baseTexture },
        uSunDirection: { value: sunDirection ?? new THREE.Vector3(-2, 1, 1).normalize() },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldNormal;

        void main() {
          vUv = uv;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec3 uSunDirection;

        varying vec2 vUv;
        varying vec3 vWorldNormal;

        void main() {
          float light = max(dot(normalize(vWorldNormal), normalize(uSunDirection)), 0.0);
          vec3 baseColor = texture2D(uTexture, vUv).rgb;
          gl_FragColor = vec4(baseColor * light, 1.0);
        }
      `,
    });
  }, [baseTexture, sunDirection]);

  return <primitive object={material} attach="material" />;
};

export default AsteroidMaterial;
