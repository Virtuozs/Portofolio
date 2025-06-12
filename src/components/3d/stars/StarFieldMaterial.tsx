import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const StarfieldMaterial = () => {
  const texture = useLoader(THREE.TextureLoader, './textures/starfield/circle.png');

  const vertexShader = `
    attribute float aRandom;
    uniform float uTime;
    varying float vBrightness;

    void main() {
      // Create flicker effect for certain stars
      float flicker = aRandom > 0.5 
        ? sin(uTime * (aRandom * 5.0)) * 0.5 + 0.5 
        : 1.0;
      vBrightness = flicker;

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = clamp(300.0 / -mvPosition.z, 3.0, 7.0); // Dynamic size
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    precision mediump float;

    varying float vBrightness;
    uniform sampler2D uTexture;


    void main() {
      vec4 tex = texture2D(uTexture, gl_PointCoord);
      vec3 color = vec3(vBrightness) * tex.rgb;
      gl_FragColor = vec4(color, tex.a * vBrightness);
    }
  `;

  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: texture },
    },
    vertexShader,
    fragmentShader,
  });
};

export default StarfieldMaterial;
