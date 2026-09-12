export type Tile={x:number;z:number;occupied:boolean};
export type Building={id:string;name:string;x:number;z:number;level:number};
export const grid:Tile[]=Array.from({length:100},(_,i)=>({x:i%10,z:Math.floor(i/10),occupied:false}));
export function canPlace(x:number,z:number){const t=grid.find(g=>g.x===x&&g.z===z);return !!t&&!t.occupied;}
export function placeBuilding(list:Building[],b:Building){if(!canPlace(b.x,b.z)) return list;const t=grid.find(g=>g.x===b.x&&g.z===b.z)!;t.occupied=true;return [...list,b];}
export function removeBuilding(list:Building[],id:string){const b=list.find(i=>i.id===id);if(!b) return list;const t=grid.find(g=>g.x===b.x&&g.z===b.z);if(t) t.occupied=false;return list.filter(i=>i.id!==id);}