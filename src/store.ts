import { create } from 'zustand'

export type GameState = 'landing'|'ready'|'playing'|'paused'|'crashed'|'won'
export type Difficulty = 'easy'|'sky'|'insane'

interface Store {
  state: GameState
  score: number
  best: number
  progress: number
  speed: number
  balance: number
  tilt: number
  lives: number
  difficulty: Difficulty
  setState: (s: GameState) => void
  addScore: (n:number)=>void
  setProgress:(n:number)=>void
  setBalance:(n:number)=>void
  setTilt:(n:number)=>void
  setSpeed:(n:number)=>void
  resetRun:()=>void
  setDifficulty:(d:Difficulty)=>void
}

const loadBest = ()=>{ try{ return Number(localStorage.getItem('cycle-sky-best')||0)}catch{return 0}}
let bestWriteTimer: number | null = null
let pendingBest = 0

export const useStore = create<Store>((set)=>({
  state:'landing',
  score:0,
  best: loadBest(),
  progress:0,
  speed: 6.5,
  balance:0,
  tilt:0,
  lives:3,
  difficulty:'sky',
  setState: (state)=> set({state}),
  addScore:(n)=> set(s=>{
    const score = s.score+n
    const best = Math.max(s.best, score)
    // batch localStorage write - prevents 5 writes/sec thrash
    pendingBest = best
    if(bestWriteTimer===null){
      bestWriteTimer = window.setTimeout(()=>{
        try{ localStorage.setItem('cycle-sky-best', String(pendingBest)) }catch{}
        bestWriteTimer=null
      }, 400)
    }
    return {score,best}
  }),
  setProgress:(progress)=> set({progress}),
  setBalance:(balance)=> set({balance}),
  setTilt:(tilt)=> set({tilt}),
  setSpeed:(speed)=> set({speed}),
  setDifficulty:(difficulty)=> set({difficulty}),
  resetRun:()=> set({ score:0, progress:0, balance:0, tilt:0, lives:3 })
}))
