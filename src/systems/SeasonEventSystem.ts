export type Season='spring'|'summer'|'autumn'|'winter';
export type Event={id:string;season:Season;title:string;coins:number;gems:number;active:boolean};
export const EVENTS:Event[]=[{id:'spring_fair',season:'spring',title:'Spring Flower Fair',coins:500,gems:10,active:false},{id:'summer_harvest',season:'summer',title:'Summer Harvest Festival',coins:700,gems:15,active:false},{id:'autumn_market',season:'autumn',title:'Autumn Farmers Market',coins:900,gems:20,active:false},{id:'winter_gifts',season:'winter',title:'Winter Gift Festival',coins:1200,gems:30,active:false}];
export function currentSeason(month:number):Season{if(month>=2&&month<=4)return'spring';if(month>=5&&month<=7)return'summer';if(month>=8&&month<=10)return'autumn';return'winter';}
export function activateEvents(month:number){const s=currentSeason(month);return EVENTS.map(e=>({...e,active:e.season===s}));}
export function claimEvent(e:Event){if(!e.active)return{coins:0,gems:0};return{coins:e.coins,gems:e.gems};}