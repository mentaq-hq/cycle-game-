import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect, Suspense } from 'react'
import * as THREE from 'three'
import { buildSkyTrack, ribbonGeometry, railGeometry } from './track'
import { Bike } from './Bike'
import { useStore } from '../store'

function Sky(){
  const { scene } = useThree()
  useEffect(()=>{
    scene.fog = new THREE.Fog(new THREE.Color('#38bdf8'), 22, 112)
  },[scene])
  return (
    <>
      <color attach="background" args={['#0ea5e9']} />
      <fog attach="fog" args={['#38bdf8', 22, 112]} />
      <mesh position={[8, 18, -72]}>
        <sphereGeometry args={[7, 18, 14]} />
        <meshBasicMaterial color="#e0f2fe" transparent opacity={0.18} depthWrite={false} />
      </mesh>
    </>
  )
}

function CityBlur(){
  const instRef = useRef<THREE.InstancedMesh>(null)
  const count = 72 // reduced from 120 for perf
  useEffect(()=>{
    if(!instRef.current) return
    const m = instRef.current
    const d = new THREE.Object3D()
    for(let i=0;i<count;i++){
      const x=(Math.random()-0.5)*88
      const z=-36 - Math.random()*76
      const h= 1.6 + Math.random()*7.5
      d.position.set(x, -2.0 - Math.random()*0.6, z)
      d.scale.set(1.5+Math.random()*2.2, h, 1.5+Math.random()*2.2)
      d.rotation.y=(Math.random()-0.5)*0.25
      d.updateMatrix()
      m.setMatrixAt(i, d.matrix)
      const c = new THREE.Color().setHSL(0.55+Math.random()*0.05, 0.48, 0.70+Math.random()*0.12)
      m.setColorAt(i, c)
    }
    m.instanceMatrix.needsUpdate=true
    if(m.instanceColor) m.instanceColor.needsUpdate=true
  },[])

  return (
    <instancedMesh ref={instRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1,1,1]} />
      <meshLambertMaterial transparent opacity={0.50} vertexColors />
    </instancedMesh>
  )
}

function BokehSprites(){
  // single draw via Points for perf
  const { positions, sizes } = useMemo(()=>{
    const count=16
    const pos = new Float32Array(count*3)
    const sz = new Float32Array(count)
    for(let i=0;i<count;i++){
      pos[i*3] = (Math.random()-0.5)*36
      pos[i*3+1] = 6+ Math.random()*15
      pos[i*3+2] = -16 - Math.random()*50
      sz[i] = 1.5+Math.random()*2.8
    }
    return { positions: pos, sizes: sz }
  },[])
  const geo = useMemo(()=>{
    const g=new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions,3))
    g.setAttribute('size', new THREE.BufferAttribute(sizes,1))
    return g
  },[positions,sizes])
  // render as simple circles via instanced meshes (fallback to points visually okay)
  // Keep as meshes but reduce count to 10 circles
  const circles = useMemo(()=> Array.from({length:10},()=> ({
    x:(Math.random()-0.5)*32, y:7+Math.random()*14, z:-18-Math.random()*48,
    s:1.3+Math.random()*2.6, o:0.09+Math.random()*0.12
  })),[])
  return (
    <group>
      {circles.map((p,i)=>(
        <mesh key={i} position={[p.x,p.y,p.z]}>
          <circleGeometry args={[p.s, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={p.o} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function Ribbon({ curve }: { curve: THREE.CatmullRomCurve3 }){
  // Shared frenet: compute once, reuse — fixes double compute bug
  const { ribbonGeo, aGeo, bGeo } = useMemo(()=>{
    const rGeo = ribbonGeometry(curve, 360, 1.78) // 360 vs 520 for perf
    const rail = railGeometry(curve, 360, 1.02)
    const ag = new THREE.BufferGeometry().setFromPoints(rail.a)
    const bg = new THREE.BufferGeometry().setFromPoints(rail.b)
    return { ribbonGeo: rGeo, aGeo: ag, bGeo: bg }
  },[curve])

  const lineMat = useMemo(()=> new THREE.LineBasicMaterial({ color: '#fef08a', transparent:true, opacity:0.90 }),[])
  const lineA = useMemo(()=> new THREE.Line(aGeo, lineMat),[aGeo,lineMat])
  const lineB = useMemo(()=> new THREE.Line(bGeo, lineMat),[aGeo,bGeo,lineMat])

  return (
    <group>
      <mesh geometry={ribbonGeo} receiveShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.55} metalness={0.02} />
      </mesh>
      <mesh geometry={ribbonGeo}>
        <meshBasicMaterial color="#e2e8f0" wireframe transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <primitive object={lineA} />
      <primitive object={lineB} />
      <CenterDashed curve={curve} />
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-8.2,-28]}>
        <planeGeometry args={[120, 180]} />
        <meshBasicMaterial color="#082f49" transparent opacity={0.16} depthWrite={false} />
      </mesh>
    </group>
  )
}

function CenterDashed({ curve }: { curve: THREE.CatmullRomCurve3 }){
  const points = useMemo(()=>{
    const out: THREE.Vector3[]=[]
    for(let i=0;i<300;i++){ // 300 vs 400
      if(i%3===0) continue
      out.push(curve.getPointAt(i/300))
    }
    return out
  },[curve])
  const geo = useMemo(()=> new THREE.BufferGeometry().setFromPoints(points),[points])
  const mat = useMemo(()=> new THREE.LineDashedMaterial({ color:'#facc15', dashSize:0.42, gapSize:0.42, scale:1, transparent:true, opacity:0.95 }),[])
  const line = useMemo(()=> {
    const l = new THREE.Line(geo, mat)
    l.computeLineDistances()
    return l
  },[geo, mat])
  return <primitive object={line} />
}

function ProgressAndCamera({ curve }: { curve: THREE.CatmullRomCurve3 }){
  const targetPos = useRef(new THREE.Vector3(0.8,2.8,9.5))
  const targetLook = useRef(new THREE.Vector3(0,0,-8))
  // local refs to avoid store thrash every frame
  const progRef = useRef(0.015)
  const balRef = useRef(0)
  const speedRef = useRef(7.2)
  const frameCounter = useRef(0)
  const bobPhase = useRef(0)

  // sync refs when store resets
  const storeProgress = useStore(s=>s.progress)
  const storeBalance = useStore(s=>s.balance)
  useEffect(()=>{ progRef.current = storeProgress },[storeProgress])
  useEffect(()=>{ balRef.current = storeBalance },[storeBalance])

  useFrame(({ camera }, dt)=>{
    const s = useStore.getState()
    if(s.state!=='playing' && s.state!=='ready') return

    // cap dt to prevent hang spike after tab switch (critical bug fix)
    dt = Math.min(dt, 0.033) // 30fps cap
    if(dt<=0.0001) return

    const speedBase = s.difficulty==='easy'? 5.2 : s.difficulty==='sky'? 7.2 : 10.2
    const inputTilt = s.tilt
    const boosted = speedBase * (1 + progRef.current*0.55)
    speedRef.current = boosted

    const next = Math.min(1, progRef.current + (dt*boosted)/132)
    progRef.current = next

    if(next>=0.995){
      // immediate win - flush to store
      useStore.setState({ state:'won', progress: next, speed: boosted, balance: balRef.current })
      useStore.getState().addScore(500)
      return
    }

    const p = curve.getPointAt(next)
    const tangent = curve.getTangentAt(Math.min(1,next+0.008))
    const lateral = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0,1,0)).normalize()
    const balanceInfluence = inputTilt*0.85 + Math.sin(next*31)*0.018
    // use local balRef to avoid read-after-write race
    const curBal = THREE.MathUtils.clamp(balRef.current + (balanceInfluence*dt*1.4 - balRef.current*dt*1.1), -1.2, 1.2)
    balRef.current = curBal

    if(Math.abs(curBal) > 0.96){
      useStore.setState({ state:'crashed', progress: next, balance: curBal, speed: boosted })
      useStore.getState().addScore(Math.floor(next*200))
      return
    }

    // throttled store sync — only 15fps (every 4 frames) to keep HUD smooth but not thrash React
    frameCounter.current++
    if(frameCounter.current % 4 === 0){
      useStore.setState({ progress: next, balance: curBal, speed: boosted })
    }

    const offset = lateral.multiplyScalar(curBal*0.72)
    const bikePos = new THREE.Vector3().copy(p).add(offset)
    bikePos.y += 0.54
    const bike: THREE.Group | undefined = (window as any).__bike
    if(bike){
      bike.position.lerp(bikePos, 0.18)
      const look = new THREE.Vector3().copy(p).add(tangent)
      const dir = new THREE.Vector3().subVectors(look, bike.position).normalize()
      const yaw = Math.atan2(dir.x, dir.z)
      const lean = curBal*0.62 + inputTilt*0.18
      const pitch = -tangent.y*0.6
      bike.rotation.y = THREE.MathUtils.lerp(bike.rotation.y, yaw, 0.16)
      bike.rotation.z = THREE.MathUtils.lerp(bike.rotation.z, -lean, 0.14)
      bike.rotation.x = THREE.MathUtils.lerp(bike.rotation.x, pitch, 0.12)
      bobPhase.current += dt*6
      bike.position.y += Math.sin(bobPhase.current)*0.008
    }

    const behind = new THREE.Vector3().copy(p).sub(tangent.clone().multiplyScalar(6.6))
    behind.y += 3.1
    behind.x += inputTilt*0.65
    targetPos.current.lerp(behind, 0.055)
    camera.position.lerp(targetPos.current, 0.09)
    const lookAt = new THREE.Vector3().copy(p).add(tangent.clone().multiplyScalar(8))
    lookAt.y += 0.6
    targetLook.current.lerp(lookAt, 0.08)
    // @ts-ignore
    camera.lookAt(targetLook.current)
  })
  return null
}

function Lights(){
  return (
    <>
      <ambientLight intensity={0.88} color="#f0f9ff" />
      <directionalLight position={[8,22,10]} intensity={1.9} color="#ffffff" castShadow shadow-mapSize={[1024,1024]} shadow-bias={-0.0004} />
      <directionalLight position={[-12,14,-8]} intensity={0.55} color="#bae6fd" />
      <hemisphereLight args={['#e0f2fe','#0c4a6e', 0.50]} />
    </>
  )
}

export default function GameCanvas({
  onCrash, onWin
}: { onCrash?:()=>void; onWin?:()=>void }){
  const { curve } = useMemo(()=> buildSkyTrack(), [])
  const state = useStore(s=>s.state)

  useEffect(()=>{
    if(state==='crashed') onCrash?.()
    if(state==='won') onWin?.()
  },[state, onCrash, onWin])

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 1.5]} // capped for perf — was [1,2]
        camera={{ position:[0.8,2.8,9.5], fov: 58, near:0.1, far: 220 }}
        gl={{ antialias:true, powerPreference:'high-performance', stencil:false, depth:true }}
        performance={{ min: 0.5 }} // auto degrade if needed
        onCreated={({ gl })=>{
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.10
          gl.shadowMap.enabled=true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <Suspense fallback={null}>
          <Sky />
          <Lights />
          <CityBlur />
          <BokehSprites />
          <Ribbon curve={curve} />
          <Bike />
          <ProgressAndCamera curve={curve} />
          <Clouds />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0"
           style={{ background:`radial-gradient(900px 520px at 50% 42%, transparent 58%, rgba(2,6,23,0.32) 100%)`}} />
    </div>
  )
}

function Clouds(){
  const clouds = useMemo(()=> Array.from({length:6},(_,i)=> ({ // 6 vs 9
    x: (Math.random()-0.5)*44,
    y: 13 + Math.random()*10 + i*0.5,
    z: -10 - i*14 - Math.random()*8,
    s: 3.2 + Math.random()*4.2,
    o: 0.10 + Math.random()*0.08
  })),[])
  return (
    <group>
      {clouds.map((c,i)=>(
        <mesh key={i} position={[c.x,c.y,c.z]}>
          <sphereGeometry args={[c.s, 12, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={c.o} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
