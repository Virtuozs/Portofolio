import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import Earth from "./components/3d/earth/Earth"
import { OrbitControls } from "@react-three/drei";

const sunDirection = new THREE.Vector3(-2, 0.6, 1.4);

function App() {
  const { x, y, z } = sunDirection;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-transparent">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 10 }}
        gl={{
          toneMapping: THREE.NoToneMapping,
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        dpr={window.devicePixelRatio}
        className="absolute inset-0 z-0"
      >
        <Earth />
        <hemisphereLight args={[0xffffff, 0x000000, 3.0]} />
        <directionalLight position={[x, y, z]} />
        <OrbitControls enableZoom={false} enablePan={true} enableRotate={false} />
      </Canvas>

      {/* Overlay Text */}
      <div className="absolute top-24 left-0 z-20 flex flex-col items-center w-full h-full text-white text-center px-4">
        <h1 className="text-4xl font-bold">Lorem Ipsum</h1>
        <p className="mt-4 text-lg">Dolor Amet</p>
      </div>
    </div>
  );
}


export default App
