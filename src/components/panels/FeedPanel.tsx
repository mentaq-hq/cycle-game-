import { useGame } from '../../state/GameState';
import shop from '../../data/shop.json';

export default function FeedPanel(){
 const { state, addCoins } = useGame();
 const buy=(item:any)=>{ if(state.coins<item.price) return; addCoins(-item.price); };
 return (<div className='space-y-3'><h2 className='text-lg font-bold'>Feed Store</h2>{shop.feed.map((i:any)=><div key={i.id} className='flex items-center justify-between rounded-xl border p-3'><div><div className='font-semibold'>{i.name}</div><div className='text-xs text-gray-500'>Energy +{i.effect}</div></div><button onClick={()=>buy(i)} className='rounded-lg bg-green-500 px-3 py-2 text-white'>{i.price} 🪙</button></div>)}</div>);
}
