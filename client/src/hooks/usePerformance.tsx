import { useState, useEffect, useRef } from "react";

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  inputLatency: number;
}

export default function usePerformance(): PerformanceMetrics {
  const [fps, setFps] = useState(60);
  const [frameTime, setFrameTime] = useState(16.67);
  const [inputLatency, setInputLatency] = useState(0);
  
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsUpdateTime = useRef(performance.now());
  const inputStartTime = useRef<number | null>(null);

  useEffect(() => {
    let animationId: number;

    const updatePerformance = (currentTime: number) => {
      frameCount.current++;
      
      // Calculate frame time
      const deltaTime = currentTime - lastTime.current;
      setFrameTime(deltaTime);
      lastTime.current = currentTime;

      // Update FPS every second
      if (currentTime - fpsUpdateTime.current >= 1000) {
        const currentFps = Math.round((frameCount.current * 1000) / (currentTime - fpsUpdateTime.current));
        setFps(currentFps);
        frameCount.current = 0;
        fpsUpdateTime.current = currentTime;
      }

      animationId = requestAnimationFrame(updatePerformance);
    };

    animationId = requestAnimationFrame(updatePerformance);

    // Input latency measurement
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(event.code)) {
        inputStartTime.current = performance.now();
      }
    };

    const handleKeyUp = () => {
      if (inputStartTime.current !== null) {
        const latency = performance.now() - inputStartTime.current;
        setInputLatency(latency);
        inputStartTime.current = null;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return { fps, frameTime, inputLatency };
}
