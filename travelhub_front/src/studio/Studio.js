import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Studio.css';

function addImagePlane(scene, imagePath, position, width, objectName, rotation) {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(imagePath, function(texture) {
      const aspectRatio = texture.image.width / texture.image.height;
      const planeWidth = width || 5; // 이미지의 너비를 설정합니다. 기본값은 5입니다.
      const planeHeight = planeWidth / aspectRatio;

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight); // 이미지의 크기를 설정합니다.
      const material = new THREE.MeshBasicMaterial({ map: texture }); // 이미지 텍스처를 재질로 사용합니다.
      const imagePlane = new THREE.Mesh(geometry, material);
      imagePlane.position.copy(position); // 전달된 위치로 이미지를 이동시킵니다.
      
      if (objectName) {
        imagePlane.name = objectName; // 개체의 이름을 설정합니다.
      }

      if (rotation) {
        imagePlane.rotation.set(rotation.x, rotation.y, rotation.z); // 전달된 각도로 이미지를 회전시킵니다.
      }
      scene.add(imagePlane);
  });
}



const Studio = () => {
  const containerRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 2;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    for (let i = 0; i < 2; i++) {
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);

      cube.position.x = (Math.random() - 0.5) * 10;
      cube.position.y = (Math.random() - 0.5) * 10;
      cube.position.z = (Math.random() - 0.5) * 10;

      scene.add(cube);
    }
  
    addImagePlane(scene, '/images/image2.jpg', new THREE.Vector3(0, 2, -3), 3, 'asd'); // 이미지의 너비를 10으로 지정
    addImagePlane(scene, '/images/image2.jpg', new THREE.Vector3(3, 2, 0), 3, 'asd', new THREE.Vector3(0, -Math.PI / 2, 0)); // 이미지의 너비를 10으로 지정
    addImagePlane(scene, '/images/image2.jpg', new THREE.Vector3(-3, 2, 0), 3, 'asd', new THREE.Vector3(0, Math.PI / 2, 0)); // 이미지의 너비를 10으로 지정

    const geometry = new THREE.PlaneGeometry(40, 60); //(x,z) x-좌+우 z-앞+뒤
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2; 
    plane.position.y = 0;
    plane.position.x = 0;
    plane.position.z = 0;
    scene.add(plane);

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    const handleWheel = (event) => {//마우스 휠 event control
      const delta = event.deltaY * 0.005; 

      //카메라 위치
      camera.position.z += delta;

      //카메라 각도
      const rotationSpeed = 0.1;
      const rotationDelta = delta * rotationSpeed;

      camera.rotation.y -= rotationDelta;

      renderer.render(scene, camera);
    };

    // Listen for wheel events for zooming
    containerRef.current.addEventListener('wheel', handleWheel);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate all cubes
      // scene.children.forEach((child) => {
      //   if (child instanceof THREE.Mesh) {
      //     child.rotation.x += 0.01;
      //     child.rotation.y += 0.01;
      //   }
      // });

      renderer.render(scene, cameraRef.current);
    };

    animate();

    const cleanup = () => {
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeEventListener('wheel', handleWheel);
        containerRef.current.removeChild(renderer.domElement);
        containerRef.current.removeEventListener('wheel', handleWheel);
      }
    };

    return () => cleanup();
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh', overflow: 'hidden' }} />;
};

export default Studio;