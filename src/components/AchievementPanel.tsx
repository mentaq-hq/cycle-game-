import { memo } from 'react';
import { useGame } from '../state/GameState';
import { ACHIEVEMENTS } from '../systems/achievements';

export default memo(function AchievementPanel(){
 const { state, addCoins, addGems } = useGame();
 const claim=(a:any)=>{ if(state.level<a.level||a.claimed) return; addCoins(a.coins); addGems(a.gems); a.claimed=true; };
 return <div className='space-y-2'>{ACHIEVEMENTS.map((a:any)=>{const ready=state.level>=a.level&&!a.claimed;return <div key={a.level} className='rounded-xl border bg-white p-3 flex items-center justify-between'><div><div className='font-semibold'>🏆 {a.title}</div><div className='text-xs text-gray-500'>Level {a.level} • {a.coins}🪙 {a.gems}💎</div></div><button disabled={!ready} onClick={()=>claim(a)} className={`px-3 py-2 rounded-lg text-white ${ready?'bg-amber-500':'bg-gray-300'}`}>{a.claimed?'Claimed':'Claim'}</button></div>})}</div>;
});