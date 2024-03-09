import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

function Cube() {
  let animationId;
  const boxRef = useRef();
  const animate = () => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;
    }
    animationId = requestAnimationFrame(animate);
  };

  const handleMouseOver = () => {
    animationId = requestAnimationFrame(animate);
  };    

  const handleMouseOut = () => {
    if ( boxRef.current) {
      boxRef.current.rotation.x = 0;
      boxRef.current.rotation.y = 0;
    }
    cancelAnimationFrame(animationId);
  };

  const imagePaths = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image1.jpg',
    '/images/image1.jpg',
    '/images/image1.jpg',
    '/images/image1.jpg'
  ];

  // 텍스처를 담을 배열
  const textures = imagePaths.map((path) => new THREE.TextureLoader().load(path));

  // 6면에 각각 다른 텍스처를 적용한 재질 배열
  const materials = textures.map((texture) => new THREE.MeshBasicMaterial({ map: texture }));

  return (
    <Link to='/studio'>
      <Canvas> 
        <ambientLight />
        <pointLight position={[0, 0, 10]} />
        <Box
          args={[3, 3, 3]}
          material={materials}
          ref={boxRef}
          onPointerOver={handleMouseOver}
          onPointerOut={handleMouseOut}
        />
      </Canvas>
    </Link>
  );
}

export default Cube;
