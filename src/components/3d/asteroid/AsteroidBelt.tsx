// // components/3d/asteroids/AsteroidBelt.tsx
// import { useMemo } from 'react';
// import * as THREE from 'three';
// import Asteroid from './asteroid';

// interface AsteroidBeltProps {
//   count?: number;
//   innerRadius?: number;
//   outerRadius?: number;
//   baseTextureUrl: string;
//   logoTextureUrl: string;
//   sunDirection?: THREE.Vector3;
// }

// const AsteroidBelt = ({
//   count = 100,
//   innerRadius = 4,
//   outerRadius = 6,
//   baseTextureUrl,
//   logoTextureUrl,
//   sunDirection,
// }: AsteroidBeltProps) => {
//   const asteroids = useMemo(() => {
//     const instances = [];
//     for (let i = 0; i < count; i++) {
//       const angle = Math.random() * Math.PI * 2;
//       const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
//       const x = Math.cos(angle) * radius + THREE.MathUtils.randFloatSpread(0.3);
//       const y = THREE.MathUtils.randFloatSpread(0.4); // slight vertical offset
//       const z = Math.sin(angle) * radius + THREE.MathUtils.randFloatSpread(0.3);
//       const scale = THREE.MathUtils.randFloat(0.08, 0.2);
//       instances.push({ position: [x, y, z] as [number, number, number], scale });
//     }
//     return instances;
//   }, [count, innerRadius, outerRadius]);

//   return (
//     <>
//       {asteroids.map(({ position, scale }, index) => (
//         <Asteroid
//           key={index}
//           position={position}
//           scale={scale}
//           baseTextureUrl={baseTextureUrl}
//           logoTextureUrl={logoTextureUrl}
//           sunDirection={sunDirection}
//         />
//       ))}
//     </>
//   );
// };

// export default AsteroidBelt;


// import { useFrame } from '@react-three/fiber';
// import React, { useMemo } from 'react';
// import * as THREE from 'three';
// import Asteroid from './asteroid';

// interface AsteroidBeltProps {
//   count?: number;
//   innerRadius?: number;
//   outerRadius?: number;
//   baseTextureUrl: string;
//   logoTextureUrls: string[];
//   sunDirection?: THREE.Vector3;
//   logoProbability?: number;
//   minDistance?: number;
//   maxDistance?: number;
//   minY?: number;
//   maxY?: number;
// }

// const AsteroidBelt: React.FC<AsteroidBeltProps> = ({
//   count = 200,
//   innerRadius = 4.2,
//   outerRadius = 6,
//   baseTextureUrl,
//   logoTextureUrls,
//   sunDirection,
//   logoProbability = 0.6,
  
// }) => {
//   const asteroids = useMemo(() => {
//     const instances = [];
//     for (let i = 0; i < count; i++) {
//       const angle = Math.random() * Math.PI * 2;

//       if (Math.random() < 0.15) continue; // 15% chance to skip (create a gap)

//       const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
//       const x = Math.cos(angle) * radius + THREE.MathUtils.randFloatSpread(0.3);
//       const y = THREE.MathUtils.randFloatSpread(0.4);
//       const z = Math.sin(angle) * radius + THREE.MathUtils.randFloatSpread(0.3);

//       const scale = THREE.MathUtils.randFloat(0.08, 0.2);
//       const hasLogo = Math.random() < logoProbability;

//       const logo = hasLogo
//         ? logoTextureUrls[Math.floor(Math.random() * logoTextureUrls.length)]
//         : undefined;

//       const orbitalSpeed = THREE.MathUtils.randFloat(0.001, 0.003);

//       instances.push({
//         position: new THREE.Vector3(x, y, z),
//         scale,
//         logoTextureUrl: logo,
//         angle,
//         radius,
//         orbitalSpeed,
//       });
//     }

//     return instances;
//   }, [count, innerRadius, outerRadius, logoTextureUrls, logoProbability]);

//   useFrame((_, delta) => {
//     asteroids.forEach((asteroid) => {
//       asteroid.angle += asteroid.orbitalSpeed * delta * 60;
//       asteroid.position.x =
//         Math.cos(asteroid.angle) * asteroid.radius +
//         THREE.MathUtils.randFloatSpread(0.1);
//       asteroid.position.z =
//         Math.sin(asteroid.angle) * asteroid.radius +
//         THREE.MathUtils.randFloatSpread(0.1);
//     });
//   });

//   return (
//     <>
//       {asteroids.map((asteroid, i) => (
//         <Asteroid
//           key={i}
//           position={asteroid.position.toArray() as [number, number, number]}
//           scale={asteroid.scale}
//           baseTextureUrl={baseTextureUrl}
//           logoTextureUrl={asteroid.logoTextureUrl}
//           sunDirection={sunDirection}
//         />
//       ))}
//     </>
//   );
// };

// export default AsteroidBelt;


import { useFrame } from '@react-three/fiber';
import React, { useMemo } from 'react';
import * as THREE from 'three';
import Asteroid from './asteroid';

interface AsteroidBeltProps {
  count?: number;
  innerRadius?: number;
  outerRadius?: number;
  baseTextureUrl: string;
  logoTextureUrls: string[];
  sunDirection?: THREE.Vector3;
  logoProbability?: number;
  minDistance?: number;
  maxDistance?: number;
  minY?: number;
  maxY?: number;
}

const AsteroidBelt: React.FC<AsteroidBeltProps> = ({
  count = 200,
  innerRadius = 4.2,
  outerRadius = 6,
  baseTextureUrl,
  logoTextureUrls,
  sunDirection,
  logoProbability = 0.6,
  minDistance,
  maxDistance,
  minY = -0.4,
  maxY = 0.4,
}) => {
  const asteroids = useMemo(() => {
  const instances = [];
  const direction = (sunDirection ?? new THREE.Vector3(0, 0, -1)).clone().normalize();

  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.15) continue;

    const angle = Math.random() * Math.PI * 2;
    let radius = innerRadius + Math.random() * (outerRadius - innerRadius);
    radius = THREE.MathUtils.clamp(radius, minDistance ?? innerRadius, maxDistance ?? outerRadius);
    const height = THREE.MathUtils.randFloat(minY, maxY);

    const x = Math.cos(angle) * radius + THREE.MathUtils.randFloatSpread(0.2);
    const y = height;
    const z = Math.sin(angle) * radius + THREE.MathUtils.randFloatSpread(0.2);

    const position = new THREE.Vector3(x, y, z);

    // ✅ Filter back-facing asteroids
    if (position.clone().normalize().dot(direction) < 0.1) continue;

    const scale = THREE.MathUtils.randFloat(0.08, 0.2);
    const hasLogo = Math.random() < logoProbability;
    const logo = hasLogo && logoTextureUrls.length > 0
      ? logoTextureUrls[Math.floor(Math.random() * logoTextureUrls.length)]
      : undefined;

    const orbitalSpeed = THREE.MathUtils.randFloat(0.001, 0.003);

    instances.push({
      position,
      scale,
      logoTextureUrl: logo,
      angle,
      radius,
      height,
      orbitalSpeed,
    });
  }

  return instances;
}, [
  count,
  innerRadius,
  outerRadius,
  logoTextureUrls,
  logoProbability,
  minDistance,
  maxDistance,
  minY,
  maxY,
  sunDirection,
]);


  useFrame((_, delta) => {
    asteroids.forEach((asteroid) => {
      asteroid.angle += asteroid.orbitalSpeed * delta * 20;
      asteroid.position.x =
        Math.cos(asteroid.angle) * asteroid.radius + THREE.MathUtils.randFloatSpread(0.1);
      asteroid.position.z =
        Math.sin(asteroid.angle) * asteroid.radius + THREE.MathUtils.randFloatSpread(0.1);
    });
  });

  return (
    <>
      {asteroids.map((asteroid, i) => (
        <Asteroid
          key={i}
          position={asteroid.position.toArray() as [number, number, number]}
          scale={asteroid.scale}
          baseTextureUrl={baseTextureUrl}
          logoTextureUrl={asteroid.logoTextureUrl}
          sunDirection={sunDirection}
        />
      ))}
    </>
  );
};

export default AsteroidBelt;
