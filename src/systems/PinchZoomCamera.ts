export class PinchZoomCamera {
  zoom = 1;
  min = 0.8;
  max = 1.6;
  private lastDistance = 0;

  start(distance:number){ this.lastDistance = distance; }
  update(distance:number){
    const delta = (distance - this.lastDistance) * 0.002;
    this.zoom = Math.max(this.min, Math.min(this.max, this.zoom + delta));
    this.lastDistance = distance;
    return this.zoom;
  }
}
export const pinchCamera = new PinchZoomCamera();