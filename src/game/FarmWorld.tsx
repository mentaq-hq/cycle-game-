import { Canvas } from '@react-three/fiber';
import IsometricFarmScene from './IsometricFarmScene';
import Cow3D from './Cow3D';
import Chicken3D from './Chicken3D';
import WheatField3D from './WheatField3D';
import FarmerNPC from './FarmerNPC';

export default function FarmWorld(){
  return (
    <Canvas camera={{position:[6,6,6],fov:40}}>
      <ambientLight intensity={1.1}/>
      <directionalLight position={[5,8,5]} intensity={2}/>
      <IsometricFarmScene/>
      <Cow3D onCollect={()=>{}}/>
      <Chicken3D onCollect={()=>{}}/>
      <WheatField3D onHarvest={()=>{}}/>
      <FarmerNPC/>
    </Canvas>
  )
}
