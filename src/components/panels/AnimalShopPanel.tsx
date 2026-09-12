import { useGame } from '../../state/GameState';
import shop from '../../data/shop.json';

export default function AnimalShopPanel(){
 const { state, addCoins } = useGame();
 const buy=(a:any)=>{ if(state.level<a.level) return; if(state.coins<a.price) return; addCoins(-a.price); };
 return (<div className='space-y-3'><h2 className='text-lg font-bold'>Animal Shop</h2>{shop.animals.map((a:any)=>{const locked=state.level<a.level;return <div key={a.id} className='flex items-center justify-between rounded-xl border p-3'><div><div className='font-semibold'>{a.name}</div><div className='text-xs text-gray-500'>Lv.{a.level} • {a.price} coins</div></div><button disabled={locked} onClick={()=>buy(a)} className={`rounded-lg px-3 py-2 text-white ${locked?'bg-gray-300':'bg-purple-500'}`}>{locked?'Locked':'Buy'}</button></div>})}</div>);
}
