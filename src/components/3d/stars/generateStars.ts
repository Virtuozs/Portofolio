import * as THREE from 'three';

export const generateStars = (numStars: number) => {
  const positions = new Float32Array(numStars * 3);
  const randomness = new Float32Array(numStars);

  for (let i = 0; i < numStars; i++) {
    const radius = Math.random() * 5 + 5;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions.set([x, y, z], i * 3);
    randomness[i] = Math.random();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomness, 1));

  return geometry;
};
