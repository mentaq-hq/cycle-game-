import { useGame } from '../../state/GameState';
import shop from '../../data/shop.json';

export default function BuildPanel(){
 const { state, addCoins } = useGame();
 const buy=(item:any)=>{ if(state.level<item.level) return; if(state.coins<item.price) return; addCoins(-item.price); };
 return (<div className='space-y-3'><h2 className='text-lg font-bold'>Build</h2>{shop.buildings.map((b:any)=>{const locked=state.level<b.level;return <div key={b.id} className='flex items-center justify-between rounded-xl border p-3'><div><div className='font-semibold'>{b.name}</div><div className='text-xs text-gray-500'>Lv.{b.level} • {b.price} coins</div></div><button disabled={locked} onClick={()=>buy(b)} className={`rounded-lg px-3 py-2 text-white ${locked?'bg-gray-300':'bg-yellow-500'}`}>{locked?'Locked':'Build'}</button></div>})}</div>);
}
