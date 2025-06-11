import * as THREE from 'three';
import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';

const defaultSunDirection = new THREE.Vector3(-2, 0.6, 1.4).normalize();

interface EarthMaterialProps {
  sunDirection?: THREE.Vector3;
}

function getEarthMaterial({ sunDirection = defaultSunDirection }: EarthMaterialProps) {
  const map = useLoader(THREE.TextureLoader, "./textures/earth/8k_earth_daymap.jpg");
  const nightMap = useLoader(THREE.TextureLoader, "./textures/earth/8k_earth_nightmap.jpg");
  const cloudMap = useLoader(THREE.TextureLoader, "./textures/earth/8k_earth_clouds.jpg");

  [map, nightMap, cloudMap].forEach(tex => tex.anisotropy = 16);

  const uniforms: { [uniform: string]: {value: any} } = {
    dayTexture: {value: map},
    nightTexture: {value: nightMap},
    cloudsTexture: {value: cloudMap},
    sunDirection: {value: sunDirection},
  }

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
    }`;

  const fragmentShader = `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform sampler2D cloudsTexture;
    uniform vec3 sunDirection;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 viewDirection = normalize(vPosition - cameraPosition);
      vec3 normal = normalize(vNormal);
      vec3 color = vec3(0.0);

      float sunOrientation = dot(sunDirection, normal);
      float dayMix = smoothstep(-0.25, 0.5, sunOrientation);

      vec3 dayColor = texture2D(dayTexture, vUv).rgb;
      vec3 nightColor = texture2D(nightTexture, vUv).rgb;
      color = mix(nightColor, dayColor, dayMix);

      vec2 specularCloudsColor = texture2D(cloudsTexture, vUv).rg;
      float cloudsMix = smoothstep(0.0, 1.0, specularCloudsColor.g);
      cloudsMix *= dayMix;
      color = mix(color, vec3(1.0), cloudsMix);

      vec3 reflection = reflect(-sunDirection, normal);
      float specular = -dot(reflection, viewDirection);
      // Optional enhancement:
      specular = max(specular, 0.0);
      specular = pow(specular, 0.5);
      specular *= specularCloudsColor.r;
      color += specular * 0.5;

      gl_FragColor = vec4(color, 1.0);
    }`;

    return new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader
    });
}

const EarthMaterial: React.FC<EarthMaterialProps> = ({ sunDirection }) => {
  const material = useMemo(() => getEarthMaterial({ sunDirection }), [sunDirection]);

  return <primitive object={material} attach="material" />;
}

export default EarthMaterial;