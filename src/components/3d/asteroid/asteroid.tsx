// Asteroid.tsx
// import * as THREE from 'three';
// import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import AsteroidMaterial from './AsteroidMaterial';
// import { OrbitControls } from '@react-three/drei';

// interface AsteroidProps {
//   position: [number, number, number];
//   scale: number;
//   rotationSpeed?: number;
//   sunDirection?: THREE.Vector3;
// }

// const Asteroid = ({ position, scale = 0.2, rotationSpeed = 0.002, sunDirection }: AsteroidProps) => {
//   const meshRef = useRef<THREE.Mesh>(null);

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += rotationSpeed;
//     }
//   });

//   return (
//     <mesh ref={meshRef} position={position} scale={scale}>
//       <sphereGeometry args={[1, 32, 32]} />
//       <AsteroidMaterial sunDirection={sunDirection} baseTextureUrl='./textures/asteroid/4k_asteroid.jpg' logoTextureUrl='./logo/javascript.png'/>
//       <OrbitControls
//         enableZoom={false}
//         enablePan={true}
//         enableRotate={true}
//         rotateSpeed={0.5}
//       />
//     </mesh>
//   );
// };
// export default Asteroid;


// import * as THREE from 'three';
// import { useFrame, useThree } from '@react-three/fiber';
// import { useRef, useMemo } from 'react';
// import AsteroidMaterial from './AsteroidMaterial';
// import { SphereGeometry } from 'three';

// interface AsteroidProps {
//   position: [number, number, number];
//   baseTextureUrl: string;
//   logoTextureUrl: string;
//   scale?: number;
//   sunDirection?: THREE.Vector3;
// }

// const Asteroid = ({
//   position,
//   baseTextureUrl,
//   logoTextureUrl,
//   sunDirection,
//   scale = 0.2,
// }: AsteroidProps) => {
//   const meshRef = useRef<THREE.Mesh>(null);
//   const { camera } = useThree();

//   // Memoize a stable rotation axis biased toward camera direction
//   const rotationAxis = useMemo(() => {
//     const biasDir = new THREE.Vector3().subVectors(camera.position, new THREE.Vector3(...position)).normalize();
//     const randomAxis = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
//     return randomAxis.lerp(biasDir, 0.5).normalize(); // 50% bias toward camera
//   }, [camera.position, position]);

//   const angularSpeed = useMemo(() => Math.random() * 0.3 + 0.1, []);

//   useFrame((_, delta) => {
//     if (!meshRef.current) return;
//     meshRef.current.rotateOnAxis(rotationAxis, angularSpeed * delta);
//   });

//   return (
//     <mesh ref={meshRef} position={position} scale={scale} geometry={new SphereGeometry(1, 32, 32)} name="Asteroid">
//       <AsteroidMaterial
//         baseTextureUrl={baseTextureUrl}
//         logoTextureUrl={logoTextureUrl}
//         sunDirection={sunDirection}
//       />
//     </mesh>
//   );
// };

// export default Asteroid;

// import * as THREE from 'three';
// import { SphereGeometry } from 'three';
// import { useRef } from 'react';
// import { PresentationControls } from '@react-three/drei';
// import AsteroidMaterial from './AsteroidMaterial';

// interface AsteroidProps {
//   position: [number, number, number];
//   baseTextureUrl: string;
//   logoTextureUrl: string;
//   sunDirection?: THREE.Vector3;
//   scale?: number;
// }

// const Asteroid = ({
//   position,
//   baseTextureUrl,
//   logoTextureUrl,
//   sunDirection,
//   scale = 0.2,
// }: AsteroidProps) => {
//   const meshRef = useRef<THREE.Mesh>(null);

//   return (
//     <PresentationControls
//       global={false}
//       speed={1}
//       rotation={[0, 0, 0]}
//       polar={[-Math.PI / 2, Math.PI / 2]}   // Vertical limits
//       azimuth={[-Math.PI, Math.PI]}        // Horizontal limits
//     >
//       <mesh
//         ref={meshRef}
//         position={position}
//         geometry={new SphereGeometry(1, 64, 64)}
//         name="Asteroid"
//         scale={scale}
//       >
//         <AsteroidMaterial
//           baseTextureUrl={baseTextureUrl}
//           logoTextureUrl={logoTextureUrl}
//           sunDirection={sunDirection}
//         />
//       </mesh>
//     </PresentationControls>
//   );
// };

// export default Asteroid;


// import * as THREE from 'three';
// import { useRef, useState } from 'react';
// import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
// import AsteroidMaterial from './AsteroidMaterial';

// interface AsteroidProps {
//   position: [number, number, number];
//   scale: number;
//   rotationSpeed?: number;
//   sunDirection?: THREE.Vector3;
// }

// const Asteroid = ({
//   position,
//   scale = 0.2,
//   rotationSpeed = 0.002,
//   sunDirection,
// }: AsteroidProps) => {
//   const meshRef = useRef<THREE.Mesh>(null);
//   const { gl } = useThree();
//   const [isDragging, setIsDragging] = useState(false);
//   const dragStart = useRef<number | null>(null);
//   const lastDelta = useRef(0);

//   // Handle mouse drag rotation
// const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
//   e.stopPropagation();
//   setIsDragging(true);
//   dragStart.current = e.clientX;
//   gl.domElement.style.cursor = 'grabbing';
// };

// const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
//   if (!isDragging || !meshRef.current || dragStart.current === null) return;
//   const delta = (e.clientX - dragStart.current) * 0.05;
//   meshRef.current.rotation.y += delta;
//   lastDelta.current = delta;
//   dragStart.current = e.clientX;
// };

// const handlePointerUp = () => {
//   setIsDragging(false);
//   dragStart.current = null;
//   gl.domElement.style.cursor = 'auto';
// };

//   // Idle rotation
//   useFrame(() => {
//     if (!isDragging && meshRef.current) {
//       meshRef.current.rotation.y += rotationSpeed!;
//     }
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       position={position}
//       scale={scale}
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//       onPointerUp={handlePointerUp}
//     >
//       <sphereGeometry args={[1, 32, 32]} />
//       <AsteroidMaterial
//         sunDirection={sunDirection}
//         baseTextureUrl="./textures/asteroid/4k_asteroid.jpg"
//         logoTextureUrl="./logo/javascript.png"
//       />
//     </mesh>
//   );
// };

// export default Asteroid;

// import * as THREE from 'three';
// import { useRef, useState } from 'react';
// import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
// import AsteroidMaterial from './AsteroidMaterial';

// interface AsteroidProps {
//   position: [number, number, number];
//   scale: number;
//   rotationSpeed?: number;
//   sunDirection?: THREE.Vector3;
// }

// const Asteroid = ({
//   position,
//   scale = 0.2,
//   rotationSpeed = 0.05,
//   sunDirection,
// }: AsteroidProps) => {
//   const meshRef = useRef<THREE.Mesh>(null);
//   const { gl } = useThree();
//   const [isDragging, setIsDragging] = useState(false);
//   const dragStart = useRef<number | null>(null);
//   const velocity = useRef(0);

//   // Drag handlers
//   const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
//     e.stopPropagation();
//     setIsDragging(true);
//     dragStart.current = e.clientX;
//     gl.domElement.style.cursor = 'grabbing';
//   };

//   const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
//     if (!isDragging || !meshRef.current || dragStart.current === null) return;
//     const delta = (e.clientX - dragStart.current) * 0.05;
//     velocity.current = delta; // Save for momentum
//     meshRef.current.rotation.y += delta;
//     dragStart.current = e.clientX;
//   };

//   const handlePointerUp = () => {
//     setIsDragging(false);
//     dragStart.current = null;
//     gl.domElement.style.cursor = 'auto';
//   };

//   // Animate rotation
//   useFrame(() => {
//     if (meshRef.current) {
//       if (!isDragging) {
//         // Apply momentum or idle rotation
//         meshRef.current.rotation.y += velocity.current || rotationSpeed!;
//         // Gradually reduce momentum
//         velocity.current *= 0.95;
//         if (Math.abs(velocity.current) < 0.0001) {
//           velocity.current = 0; // Stop drifting
//         }
//       }
//     }
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       position={position}
//       scale={scale}
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//       onPointerUp={handlePointerUp}
//     >
//       <sphereGeometry args={[1, 32, 32]} />
//       <AsteroidMaterial
//         sunDirection={sunDirection}
//         baseTextureUrl="./textures/asteroid/4k_asteroid.jpg"
//         logoTextureUrl="./logo/javascript.png"
//       />
//     </mesh>
//   );
// };

// export default Asteroid;


// import * as THREE from 'three';
// import { useRef, useState, useEffect } from 'react';
// import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
// import AsteroidMaterial from './AsteroidMaterial';
// import { Decal, useTexture } from '@react-three/drei';
// // import { Decal, useTexture } from '@react-three/drei';

// interface AsteroidProps {
//   position: [number, number, number];
//   scale: number;
//   rotationSpeed?: number;
//   sunDirection?: THREE.Vector3;
// }

// const Asteroid = ({
//   position,
//   scale = 0.2,
//   rotationSpeed = 0.002,
//   sunDirection,
// }: AsteroidProps) => {
//   const meshRef = useRef<THREE.Mesh>(null);
//   const { gl } = useThree();
//   const [isDragging, setIsDragging] = useState(false);
//   const dragStart = useRef<number | null>(null);
//   const velocity = useRef(0);

//   // Clean up drag state on global pointer up
//   useEffect(() => {
//     const handlePointerUp = () => {
//       if (isDragging) {
//         setIsDragging(false);
//         dragStart.current = null;
//         gl.domElement.style.cursor = 'auto';
//       }
//     };

//     window.addEventListener('pointerup', handlePointerUp);
//     return () => window.removeEventListener('pointerup', handlePointerUp);
//   }, [isDragging, gl.domElement]);

//   const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
//     e.stopPropagation();
//     setIsDragging(true);
//     dragStart.current = e.clientX;
//     gl.domElement.style.cursor = 'grabbing';
//   };

//   const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
//     if (!isDragging || !meshRef.current || dragStart.current === null) return;

//     const delta = (e.clientX - dragStart.current) * 0.01;
//     velocity.current = delta;
//     meshRef.current.rotation.y += delta;
//     dragStart.current = e.clientX;
//   };

//   useFrame(() => {
//     if (!meshRef.current) return;

//     if (!isDragging) {
//       // Smooth idle rotation with momentum
//       meshRef.current.rotation.y += velocity.current || rotationSpeed!;
//       velocity.current *= 0.95;
//       if (Math.abs(velocity.current) < 0.0001) velocity.current = 0;
//     }
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       position={position}
//       scale={scale}
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//     >
//       <sphereGeometry args={[1, 32, 32]} />
//       <AsteroidMaterial
//         sunDirection={sunDirection}
//         baseTextureUrl="./textures/asteroid/4k_asteroid.jpg"
//       />
//         <Decal
//             position={[0, 0, 0.4]}
//             rotation={[0, 0, 0]}
//             scale={1.2}
//             map={useTexture('./logo/javascript.png')}
//             polygonOffsetFactor={-10}
//         />
//     </mesh>
//   );
// };

// export default Asteroid;


// components/3d/asteroid/Asteroid.tsx
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { Decal, useTexture } from '@react-three/drei';
import AsteroidMaterial from './AsteroidMaterial';

interface AsteroidProps {
  position: [number, number, number];
  scale?: number;
  rotationSpeed?: number;
  sunDirection?: THREE.Vector3;
  baseTextureUrl: string;
  logoTextureUrl?: string;
  logoDecalPosition?: [number, number, number];
  logoDecalScale?: number;
  logoDecalRotation?: [number, number, number];
}

const Asteroid = ({
  position,
  scale = 0.2,
  rotationSpeed = 0.002,
  sunDirection,
  baseTextureUrl,
  logoTextureUrl,
  logoDecalPosition = [0, 0, 1],
  logoDecalScale = 1.0,
  logoDecalRotation = [0, 0, 0],
}: AsteroidProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { gl } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<number | null>(null);
  const velocity = useRef(0);

  const fallbackTexture = '/logo/transparent.png';

  const safeLogoTextureUrl = logoTextureUrl ?? fallbackTexture;
  const logoMap = useTexture(safeLogoTextureUrl);

  useEffect(() => {
    const handlePointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        dragStart.current = null;
        gl.domElement.style.cursor = 'auto';
      }
    };

    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, [isDragging, gl.domElement]);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStart.current = e.clientX;
    gl.domElement.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging || !meshRef.current || dragStart.current === null) return;
    const delta = (e.clientX - dragStart.current) * 0.02;
    velocity.current = delta;
    meshRef.current.rotation.y += delta;
    dragStart.current = e.clientX;
  };

  useFrame(() => {
    if (!meshRef.current) return;
    if (!isDragging) {
      meshRef.current.rotation.y += velocity.current || rotationSpeed!;
      velocity.current *= 0.95;
      if (Math.abs(velocity.current) < 0.0001) velocity.current = 0;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <AsteroidMaterial baseTextureUrl={baseTextureUrl} sunDirection={sunDirection} />

      {logoTextureUrl && (
        <Decal
          position={logoDecalPosition}
          rotation={logoDecalRotation}
          scale={logoDecalScale}
          map={logoMap}
          polygonOffsetFactor={-10}
        />
      )}
    </mesh>
  );
};

export default Asteroid;
