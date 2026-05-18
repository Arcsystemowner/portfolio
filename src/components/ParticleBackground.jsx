import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function StarParticles(props) {
  const ref = useRef();
  
  const sphere = useMemo(() => {
    // Generate 5000 points inside a sphere of radius 1.5
    return random.inSphere(new Float32Array(5000), { radius: 1.5 });
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 1] }}>
        <StarParticles />
      </Canvas>
    </div>
  );
}
