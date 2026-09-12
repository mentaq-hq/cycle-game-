export type IdleSave={lastActive:number;auto:boolean};
export type Inventory={milk:number;egg:number;wheat:number};
export type IdleReward={milk:number;egg:number;coins:number;seconds:number};
const MAX_OFFLINE=60*60*4;
export function createIdleSave(auto=false):IdleSave{return{lastActive:Date.now(),auto}};
export function updateLastActive(save:IdleSave){save.lastActive=Date.now();return save;}
export function calculateOfflineRewards(save:IdleSave,inv:Inventory):IdleReward{const elapsed=Math.min(MAX_OFFLINE,Math.max(0,Math.floor((Date.now()-save.lastActive)/1000)));if(!save.auto)return{milk:0,egg:0,coins:0,seconds:elapsed};const milk=Math.floor(elapsed/120);const egg=Math.floor(elapsed/90);inv.milk+=milk;inv.egg+=egg;const coins=milk*4+egg*3;return{milk,egg,coins,seconds:elapsed};}