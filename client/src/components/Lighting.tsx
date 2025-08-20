import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Lighting() {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (directionalLightRef.current) {
      // Subtle movement for dynamic shadows
      directionalLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 2;
      directionalLightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.2) * 2;
    }
  });

  return (
    <>
      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.2} color="#ffffff" />

      {/* Main directional light with shadows */}
      <directionalLight
        ref={directionalLightRef}
        position={[5, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        color="#ffffff"
      />

      {/* Fill light to reduce harsh shadows */}
      <directionalLight
        position={[-5, 8, -5]}
        intensity={0.3}
        color="#87ceeb"
      />

      {/* Point lights for additional depth */}
      <pointLight
        position={[10, 5, 10]}
        intensity={0.5}
        color="#ffaa44"
        distance={20}
        decay={2}
      />
      
      <pointLight
        position={[-10, 5, -10]}
        intensity={0.3}
        color="#4488ff"
        distance={15}
        decay={2}
      />

      {/* Spot light for dramatic effect */}
      <spotLight
        position={[0, 15, 0]}
        intensity={0.8}
        angle={Math.PI / 6}
        penumbra={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        color="#ffffff"
      />
    </>
  );
}
