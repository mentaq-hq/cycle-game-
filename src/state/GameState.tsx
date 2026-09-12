import { createContext, useContext, useMemo, useState } from 'react';

export type GameState={level:number;xp:number;coins:number;gems:number;daily:number};
const C=createContext<any>(null);
export const GameProvider=({children}:{children:React.ReactNode})=>{const [s,setS]=useState<GameState>({level:1,xp:0,coins:200,gems:10,daily:0});const addXP=(v:number)=>setS(g=>{let xp=g.xp+v,l=g.level;const need=Math.floor(100*Math.pow(l,1.15));if(xp>=need){xp-=need;l++;}return {...g,xp,level:l};});const addCoins=(v:number)=>setS(g=>({...g,coins:g.coins+v}));const collectMilk=()=>{addCoins(8);addXP(5);setS(g=>({...g,daily:g.daily+1}));};const value=useMemo(()=>({state:s,addXP,addCoins,collectMilk}),[s]);return <C.Provider value={value}>{children}</C.Provider>};
export const useGame=()=>useContext(C);
