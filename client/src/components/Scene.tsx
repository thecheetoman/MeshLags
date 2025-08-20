
import { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Grid, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import Mesh from "./Mesh";
import Lighting from "./Lighting";
import CameraController from "./CameraController";

enum Controls {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  spawn = 'spawn',
}

interface MeshData {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  modelPath: string;
}

// Available models in the geometries folder
const AVAILABLE_MODELS = [
  '/geometries/honda.glb',
  '/geometries/t98_main_battle_tank.glb',
  '/geometries/5090.glb'
  
  // Add more model paths here as you add them to the folder
  // Both .gltf and .glb files are supported
  // use dam comma man
];

export default function Scene() {
  const [meshes, setMeshes] = useState<MeshData[]>([
    {
      id: 'initial',
      position: [0, 1, 0],
      rotation: [0, 0, 0],
      modelPath: AVAILABLE_MODELS[0]
    }
  ]);

  const [subscribe, getState] = useKeyboardControls<Controls>();
  const spawnPressedRef = useRef(false);

  const getRandomModel = useCallback(() => {
    return AVAILABLE_MODELS[Math.floor(Math.random() * AVAILABLE_MODELS.length)];
  }, []);

  const spawnMesh = useCallback(() => {
    const newMesh: MeshData = {
      id: Math.random().toString(36).substr(2, 9),
      position: [
        (Math.random() - 0.5) * 20, // Random X between -10 and 10
        Math.random() * 3 + 1, // Random Y between 1 and 4
        (Math.random() - 0.5) * 20  // Random Z between -10 and 10
      ],
      rotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      ],
      modelPath: getRandomModel()
    };

    setMeshes(prev => [...prev, newMesh]);
    console.log(`Spawned mesh at position: ${newMesh.position} with model: ${newMesh.modelPath}`);
  }, [getRandomModel]);

  useFrame(() => {
    const controls = getState();
    
    // Handle spawn key with debouncing
    if (controls.spawn && !spawnPressedRef.current) {
      spawnPressedRef.current = true;
      spawnMesh();
    } else if (!controls.spawn) {
      spawnPressedRef.current = false;
    }
  });

  return (
    <>
      {/* Environment and lighting */}
      <Environment preset="studio" />
      <Lighting />
      
      {/* Ground plane */}
      <mesh 
        receiveShadow 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Grid helper */}
      <Grid 
        args={[50, 50]} 
        cellColor="#444444" 
        sectionColor="#666666" 
        position={[0, 0.01, 0]} 
      />

      {/* Camera controller */}
      <CameraController />

      {/* Render all meshes */}
      {meshes.map((meshData) => (
        <Mesh
          key={meshData.id}
          position={meshData.position}
          rotation={meshData.rotation}
          modelPath={meshData.modelPath}
        />
      ))}
    </>
  );
}
