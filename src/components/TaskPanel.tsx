import { memo } from 'react';
import tasks from '../data/tasks.json';
import { useGame } from '../state/GameState';

export default memo(function TaskPanel(){
 const { state, addCoins, addXP } = useGame();
 const claim=(t:any)=>{ if(state.daily<t.target) return; addCoins(t.rewardCoins); addXP(t.rewardXP); };
 return <div className='space-y-2'>{tasks.map((t:any)=>{const done=state.daily>=t.target; return <div key={t.id} className='bg-white rounded-xl p-2 flex items-center justify-between'><div><div className='font-semibold text-sm'>{t.icon} {t.name}</div><div className='text-xs text-gray-500'>{Math.min(state.daily,t.target)}/{t.target}</div></div><button disabled={!done} onClick={()=>claim(t)} className={`px-3 py-1 rounded-lg text-white ${done?'bg-green-500':'bg-gray-300'}`}>{done?'Claim':'Locked'}</button></div>})}</div>;
});