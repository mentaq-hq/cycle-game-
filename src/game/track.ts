// Ribbon sky track — matches icon: white segmented narrow track twisting high
import * as THREE from 'three'

// Build an ascending undulating track like icon: narrow white ribbon
export function buildSkyTrack() {
  const points: THREE.Vector3[] = []
  const segments = 128 // reduced from 180 — catmullrom smooth anyway, saves curve calc
  for (let i=0;i<segments;i++){
    const t = i/(segments-1)
    const z = 8 - t * 140
    const y = -1.2 + Math.pow(t,0.85)*44 + Math.sin(t*Math.PI*3.2)*1.8 + Math.sin(t*18)*0.18
    const x = Math.sin(t*Math.PI*1.7)*3.8 + Math.sin(t*11.3)*0.45 + Math.cos(t*Math.PI*2.4)*1.2
    points.push(new THREE.Vector3(x,y,z))
  }
  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.18)
  return { curve, points }
}

export function ribbonGeometry(curve: THREE.CatmullRomCurve3, segs=380, width=1.7){
  const pos: number[] = []
  const uv: number[] = []
  const idx: number[] = []
  const frames = curve.computeFrenetFrames(segs, false)

  const pts: THREE.Vector3[] = []
  for(let i=0;i<=segs;i++) pts.push(curve.getPointAt(i/segs))

  for(let i=0;i<=segs;i++){
    const t = i/segs
    const p = pts[i]
    const B = frames.binormals[i]
    const lateral = new THREE.Vector3().copy(B).multiplyScalar(width/2)
    lateral.y *= 0.55
    const left = new THREE.Vector3().copy(p).add(lateral)
    const right = new THREE.Vector3().copy(p).sub(lateral)
    pos.push(left.x,left.y,left.z, right.x,right.y,right.z)
    uv.push(0,t*14, 1,t*14)
    if(i<segs){
      const a=i*2, b=a+1, c=a+2, d=a+3
      idx.push(a,b,c, b,d,c)
    }
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos,3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv,2))
  geo.setIndex(idx)
  geo.computeVertexNormals()
  return geo
}

export function railGeometry(curve: THREE.CatmullRomCurve3, segs=380, offset=0.99){
  const a: THREE.Vector3[]=[]; const b:THREE.Vector3[]=[]
  const frames = curve.computeFrenetFrames(segs,false)
  for(let i=0;i<=segs;i++){
    const p = curve.getPointAt(i/segs)
    const B = frames.binormals[i]
    const lat = new THREE.Vector3().copy(B).multiplyScalar(offset)
    lat.y *= 0.55
    a.push(new THREE.Vector3().copy(p).add(lat))
    b.push(new THREE.Vector3().copy(p).sub(lat))
  }
  return { a,b }
}
