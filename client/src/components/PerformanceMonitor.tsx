import { useEffect, useState } from "react";
import usePerformance from "../hooks/usePerformance";

export default function PerformanceMonitor() {
  const { fps, frameTime, inputLatency } = usePerformance();
  const [meshCount, setMeshCount] = useState(1);

  useEffect(() => {
    // Listen for spacebar to track mesh count
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setMeshCount(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      padding: '15px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#ffffff',
      fontFamily: 'Inter, monospace',
      fontSize: '14px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      minWidth: '200px'
    }}>
      <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#00ff88' }}>
        Performance Monitor
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        <span style={{ color: '#88ccff' }}>FPS:</span>{' '}
        <span style={{ 
          color: fps > 50 ? '#00ff88' : fps > 30 ? '#ffaa00' : '#ff4444',
          fontWeight: 'bold'
        }}>
          {fps}
        </span>
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        <span style={{ color: '#88ccff' }}>Frame Time:</span>{' '}
        <span style={{ 
          color: frameTime < 16.67 ? '#00ff88' : frameTime < 33.33 ? '#ffaa00' : '#ff4444',
          fontWeight: 'bold'
        }}>
          {frameTime.toFixed(2)}ms
        </span>
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        <span style={{ color: '#88ccff' }}>Input Latency:</span>{' '}
        <span style={{ 
          color: inputLatency < 50 ? '#00ff88' : inputLatency < 100 ? '#ffaa00' : '#ff4444',
          fontWeight: 'bold'
        }}>
          {inputLatency.toFixed(2)}ms
        </span>
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        <span style={{ color: '#88ccff' }}>Meshes:</span>{' '}
        <span style={{ color: '#ffffff', fontWeight: 'bold' }}>
          {meshCount}
        </span>
      </div>
      
      <div style={{ 
        marginTop: '12px', 
        paddingTop: '8px', 
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        fontSize: '12px',
        color: '#aaaaaa'
      }}>
        <div>WASD: Move Camera</div>
        <div>Space: Spawn Mesh</div>
      </div>
    </div>
  );
}
