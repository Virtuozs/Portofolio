import * as THREE from 'three';

interface FresnelShaderArgs{
    rimHexColor?: number;
    facingHex?: number;
}


function getFresnelShaderArgs({
    rimHexColor = 0x87CEFA,
    facingHex = 0x000000
}: FresnelShaderArgs) {
    const uniforms: {
        color1: { value: THREE.Color },
        color2: { value: THREE.Color },
        fresnelBias: { value: number },
        fresnelScale: { value: number },
        fresnelPower: { value: number },
    } = {
        color1: { value: new THREE.Color(rimHexColor) },
        color2: { value: new THREE.Color(facingHex) },
        fresnelBias: { value: 0.3 },
        fresnelScale: { value: 0.3 },
        fresnelPower: { value: 0.5 },
    };

    const vertexShader = `
    uniform float fresnelBias;
    uniform float fresnelScale;
    uniform float fresnelPower;

    varying float vReflectionFactor;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);

      vec3 worldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);
      vec3 I = worldPosition.xyz - cameraPosition;

      vReflectionFactor = fresnelBias + fresnelScale * pow(1.0 + dot(normalize(I), worldNormal), fresnelPower);
      gl_Position = projectionMatrix * mvPosition;
    }`;

    const fragmentShader = `
    uniform vec3 color1;
    uniform vec3 color2;

    varying float vReflectionFactor;

    void main() {
      float f = clamp(vReflectionFactor, 0.0, 1.0);
      gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
    }`;

    return {
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
    }
}

const AtmosphereMesh: React.FC<FresnelShaderArgs> = ({ rimHexColor, facingHex }) => {
  const shaderArgs = getFresnelShaderArgs({ rimHexColor, facingHex });

  return (
    <mesh>
      <icosahedronGeometry args={[2.012, 32]} />
      <shaderMaterial attach="material" args={[shaderArgs as THREE.ShaderMaterialParameters]} />
    </mesh>
  );
};

export default AtmosphereMesh;