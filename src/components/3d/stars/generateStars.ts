import * as THREE from 'three';

export const generateStars = (numStars: number): THREE.BufferGeometry => {
  const positions = new Float32Array(numStars * 3);
  const randomness = new Float32Array(numStars);

  for (let i = 0; i < numStars; i++) {
    const radius = Math.random() * 1000 + 200;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);

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
