import { loadGame, saveGame, needsDailyReset } from './storage';

export const SAVE_VERSION = 1;

export function initializeSave(){
  const state = loadGame();
  const today = new Date().toISOString().slice(0,10);
  if(needsDailyReset(state.lastReset)){
    state.dailyGoal = 0;
    state.lastReset = today;
    saveGame(state);
  }
  return state;
}

export function autosave(state:any){
  saveGame({ ...state, version:SAVE_VERSION, lastSaved:Date.now() });
}
