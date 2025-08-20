import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

enum Controls {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  spawn = 'spawn',
}

export default function CameraController() {
  const { camera } = useThree();
  const [subscribe, getState] = useKeyboardControls<Controls>();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const controls = getState();
    
    // Get camera's forward direction
    camera.getWorldDirection(direction.current);
    
    // Calculate movement vectors
    const forward = direction.current.clone();
    const right = forward.clone().cross(camera.up).normalize();
    
    // Reset velocity
    velocity.current.set(0, 0, 0);
    
    // Apply movement based on input
    const speed = 10; // units per second
    
    if (controls.forward) {
      velocity.current.add(forward.multiplyScalar(speed * delta));
      console.log("Moving forward");
    }
    if (controls.backward) {
      velocity.current.add(forward.multiplyScalar(-speed * delta));
      console.log("Moving backward");
    }
    if (controls.left) {
      velocity.current.add(right.multiplyScalar(-speed * delta));
      console.log("Moving left");
    }
    if (controls.right) {
      velocity.current.add(right.multiplyScalar(speed * delta));
      console.log("Moving right");
    }
    
    // Apply movement to camera
    camera.position.add(velocity.current);
    
    // Keep camera above ground
    if (camera.position.y < 2) {
      camera.position.y = 2;
    }
  });

  return null;
}
