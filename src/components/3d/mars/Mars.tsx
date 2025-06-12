import { useRef } from 'react';
import * as THREE from 'three';
import MarsMaterial from './MarsMaterial';
import { useFrame } from '@react-three/fiber';
import AtmosphereMesh from '../mars/AtmosphereMesh';

interface MarsProps {
    sunDirection?: THREE.Vector3;
    position?: [number, number, number];
    scale?: number
}

const defaultSunDirection = new THREE.Vector3(-2, 0.6, 1.4).normalize();

const Mars: React.FC<MarsProps> = ({ sunDirection = defaultSunDirection, position = [0, 0, 0], scale = 1 }) => {
    const ref = useRef<THREE.Mesh>(null);
    const axialTilt = 25 * (Math.PI / 180);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.001;
        }
    })

    return (
        <group name="Mars" rotation-z={axialTilt} position={position} scale={scale}>
            <mesh ref={ref}>
                <icosahedronGeometry args={[1.07, 128]} />
                <MarsMaterial sunDirection={sunDirection} />
                <AtmosphereMesh />
            </mesh>
        </group>
    );
}

export default Mars;