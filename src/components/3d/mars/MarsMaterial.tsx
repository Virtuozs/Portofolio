import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';

interface MarsMaterialProps {
  sunDirection?: THREE.Vector3;
}

const defaultSunDirection = new THREE.Vector3(-2, 0.6, 1.4).normalize();

const MarsMaterial: React.FC<MarsMaterialProps> = ({ sunDirection = defaultSunDirection }) => {
  const dayMap = useLoader(THREE.TextureLoader, "./textures/mars/8k_mars.jpg");
  dayMap.anisotropy = 16;

  const material = useMemo(() => {
    const uniforms = {
      dayTexture: { value: dayMap },
      sunDirection: { value: sunDirection },
    };

    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * modelPosition;

        vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

        vUv = uv;
        vNormal = modelNormal;
        vPosition = modelPosition.xyz;
      }
    `;

    const fragmentShader = `
      uniform sampler2D dayTexture;
      uniform vec3 sunDirection;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;

      void main() {
        vec3 viewDirection = normalize(vPosition - cameraPosition);
        vec3 normal = normalize(vNormal);

        float light = dot(sunDirection, normal);
        vec3 baseColor = texture2D(dayTexture, vUv).rgb;
        baseColor *= clamp(light, 0.1, 1.0);

        gl_FragColor = vec4(baseColor, 1.0);
      }
    `;

    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
  }, [dayMap, sunDirection]);

  return <primitive object={material} attach="material" />;
};

export default MarsMaterial;
