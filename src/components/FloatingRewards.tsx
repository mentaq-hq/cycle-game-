import { memo, useEffect, useState } from 'react';

export type Reward={id:number;text:string;x:number;y:number};
const MAX=20;
export default memo(function FloatingRewards(){const [items,setItems]=useState<Reward[]>([]);useEffect(()=>{const h=(e:any)=>{const r=e.detail as Reward;setItems(p=>[...p.slice(-(MAX-1)),r]);setTimeout(()=>setItems(p=>p.filter(i=>i.id!==r.id)),800)};window.addEventListener('reward',h);return()=>window.removeEventListener('reward',h)},[]);return <>{items.map(i=><div key={i.id} className='absolute pointer-events-none text-yellow-300 font-bold animate-bounce' style={{left:i.x,top:i.y}}>{i.text}</div>)}</>});
export const spawnReward=(text:string,x:number,y:number)=>window.dispatchEvent(new CustomEvent('reward',{detail:{id:Date.now()+Math.random(),text,x,y}}));