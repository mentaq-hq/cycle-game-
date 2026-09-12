export const BACKUP_PREFIX='farm_backup_';
export function saveBackup(slot:number,state:any){localStorage.setItem(`${BACKUP_PREFIX}${slot}`,JSON.stringify({savedAt:Date.now(),state}));}
export function loadBackup(slot:number){const raw=localStorage.getItem(`${BACKUP_PREFIX}${slot}`);return raw?JSON.parse(raw):null;}
export function listBackups(){return [1,2,3].map(slot=>{const d=loadBackup(slot);return {slot,exists:!!d,savedAt:d?.savedAt??null};});}
export function restoreBackup(slot:number){const d=loadBackup(slot);if(!d)return false;localStorage.setItem('farm_save',JSON.stringify(d.state));return true;}
export function deleteBackup(slot:number){localStorage.removeItem(`${BACKUP_PREFIX}${slot}`);}