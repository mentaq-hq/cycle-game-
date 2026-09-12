import React from 'react';

export default function FarmUI(){
  return (
    <div className='min-h-screen bg-gradient-to-b from-sky-200 to-green-200 p-3'>
      <header className='flex items-center justify-between'>
        <div className='flex items-center gap-2'><div className='w-10 h-10 rounded-full bg-orange-300'/><div><p className='text-xs'>Level 1</p><div className='w-24 h-2 bg-blue-100 rounded'><div className='w-1/3 h-2 bg-blue-500 rounded'/></div></div></div>
        <div className='flex gap-2'><span className='px-3 py-1 bg-yellow-200 rounded-full'>250</span><span className='px-3 py-1 bg-purple-200 rounded-full'>10</span></div>
      </header>
      <div className='mt-3 bg-white/80 rounded-xl p-3'><p className='font-bold'>Daily Goal</p><div className='w-full h-3 bg-green-100 rounded mt-2'><div className='w-1/4 h-3 bg-green-500 rounded'/></div><p className='text-xs mt-1'>12.5L / 50L</p></div>
      <main className='mt-4 relative h-[420px] rounded-3xl bg-green-300 overflow-hidden'><div className='absolute left-3 top-6 space-y-2'><div className='bg-white rounded-lg p-2 text-xs'>🥛 Milk 2/10</div><div className='bg-white rounded-lg p-2 text-xs'>🥚 Eggs 0/15</div><div className='bg-white rounded-lg p-2 text-xs'>🌾 Feed 1/8</div></div><div className='absolute right-3 top-6 space-y-3'><button className='w-12 h-12 rounded-full bg-green-500 text-white'>🌾</button><button className='w-12 h-12 rounded-full bg-yellow-400'>🏠</button><button className='w-12 h-12 rounded-full bg-purple-500 text-white'>🛒</button></div><div className='absolute left-1/2 -translate-x-1/2 top-28'><div className='w-48 h-28 bg-amber-700 rounded-t-3xl'/><div className='w-56 h-16 bg-amber-600 -ml-4 rounded-xl'/></div><div className='absolute left-1/2 -translate-x-1/2 bottom-20 text-6xl'>🐄</div><div className='absolute bottom-4 left-1/2 -translate-x-1/2'><button className='px-8 py-3 rounded-full bg-orange-500 text-white font-bold'>🥛 MILK</button></div><button className='absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white'>AUTO</button></main>
    </div>
  )
}
