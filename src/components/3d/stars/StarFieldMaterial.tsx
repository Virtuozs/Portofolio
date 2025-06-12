import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const StarfieldMaterial = () => {
  const texture = useLoader(THREE.TextureLoader ,'./textures/starfield/circle.png');
const vertexShader = `
  attribute float aRandom;
  uniform float uTime;
  varying float vBrightness;

  void main() {
    float flicker = aRandom > 0.7 ? sin(uTime * (aRandom * 1.0)) * 0.5 + 0.5 : aRandom;
    vBrightness = flicker;

    vec4 mvPosition = modelViewMatrix * vec4(position, 2.0);
    gl_PointSize = 2.5;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  precision mediump float;
  varying float vBrightness;

  void main() {
    gl_FragColor = vec4(vec3(vBrightness), 2.0);
  }
`;
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: false,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0xffffff) },
      uSize: { value: 2 },
      uTexture: { value: texture },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader 
  });
};

export default StarfieldMaterial;
