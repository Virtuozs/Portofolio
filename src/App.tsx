import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import StarField from "./components/3d/stars/StarField";
import Mars from "./components/3d/mars/Mars";

const sunDirection = new THREE.Vector3(-2, 0.6, 1.4);

function App() {
  const { x, y, z } = sunDirection;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 10 }}
        gl={{
          toneMapping: THREE.NoToneMapping,
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        dpr={window.devicePixelRatio}
        className="absolute inset-0 z-0"
      >
        <StarField/>
        {/* <Earth/> */}
        <Mars sunDirection={sunDirection} />
        <hemisphereLight args={[0xffffff, 0x000000, 3.0]} />
        <directionalLight position={[x, y, z]} />
        <OrbitControls enableZoom={false} enablePan={true} enableRotate={false} />
      </Canvas>

      <div className="absolute top-24 left-0 z-20 flex flex-col items-center w-full h-full text-white text-center px-4">
        <h1 className="text-4xl font-bold">Lorem Ipsum</h1>
        <p className="mt-4 text-lg">Dolor Amet</p>
      </div>
    </div>
  );
}


export default App
