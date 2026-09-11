import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Rider(){
  return (
    <group>
      <mesh position={[0,0.52,0]} castShadow>
        <sphereGeometry args={[0.19, 14, 12]} />
        <meshStandardMaterial color="#fbbf94" roughness={0.7} />
      </mesh>
      <group position={[0,0.62,0.04]}>
        <mesh castShadow>
          <sphereGeometry args={[0.20, 14, 10, 0, Math.PI*2, 0, Math.PI*0.62]} />
          <meshStandardMaterial color="#ef4444" roughness={0.6} />
        </mesh>
        <mesh position={[0,-0.02,0.14]} rotation={[0.35,0,0]} castShadow>
          <cylinderGeometry args={[0.02,0.18,0.22,10]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
      </group>
      <group position={[0,0.22,0]}>
        <mesh position={[0,0.10,0]} castShadow>
          <capsuleGeometry args={[0.18,0.18,6,10]} />
          <meshStandardMaterial color="#22c55e" roughness={0.7} />
        </mesh>
        <mesh position={[0,-0.06,0.02]} castShadow>
          <boxGeometry args={[0.34,0.30,0.20]} />
          <meshStandardMaterial color="#ffffff" roughness={0.75} />
        </mesh>
        <group position={[0,-0.06,0.115]}>
          <mesh>
            <planeGeometry args={[0.10,0.12]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0,0,0.002]}>
            <planeGeometry args={[0.072,0.09]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0,0,0.003]}>
            <planeGeometry args={[0.012,0.09]} />
            <meshBasicMaterial color="#0f172a" />
          </mesh>
        </group>
      </group>
      <mesh position={[-0.22,0.18,0.08]} rotation={[0,0,0.6]} castShadow>
        <capsuleGeometry args={[0.05,0.22,5,8]} />
        <meshStandardMaterial color="#fbbf94" />
      </mesh>
      <mesh position={[0.22,0.18,0.08]} rotation={[0,0,-0.6]} castShadow>
        <capsuleGeometry args={[0.05,0.22,5,8]} />
        <meshStandardMaterial color="#fbbf94" />
      </mesh>
      <mesh position={[0,-0.18,0]} castShadow>
        <boxGeometry args={[0.30,0.18,0.20]} />
        <meshStandardMaterial color="#d6c7a3" roughness={0.8} />
      </mesh>
      <mesh position={[-0.09,-0.42,0.02]} rotation={[0.08,0,0]} castShadow>
        <capsuleGeometry args={[0.065,0.24,5,8]} />
        <meshStandardMaterial color="#fbbf94" />
      </mesh>
      <mesh position={[0.09,-0.42,0.04]} rotation={[ -0.20,0,0]} castShadow>
        <capsuleGeometry args={[0.065,0.24,5,8]} />
        <meshStandardMaterial color="#fbbf94" />
      </mesh>
      <mesh position={[-0.09,-0.60,0.10]} castShadow>
        <boxGeometry args={[0.11,0.06,0.18]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.09,-0.60,0.14]} castShadow>
        <boxGeometry args={[0.11,0.06,0.18]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  )
}

function Wheel({ x }: { x:number }){
  const ref = useRef<THREE.Group>(null)
  useFrame((_,dt)=>{
    // cap dt to avoid spin explosion after tab switch
    dt = Math.min(dt, 0.033)
    if(ref.current) ref.current.rotation.z += dt*14
  })
  return (
    <group ref={ref} position={[0,0,x]}>
      <mesh rotation={[Math.PI/2,0,0]} castShadow>
        <torusGeometry args={[0.28,0.038,10,20]} />
        <meshStandardMaterial color="#111827" roughness={0.85} />
      </mesh>
      <mesh rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[0.22,0.026,10,20]} />
        <meshStandardMaterial color="#facc15" roughness={0.35} metalness={0.1} />
      </mesh>
      {Array.from({length:6}).map((_,i)=>( // 6 vs 8
        <mesh key={i} rotation={[0,0,(i/6)*Math.PI]}>
          <boxGeometry args={[0.014,0.42,0.008]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      ))}
      <mesh>
        <cylinderGeometry args={[0.04,0.04,0.06,10]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  )
}

function Frame(){
  return (
    <group>
      <mesh position={[0,0.14, -0.04]} castShadow>
        <boxGeometry args={[0.06,0.04,0.62]} />
        <meshStandardMaterial color="#ef4444" roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh position={[0.02,0.06,0.12]} rotation={[0,0,0.52]} castShadow>
        <boxGeometry args={[0.045,0.04,0.46]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      <mesh position={[0,0.10, -0.18]} rotation={[ -0.18,0,0]} castShadow>
        <boxGeometry args={[0.04,0.04,0.42]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      <mesh position={[0,-0.08, -0.02]} castShadow>
        <boxGeometry args={[0.035,0.02,0.52]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <group position={[0,0.10,0.30]}>
        <mesh position={[-0.08, -0.06, 0]} rotation={[0.16,0,0]} castShadow>
          <boxGeometry args={[0.032,0.032,0.42]} />
          <meshStandardMaterial color="#facc15" />
        </mesh>
        <mesh position={[0.08, -0.06, 0]} rotation={[0.16,0,0]} castShadow>
          <boxGeometry args={[0.032,0.032,0.42]} />
          <meshStandardMaterial color="#facc15" />
        </mesh>
      </group>
      <mesh position={[0,0.28,0.30]} rotation={[0,0,Math.PI/2]} castShadow>
        <cylinderGeometry args={[0.022,0.022,0.48,10]} />
        <meshStandardMaterial color="#facc15" roughness={0.4} />
      </mesh>
      <mesh position={[-0.22,0.28,0.30]}>
        <sphereGeometry args={[0.028,8,8]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[0.22,0.28,0.30]}>
        <sphereGeometry args={[0.028,8,8]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[0,0.30,-0.20]} rotation={[0.12,0,0]} castShadow>
        <boxGeometry args={[0.18,0.05,0.22]} />
        <meshStandardMaterial color="#0f172a" roughness={0.85} />
      </mesh>
      <mesh position={[-0.14,-0.14,0.02]} castShadow>
        <boxGeometry args={[0.09,0.02,0.07]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.14,-0.14,0.02]} castShadow>
        <boxGeometry args={[0.09,0.02,0.07]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.07,-0.10,-0.04]} rotation={[0,Math.PI/2,0]}>
        <torusGeometry args={[0.17,0.008,6,16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  )
}

export function Bike(){
  const ref = useRef<THREE.Group>(null)
  useEffect(()=>{
    if(ref.current) (window as any).__bike = ref.current
    return ()=>{ if((window as any).__bike===ref.current) delete (window as any).__bike }
  },[])
  return (
    <group ref={ref} position={[0,0.2,6.2]} scale={1.02}>
      <mesh position={[0,-0.52,0]} rotation={[-Math.PI/2,0,0]}>
        <circleGeometry args={[0.55, 16]} />
        <meshBasicMaterial color="#020617" transparent opacity={0.24} depthWrite={false} />
      </mesh>
      <group position={[0,0.22,0]}>
        <Frame />
        <group position={[0,0.46, -0.08]}>
          <Rider />
        </group>
        <Wheel x={0.34} />
        <Wheel x={-0.34} />
      </group>
    </group>
  )
}
