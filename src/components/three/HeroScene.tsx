'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/* ---------- utilità procedurali ---------- */

export function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Geometria malloreddus: gnocchetto incurvato, rigato trasversalmente, rastremato alle estremità. */
function malloreddusGeometry() {
  const segU = 48, segV = 18;
  const pos: number[] = [], idx: number[] = [];
  const len = 0.34, curl = 1.25;
  for (let i = 0; i <= segU; i++) {
    const u = i / segU;
    const a = (u - 0.5) * curl;
    const cx = Math.sin(a) * (len / curl), cy = (1 - Math.cos(a)) * (len / curl);
    const tx = Math.cos(a), ty = Math.sin(a);
    const nx = -ty, ny = tx;
    const taper = Math.pow(Math.sin(Math.PI * Math.min(Math.max(u, 0.02), 0.98)), 0.55);
    const ridge = 1 + 0.12 * Math.max(0, Math.cos(u * Math.PI * 22));
    for (let j = 0; j <= segV; j++) {
      const v = (j / segV) * Math.PI * 2;
      const r = 0.055 * taper * ridge;
      // sezione leggermente schiacciata (incavo dello gnocchetto)
      const sx = Math.cos(v) * r, sz = Math.sin(v) * r * 0.85;
      const dent = Math.cos(v) > 0.6 ? -0.35 * r * (Math.cos(v) - 0.6) : 0;
      pos.push(cx + nx * (sx + dent), cy + ny * (sx + dent), sz);
    }
  }
  for (let i = 0; i < segU; i++)
    for (let j = 0; j < segV; j++) {
      const a = i * (segV + 1) + j, b = a + segV + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  g.center();
  return g;
}

/** Texture dipinta a mano per la ceramica: anelli e rombi in terracotta. */
function ceramicTexture() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const x = c.getContext('2d')!;
  x.fillStyle = '#efe4cf'; x.fillRect(0, 0, 1024, 512);
  // lievi variazioni dello smalto
  const r = rand(7);
  for (let i = 0; i < 2600; i++) {
    x.fillStyle = `rgba(${150 + r() * 60},${120 + r() * 40},${90 + r() * 30},${r() * 0.05})`;
    x.fillRect(r() * 1024, r() * 512, 2 + r() * 8, 1 + r() * 3);
  }
  // v = profilo radiale (0 centro → 1 bordo)
  const band = (v: number, h: number, col: string) => { x.fillStyle = col; x.fillRect(0, v * 512, 1024, h); };
  band(0.60, 5, '#a65f3e');
  band(0.66, 2, '#692d35');
  // rombi sul bordo
  x.fillStyle = '#a65f3e';
  for (let i = 0; i < 32; i++) {
    const cx = (i + 0.5) * 32, cy = 0.78 * 512;
    x.beginPath(); x.moveTo(cx, cy - 18); x.lineTo(cx + 11, cy); x.lineTo(cx, cy + 18); x.lineTo(cx - 11, cy); x.closePath(); x.fill();
    x.fillStyle = '#efe4cf'; x.beginPath(); x.arc(cx, cy, 3.5, 0, Math.PI * 2); x.fill(); x.fillStyle = '#a65f3e';
  }
  band(0.90, 4, '#692d35');
  band(0.985, 8, '#7a4a30');
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

export function noiseTexture(base: [number, number, number], spread: number, seed: number, streak = false) {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const x = c.getContext('2d')!;
  x.fillStyle = `rgb(${base.join(',')})`; x.fillRect(0, 0, 512, 512);
  const r = rand(seed);
  for (let i = 0; i < (streak ? 900 : 9000); i++) {
    const d = (r() - 0.5) * spread;
    x.fillStyle = `rgba(${base[0] + d},${base[1] + d * 0.9},${base[2] + d * 0.8},${streak ? 0.35 : 0.5})`;
    if (streak) x.fillRect(0, r() * 512, 512, 0.6 + r() * 2.2);
    else x.fillRect(r() * 512, r() * 512, 1 + r() * 3, 1 + r() * 3);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/* ---------- oggetti ---------- */

export function Plate() {
  const geo = useMemo(() => {
    const pts = [
      [0, 0], [0.9, 0], [1.02, 0.02], [1.08, 0.08], [1.25, 0.2], [1.45, 0.27], [1.5, 0.29], [1.52, 0.27], [1.46, 0.22], [1.26, 0.14], [1.1, 0.03], [0.95, -0.04], [0.8, -0.05], [0, -0.05],
    ].map(([a, b]) => new THREE.Vector2(a, b));
    return new THREE.LatheGeometry(pts, 128);
  }, []);
  const map = useMemo(() => ceramicTexture(), []);
  return (
    <mesh geometry={geo} castShadow receiveShadow>
      <meshPhysicalMaterial map={map} roughness={0.32} clearcoat={0.7} clearcoatRoughness={0.25} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function PastaPile() {
  const geo = useMemo(() => malloreddusGeometry(), []);
  const items = useMemo(() => {
    const r = rand(42);
    return Array.from({ length: 70 }, () => {
      const ang = r() * Math.PI * 2;
      const rad = Math.sqrt(r()) * 0.72;
      const h = 0.06 + (0.72 - rad) * 0.42 + r() * 0.05;
      return { p: [Math.cos(ang) * rad, h, Math.sin(ang) * rad] as const, rot: [r() * 6.28, r() * 6.28, r() * 6.28] as const, s: 0.85 + r() * 0.3 };
    });
  }, []);
  const sauce = useMemo(() => {
    const r = rand(99);
    return Array.from({ length: 90 }, () => {
      const ang = r() * Math.PI * 2, rad = Math.sqrt(r()) * 0.75;
      return { p: [Math.cos(ang) * rad, 0.08 + (0.75 - rad) * 0.4 + r() * 0.06, Math.sin(ang) * rad] as const, s: 0.014 + r() * 0.02 };
    });
  }, []);
  const porcini = useMemo(() => {
    const r = rand(5);
    return Array.from({ length: 9 }, () => {
      const ang = r() * Math.PI * 2, rad = 0.15 + r() * 0.5;
      return { p: [Math.cos(ang) * rad, 0.2 + (0.7 - rad) * 0.35, Math.sin(ang) * rad] as const, rot: [r() * 1.2, r() * 6, r() * 1.2] as const };
    });
  }, []);
  return (
    <group>
      {items.map((it, i) => (
        <mesh key={i} geometry={geo} position={it.p as unknown as THREE.Vector3Tuple} rotation={it.rot as unknown as THREE.Vector3Tuple} scale={it.s} castShadow>
          <meshStandardMaterial color={i % 4 === 0 ? '#c9874a' : i % 3 ? '#e6bb74' : '#dca35c'} roughness={0.55} />
        </mesh>
      ))}
      {sauce.map((s, i) => (
        <mesh key={`s${i}`} position={s.p as unknown as THREE.Vector3Tuple} scale={[s.s * 1.4, s.s, s.s * 1.2]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={i % 2 ? '#6e3a24' : '#8a4a2c'} roughness={0.7} flatShading />
        </mesh>
      ))}
      {porcini.map((m, i) => (
        <group key={`m${i}`} position={m.p as unknown as THREE.Vector3Tuple} rotation={m.rot as unknown as THREE.Vector3Tuple}>
          {/* fetta di porcino: cappello bruno + gambo chiaro, sottile */}
          <mesh scale={[0.11, 0.012, 0.07]}>
            <sphereGeometry args={[1, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#9a6a3f" roughness={0.55} />
          </mesh>
          <mesh position={[0, -0.005, 0.05]} scale={[0.035, 0.012, 0.06]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#e3cfa7" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Board({ position = [2.35, 0, -0.9], rotation = -0.5 }: { position?: THREE.Vector3Tuple; rotation?: number }) {
  const wood = useMemo(() => noiseTexture([120, 82, 52], 50, 11, true), []);
  const rind = useMemo(() => noiseTexture([196, 160, 104], 30, 3), []);
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.06, 0]}>
        <boxGeometry args={[2.2, 0.12, 1.2]} />
        <meshStandardMaterial map={wood} roughness={0.75} />
      </mesh>
      {/* spicchio di pecorino */}
      <mesh castShadow position={[-0.35, 0.3, 0.05]} rotation={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.36, 40, 1, false, 0, 1.0]} />
        <meshStandardMaterial color="#fff1cc" roughness={0.55} map={rind} />
      </mesh>
      {/* fette di salume */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} castShadow position={[0.45 + i * 0.13, 0.14 + i * 0.012, -0.15 + i * 0.09]} rotation={[-Math.PI / 2 + 0.1, 0, i * 0.3]}>
          <cylinderGeometry args={[0.22, 0.22, 0.025, 32]} />
          <meshStandardMaterial color="#9c3a36" roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

export function Stone() {
  const tex = useMemo(() => noiseTexture([58, 52, 46], 34, 21), []);
  return (
    <mesh receiveShadow position={[0, -0.12, 0]}>
      <boxGeometry args={[12, 0.14, 7]} />
      <meshStandardMaterial map={tex} roughness={0.95} color="#8a7f73" />
    </mesh>
  );
}

/* ---------- regia ---------- */

function Rig({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { camera, pointer } = useThree();
  const { size } = useThree();
  const wide = size.width >= 768;
  const target = useMemo(() => new THREE.Vector3(wide ? -1.7 : 0.15, wide ? 0.2 : -1.5, 0), [wide]);
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    const px = reduced ? 0 : pointer.x, py = reduced ? 0 : pointer.y;
    const ang = (reduced ? 0 : Math.sin(t * 0.08) * 0.25) + px * 0.18 + 0.35;
    const dist = (wide ? 5.6 : 6.6) - scroll * 1.6;
    const height = 3.1 - scroll * 0.9 + py * 0.25;
    camera.position.lerp(new THREE.Vector3(Math.sin(ang) * dist, height, Math.cos(ang) * dist), Math.min(dt * 2.2, 1));
    camera.lookAt(target);
    if (group.current && !reduced) group.current.rotation.y += dt * 0.035;
  });
  return (
    <group ref={group}>
      <Plate />
      <PastaPile />
    </group>
  );
}

export default function HeroScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [3, 3.2, 4.5], fov: 34 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      frameloop={reduced ? 'demand' : 'always'}
      aria-hidden
    >
      <color attach="background" args={['#221E19']} />
      <fog attach="fog" args={['#221E19', 7, 13]} />
      <ambientLight intensity={0.25} />
      <spotLight position={[-3.5, 6, 2.5]} angle={0.45} penumbra={0.8} intensity={70} color="#ffd9a8" castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0004} />
      <pointLight position={[3, 1.5, -3]} intensity={10} color="#a65f3e" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.2} color="#ffe2b8" position={[-4, 4, 2]} scale={[4, 2, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#b08a55" position={[4, 2, -3]} scale={[3, 3, 1]} />
        <Lightformer form="ring" intensity={0.6} color="#ffffff" position={[0, 5, 0]} scale={2} />
      </Environment>
      <Rig reduced={reduced} />
      <Board />
      <Stone />
      <ContactShadows position={[0, -0.04, 0]} opacity={0.55} scale={9} blur={2.4} far={2} />
    </Canvas>
  );
}
