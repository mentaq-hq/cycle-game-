export class CameraInertia {
  yaw=45; pitch=35; zoom=6;
  private vy=0; private vp=0;
  drag(dx:number,dy:number){this.vy+=dx*0.02;this.vp+=dy*0.015;}
  update(dt:number){this.yaw+=this.vy;this.pitch=Math.max(20,Math.min(55,this.pitch+this.vp));const d=Math.exp(-6*dt);this.vy*=d;this.vp*=d;}
  focus(x:number,z:number){this.yaw=Math.atan2(x,z)*180/Math.PI;}
}
export const cameraInertia=new CameraInertia();