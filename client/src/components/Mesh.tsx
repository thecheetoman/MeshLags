
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface MeshProps {
  position: [number, number, number];
  rotation: [number, number, number];
  modelPath: string;
}

export default function Mesh({ position, rotation, modelPath }: MeshProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Load GLTF model
  const { scene } = useGLTF(modelPath);
  
  // Clone the scene to allow multiple instances
  const clonedScene = scene.clone();

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      
      // Gentle rotation
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
    >
      <primitive object={clonedScene} />
    </group>
  );
}
