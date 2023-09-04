import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import "./index.css"

const Earth = () => {
  const [colorMap] = useTexture([
    'https://blenderartists.org/uploads/default/optimized/4X/5/0/2/5029a48052f6f91a399a41dcd1004adf854b17ea_2_1380x690.jpeg',
  ]);

  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshPhongMaterial color="white" map={colorMap} />
    </mesh>
  );
};

const Marker = ({ lat, lon }) => {
  const position = new THREE.Vector3();
  const latRad = lat * (Math.PI / 180);
  const lonRad = -lon * (Math.PI / 180);
  const radius = 2;
  
  position.x = Math.cos(latRad) * Math.cos(lonRad) * radius;
  position.y = Math.sin(latRad) * radius;
  position.z = Math.cos(latRad) * Math.sin(lonRad) * radius;

  
   return (
     <>
       <mesh position={position}>
         <cylinderGeometry args={[0.02,0.02,.15]} />
         <meshBasicMaterial color="red" />
       </mesh>
       <mesh position={[position.x,position.y+.075,position.z]}>
         <coneGeometry args={[0.05,.15]} />
         <meshBasicMaterial color="red" />
       </mesh>
     </>
   );
};


const Globe = ({ city, lat, lng }) => {
  const groupRef = useRef();
  const controlsRef = useRef();
  const [rotate, setRotate] = useState(true)

 
  useEffect(() => {
    if (lat && lng) {
      setRotate(false)
      const latRad = lat * (Math.PI / 180);
      const lonRad = -lng * (Math.PI / 180);
      const radius = 2;
      const x = Math.cos(latRad) * Math.cos(lonRad) * radius;
      // const y = Math.sin(latRad) * radius;
      const z = Math.cos(latRad) * Math.sin(lonRad) * radius;
      
      let angle = Math.atan2(z,x);
      angle += angle > 0 ? -Math.PI/1 : Math.PI/1;
      
      if (groupRef.current) {
        groupRef.current.rotation.y += angle;
      }
    } else {
      if (controlsRef.current) {
        setRotate(true)
      }
    }
  }, [lat, lng]);

  return (
    <div className='globe'>
    <Canvas style={{ height: '100vh', width: '100%' }}>
      <ambientLight intensity={1.8} />
      <pointLight color="white" position={[10, 10, 10]} intensity={5} />
      <group ref={groupRef}>
        <Earth />
        {lat && lng && <Marker lat={lat} lon={lng} />}
      </group>
      <OrbitControls ref={controlsRef} autoRotate={rotate} enableZoom={false} enablePan={false} />
    </Canvas>
    </div>
  );
};

export default Globe;

