import { memo, useState } from 'react';
import { useGame } from '../state/GameState';

function Cow(){
 const { collectMilk } = useGame();
 const [bouncing,setBouncing]=useState(false);
 const tap=()=>{ setBouncing(true); collectMilk(); setTimeout(()=>setBouncing(false),180); };
 return (<button onClick={tap} className={`text-7xl transition-transform ${bouncing?'scale-110':'scale-100'}`} aria-label='Collect milk'>🐄</button>);
}
export default memo(Cow);
