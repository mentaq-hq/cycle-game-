export type Inventory={milk:number;egg:number;wheat:number};
export const inventory:Inventory={milk:0,egg:0,wheat:0};
export const capacity={milk:999,egg:999,wheat:999};
export function addResource(type:keyof Inventory,amount=1){inventory[type]=Math.min(capacity[type],inventory[type]+amount);return inventory[type];}
export function removeResource(type:keyof Inventory,amount=1){inventory[type]=Math.max(0,inventory[type]-amount);return inventory[type];}
export function hasResource(type:keyof Inventory,amount=1){return inventory[type]>=amount;}
