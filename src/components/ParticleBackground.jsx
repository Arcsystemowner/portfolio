import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useTheme } from '../hooks/useTheme';

function StarParticles({ isDark }) {
  const ref = useRef();
  
  const sphere = useMemo(() => {
    return random.inSphere(new Float32Array(6000), { radius: 1.5 });
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isDark ? "#818cf8" : "#64748b"}
          opacity={isDark ? 0.8 : 0.12}
          size={isDark ? 0.005 : 0.0035}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ParticleBackground() {
  const { isDark } = useTheme();

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 1] }}>
        <StarParticles isDark={isDark} />
      </Canvas>
    </div>
  );
}
