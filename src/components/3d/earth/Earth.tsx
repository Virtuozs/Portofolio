import * as THREE from 'three';
import React from 'react';
import { useFrame } from '@react-three/fiber';
import EarthMaterial from './EarthMaterial';
import AtmosphereMesh from './AtmosphereMesh';


interface EarthProps {
    sunDirection?: THREE.Vector3;
}

const defaultSunDirection = new THREE.Vector3(-2, 0.6, 1.4).normalize();

const Earth: React.FC<EarthProps> = ({ sunDirection = defaultSunDirection }) => {
    const ref = React.useRef<THREE.Mesh>(null);
    const axialTilt = 23.5 * (Math.PI / 180); // Earth's axial tilt in radians #https://www.e-education.psu.edu/eme811/node/642

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.002;
        }
    });

    return (
        <group rotation-z={axialTilt} position={[1.3, -1.7, 1.2]}>
            <mesh ref={ref}>
                <icosahedronGeometry args={[2, 128]} />
                <EarthMaterial sunDirection={sunDirection}/>
                <AtmosphereMesh />
            </mesh>
        </group>
    )
}

export default Earth;