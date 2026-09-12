import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Cow3D({onCollect}:{onCollect:()=>void}){
 const g=useRef<THREE.Group>(null!);
 useFrame(({clock})=>{if(!g.current) return; g.current.position.y=Math.sin(clock.elapsedTime*4)*0.03;});
 return (<group ref={g} position={[0,0.35,1.2]} onClick={onCollect}><mesh position={[0,0.35,0]}><boxGeometry args={[0.9,0.55,0.5]}/><meshStandardMaterial color='white'/></mesh><mesh position={[0.42,0.45,0]}><boxGeometry args={[0.28,0.28,0.28]}/><meshStandardMaterial color='white'/></mesh><mesh position={[0.58,0.2,0]}><cylinderGeometry args={[0.08,0.08,0.16]}/><meshStandardMaterial color='#D4A373'/></mesh><mesh position={[0.25,-0.05,0.15]}><cylinderGeometry args={[0.04,0.04,0.4]}/><meshStandardMaterial color='#444'/></mesh><mesh position={[0.25,-0.05,-0.15]}><cylinderGeometry args={[0.04,0.04,0.4]}/><meshStandardMaterial color='#444'/></mesh><mesh position={[-0.25,-0.05,0.15]}><cylinderGeometry args={[0.04,0.04,0.4]}/><meshStandardMaterial color='#444'/></mesh><mesh position={[-0.25,-0.05,-0.15]}><cylinderGeometry args={[0.04,0.04,0.4]}/><meshStandardMaterial color='#444'/></mesh><mesh position={[0.95,-0.05,0]}><cylinderGeometry args={[0.12,0.12,0.18]}/><meshStandardMaterial color='#C9E8FF'/></mesh></group>);
}
