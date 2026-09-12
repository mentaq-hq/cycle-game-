import { memo } from 'react';
import { useGame } from '../state/GameState';

const TARGET = 50;

export default memo(function DailyGoal(){
  const { state, addCoins, addXP } = useGame();
  const progress = Math.min(state.daily, TARGET);
  const pct = (progress / TARGET) * 100;
  const complete = progress >= TARGET;

  return (
    <div className='bg-white/90 rounded-2xl p-3 shadow'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='font-bold'>🥛 Daily Goal</div>
          <div className='text-xs text-gray-500'>{progress}L / {TARGET}L</div>
        </div>
        <button
          disabled={!complete}
          onClick={() => { if (complete) { addCoins(500); addXP(120); } }}
          className={`px-3 py-1 rounded-lg text-white ${complete ? 'bg-green-500' : 'bg-gray-300'}`}
        >
          {complete ? 'Claim' : 'Locked'}
        </button>
      </div>
      <div className='w-full h-3 bg-green-100 rounded mt-2'>
        <div className='h-3 bg-green-500 rounded' style={{ width: `${pct}%` }}/>
      </div>
    </div>
  );
});
