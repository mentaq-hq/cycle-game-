import { memo, useState } from 'react';
import { resetGame } from '../systems/storage';

export default memo(function SettingsPanel(){
 const [open,setOpen]=useState(false); const [sound,setSound]=useState(true); const [auto,setAuto]=useState(false);
 const reset=()=>{resetGame();location.reload();};
 return(<><button onClick={()=>setOpen(true)} className='fixed top-3 right-3 w-11 h-11 rounded-full bg-white shadow'>⚙️</button>{open&&<div className='fixed inset-0 bg-black/30 flex items-end'><div className='w-full bg-white rounded-t-3xl p-4 space-y-4'><div className='flex items-center justify-between'><h2 className='text-lg font-bold'>Settings</h2><button onClick={()=>setOpen(false)}>✕</button></div><label className='flex justify-between'><span>Sound</span><input type='checkbox' checked={sound} onChange={e=>setSound(e.target.checked)}/></label><label className='flex justify-between'><span>Auto Mode</span><input type='checkbox' checked={auto} onChange={e=>setAuto(e.target.checked)}/></label><button onClick={reset} className='w-full rounded-xl bg-red-500 py-3 text-white font-bold'>Reset Progress</button></div></div>}</>)});