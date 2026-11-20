'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { useMemo, type MutableRefObject } from 'react';
import * as THREE from 'three';
import { Board, PastaPile, Plate, noiseTexture } from './HeroScene';

/** Seadas: disco fritto con bordo pizzicato e velo di miele. */
function Seadas() {
  const geo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const r = t * 0.95;
      const h = 0.16 * Math.sqrt(Math.max(0, 1 - Math.pow(t, 4)));
      pts.push(new THREE.Vector2(r, h));
    }
    pts.push(new THREE.Vector2(0.97, 0.0), new THREE.Vector2(0.9, -0.03), new THREE.Vector2(0, -0.03));
    const g = new THREE.LatheGeometry(pts, 160);
    // bordo ondulato (pizzicato a mano)
    const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i);
      const r = Math.hypot(x, z);
      if (r > 0.82) {
        const a = Math.atan2(z, x);
        const k = 1 + 0.04 * Math.sin(a * 22);
        p.setX(i, x * k); p.setZ(i, z * k);
      }
    }
    g.computeVertexNormals();
    return g;
  }, []);
  const crust = useMemo(() => noiseTexture([206, 146, 70], 60, 8), []);
  return (
    <group>
      <mesh position={[0, 0, 0]} scale={[1.6, 1, 1.6]} receiveShadow>
        <cylinderGeometry args={[1, 1, 0.06, 96]} />
        <meshPhysicalMaterial color="#efe4cf" roughness={0.3} clearcoat={0.6} />
      </mesh>
      <mesh geometry={geo} position={[0, 0.05, 0]} castShadow>
        <meshStandardMaterial map={crust} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.215, 0]} scale={[0.72, 0.02, 0.6]} rotation={[0, 0.5, 0]}>
        <sphereGeometry args={[1, 48, 16]} />
        <meshPhysicalMaterial color="#c98712" transmission={0.4} roughness={0.05} clearcoat={1} thickness={0.2} />
      </mesh>
    </group>
  );
}

const STATIONS = [
  { x: 0, look: new THREE.Vector3(0, 0.15, 0) },
  { x: 6, look: new THREE.Vector3(6, 0.1, 0) },
  { x: 12, look: new THREE.Vector3(12, 0.2, 0) },
];

function Director({ progress }: { progress: MutableRefObject<number> }) {
  const { camera } = useThree();
  const look = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, dt) => {
    const p = Math.min(Math.max(progress.current, 0), 1) * (STATIONS.length - 1);
    const i = Math.min(Math.floor(p), STATIONS.length - 2), f = p - i;
    const e = f * f * (3 - 2 * f);
    const x = THREE.MathUtils.lerp(STATIONS[i].x, STATIONS[i + 1].x, e);
    const swing = Math.sin(e * Math.PI) * 1.2;
    camera.position.lerp(new THREE.Vector3(x + 1.6 - swing, 2.4 + swing * 0.4, 3.6), Math.min(dt * 3, 1));
    look.lerpVectors(STATIONS[i].look, STATIONS[i + 1].look, e);
    camera.lookAt(look);
  });
  return null;
}

export default function SignatureScene({ progress }: { progress: MutableRefObject<number> }) {
  const stone = useMemo(() => noiseTexture([52, 46, 40], 30, 4), []);
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [1.6, 2.4, 3.6], fov: 36 }} aria-hidden
      onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; }}>
      <color attach="background" args={['#17140F']} />
      <fog attach="fog" args={['#17140F', 6, 12]} />
      <ambientLight intensity={0.2} />
      {STATIONS.map((s, i) => (
        <spotLight key={i} position={[s.x - 2.5, 5, 2.5]} angle={0.5} penumbra={0.9} intensity={80} color="#ffd6a0" castShadow />
      ))}
      <Environment resolution={64}>
        <Lightformer form="rect" intensity={2} color="#ffe2b8" position={[-3, 4, 3]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={0.6} color="#a65f3e" position={[3, 2, -3]} scale={[4, 3, 1]} />
      </Environment>
      <group position={[0, 0, 0]} scale={0.95}><Plate /><PastaPile /></group>
      <group position={[6, 0, 0]}><Seadas /></group>
      <Board position={[12, 0, 0]} rotation={-0.3} />
      <mesh receiveShadow position={[6, -0.08, 0]}>
        <boxGeometry args={[22, 0.1, 6]} />
        <meshStandardMaterial map={stone} roughness={0.95} color="#7d7368" />
      </mesh>
      <ContactShadows position={[6, -0.02, 0]} opacity={0.5} scale={[22, 6]} blur={2.2} far={2} />
      <Director progress={progress} />
    </Canvas>
  );
}
