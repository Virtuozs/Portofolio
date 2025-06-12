import { useRef } from 'react';
import * as THREE from 'three';
import MarsMaterial from './MarsMaterial';
import { useFrame } from '@react-three/fiber';
import AtmosphereMesh from '../mars/AtmosphereMesh';

interface MarsProps {
    sunDirection?: THREE.Vector3;
}

const defaultSunDirection = new THREE.Vector3(-2, 0.6, 1.4).normalize();

const Mars: React.FC<MarsProps> = ({ sunDirection = defaultSunDirection}) => {
    const ref = useRef<THREE.Mesh>(null);
    const axialTilt = 25 * (Math.PI / 180);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.001;
        }
    })

    return (
        <group rotation-z={axialTilt} position={[1.3, -0.8, 1.2]}>
        <mesh ref={ref}>
            <icosahedronGeometry args={[1.07, 128]} />
            <MarsMaterial sunDirection={sunDirection} />
            <AtmosphereMesh />
        </mesh>
        </group>
    );
}

export default Mars;